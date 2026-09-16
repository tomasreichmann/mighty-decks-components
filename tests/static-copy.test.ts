import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, cp, mkdtemp, readdir, readFile, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";
import { spawn } from "node:child_process";
import test from "node:test";

const packageRoot = resolve(import.meta.dirname, "..");
const tsx = resolve(packageRoot, "node_modules/tsx/dist/cli.mjs");

const runCli = async (args: string[], cwd = packageRoot): Promise<{ code: number; stderr: string }> =>
  new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, [tsx, resolve(cwd, "src", "cli.ts"), ...args], {
      cwd,
      stdio: ["ignore", "ignore", "pipe"],
    });
    let stderr = "";
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.once("error", reject);
    child.once("close", (code) => resolveRun({ code: code ?? 1, stderr }));
  });

const hashes = async (root: string): Promise<Record<string, string>> => {
  const collect = async (directory: string): Promise<string[]> => {
    const entries = await readdir(directory, { withFileTypes: true });
    return (await Promise.all(entries.map(async (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? collect(path) : [path];
    }))).flat();
  };
  const files = await collect(root);
  const result: Record<string, string> = {};
  for (const file of files.sort()) {
    result[relative(root, file).replaceAll("\\", "/")] = createHash("sha256")
      .update(await readFile(file))
      .digest("hex");
  }
  return result;
};

test("copies npm-contained static resources without card images", async () => {
  const destination = await mkdtemp(join(tmpdir(), "mighty-decks-copy-"));
  try {
    assert.equal((await runCli(["copy-static", "--out", destination])).code, 0);
    const copiedRoot = join(destination, "mighty-decks");
    const first = await hashes(copiedRoot);

    assert.ok(first["generated/manifest.json"]);
    assert.ok(Object.keys(first).some((path) => path.startsWith("generated/csv/")));
    assert.ok(Object.keys(first).some((path) => path.startsWith("assets/fonts/") && path.endsWith(".ttf")));
    assert.equal(Object.keys(first).some((path) => path.startsWith("assets/actors/")), false);
    assert.equal(first["assets/inventory.json"], undefined);
    await assert.rejects(() => readdir(join(copiedRoot, "generated", "png")));

    assert.equal((await runCli(["copy-static", "--out", destination])).code, 0);
    assert.deepEqual(await hashes(copiedRoot), first);
  } finally {
    await rm(destination, { recursive: true, force: true });
  }
});

test("rejects invalid arguments but accepts a package without image assets", async () => {
  const invalid = await runCli(["copy-static", "--bad", "out"]);
  assert.equal(invalid.code, 1);
  assert.match(invalid.stderr, /Usage:/);

  const fixture = await mkdtemp(join(tmpdir(), "mighty-decks-missing-assets-"));
  try {
    await Promise.all([
      cp(resolve(packageRoot, "src"), join(fixture, "src"), { recursive: true }),
      cp(resolve(packageRoot, "docs"), join(fixture, "docs"), { recursive: true }),
      cp(resolve(packageRoot, "skills"), join(fixture, "skills"), { recursive: true }),
      cp(resolve(packageRoot, "generated"), join(fixture, "generated"), { recursive: true }),
      cp(resolve(packageRoot, "assets", "fonts"), join(fixture, "assets", "fonts"), { recursive: true }),
      symlink(resolve(packageRoot, "node_modules"), join(fixture, "node_modules"), "junction"),
    ]);
    const destination = await mkdtemp(join(tmpdir(), "mighty-decks-missing-"));
    const copied = await runCli(["copy-static", "--out", destination], fixture);
    assert.equal(copied.code, 0, copied.stderr);
    await access(join(destination, "mighty-decks", "assets", "fonts"));
    await assert.rejects(() => access(join(destination, "mighty-decks", "assets", "actors")));
    await rm(destination, { recursive: true, force: true });
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
