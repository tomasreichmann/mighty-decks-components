import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { t } from "tar";

const packageRoot = resolve(import.meta.dirname, "..");
const tarball = resolve(packageRoot, "output", "runtime.tgz");

const entries = async (): Promise<string[]> => {
  const paths: string[] = [];
  await t({ file: tarball, onentry: (entry) => paths.push(entry.path) });
  return paths;
};

test("runtime tarball contains consumer resources but excludes maintainer material", async () => {
  await access(tarball);
  const paths = await entries();

  for (const path of [
    "package/dist/index.js",
    "package/dist/index.d.ts",
    "package/dist/react/index.js",
    "package/dist/react/index.d.ts",
    "package/dist/export.js",
    "package/dist/export.d.ts",
    "package/dist/cli.js",
    "package/dist/styles.css",
    "package/generated/manifest.json",
    "package/docs/en/README.md",
    "package/skills/mighty-decks-components/SKILL.md",
  ]) assert.ok(paths.includes(path), `missing ${path}`);

  assert.ok(paths.some((path) => path.startsWith("package/assets/") && path.endsWith(".ttf")));
  for (const path of paths) {
    assert.ok(!path.startsWith("package/docs/plans/"), `must not package ${path}`);
    assert.notEqual(path, "package/docs/maintenance.md");
    assert.ok(!path.includes("/AGENTS.md"), `must not package ${path}`);
    assert.ok(!path.startsWith("package/.agents/"), `must not package ${path}`);
    assert.ok(!path.startsWith("package/tests/"), `must not package ${path}`);
    assert.notEqual(path, "package/eslint.config.mjs");
  }
});
