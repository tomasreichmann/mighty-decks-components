import { createHash } from "node:crypto";
import { access, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const exists = (path) => access(path).then(() => true).catch(() => false);
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const packageJson = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const targets = (value) => typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(targets) : [];

for (const hook of ["prepare", "prepack", "preinstall", "install", "postinstall"]) {
  if (packageJson.scripts?.[hook]) throw new Error(`Automatic install hook is forbidden: ${hook}`);
}
for (const required of ["dist", "assets", "generated", "docs/en", "skills/mighty-decks-components", "LICENSE", "NOTICE", "LICENSES"]) {
  if (!await exists(resolve(root, required))) throw new Error(`Missing required release resource: ${required}`);
}
for (const target of [...targets(packageJson.exports), packageJson.main, packageJson.types, ...Object.values(packageJson.bin ?? {})]) {
  const path = target.replace(/\*$/, "");
  if (!await exists(resolve(root, path))) throw new Error(`Missing package export target: ${target}`);
}

const catalog = JSON.parse(await readFile(resolve(root, "generated/manifest.json"), "utf8"));
const pngManifest = JSON.parse(await readFile(resolve(root, "generated/png-manifest.json"), "utf8"));
if (catalog.contentVersion !== pngManifest.contentVersion) throw new Error("Catalog and PNG content versions differ.");
for (const entry of pngManifest.entries) {
  const path = resolve(root, "generated", entry.path);
  const bytes = await readFile(path).catch(() => undefined);
  if (!bytes) throw new Error(`Missing PNG: ${entry.path}`);
  if (!bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) throw new Error(`Invalid PNG: ${entry.path}`);
  if (hash(bytes) !== entry.checksum) throw new Error(`Stale PNG: ${entry.path}; run pnpm release:prepare`);
  await stat(path);
}
console.log(`Verified ${pngManifest.entries.length} PNGs and the prebuilt package surface.`);
