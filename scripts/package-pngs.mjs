import { cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { c } from "tar";

import {
  assertSafeArchivePaths,
  assertWithinHostLimits,
  pngDimensions,
  sha256,
} from "./artifact-lib.mjs";

const packageRoot = resolve(import.meta.dirname, "..");
const output = resolve(packageRoot, "output");
const generated = resolve(packageRoot, "generated");
const packageJson = JSON.parse(await readFile(resolve(packageRoot, "package.json"), "utf8"));
const pngManifest = JSON.parse(await readFile(resolve(generated, "png-manifest.json"), "utf8"));
const groups = JSON.parse(await readFile(resolve(packageRoot, "resources", "png-groups.json"), "utf8"));
const policy = JSON.parse(await readFile(resolve(packageRoot, "release-policy.json"), "utf8"));
const runtime = JSON.parse(await readFile(resolve(output, "runtime-pack.json"), "utf8"));
const runtimeAssets = JSON.parse(await readFile(resolve(output, "runtime-assets-pack.json"), "utf8"));

const groupById = new Map();
for (const group of ["core", "medieval"]) {
  for (const id of groups[group] ?? []) {
    if (groupById.has(id)) throw new Error(`PNG group overlap for ${id}.`);
    groupById.set(id, group);
  }
}

const allEntries = pngManifest.entries;
if (new Set(allEntries.map((entry) => entry.id)).size !== groupById.size) {
  throw new Error("PNG group inventory does not match the rendered catalogue.");
}
const grouped = Object.fromEntries(["core", "medieval"].map((group) => [
  group,
  allEntries.filter((entry) => groupById.get(entry.id) === group),
]));

await mkdir(output, { recursive: true });
const pngs = [];
const archives = [];
for (const group of ["core", "medieval"]) {
  const stage = await mkdtemp(join(tmpdir(), `mighty-decks-${group}-`));
  try {
    const groupEntries = [];
    for (const entry of grouped[group]) {
      const archivePath = `mighty-decks/generated/${entry.path}`;
      assertSafeArchivePaths([archivePath]);
      const source = resolve(generated, entry.path);
      const destination = resolve(stage, archivePath);
      await mkdir(resolve(destination, ".."), { recursive: true });
      await cp(source, destination, { force: true });
      const dimensions = await pngDimensions(source);
      const metadata = { ...entry, path: archivePath, dimensions, group };
      groupEntries.push(metadata);
      pngs.push(metadata);
    }
    const groupManifestPath = `mighty-decks/generated/png-manifest-${group}.json`;
    const groupManifest = {
      packageVersion: packageJson.version,
      contentVersion: pngManifest.contentVersion,
      locale: "en",
      group,
      entries: groupEntries,
    };
    const groupManifestDestination = resolve(stage, groupManifestPath);
    await mkdir(resolve(groupManifestDestination, ".."), { recursive: true });
    await writeFile(groupManifestDestination, `${JSON.stringify(groupManifest, null, 2)}\n`);
    const files = [
      ...groupEntries.map((entry) => entry.path),
      groupManifestPath,
    ].sort();
    const archiveName = `mighty-decks-components-${packageJson.version}-png-en-${group}.tar.gz`;
    const archive = resolve(output, archiveName);
    await c({ cwd: stage, file: archive, gzip: true, portable: true, noMtime: true }, files);
    const archiveStat = await stat(archive);
    for (const limit of policy.hostLimits ?? []) {
      assertWithinHostLimits({ compressedBytes: archiveStat.size }, { maxCompressedBytes: limit.maximumFileBytes });
    }
    archives.push({
      group,
      filename: archiveName,
      compressedBytes: archiveStat.size,
      sha256: await sha256(archive),
      entries: groupEntries.length,
      manifest: groupManifestPath,
    });
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

if (pngs.length !== allEntries.length || new Set(pngs.map((entry) => entry.path)).size !== allEntries.length) {
  throw new Error("PNG archive union is incomplete or has conflicting paths.");
}
const releaseManifest = {
  packageName: packageJson.name,
  packageVersion: packageJson.version,
  contentVersion: pngManifest.contentVersion,
  sourceCommit: process.env.GITHUB_SHA ?? "uncommitted-local",
  toolchain: pngManifest.toolchain,
  runtime: {
    filename: runtime.runtimeTarball,
    compressedBytes: runtime.size,
    unpackedBytes: runtime.unpackedSize,
    sha256: runtime.sha256,
    integrity: runtime.integrity,
  },
  runtimeAssets,
  archives,
  pngs,
};
await writeFile(resolve(output, "release-manifest.json"), `${JSON.stringify(releaseManifest, null, 2)}\n`);
console.log(`Archived ${pngs.length} PNGs into ${archives.length} release archives.`);
