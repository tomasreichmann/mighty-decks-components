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
const medievalInventoryPath = resolve(import.meta.dirname, "fixtures/medieval-card-inventory.json");

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
  const medievalInventory = JSON.parse(await readFile(medievalInventoryPath, "utf8")) as { actors: Array<{ id: string }>; locations: Array<{ id: string }> };
  const additions = [...medievalInventory.actors, ...medievalInventory.locations];

  assert.equal(contentVersion, baseline.contentVersion);
  assert.deepEqual(cardCatalog, [...baseline.cards, ...additions]);
  assert.deepEqual(
    enumerateStaticCards().map((entry) => entry.id),
    [...baseline.staticEntryIds, ...additions.flatMap((card: { id: string }) => [card.id, card.id, card.id])],
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

test("keeps Actor presentations isolated from Stunt and Effect cards with matching slugs", async () => {
  const { createServer } = await import("vite");
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const server = await createServer({ root: packageRoot, server: { middlewareMode: true, hmr: false }, optimizeDeps: { noDiscovery: true, include: [] } });
  try {
    const { GameCard } = await server.ssrLoadModule("/src/react/index.tsx");
    for (const [family, slug] of [["stunt", "marksman"], ["effect", "burning"], ["effect", "freezing"]] as const) {
      const markup = renderToStaticMarkup(createElement(GameCard, { type: family, slug }));
      const card = cardCatalog.find((entry) => entry.family === family && entry.slug === slug)!;
      const rules = card.body ?? card.description;
      assert.ok(rules);
      assert.ok(markup.includes(rules), `${family}:${slug} keeps its catalog rules`);
      assert.equal(markup.includes("/textIcons/"), false, `${family}:${slug} must not borrow Actor stats`);
    }
    const actor = renderToStaticMarkup(createElement(GameCard, { type: "actor-role", slug: "marksman" }));
    assert.ok(actor.includes("/textIcons/toughness.png"));
    assert.ok(actor.includes("/textIcons/range.png"));
  } finally {
    await server.close();
  }
});
