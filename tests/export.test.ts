import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cp, mkdtemp, readFile, realpath, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const packageRoot = resolve(import.meta.dirname, "..");
const tsx = resolve(packageRoot, "node_modules/tsx/dist/cli.mjs");

const runExport = (cwd: string, args: string[]): Promise<{ code: number; output: string }> => new Promise((resolveRun, reject) => {
  const child = spawn(process.execPath, [tsx, "scripts/export.ts", ...args], { cwd });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk; });
  child.stderr.on("data", (chunk) => { output += chunk; });
  child.once("error", reject);
  child.once("close", (code) => resolveRun({ code: code ?? 1, output }));
});

const withExportFixture = async (mutate: (catalog: { cards: Array<{ family: string; slug: string; description?: string }> }) => void, run: (fixture: string) => Promise<void>): Promise<void> => {
  const fixture = await mkdtemp(join(await realpath(tmpdir()), "mighty-decks-export-"));
  try {
    await Promise.all([
      cp(resolve(packageRoot, "scripts"), join(fixture, "scripts"), { recursive: true }),
      cp(resolve(packageRoot, "src"), join(fixture, "src"), { recursive: true }),
      cp(resolve(packageRoot, "resources"), join(fixture, "resources"), { recursive: true }),
      cp(resolve(packageRoot, "export-app"), join(fixture, "export-app"), { recursive: true }),
      cp(resolve(packageRoot, "package.json"), join(fixture, "package.json")),
      cp(resolve(packageRoot, "index.html"), join(fixture, "index.html")),
      cp(resolve(packageRoot, "tsconfig.json"), join(fixture, "tsconfig.json")),
      cp(resolve(packageRoot, "tsconfig.build.json"), join(fixture, "tsconfig.build.json")),
      cp(resolve(packageRoot, "vite.config.ts"), join(fixture, "vite.config.ts")),
      symlink(resolve(packageRoot, "node_modules"), join(fixture, "node_modules"), "junction"),
    ]);
    const catalogPath = join(fixture, "src", "data", "catalog.en.json");
    const catalog = JSON.parse(await readFile(catalogPath, "utf8")) as { cards: Array<{ family: string; slug: string; description?: string }> };
    mutate(catalog);
    await writeFile(catalogPath, `${JSON.stringify(catalog)}\n`);
    await run(fixture);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
};

test("export rejects a full Actor overlay with a missing description", async () => {
  await withExportFixture((catalog) => {
    const armoured = catalog.cards.find((card) => card.family === "actor-special" && card.slug === "armoured");
    if (!armoured) throw new Error("Missing Armoured fixture card.");
    armoured.description = "";
  }, async (fixture) => {
    const result = await runExport(fixture, ["--type", "actor-special", "--id", "armoured", "--layout", "full", "--height", "1024"]);
    assert.notEqual(result.code, 0);
    assert.match(result.output, /actor-special:armoured/i);
  });
});

test("export rejects Actor overlay descriptions that do not fit", async () => {
  await withExportFixture((catalog) => {
    const artillery = catalog.cards.find((card) => card.family === "actor-role" && card.slug === "artillery");
    if (!artillery) throw new Error("Missing Artillery fixture card.");
    artillery.description = "This deliberately overlong Actor description must not be reduced until it becomes unreadable. ".repeat(30);
  }, async (fixture) => {
    const result = await runExport(fixture, ["--type", "actor-role", "--id", "artillery", "--layout", "full", "--height", "1024"]);
    assert.notEqual(result.code, 0);
    assert.match(result.output, /does not fit|Missing rendered description/i);
  });
});

test("export accepts a normal full Actor overlay", async () => {
  await withExportFixture(() => {}, async (fixture) => {
    const result = await runExport(fixture, ["--type", "actor-special", "--id", "armoured", "--layout", "full", "--height", "512"]);
    assert.equal(result.code, 0, result.output);
  });
});
