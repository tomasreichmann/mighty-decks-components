import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import test from "node:test";

import {
  cardCatalog,
  contentVersion,
  enumerateStaticCards,
} from "../src/catalog";

const packageRoot = resolve(import.meta.dirname, "..");
const baselinePath = resolve(import.meta.dirname, "fixtures/catalog-baseline.json");

const sourceFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? sourceFiles(path) : [path];
    }),
  );
  return nested.flat();
};

test("preserves the normalized presentation catalogue baseline", async () => {
  const baseline = JSON.parse(await readFile(baselinePath, "utf8")) as {
    contentVersion: string;
    cards: unknown[];
    staticEntryIds: string[];
  };

  assert.equal(contentVersion, baseline.contentVersion);
  assert.deepEqual(cardCatalog, baseline.cards);
  assert.deepEqual(
    enumerateStaticCards().map((entry) => entry.id),
    baseline.staticEntryIds,
  );
});

test("does not reference Storyteller-private source or compiler aliases", async () => {
  const files = [
    ...(await sourceFiles(resolve(packageRoot, "src"))),
    resolve(packageRoot, "vite.config.ts"),
    resolve(packageRoot, "tsconfig.json"),
  ];
  const violations: string[] = [];

  for (const file of files) {
    const contents = await readFile(file, "utf8");
    if (
      contents.includes("@mighty-decks/spec") ||
      /(?:\.\.\/){2,}spec(?:[/'"]|$)/.test(contents)
    ) {
      violations.push(file.slice(dirname(packageRoot).length + 1));
    }
  }

  assert.deepEqual(violations, []);
});
