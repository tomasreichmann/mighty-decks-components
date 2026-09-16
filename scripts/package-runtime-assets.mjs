import { cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { c } from "tar";

import { assertSafeArchivePaths, assertWithinHostLimits, sha256 } from "./artifact-lib.mjs";

const packageRoot = resolve(import.meta.dirname, "..");
const assetsRoot = resolve(packageRoot, "assets");
const output = resolve(packageRoot, "output");
const packageJson = JSON.parse(await readFile(resolve(packageRoot, "package.json"), "utf8"));
const inventory = JSON.parse(await readFile(resolve(assetsRoot, "inventory.json"), "utf8"));
const policy = JSON.parse(await readFile(resolve(packageRoot, "release-policy.json"), "utf8"));
const filename = `mighty-decks-components-${packageJson.version}-runtime-assets.tar.gz`;
const archive = resolve(output, filename);
const archivePaths = [
  "mighty-decks/assets/inventory.json",
  ...inventory.files.map((entry) => `mighty-decks/assets${entry.path}`),
].sort();

assertSafeArchivePaths(archivePaths, "mighty-decks/assets/");
await mkdir(output, { recursive: true });
const stage = await mkdtemp(join(tmpdir(), "mighty-decks-runtime-assets-"));
try {
  await cp(assetsRoot, resolve(stage, "mighty-decks", "assets"), { recursive: true });
  await c({ cwd: stage, file: archive, gzip: true, portable: true, noMtime: true }, archivePaths);
} finally {
  await rm(stage, { recursive: true, force: true });
}

const archiveStat = await stat(archive);
for (const limit of policy.hostLimits ?? []) {
  assertWithinHostLimits({ compressedBytes: archiveStat.size }, { maxCompressedBytes: limit.maximumFileBytes });
}
const metadata = {
  filename,
  compressedBytes: archiveStat.size,
  sha256: await sha256(archive),
  entries: archivePaths.length,
};
await writeFile(resolve(output, "runtime-assets-pack.json"), `${JSON.stringify(metadata, null, 2)}\n`);
console.log(`Archived ${metadata.entries} runtime assets to output/${filename}.`);
