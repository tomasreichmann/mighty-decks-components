import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const packageRoot = resolve(import.meta.dirname, "..");

test("publishes the downloaded runtime tarball as an explicit local file", async () => {
  const workflow = await readFile(resolve(packageRoot, ".github", "workflows", "release.yml"), "utf8");
  assert.match(workflow, /npm publish \.\/output\/runtime\.tgz --access public/);
});
