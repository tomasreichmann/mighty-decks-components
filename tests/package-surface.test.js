import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
const packageRoot = resolve(import.meta.dirname, "..");
test("publishes only runtime resources and no PNG export contract", async () => {
    const packageJson = JSON.parse(await readFile(resolve(packageRoot, "package.json"), "utf8"));
    assert.deepEqual(packageJson.files, [
        "dist",
        "assets/fonts",
        "generated/csv",
        "generated/manifest.json",
        "docs/en",
        "skills/mighty-decks-components",
        "NOTICE",
        "LICENSE",
        "LICENSES",
    ]);
    assert.equal(packageJson.exports["./png/*"], undefined);
    assert.match(packageJson.scripts["generate:runtime"], /assets:prepare/);
    assert.match(packageJson.scripts["generate:png"], /scripts\/export\.ts/);
    for (const lifecycle of ["prepare", "postinstall", "preinstall"]) {
        assert.equal(packageJson.scripts[lifecycle], undefined);
    }
});
