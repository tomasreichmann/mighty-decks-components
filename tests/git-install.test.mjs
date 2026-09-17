import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

const packageRoot = resolve(import.meta.dirname, "..");
const exec = promisify(execFile);
const run = async (file, args, cwd) => {
  const result = await exec(file, args, { cwd, maxBuffer: 10 * 1024 * 1024, shell: process.platform === "win32" && file.endsWith(".cmd") });
  return `${result.stdout}\n${result.stderr}`;
};
const command = process.platform === "win32" ? "corepack.cmd" : "corepack";
const versions = (process.env.MIGHTY_DECKS_PNPM_VERSIONS ?? "10.0.0,10.29.3").split(",");

const createFixture = async (root) => {
  const source = join(root, "components");
  await Promise.all([
    ...["dist", "assets", "generated", "docs/en", "skills/mighty-decks-components", "LICENSES"].map((path) => cp(resolve(packageRoot, path), join(source, path), { recursive: true })),
    ...["package.json", "LICENSE", "NOTICE"].map((path) => cp(resolve(packageRoot, path), join(source, path))),
  ]);
  await run("git", ["init", "--quiet"], source);
  await run("git", ["add", "."], source);
  await run("git", ["-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "-m", "prebuilt package"], source);
  return { source, sha: (await run("git", ["rev-parse", "HEAD"], source)).trim() };
};

test("installs a pinned Git package with pnpm 10 without running component generation", async () => {
  const root = await mkdtemp(join(tmpdir(), "mighty-decks-git-install-"));
  try {
    const { source, sha } = await createFixture(root);
    for (const version of versions) {
      const consumer = join(root, `consumer-${version}`);
      const store = join(root, `store-${version}`);
      await mkdir(consumer, { recursive: true });
      await writeFile(join(consumer, "package.json"), JSON.stringify({
        name: `git-consumer-${version.replaceAll(".", "-")}`,
        private: true,
        type: "module",
        dependencies: {
          "@mighty-decks/components": `git+file:///${source.replaceAll("\\", "/")}#${sha}`,
          react: "18.3.1",
          "react-dom": "18.3.1",
        },
        devDependencies: { vite: "6.4.3" },
      }, null, 2));
      const log = await run(command, [`pnpm@${version}`, "install", "--store-dir", store], consumer);
      assert.doesNotMatch(log, /assets:prepare|vite build|playwright/i);
      const installed = join(consumer, "node_modules", "@mighty-decks", "components");
      await access(join(installed, "dist", "react", "index.js"));
      await access(join(installed, "docs", "en", "mighty-decks-rulebook.md"));
      const png = await readFile(join(installed, "generated", "png", "en", "outcome", "success", "full", "1024.png"));
      assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
      await writeFile(join(consumer, "index.html"), '<div id="root"></div><script type="module" src="/src.js"></script>');
      await writeFile(join(consumer, "src.js"), 'import "@mighty-decks/components/styles.css"; import image from "@mighty-decks/components/assets/counters/danger.png"; console.log(image);');
      await run(command, [`pnpm@${version}`, "exec", "vite", "build"], consumer);
      await rm(join(consumer, "node_modules"), { recursive: true, force: true });
      await run(command, [`pnpm@${version}`, "install", "--frozen-lockfile", "--store-dir", store], consumer);
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
