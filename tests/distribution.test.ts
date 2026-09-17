import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

const packageRoot = resolve(import.meta.dirname, "..");
const exec = promisify(execFile);

test("checks the complete root package without preparing it", async () => {
  const result = await exec(process.execPath, ["scripts/verify-distribution.mjs"], { cwd: packageRoot });

  assert.match(result.stdout, /verified release package/i);
});

test("exposes explicit release preparation and read-only checks", async () => {
  const packageJson = JSON.parse(await readFile(resolve(packageRoot, "package.json"), "utf8")) as { scripts: Record<string, string> };

  assert.match(packageJson.scripts["release:prepare"], /assets:prepare.*generate:data.*build:library.*generate:png.*release:check/);
  assert.equal(packageJson.scripts["release:check"], "node scripts/verify-distribution.mjs");
  assert.equal(packageJson.scripts.build, undefined);
  assert.match(packageJson.scripts.test, /tests\/distribution\.test\.ts/);
});

test("tracks root package artifacts instead of ignoring them", async () => {
  const ignore = await readFile(resolve(packageRoot, ".gitignore"), "utf8");

  for (const path of ["dist/", "assets/", "generated/"]) assert.doesNotMatch(ignore, new RegExp(`^${path.replace("/", "\\/")}$`, "m"));
});
