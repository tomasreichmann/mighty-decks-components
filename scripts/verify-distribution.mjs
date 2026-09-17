import { createHash } from "node:crypto";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { relative, resolve } from "node:path";

const packageRoot = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const rootIndex = args.indexOf("--root");
const distributionRoot = resolve(rootIndex < 0 ? resolve(packageRoot, "distribution") : args[rootIndex + 1] ?? "");
const sourceIndex = args.indexOf("--source");
const source = resolve(sourceIndex < 0 ? packageRoot : args[sourceIndex + 1] ?? "");

const exists = async (path) => access(path).then(() => true).catch(() => false);
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const collectFiles = async (root, current = root) => {
  const entries = await readdir(current, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const path = resolve(current, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Distribution cannot contain symlinks: ${relative(root, path)}`);
    if (entry.isDirectory()) files.push(...await collectFiles(root, path));
    if (entry.isFile()) files.push(path);
  }
  return files;
};
const sourceInputs = async () => {
  const roots = ["assets", "docs", "export-app", "generated", "resources", "skills", "src"];
  const standalone = ["package.json", "tsconfig.build.json", "tsconfig.json", "vite.config.ts", "scripts/generate.ts", "scripts/prepare-assets.ts", "scripts/export.ts"];
  const files = [];
  for (const root of roots) files.push(...await collectFiles(resolve(source, root)));
  for (const path of standalone) if (await exists(resolve(source, path))) files.push(resolve(source, path));
  return Promise.all(files.filter((path) => !/^(src|export-app)\/.*\.js$/i.test(relative(source, path).replaceAll("\\", "/"))).sort((left, right) => relative(source, left).localeCompare(relative(source, right))).map(async (path) => ({
    path: relative(source, path).replaceAll("\\", "/"), sha256: hash(await readFile(path)),
  })));
};
const runtimePath = (path) => resolve(distributionRoot, "runtime", path.replace(/^\.\//, "").replace(/\*$/, ""));
const exportedTargets = (value) => {
  if (typeof value === "string") return value.startsWith("./") ? [value] : [];
  if (Array.isArray(value)) return value.flatMap(exportedTargets);
  if (value && typeof value === "object") return Object.values(value).flatMap(exportedTargets);
  return [];
};
const assertFile = async (path, label) => {
  if (!await exists(path)) throw new Error(`Missing ${label}: ${relative(distributionRoot, path).replaceAll("\\", "/")}`);
};

const manifestPath = resolve(distributionRoot, "manifest.json");
await assertFile(manifestPath, "distribution manifest");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (!Array.isArray(manifest.files) || typeof manifest.inputFingerprint !== "string") throw new Error("Distribution manifest has an invalid schema.");
const actualFiles = await Promise.all((await collectFiles(distributionRoot)).filter((path) => path !== manifestPath).map(async (path) => ({
  path: relative(distributionRoot, path).replaceAll("\\", "/"), size: (await stat(path)).size, sha256: hash(await readFile(path)),
})));
const expectedFiles = new Map(manifest.files.map((file) => [file.path, file]));
if (expectedFiles.size !== actualFiles.length) throw new Error("Distribution file inventory mismatch.");
for (const actual of actualFiles) {
  const expected = expectedFiles.get(actual.path);
  if (!expected || expected.sha256 !== actual.sha256 || expected.size !== actual.size) throw new Error(`Distribution file hash mismatch: ${actual.path}`);
}
const inputs = await sourceInputs();
if (hash(JSON.stringify(inputs)) !== manifest.inputFingerprint) throw new Error("Distribution input fingerprint mismatch.");

const packagePath = runtimePath("package.json");
await assertFile(packagePath, "runtime package manifest");
const runtimePackage = JSON.parse(await readFile(packagePath, "utf8"));
for (const target of exportedTargets(runtimePackage.exports)) {
  const path = runtimePath(target);
  if (!await exists(path)) throw new Error(`Missing runtime export target: ${target.replace(/^\.\//, "")}`);
}
for (const target of [runtimePackage.main, runtimePackage.types, ...Object.values(runtimePackage.bin ?? {})]) {
  if (typeof target === "string") await assertFile(runtimePath(target), "runtime package target");
}
if (runtimePackage.scripts) throw new Error("Runtime package must not contain scripts.");

const stylesPath = runtimePath("dist/styles.css");
if (await exists(stylesPath)) {
  const styles = await readFile(stylesPath, "utf8");
  for (const reference of styles.matchAll(/url\((?:['"])?([^'")]+)(?:['"])?\)/g)) {
    if (!reference[1].startsWith("data:") && !reference[1].startsWith("http")) await assertFile(resolve(stylesPath, "..", reference[1]), "CSS asset");
  }
}

for (const required of ["assets/fonts", "generated/csv", "generated/manifest.json", "docs/en", "LICENSE", "NOTICE", "LICENSES"]) {
  const path = runtimePath(required);
  if (!await exists(path)) throw new Error(`Missing required runtime resource: ${required}`);
  await stat(path);
}

console.log(`Verified distribution runtime at ${distributionRoot}.`);
