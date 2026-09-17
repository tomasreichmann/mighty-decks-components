import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { access, cp, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { basename, dirname, relative, resolve } from "node:path";
import { promisify } from "node:util";

const exec = promisify(execFile);
const packageRoot = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(name);
  return index < 0 ? undefined : args[index + 1];
};
const source = resolve(option("--source") ?? packageRoot);
const output = resolve(option("--out") ?? resolve(source, "distribution"));
const skipBuild = args.includes("--skip-build");
const staging = `${output}.staging-${process.pid}`;
const backup = `${output}.backup-${process.pid}`;
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const exists = async (path) => access(path).then(() => true).catch(() => false);

const collectFiles = async (root, current = root) => {
  const entries = await readdir(current, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const path = resolve(current, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Distribution inputs cannot contain symlinks: ${relative(root, path)}`);
    if (entry.isDirectory()) files.push(...await collectFiles(root, path));
    if (entry.isFile()) files.push(path);
  }
  return files;
};
const normalized = (path) => relative(source, path).replaceAll("\\", "/");
const copy = async (from, to) => {
  await cp(resolve(source, from), resolve(staging, to), { recursive: true, force: true, dereference: false });
};
const normalizeText = async (root) => {
  for (const path of await collectFiles(root)) {
    if (/\.(?:css|csv|d\.ts|json|js|md|mjs|txt)$/i.test(path) || ["LICENSE", "NOTICE"].includes(basename(path))) {
      await writeFile(path, (await readFile(path, "utf8")).replaceAll("\r\n", "\n"));
    }
  }
};
const inputs = async () => {
  const roots = ["assets", "docs", "export-app", "generated", "resources", "skills", "src"];
  const standalone = ["package.json", "tsconfig.build.json", "tsconfig.json", "vite.config.ts", "scripts/generate.ts", "scripts/prepare-assets.ts", "scripts/export.ts"];
  const files = [];
  for (const root of roots) files.push(...await collectFiles(resolve(source, root)));
  for (const path of standalone) if (await exists(resolve(source, path))) files.push(resolve(source, path));
  return Promise.all(files.filter((path) => !/^(src|export-app)\/.*\.js$/i.test(normalized(path))).sort((left, right) => normalized(left).localeCompare(normalized(right))).map(async (path) => ({
    path: normalized(path), sha256: hash(await readFile(path)),
  })));
};

if (source === output || output.startsWith(`${source}\\`) && !output.endsWith("\\distribution")) {
  throw new Error("Distribution output must be the source distribution directory or a separate path.");
}
const previousManifest = JSON.parse(await readFile(resolve(output, "manifest.json"), "utf8").catch(() => "{}"));
const inputFingerprint = hash(JSON.stringify(await inputs()));
if (!skipBuild && previousManifest.inputFingerprint === inputFingerprint) {
  console.log("Skipped runtime generation because distribution inputs are unchanged.");
} else if (!skipBuild) {
  const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
  for (const command of ["assets:prepare", "generate:data", "build"]) {
    await exec(pnpm, [command], { cwd: source, shell: process.platform === "win32" });
  }
}

await rm(staging, { recursive: true, force: true });
await mkdir(staging, { recursive: true });
try {
  for (const [from, to] of [
    ["dist", "runtime/dist"], ["assets/fonts", "runtime/assets/fonts"], ["generated/csv", "runtime/generated/csv"],
    ["generated/manifest.json", "runtime/generated/manifest.json"], ["docs/en", "runtime/docs/en"], ["skills", "runtime/skills"],
    ["LICENSE", "runtime/LICENSE"], ["NOTICE", "runtime/NOTICE"], ["LICENSES", "runtime/LICENSES"],
    ["assets", "public/mighty-decks/assets"], ["generated/png", "public/mighty-decks/generated/png"],
    ["LICENSE", "public/mighty-decks/LICENSE"], ["NOTICE", "public/mighty-decks/NOTICE"], ["LICENSES", "public/mighty-decks/LICENSES"],
  ]) await copy(from, to);
  const runtimePackage = JSON.parse(await readFile(resolve(source, "package.json"), "utf8"));
  delete runtimePackage.scripts;
  delete runtimePackage.devDependencies;
  delete runtimePackage.packageManager;
  delete runtimePackage.publishConfig;
  delete runtimePackage.workspaces;
  delete runtimePackage.files;
  runtimePackage.private = true;
  await writeFile(resolve(staging, "runtime/package.json"), `${JSON.stringify(runtimePackage, null, 2)}\n`);
  await normalizeText(staging);

  const catalog = JSON.parse(await readFile(resolve(source, "src/data/catalog.en.json"), "utf8"));
  const decks = new Map(catalog.cards.map((card) => [`${card.family}:${card.slug}`, card.deck && card.deck !== "base" ? card.deck : "core"]));
  const pngManifest = JSON.parse(await readFile(resolve(source, "generated/png-manifest.json"), "utf8"));
  const groups = {};
  for (const entry of pngManifest.entries) {
    const group = decks.get(`${entry.family}:${entry.slug}`);
    if (!group) throw new Error(`PNG entry has no catalog group: ${entry.family}:${entry.slug}`);
    const path = `public/mighty-decks/generated/${entry.path}`;
    (groups[group] ??= { png: [] }).png.push(path);
  }
  for (const group of Object.values(groups)) group.png.sort();
  const files = await Promise.all((await collectFiles(staging)).map(async (path) => ({
    path: relative(staging, path).replaceAll("\\", "/"),
    size: (await readFile(path)).byteLength,
    sha256: hash(await readFile(path)),
  })));
  files.sort((left, right) => left.path.localeCompare(right.path));
  const sourceInputs = await inputs();
  const manifest = {
    schemaVersion: 1,
    package: { name: runtimePackage.name, version: runtimePackage.version },
    contentVersion: catalog.contentVersion,
    toolchain: { node: runtimePackage.engines?.node, playwright: JSON.parse(await readFile(resolve(source, "package.json"), "utf8")).devDependencies?.playwright },
    inputFingerprint: hash(JSON.stringify(sourceInputs)),
    inputs: sourceInputs,
    groups,
    files,
  };
  await writeFile(resolve(staging, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  await rm(backup, { recursive: true, force: true });
  if (await exists(output)) await rename(output, backup);
  try {
    await rename(staging, output);
  } catch (error) {
    if (await exists(backup)) await rename(backup, output);
    throw error;
  }
  await rm(backup, { recursive: true, force: true });
  console.log(`Prepared distribution at ${output}.`);
} finally {
  await rm(staging, { recursive: true, force: true });
}
