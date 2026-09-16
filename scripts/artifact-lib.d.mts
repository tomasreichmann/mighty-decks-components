export function sha256(path: string): Promise<string>;
export function assertSafeArchivePaths(paths: string[], root?: string): void;
export function assertRuntimeEntries(paths: string[]): void;
export function assertWithinHostLimits(
  size: { compressedBytes: number },
  limits: { maxCompressedBytes?: number },
): void;
export function assertInventoryChecksums(
  entries: Array<{ path: string; checksum: string }>,
  actualChecksums: Map<string, string>,
): void;
export function assertReleaseManifest(
  manifest: { packageVersion: string; contentVersion: string; pngs?: Array<{ path: string; [key: string]: unknown }> },
  expected: { packageVersion: string; contentVersion: string; expectedPaths: string[] },
): void;
export function pngDimensions(path: string): Promise<{ width: number; height: number }>;
