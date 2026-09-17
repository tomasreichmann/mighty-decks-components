import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import test from "node:test";

const packageRoot = resolve(import.meta.dirname, "..");
const exec = promisify(execFile);
const hash = (content: string) => createHash("sha256").update(content).digest("hex");
const run = async (command: string, args: string[], cwd: string): Promise<string> => (await exec(command, args, { cwd })).stdout.trim();
const runSync = (cwd: string, args: string[]): Promise<{ code: number; output: string }> => new Promise((resolveRun, reject) => {
  const child = spawn(process.execPath, [resolve(packageRoot, "consumer", "sync-mighty-decks.mjs"), ...args], { cwd });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk; });
  child.stderr.on("data", (chunk) => { output += chunk; });
  child.once("error", reject);
  child.once("close", (code) => resolveRun({ code: code ?? 1, output }));
});

const createDistribution = async (repository: string): Promise<string> => {
  const files: Record<string, string> = {
    "runtime/package.json": "{\"name\":\"@mighty-decks/components\",\"private\":true}\n",
    "runtime/dist/index.js": "export const card = 'runtime';\n",
    "public/mighty-decks/assets/card.png": "asset",
    "public/mighty-decks/generated/png/en/outcome/success/full/1024.png": "core-png",
    "public/mighty-decks/generated/png/en/asset-base/sword/full/1024.png": "medieval-png",
    "public/mighty-decks/LICENSE": "license\n",
    "public/mighty-decks/NOTICE": "notice\n",
  };
  for (const [path, content] of Object.entries(files)) {
    const target = join(repository, "distribution", ...path.split("/"));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, content);
  }
  const manifest = {
    schemaVersion: 1,
    groups: {
      core: { png: ["public/mighty-decks/generated/png/en/outcome/success/full/1024.png"] },
      medieval: { png: ["public/mighty-decks/generated/png/en/asset-base/sword/full/1024.png"] },
    },
    files: Object.entries(files).map(([path, content]) => ({ path, size: Buffer.byteLength(content), sha256: hash(content) })),
  };
  await writeFile(join(repository, "distribution", "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  await run("git", ["init"], repository);
  await run("git", ["add", "."], repository);
  await run("git", ["-c", "user.name=Test", "-c", "user.email=test@example.invalid", "commit", "-m", "fixture"], repository);
  return run("git", ["rev-parse", "HEAD"], repository);
};

test("syncs selected runtime and core PNG files from a pinned Git commit", async () => {
  const root = await mkdtemp(join(tmpdir(), "mighty-decks-sync-"));
  const source = join(root, "source");
  const consumer = join(root, "consumer");
  try {
    const commit = await createDistribution(source);
    await mkdir(consumer, { recursive: true });
    await writeFile(join(consumer, "mighty-decks.config.json"), `${JSON.stringify({
      repository: source,
      mode: "both",
      groups: ["core"],
      runtimeDestination: "vendor/mighty-decks/components",
      publicDestination: "apps/web/public/mighty-decks",
    }, null, 2)}\n`);
    await mkdir(join(consumer, ".cache", "mighty-decks"), { recursive: true });
    await writeFile(join(consumer, ".cache", "mighty-decks", "legacy-archive.tar.gz"), "legacy cache content");

    const first = await runSync(consumer, ["--ref", commit]);
    assert.equal(first.code, 0, first.output);
    await access(join(consumer, "vendor", "mighty-decks", "components", "dist", "index.js"));
    await access(join(consumer, "apps", "web", "public", "mighty-decks", "assets", "card.png"));
    await access(join(consumer, "apps", "web", "public", "mighty-decks", "generated", "png", "en", "outcome", "success", "full", "1024.png"));
    await assert.rejects(access(join(consumer, "apps", "web", "public", "mighty-decks", "generated", "png", "en", "asset-base", "sword", "full", "1024.png")));
    const lock = JSON.parse(await readFile(join(consumer, "mighty-decks.lock.json"), "utf8")) as { commit: string };
    assert.equal(lock.commit, commit);

    assert.equal((await runSync(consumer, ["--check"])).code, 0);
    assert.equal((await runSync(consumer, ["--ref", commit])).code, 0);
    await writeFile(join(consumer, "vendor", "mighty-decks", "components", "dist", "index.js"), "locally edited");
    const dirty = await runSync(consumer, ["--ref", commit]);
    assert.notEqual(dirty.code, 0);
    assert.match(dirty.output, /locally modified/i);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("runs consumer sync coverage from the package test command", async () => {
  const packageJson = JSON.parse(await readFile(join(packageRoot, "package.json"), "utf8")) as { scripts: Record<string, string> };
  assert.match(packageJson.scripts.test, /tests\/consumer-sync\.test\.ts/);
});

test("supports React-only and exact PNG-only selections", async () => {
  const root = await mkdtemp(join(tmpdir(), "mighty-decks-sync-modes-"));
  const source = join(root, "source");
  const reactConsumer = join(root, "react");
  const pngConsumer = join(root, "png");
  try {
    const commit = await createDistribution(source);
    for (const [consumer, mode, groups, pngPaths] of [
      [reactConsumer, "react", ["core"], undefined],
      [pngConsumer, "png", ["core", "medieval"], ["public/mighty-decks/generated/png/en/outcome/success/full/1024.png"]],
    ] as const) {
      await mkdir(consumer, { recursive: true });
      await writeFile(join(consumer, "mighty-decks.config.json"), `${JSON.stringify({
        repository: source, mode, groups, pngPaths,
        runtimeDestination: "vendor/mighty-decks/components",
        publicDestination: "apps/web/public/mighty-decks",
      }, null, 2)}\n`);
      assert.equal((await runSync(consumer, ["--ref", commit])).code, 0);
    }
    await access(join(reactConsumer, "vendor", "mighty-decks", "components", "dist", "index.js"));
    await assert.rejects(access(join(reactConsumer, "apps", "web", "public", "mighty-decks", "generated", "png", "en", "outcome", "success", "full", "1024.png")));
    await access(join(pngConsumer, "apps", "web", "public", "mighty-decks", "generated", "png", "en", "outcome", "success", "full", "1024.png"));
    await assert.rejects(access(join(pngConsumer, "vendor", "mighty-decks", "components", "dist", "index.js")));
    await assert.rejects(access(join(pngConsumer, "apps", "web", "public", "mighty-decks", "generated", "png", "en", "asset-base", "sword", "full", "1024.png")));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects configured destinations outside the consumer root", async () => {
  const root = await mkdtemp(join(tmpdir(), "mighty-decks-sync-safety-"));
  const source = join(root, "source");
  const consumer = join(root, "consumer");
  try {
    const commit = await createDistribution(source);
    await mkdir(consumer, { recursive: true });
    await writeFile(join(consumer, "mighty-decks.config.json"), `${JSON.stringify({
      repository: source, mode: "react", groups: ["core"],
      runtimeDestination: "../outside", publicDestination: "apps/web/public/mighty-decks",
    }, null, 2)}\n`);
    const result = await runSync(consumer, ["--ref", commit]);
    assert.notEqual(result.code, 0);
    assert.match(result.output, /destination.*consumer root/i);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
