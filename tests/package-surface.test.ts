import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const packageRoot = resolve(import.meta.dirname, "..");

test("publishes the complete installed resource contract", async () => {
  const packageJson = JSON.parse(
    await readFile(resolve(packageRoot, "package.json"), "utf8"),
  ) as {
    files: string[];
    exports: Record<string, unknown>;
    scripts: Record<string, string>;
  };

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
  assert.equal(packageJson.exports["./package.json"], "./package.json");
  assert.equal(packageJson.exports["./assets/*"], "./assets/*");
  assert.equal(packageJson.exports["./generated/*"], "./generated/*");
  assert.equal(packageJson.exports["./docs/*"], "./docs/*");
  assert.equal(packageJson.exports["./NOTICE"], "./NOTICE");
  assert.equal(packageJson.exports["./LICENSE"], "./LICENSE");
  assert.equal(packageJson.exports["./LICENSES/*"], "./LICENSES/*");
  assert.match(packageJson.scripts["generate:runtime"], /assets:prepare/);
  assert.match(packageJson.scripts["generate:png"], /scripts\/export\.ts/);
  for (const lifecycle of ["prepare", "prepack", "preinstall", "install", "postinstall"]) {
    assert.equal(packageJson.scripts[lifecycle], undefined);
  }
});
