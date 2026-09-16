import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import { cardCatalog } from "../src/catalog";

const packageRoot = resolve(import.meta.dirname, "..");
const rendererPaths = [
  "/backgrounds/paper-with-image-shadow.png",
  "/types/outcome.png",
  "/types/effect.png",
  "/types/stunt.png",
  "/types/actor.png",
  "/types/asset.png",
  "/types/counter.png",
  "/fonts/mighty-decks-kalam-400.ttf",
  "/fonts/mighty-decks-kalam-700.ttf",
  "/fonts/mighty-decks-shantell-400.ttf",
  "/fonts/mighty-decks-shantell-700.ttf",
  "/fonts/OFL-Kalam.txt",
  "/fonts/OFL-ShantellSans.txt",
  "/THIRD-PARTY-NOTICES.md",
];

test("prepares every catalogue and renderer runtime resource", async () => {
  const manifest = JSON.parse(
    await readFile(resolve(packageRoot, "resources/artwork-manifest.json"), "utf8"),
  ) as { paths: string[] };
  const requiredPaths = new Set([
    ...cardCatalog.flatMap((card) => (card.artworkPath ? [card.artworkPath] : [])),
    ...rendererPaths,
  ]);

  assert.deepEqual(new Set(manifest.paths), requiredPaths);
  await Promise.all(
    manifest.paths.map((path) => access(resolve(packageRoot, "assets", `.${path}`))),
  );
});

test("excludes application-only artwork from the prepared runtime assets", async () => {
  const assetRoot = resolve(packageRoot, "assets");
  const topLevel = await readdir(assetRoot);

  for (const directory of ["maps", "profiles", "rules", "scenes"]) {
    assert.equal(topLevel.includes(directory), false, `${directory} is not runtime artwork`);
  }
});
