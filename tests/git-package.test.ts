import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import test from "node:test";
import { c } from "tar";

const exec = promisify(execFile);
const packageRoot = resolve(import.meta.dirname, "..");
const sourceCommit = "a".repeat(40);

const fixtureArchive = async (directory: string) => {
  const stage = join(directory, "stage");
  const files: Record<string, string> = {
    "package/package.json": JSON.stringify({ name: "@mighty-decks/components", version: "0.1.4", type: "module", main: "./dist/index.js", types: "./dist/index.d.ts", bin: { "mighty-decks-components": "./dist/cli.js" }, exports: { ".": { import: "./dist/index.js", types: "./dist/index.d.ts" } }, dependencies: { zod: "^3.24.1" }, peerDependencies: { react: "^18.0.0" }, scripts: { build: "vite build", prepare: "bad" }, devDependencies: { vite: "6" }, packageManager: "pnpm@10" }),
    "package/dist/index.js": "export {};\n", "package/dist/index.d.ts": "export {};\n", "package/dist/cli.js": "#!/usr/bin/env node\n", "package/assets/fonts/test.ttf": "font", "package/generated/manifest.json": JSON.stringify({ contentVersion: "content-1" }), "package/generated/csv/cards.csv": "id\n", "package/README.md": "# test\n", "package/LICENSE": "MIT\n",
  };
  for (const [path, contents] of Object.entries(files)) { const target = join(stage, path); await mkdir(resolve(target, ".."), { recursive: true }); await writeFile(target, contents); }
  await chmod(join(stage, "package", "dist", "cli.js"), 0o755);
  const archive = join(directory, "runtime.tgz"); await c({ cwd: stage, file: archive, gzip: true, portable: true }, ["package"]); return archive;
};

test("stages a prebuilt Git package with provenance and no lifecycle build", async () => {
  const temp = await mkdtemp(join(tmpdir(), "mighty-decks-git-package-")); const archive = await fixtureArchive(temp); const output = join(temp, "git-package");
  await exec(process.execPath, ["scripts/stage-git-package.mjs", "--tarball", archive, "--out", output, "--source-commit", sourceCommit], { cwd: packageRoot });
  const packageJson = JSON.parse(await readFile(join(output, "package.json"), "utf8")) as unknown as { private?: boolean; scripts?: unknown; devDependencies?: unknown; packageManager?: unknown };
  const distribution = JSON.parse(await readFile(join(output, "distribution.json"), "utf8")) as unknown as { sourceCommit: string; contentVersion: string; runtimeTarballSha256: string };
  assert.equal(packageJson.private, true); assert.equal(packageJson.scripts, undefined); assert.equal(packageJson.devDependencies, undefined); assert.equal(packageJson.packageManager, undefined); assert.equal(distribution.sourceCommit, sourceCommit); assert.equal(distribution.contentVersion, "content-1"); assert.match(distribution.runtimeTarballSha256, /^[a-f0-9]{64}$/); assert.match(await readFile(join(output, "dist", "cli.js"), "utf8"), /^#!\/usr\/bin\/env node/);
});

test("rejects a non-full source commit", async () => {
  const temp = await mkdtemp(join(tmpdir(), "mighty-decks-git-package-")); const archive = await fixtureArchive(temp);
  await assert.rejects(exec(process.execPath, ["scripts/stage-git-package.mjs", "--tarball", archive, "--out", join(temp, "out"), "--source-commit", "short"], { cwd: packageRoot }), /full 40-character source commit/);
});
