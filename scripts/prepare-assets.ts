import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

type ArtworkManifest = {
  paths: string[];
  sources: Record<string, string>;
};

const packageRoot = resolve(import.meta.dirname, "..");
const originalsRoot = resolve(packageRoot, "resources", "originals");
const assetsRoot = resolve(packageRoot, "assets");

const outputPath = (path: string): string => {
  if (!path.startsWith("/") || path.includes("..") || path.includes("\\")) {
    throw new Error(`Unsafe artwork path: ${path}`);
  }
  const destination = resolve(assetsRoot, `.${path}`);
  if (!destination.startsWith(`${assetsRoot}${sep}`)) {
    throw new Error(`Artwork path escapes assets: ${path}`);
  }
  return destination;
};

const checksum = async (path: string): Promise<string> =>
  createHash("sha256").update(await readFile(path)).digest("hex");

const manifest = JSON.parse(
  await readFile(resolve(packageRoot, "resources", "artwork-manifest.json"), "utf8"),
) as ArtworkManifest;

if (resolve(assetsRoot) !== resolve(packageRoot, "assets")) {
  throw new Error("Refusing to clean an unexpected asset output directory.");
}

await rm(assetsRoot, { recursive: true, force: true });
await mkdir(assetsRoot, { recursive: true });

const inventory = [];
for (const path of [...manifest.paths].sort()) {
  const source = resolve(originalsRoot, `.${path}`);
  const destination = outputPath(path);
  await mkdir(resolve(destination, ".."), { recursive: true });
  await cp(source, destination, { force: true });
  inventory.push({
    path,
    sourcePath: manifest.sources[path] ?? path,
    sourceChecksum: await checksum(source),
    outputChecksum: await checksum(destination),
  });
}

await writeFile(
  resolve(assetsRoot, "inventory.json"),
  `${JSON.stringify({ files: inventory }, null, 2)}\n`,
);
console.log(`Prepared ${inventory.length} runtime assets in ${relative(packageRoot, assetsRoot)}.`);
