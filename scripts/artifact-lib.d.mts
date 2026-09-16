export const sha256: (path: string) => Promise<string>;
export const assertSafeArchivePaths: (paths: string[], root?: string) => void;
export const assertRuntimeEntries: (paths: string[]) => void;
export const assertRuntimeAssetEntries: (paths: string[], expectedPaths: string[]) => void;
export const assertWithinHostLimits: (
  archive: { compressedBytes: number },
  limit: { maxCompressedBytes?: number },
) => void;
export const assertInventoryChecksums: (
  entries: Array<{ path: string; checksum: string }>,
  actualChecksums: Map<string, string>,
) => void;
export const assertReleaseManifest: (
  manifest: { packageVersion: string; contentVersion: string; pngs?: Array<{ path: string; checksum?: string }>; runtimeAssets?: { filename?: string } },
  expected: { packageVersion: string; contentVersion: string; expectedPaths: string[]; runtimeAssetsFilename?: string },
) => void;
export const pngDimensions: (path: string) => Promise<{ width: number; height: number }>;
