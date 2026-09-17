import { chmod, cp, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, resolve } from "node:path";
import { t, x } from "tar";

import { sha256 } from "./artifact-lib.mjs";

const packageRoot = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const value = (name, fallback) => {
  const index = args.indexOf(name);
  return index < 0 ? fallback : args[index + 1];
};
const sourceCommit = value("--source-commit");
const archive = resolve(packageRoot, value("--tarball", "output/runtime.tgz"));
const output = resolve(packageRoot, value("--out", "output/git-package"));

if (!/^[a-f0-9]{40}$/i.test(sourceCommit ?? "")) throw new Error("Expected a full 40-character source commit SHA.");
const entries = [];
await t({ file: archive, onentry: (entry) => entries.push({ path: entry.path, type: entry.type }) });
for (const entry of entries) {
  const normalizedPath = entry.path.replace(/\/$/, "");
  if (!normalizedPath.startsWith("package") || (normalizedPath !== "package" && !normalizedPath.startsWith("package/")) || entry.path.includes("\\") || normalizedPath.split("/").some((part) => part === "" || part === "." || part === "..")) {
    throw new Error(`Unsafe runtime archive entry: ${entry.path}`);
  }
  if (!["File", "Directory"].includes(entry.type)) throw new Error(`Runtime archive contains unsupported entry type: ${entry.type}`);
}

const temp = await mkdtemp(resolve(tmpdir(), "mighty-decks-git-stage-"));
try {
  await x({ file: archive, cwd: temp, preservePaths: false, strict: true });
  const staged = resolve(temp, "package");
  const manifestPath = resolve(staged, "package.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const required = ["dist/index.js", "dist/index.d.ts", "generated/manifest.json", "package.json"];
  for (const path of required) if (!entries.some((entry) => entry.path === `package/${path}`)) throw new Error(`Runtime tarball is missing ${path}.`);
  if (!entries.some((entry) => entry.path.startsWith("package/assets/fonts/") && entry.type === "File")) throw new Error("Runtime tarball is missing fonts.");
  if (!manifest.name || !manifest.version || !manifest.exports || !manifest.bin) throw new Error("Runtime tarball manifest is not an installable package.");
  for (const path of Object.values(manifest.bin)) {
    if (typeof path !== "string" || !path.startsWith("./")) throw new Error("Runtime tarball has an unsafe CLI path.");
    await chmod(resolve(staged, path), 0o755);
  }
  const generated = JSON.parse(await readFile(resolve(staged, "generated/manifest.json"), "utf8"));
  if (!generated.contentVersion) throw new Error("Runtime manifest is missing contentVersion.");
  delete manifest.scripts; delete manifest.devDependencies; delete manifest.packageManager; delete manifest.publishConfig; delete manifest.workspaces;
  manifest.private = true;
  if (Array.isArray(manifest.files) && !manifest.files.includes("distribution.json")) manifest.files.push("distribution.json");
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(resolve(staged, "distribution.json"), `${JSON.stringify({ schemaVersion: 1, packageName: manifest.name, packageVersion: manifest.version, contentVersion: generated.contentVersion, sourceCommit, runtimeTarballSha256: await sha256(archive) }, null, 2)}\n`);
  await rm(output, { recursive: true, force: true });
  await mkdir(dirname(output), { recursive: true });
  await cp(staged, output, { recursive: true });
  console.log(`Staged ${manifest.name}@${manifest.version} for Git distribution in ${basename(output)}.`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
