import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
const packageRoot = resolve(import.meta.dirname, "..");
test("publishes the complete prebuilt package surface", async () => {
    const packageJson = JSON.parse(await readFile(resolve(packageRoot, "package.json"), "utf8"));
    assert.deepEqual(packageJson.files, [
        "dist",
        "assets",
        "generated",
        "docs/en",
        "skills/mighty-decks-components",
        "NOTICE",
        "LICENSE",
        "LICENSES",
    ]);
    assert.equal(packageJson.private, undefined);
    assert.equal(packageJson.exports["./package.json"], "./package.json");
    assert.equal(packageJson.exports["./assets/*"], "./assets/*");
    assert.equal(packageJson.exports["./generated/*"], "./generated/*");
    assert.equal(packageJson.exports["./docs/*"], "./docs/*");
    assert.equal(packageJson.exports["./NOTICE"], "./NOTICE");
    assert.equal(packageJson.exports["./LICENSE"], "./LICENSE");
    assert.equal(packageJson.exports["./LICENSES/*"], "./LICENSES/*");
    assert.equal(packageJson.scripts.build, undefined);
    assert.match(packageJson.scripts["build:library"], /vite build/);
    assert.equal(packageJson.scripts["release:check"], "node scripts/verify-release.mjs");
    for (const lifecycle of ["prepare", "prepack", "preinstall", "install", "postinstall"]) {
        assert.equal(packageJson.scripts[lifecycle], undefined);
    }
});
