import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { cp, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

const exec = promisify(execFile);
const root = resolve(import.meta.dirname, "..");
const run = async (command, args, cwd) => {
  try {
    return await exec(command, args, { cwd, windowsHide: true, shell: process.platform === "win32" && command.endsWith(".cmd") });
  } catch (error) {
    throw new Error(`${error.stdout ?? ""}${error.stderr ?? ""}`, { cause: error });
  }
};
const corepack = process.platform === "win32" ? "corepack.cmd" : "corepack";
const localPnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const pnpm = (version, args, cwd, store) => {
  const executable = process.env[`MIGHTY_DECKS_PNPM_${version.replaceAll(".", "_")}`];
  const command = [...args, ...(args[0] === "install" ? ["--store-dir", store] : [])];
  return executable ? run(executable, command, cwd) : version === "10.0.0"
    ? run(localPnpm, command, cwd)
    : run(corepack, [`pnpm@${version}`, ...command], cwd);
};

const createFixture = async (directory) => {
  for (const path of ["dist", "assets", "generated", "docs/en", "skills/mighty-decks-components", "LICENSE", "NOTICE", "LICENSES", "package.json"]) {
    await cp(join(root, path), join(directory, path), { recursive: true });
  }
  await run("git", ["init", "--quiet"], directory);
  await run("git", ["add", "."], directory);
  await run("git", ["-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "--quiet", "-m", "prebuilt package"], directory);
  return (await run("git", ["rev-parse", "HEAD"], directory)).stdout.trim();
};

test("installs the prebuilt Git package with pnpm 10.0.0 and 10.29.3 without package builds", async () => {
  for (const version of ["10.0.0", "10.29.3"]) {
  const temporary = await mkdtemp(join(tmpdir(), "mighty-decks-git-install-"));
  const fixture = join(temporary, "fixture");
  const consumer = join(temporary, "consumer");
  const store = join(temporary, "store");
  try {
    const commit = await createFixture(fixture);
    await (await import("node:fs/promises")).mkdir(consumer);
    await writeFile(join(consumer, "package.json"), JSON.stringify({
      private: true,
      type: "module",
      packageManager: `pnpm@${version}`,
      dependencies: {
        "@mighty-decks/components": `git+file:///${fixture.replaceAll("\\", "/")}#${commit}`,
        react: "18.3.1",
        "react-dom": "18.3.1",
      },
      devDependencies: { vite: "6.0.5" },
      scripts: { build: "vite build" },
    }, null, 2));
    await writeFile(join(consumer, "index.html"), '<div id="app"></div><script type="module" src="/main.js"></script>');
    await writeFile(join(consumer, "main.js"), 'import "@mighty-decks/components/styles.css"; import image from "@mighty-decks/components/generated/png/en/outcome/success/full/1024.png"; document.body.dataset.image = image;');

    const installed = await pnpm(version, ["install"], consumer, store);
    assert.doesNotMatch(`${installed.stdout}\n${installed.stderr}`, /@mighty-decks\/components.*(?:prepare|build)|playwright/i);
    const probe = await run(process.execPath, ["--input-type=module", "--eval", 'import { cardCatalog } from "@mighty-decks/components"; import { readFile } from "node:fs/promises"; const packageJson = import.meta.resolve("@mighty-decks/components/package.json"); const csv = await readFile(new URL("./generated/csv/outcome.csv", packageJson)); const rulebook = await readFile(new URL("./docs/en/mighty-decks-rulebook.md", packageJson)); const png = await readFile(new URL("./generated/png/en/outcome/success/full/1024.png", packageJson)); if (!cardCatalog.length || !csv.length || !rulebook.length || !png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) process.exit(1);'], consumer);
    assert.equal(probe.stderr, "");
    await pnpm(version, ["run", "build"], consumer, store);
    await pnpm(version, ["install", "--frozen-lockfile"], consumer, store);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
  }
});
