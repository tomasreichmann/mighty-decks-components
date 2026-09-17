import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { promisify } from "node:util";

const exec = promisify(execFile);
const root = resolve(process.cwd());
const args = process.argv.slice(2);
const ref = args[args.indexOf("--ref") + 1];
const check = args.includes("--check");
const cache = resolve(root, ".cache", "mighty-decks");
const lockPath = resolve(root, "mighty-decks.lock.json");
const configPath = resolve(root, "mighty-decks.config.json");
const journalPath = resolve(cache, "journal.json");
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const exists = async (path) => access(path).then(() => true).catch(() => false);
const git = async (argumentsList, options = {}) => exec("git", argumentsList, { maxBuffer: 1024 * 1024 * 1024, ...options });
const text = async (argumentsList, options = {}) => (await git(argumentsList, options)).stdout.toString().trim();
const safeRelative = (path) => {
  if (typeof path !== "string" || path.includes("\\") || path.startsWith("/") || path.split("/").some((part) => !part || part === "." || part === "..")) throw new Error(`Unsafe distribution path: ${String(path)}`);
  return path;
};
const target = (path, destination, roots) => {
  const output = resolve(root, destination, ...safeRelative(path).split("/"));
  if (!roots.some((allowed) => output === allowed || output.startsWith(`${allowed}${sep}`))) throw new Error(`Destination escapes owned roots: ${path}`);
  return output;
};

if (check) {
  if (await exists(journalPath)) throw new Error("A previous Mighty Decks update was interrupted; recover it before checking.");
  const lock = JSON.parse(await readFile(lockPath, "utf8"));
  for (const file of lock.files ?? []) {
    if (!await exists(resolve(root, file.destination)) || hash(await readFile(resolve(root, file.destination))) !== file.sha256) throw new Error(`Managed file differs from lock: ${file.destination}`);
  }
  console.log(`Verified ${lock.files?.length ?? 0} local Mighty Decks files without network access.`);
  process.exit(0);
}

if (!/^[a-f0-9]{40}$/i.test(ref ?? "")) throw new Error("--ref must be a full 40-character commit SHA.");
if (await exists(journalPath)) throw new Error("A previous Mighty Decks update was interrupted; recover it before starting another update.");
const config = JSON.parse(await readFile(configPath, "utf8"));
if (!config.repository || !["react", "png", "both"].includes(config.mode)) throw new Error("mighty-decks.config.json must include repository and mode (react, png, or both).");
if (!config.runtimeDestination || !config.publicDestination) throw new Error("mighty-decks.config.json must include runtimeDestination and publicDestination.");
const runtimeRoot = resolve(root, config.runtimeDestination);
const publicRoot = resolve(root, config.publicDestination);
const ownedRoots = [runtimeRoot, publicRoot];
if (ownedRoots.some((path) => path !== root && !path.startsWith(`${root}${sep}`))) throw new Error("Configured destination must stay within the consumer root.");
await mkdir(dirname(cache), { recursive: true });
if (!await exists(resolve(cache, ".git"))) await git(["clone", "--filter=blob:none", "--no-checkout", config.repository, cache]);
await git(["-C", cache, "fetch", "--depth=1", "origin", ref]);
if (await text(["-C", cache, "rev-parse", `${ref}^{commit}`]) !== ref) throw new Error(`Git did not resolve the requested commit: ${ref}`);
const manifestBytes = await git(["-C", cache, "show", `${ref}:distribution/manifest.json`], { encoding: "buffer" });
const manifest = JSON.parse(manifestBytes.stdout.toString("utf8"));
if (!Array.isArray(manifest.files) || !manifest.groups) throw new Error("Upstream distribution manifest is invalid.");
const selectedGroups = config.groups?.length ? config.groups : Object.keys(manifest.groups);
const selectedPngs = new Set(selectedGroups.flatMap((group) => {
  const png = manifest.groups[group]?.png;
  if (!Array.isArray(png)) throw new Error(`Unknown distribution group: ${group}`);
  return png;
}));
if (config.pngPaths) {
  if (!Array.isArray(config.pngPaths)) throw new Error("pngPaths must be an array of manifest PNG paths.");
  for (const path of config.pngPaths) {
    if (!selectedPngs.has(path)) throw new Error(`PNG path is not part of the selected groups: ${path}`);
  }
  for (const path of [...selectedPngs]) if (!config.pngPaths.includes(path)) selectedPngs.delete(path);
}
const wantRuntime = config.mode === "react" || config.mode === "both";
const wantPng = config.mode === "png" || config.mode === "both";
const selection = manifest.files.flatMap((file) => {
  const path = safeRelative(file.path);
  const notice = /^public\/mighty-decks\/(?:LICENSE|NOTICE|LICENSES\/)/.test(path);
  if (wantRuntime && path.startsWith("runtime/")) return [{ sourcePath: path, destination: relative(root, target(path.slice("runtime/".length), config.runtimeDestination, ownedRoots)).replaceAll("\\", "/"), sha256: file.sha256 }];
  if (wantRuntime && (path.startsWith("public/mighty-decks/assets/") || notice)) return [{ sourcePath: path, destination: relative(root, target(path.slice("public/mighty-decks/".length), config.publicDestination, ownedRoots)).replaceAll("\\", "/"), sha256: file.sha256 }];
  if (wantPng && (selectedPngs.has(path) || notice)) return [{ sourcePath: path, destination: relative(root, target(path.slice("public/mighty-decks/".length), config.publicDestination, ownedRoots)).replaceAll("\\", "/"), sha256: file.sha256 }];
  return [];
});
if (selection.length === 0) throw new Error("The selected distribution content is empty.");
const oldLock = await readFile(lockPath, "utf8").then(JSON.parse).catch(() => ({ files: [] }));
for (const file of oldLock.files ?? []) {
  const local = resolve(root, file.destination);
  if (await exists(local) && hash(await readFile(local)) !== file.sha256) throw new Error(`Refusing to overwrite locally modified managed file: ${file.destination}`);
}
const staging = resolve(cache, `staging-${process.pid}`);
await rm(staging, { recursive: true, force: true });
await mkdir(staging, { recursive: true });
try {
  for (const file of selection) {
    const blob = await git(["-C", cache, "show", `${ref}:distribution/${file.sourcePath}`], { encoding: "buffer" });
    if (hash(blob.stdout) !== file.sha256) throw new Error(`Upstream file hash mismatch: ${file.sourcePath}`);
    const staged = resolve(staging, ...file.destination.split("/"));
    await mkdir(dirname(staged), { recursive: true });
    await writeFile(staged, blob.stdout);
  }
  await writeFile(journalPath, `${JSON.stringify({ schemaVersion: 1, staging, files: selection.map((file) => file.destination) })}\n`);
  const selected = new Set(selection.map((file) => file.destination));
  for (const file of oldLock.files ?? []) if (!selected.has(file.destination)) await rm(resolve(root, file.destination), { force: true });
  for (const file of selection) {
    const output = resolve(root, file.destination);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, await readFile(resolve(staging, ...file.destination.split("/"))));
  }
  const lock = { schemaVersion: 1, commit: ref, manifestSha256: hash(manifestBytes.stdout), selection: { mode: config.mode, groups: selectedGroups }, files: selection };
  await writeFile(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
  await rm(journalPath, { force: true });
  console.log(`Synced ${selection.length} Mighty Decks files from ${ref}.`);
} finally {
  await rm(staging, { recursive: true, force: true });
}
