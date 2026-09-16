import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { t } from "tar";

import {
  assertReleaseManifest,
  assertRuntimeAssetEntries,
  assertRuntimeEntries,
  assertSafeArchivePaths,
  sha256,
} from "./artifact-lib.mjs";

const packageRoot = resolve(import.meta.dirname, "..");
const output = resolve(packageRoot, "output");
const packageJson = JSON.parse(await readFile(resolve(packageRoot, "package.json"), "utf8"));
const runtime = JSON.parse(await readFile(resolve(output, "runtime-pack.json"), "utf8"));
const runtimeAssets = JSON.parse(await readFile(resolve(output, "runtime-assets-pack.json"), "utf8"));
const manifest = JSON.parse(await readFile(resolve(output, "release-manifest.json"), "utf8"));
const runtimeTarball = resolve(output, runtime.runtimeTarball);
const runtimeAssetsArchive = resolve(output, runtimeAssets.filename);

if (await sha256(runtimeTarball) !== runtime.sha256) {
  throw new Error("Runtime tarball checksum mismatch.");
}
const runtimeEntries = [];
await t({ file: runtimeTarball, onentry: (entry) => runtimeEntries.push(entry.path) });
assertRuntimeEntries(runtimeEntries);

if (await sha256(runtimeAssetsArchive) !== runtimeAssets.sha256) {
  throw new Error("Runtime-assets archive checksum mismatch.");
}
const runtimeAssetEntries = [];
await t({ file: runtimeAssetsArchive, onentry: (entry) => runtimeAssetEntries.push(entry.path) });
const inventory = JSON.parse(await readFile(resolve(packageRoot, "assets", "inventory.json"), "utf8"));
assertRuntimeAssetEntries(runtimeAssetEntries, [
  "mighty-decks/assets/inventory.json",
  ...inventory.files.map((entry) => `mighty-decks/assets${entry.path}`),
]);

const expectedPaths = manifest.pngs.map((entry) => entry.path);
assertReleaseManifest(manifest, {
  packageVersion: packageJson.version,
  contentVersion: manifest.contentVersion,
  expectedPaths,
  runtimeAssetsFilename: runtimeAssets.filename,
});
for (const archive of manifest.archives) {
  const archivePath = resolve(output, archive.filename);
  if (await sha256(archivePath) !== archive.sha256) {
    throw new Error(`Archive checksum mismatch: ${archive.filename}`);
  }
  const paths = [];
  await t({ file: archivePath, onentry: (entry) => paths.push(entry.path) });
  assertSafeArchivePaths(paths);
  if ((await stat(archivePath)).size !== archive.compressedBytes) {
    throw new Error(`Archive byte count mismatch: ${archive.filename}`);
  }
}
console.log(JSON.stringify({ runtime: manifest.runtime, archives: manifest.archives, pngCount: manifest.pngs.length }, null, 2));
