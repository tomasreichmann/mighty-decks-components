import { createHash } from "node:crypto";
import { access, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const rootIndex = process.argv.indexOf("--root");
const packageRoot = resolve(rootIndex < 0 ? resolve(import.meta.dirname, "..") : process.argv[rootIndex + 1] ?? "");
const exists = async (path) => access(path).then(() => true).catch(() => false);
const required = async (path, label) => {
  if (!await exists(path)) throw new Error(`Missing required ${label}: ${path}`);
  return path;
};
const sha256 = (contents) => createHash("sha256").update(contents).digest("hex");

const packageJson = JSON.parse(await readFile(await required(resolve(packageRoot, "package.json"), "package manifest"), "utf8"));
for (const lifecycle of ["prepare", "prepack", "preinstall", "install", "postinstall"]) {
  if (packageJson.scripts?.[lifecycle]) throw new Error(`Automatic package lifecycle script is forbidden: ${lifecycle}`);
}
for (const entry of ["dist", "assets", "generated", "docs/en", "skills/mighty-decks-components", "NOTICE", "LICENSE", "LICENSES"]) {
  if (!packageJson.files?.includes(entry)) throw new Error(`Package files allowlist is missing ${entry}.`);
}
for (const [key, target] of Object.entries({
  "./package.json": "./package.json",
  "./assets/*": "./assets/*",
  "./generated/*": "./generated/*",
  "./docs/*": "./docs/*",
  "./NOTICE": "./NOTICE",
  "./LICENSE": "./LICENSE",
  "./LICENSES/*": "./LICENSES/*",
})) {
  if (packageJson.exports?.[key] !== target) throw new Error(`Missing package export: ${key}`);
}
for (const path of ["dist/index.js", "dist/react/index.js", "dist/styles.css", "dist/cli.js", "assets/inventory.json", "generated/manifest.json", "generated/png-manifest.json", "generated/csv/outcome.csv", "docs/en/mighty-decks-rulebook.md", "NOTICE", "LICENSE"]) {
  await required(resolve(packageRoot, path), path);
}

const inventory = JSON.parse(await readFile(resolve(packageRoot, "assets/inventory.json"), "utf8"));
for (const file of inventory.files ?? []) {
  const output = await required(resolve(packageRoot, "assets", `.${file.path}`), `prepared asset ${file.path}`);
  if (file.outputChecksum !== sha256(await readFile(output))) throw new Error(`Stale prepared asset: ${file.path}; run pnpm release:prepare.`);
  const source = resolve(packageRoot, "resources/originals", `.${file.path}`);
  if (await exists(source) && file.sourceChecksum !== sha256(await readFile(source))) throw new Error(`Stale source asset: ${file.path}; run pnpm release:prepare.`);
}

const pngManifest = JSON.parse(await readFile(resolve(packageRoot, "generated/png-manifest.json"), "utf8"));
for (const entry of pngManifest.entries ?? []) {
  const png = await required(resolve(packageRoot, "generated", entry.path), `PNG ${entry.path}`);
  const bytes = await readFile(png);
  if (!bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) throw new Error(`Invalid PNG: ${entry.path}`);
  if (entry.checksum !== sha256(bytes)) throw new Error(`Stale PNG: ${entry.path}; run pnpm release:prepare.`);
  if ((await stat(png)).size === 0) throw new Error(`Empty PNG: ${entry.path}`);
}

console.log(`Verified release package at ${packageRoot}.`);
