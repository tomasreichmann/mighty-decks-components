import assert from "node:assert/strict";
import test from "node:test";
const artifacts = await import("../scripts/artifact-lib.mjs");
test("reports configured archive-host limit violations", () => {
    assert.throws(() => artifacts.assertWithinHostLimits({ compressedBytes: 11 }, { maxCompressedBytes: 10 }), /host limit/i);
});
test("rejects PNG entries from the runtime package", () => {
    assert.throws(() => artifacts.assertRuntimeEntries(["package/generated/png/en/outcome/success/full/1024.png"]), /PNG/i);
});
test("rejects a release manifest with mismatched versions or missing inventory", () => {
    assert.throws(() => artifacts.assertReleaseManifest({ packageVersion: "0.1.0", contentVersion: "one", pngs: [] }, { packageVersion: "0.1.1", contentVersion: "one", expectedPaths: [] }), /version/i);
    assert.throws(() => artifacts.assertReleaseManifest({ packageVersion: "0.1.0", contentVersion: "one", pngs: [{ path: "mighty-decks/generated/png/en/a.png", checksum: "a" }] }, { packageVersion: "0.1.0", contentVersion: "one", expectedPaths: ["mighty-decks/generated/png/en/a.png", "mighty-decks/generated/png/en/b.png"] }), /missing/i);
});
test("rejects checksum mismatches and archive paths outside the documented root", () => {
    assert.throws(() => artifacts.assertInventoryChecksums([{ path: "mighty-decks/generated/png/en/a.png", checksum: "wanted" }], new Map([["mighty-decks/generated/png/en/a.png", "actual"]])), /checksum/i);
    assert.throws(() => artifacts.assertSafeArchivePaths(["../outside.png"]), /unsafe/i);
});
test("requires a complete runtime-assets archive beneath its extraction root", () => {
    assert.throws(() => artifacts.assertRuntimeAssetEntries(["mighty-decks/assets/actors/guide.png"], ["mighty-decks/assets/actors/guide.png", "mighty-decks/assets/stunts/charge.png"]), /missing/i);
    assert.throws(() => artifacts.assertRuntimeAssetEntries(["outside.png"], []), /unsafe/i);
});
test("requires a runtime-assets attachment in the release manifest", () => {
    assert.throws(() => artifacts.assertReleaseManifest({ packageVersion: "0.1.0", contentVersion: "one", pngs: [] }, {
        packageVersion: "0.1.0",
        contentVersion: "one",
        expectedPaths: [],
        runtimeAssetsFilename: "mighty-decks-components-0.1.0-runtime-assets.tar.gz",
    }), /runtime-assets/i);
});
test("requires Git distribution provenance with immutable version tag", () => {
    assert.throws(() => artifacts.assertGitDistribution({ repository: "https://github.com/example/repo.git", commit: "short", tag: "dist-v0.1.0" }, "0.1.0"), /commit/i);
    assert.throws(() => artifacts.assertGitDistribution({ repository: "https://github.com/example/repo.git", commit: "a".repeat(40), tag: "v0.1.0" }, "0.1.0"), /tag/i);
});
