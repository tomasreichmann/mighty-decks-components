import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

export const sha256 = async (path) =>
  createHash("sha256").update(await readFile(path)).digest("hex");

export const assertSafeArchivePaths = (paths, root = "mighty-decks/") => {
  for (const path of paths) {
    if (
      typeof path !== "string" ||
      !path.startsWith(root) ||
      path.includes("\\") ||
      path.includes("\0") ||
      path.split("/").some((segment) => segment === "" || segment === "." || segment === "..")
    ) {
      throw new Error(`Unsafe archive path: ${String(path)}`);
    }
  }
};

export const assertRuntimeEntries = (paths) => {
  for (const path of paths) {
    if (/(^|\/)generated\/png(\/|$)/.test(path)) {
      throw new Error(`Runtime archive contains forbidden PNG entry: ${path}`);
    }
  }
};

export const assertRuntimeAssetEntries = (paths, expectedPaths) => {
  assertSafeArchivePaths(paths, "mighty-decks/assets/");
  const found = new Set(paths);
  const missing = expectedPaths.filter((path) => !found.has(path));
  if (missing.length > 0) {
    throw new Error(`Runtime-assets archive is missing entries: ${missing.join(", ")}`);
  }
};

export const assertWithinHostLimits = ({ compressedBytes }, { maxCompressedBytes }) => {
  if (maxCompressedBytes !== undefined && compressedBytes >= maxCompressedBytes) {
    throw new Error(`Archive exceeds configured host limit (${compressedBytes} bytes).`);
  }
};

export const assertInventoryChecksums = (entries, actualChecksums) => {
  for (const entry of entries) {
    if (actualChecksums.get(entry.path) !== entry.checksum) {
      throw new Error(`Checksum mismatch for ${entry.path}.`);
    }
  }
};

export const assertReleaseManifest = (manifest, {
  packageVersion,
  contentVersion,
  expectedPaths,
  runtimeAssetsFilename,
}) => {
  if (manifest.packageVersion !== packageVersion || manifest.contentVersion !== contentVersion) {
    throw new Error("Release manifest version mismatch.");
  }
  const found = new Set((manifest.pngs ?? []).map((entry) => entry.path));
  const missing = expectedPaths.filter((path) => !found.has(path));
  if (missing.length > 0) {
    throw new Error(`Release manifest is missing PNG entries: ${missing.join(", ")}`);
  }
  if (runtimeAssetsFilename && manifest.runtimeAssets?.filename !== runtimeAssetsFilename) {
    throw new Error("Release manifest is missing the matching runtime-assets attachment.");
  }
};

export const pngDimensions = async (path) => {
  const bytes = await readFile(path);
  if (bytes.length < 24 || bytes.toString("ascii", 1, 4) !== "PNG") {
    throw new Error(`Invalid PNG file: ${path}`);
  }
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
};
