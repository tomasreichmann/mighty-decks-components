import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cp, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const packageRoot = resolve(import.meta.dirname, "..");
const tsx = resolve(packageRoot, "node_modules/tsx/dist/cli.mjs");

const run = (cwd: string, command: string, argumentsList: string[]): Promise<number> => new Promise((resolveRun, reject) => {
  const child = spawn(command, argumentsList, {
    cwd,
    stdio: "ignore",
    shell: process.platform === "win32" && command === pnpm,
  });
  child.once("error", reject);
  child.once("close", (code) => resolveRun(code ?? 1));
});

const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

test("generates CSV and manifest from a standalone project fixture", async () => {
  const fixture = await mkdtemp(join(tmpdir(), "mighty-decks-generation-"));
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
    const catalog = JSON.parse(await readFile(catalogPath, "utf8")) as {
      cards: Array<{ title: string }>;
    };
    catalog.cards[0].title = 'A "quoted" card';
    await writeFile(catalogPath, `${JSON.stringify(catalog)}\n`);
    assert.equal(await run(fixture, process.execPath, [tsx, "scripts/prepare-assets.ts"]), 0);
    assert.equal(await run(fixture, process.execPath, [tsx, "scripts/generate.ts"]), 0);
    assert.equal(await run(fixture, pnpm, ["build:library"]), 0);

    const manifest = JSON.parse(await readFile(join(fixture, "generated", "manifest.json"), "utf8")) as {
      cards: Array<{ id: string }>;
      presets: Record<string, Array<{ width: number; height: number }>>;
    };
    const csv = await readFile(join(fixture, "generated", "csv", "outcome.csv"), "utf8");

    assert.ok(manifest.cards.some((card) => card.id === "outcome:success"));
    assert.deepEqual(manifest.presets, {
      full: [{ width: 629, height: 1024 }, { width: 315, height: 512 }],
      compact: [{ width: 157, height: 256 }],
    });
    assert.match(csv, /"A ""quoted"" card"/);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
