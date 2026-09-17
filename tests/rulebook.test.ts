import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const packageRoot = resolve(import.meta.dirname, "..");

test("the English rulebook teaches Asset and Actor card composition", async () => {
  const rulebook = await readFile(
    resolve(packageRoot, "docs/en/mighty-decks-rulebook.md"),
    "utf8",
  );

  for (const heading of [
    "### Building an Asset card",
    "### Reading a combined Asset card",
    "### Building an Actor card",
    "### Reading Actor attacks and specials",
  ]) {
    assert.match(rulebook, new RegExp(`^${heading}$`, "m"));
  }

  assert.match(rulebook, /Tools \+ Empowered = Empowered Tools/);
  assert.match(rulebook, /Civilian \+ Minion \+ Fast/);
});

test("the fast-session prompt directs the storyteller to the composition rules", async () => {
  const prompt = await readFile(
    resolve(packageRoot, "docs/en/mighty-decks-fast-session-storyteller-system-prompt.md"),
    "utf8",
  );

  assert.match(prompt, /^# Actor cards$/m);
  assert.match(prompt, /English Mighty Decks rulebook's card-composition sections/);
});
