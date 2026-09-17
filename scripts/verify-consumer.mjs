import { execFile } from "node:child_process";
import { cp, mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { promisify } from "node:util";

const exec = promisify(execFile);
const packageRoot = resolve(import.meta.dirname, "..");
const fixture = resolve(packageRoot, "tests", "consumer");
const args = process.argv.slice(2);
const argument = (name) => {
  const index = args.indexOf(name);
  return index < 0 ? undefined : args[index + 1];
};
const pnpmVersion = argument("--pnpm-version");
if (pnpmVersion && !/^\d+\.\d+\.\d+$/.test(pnpmVersion)) throw new Error("pnpm version must be a full semantic version.");
const expectedDistributionArgument = argument("--expected-distribution");
let expectedDistribution;
if (expectedDistributionArgument) {
  try {
    expectedDistribution = JSON.parse(expectedDistributionArgument);
  } catch {
    throw new Error("Expected distribution metadata must be valid JSON.");
  }
  if (!expectedDistribution || typeof expectedDistribution !== "object" || Array.isArray(expectedDistribution)) throw new Error("Expected distribution metadata must be an object.");
}
const tarballIndex = args.indexOf("--tarball");
const gitIndex = args.indexOf("--git");
const stageIndex = args.indexOf("--git-stage");
if ([tarballIndex, gitIndex, stageIndex].filter((index) => index >= 0).length !== 1) throw new Error("Pass exactly one of --tarball, --git, or --git-stage.");
let source = tarballIndex >= 0 ? resolve(packageRoot, argument("--tarball")) : argument("--git");
if (!source && stageIndex < 0) throw new Error("Package source argument is missing.");
if (gitIndex >= 0 && !/^git\+(https|file):\/\/.+#([a-f0-9]{40})$/i.test(source)) throw new Error("Git package source must be a git+ URL pinned to a full commit SHA.");

const temp = await mkdtemp(resolve(tmpdir(), "mighty-decks-consumer-"));
const pnpm = async (argumentsList, cwd, store, ignoreScripts = false) => exec(
  pnpmVersion ? (process.platform === "win32" ? "corepack.cmd" : "corepack") : (process.platform === "win32" ? "pnpm.cmd" : "pnpm"),
  [...(pnpmVersion ? [`pnpm@${pnpmVersion}`] : []), ...argumentsList, ...(ignoreScripts ? ["--ignore-scripts"] : [])],
  { cwd, env: { ...process.env, pnpm_store_dir: store }, maxBuffer: 1024 * 1024, shell: process.platform === "win32" },
);
const prepareConsumer = async (directory) => {
  await cp(fixture, directory, { recursive: true });
  const manifestPath = resolve(directory, "package.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.devDependencies["@mighty-decks/components"] = source;
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
};
if (stageIndex >= 0) {
  const repository = resolve(temp, "git-package");
  await cp(resolve(packageRoot, argument("--git-stage")), repository, { recursive: true });
  const git = (argumentsList) => exec(process.platform === "win32" ? "git.exe" : "git", argumentsList, { shell: process.platform === "win32" });
  await git(["-C", repository, "init"]); await git(["-C", repository, "config", "user.email", "fixture@example.invalid"]); await git(["-C", repository, "config", "user.name", "Fixture"]); await git(["-C", repository, "add", "--all"]); await git(["-C", repository, "commit", "-m", "fixture"]);
  const { stdout } = await git(["-C", repository, "rev-parse", "HEAD"]);
  source = `git+file:///${repository.replace(/\\/g, "/")}#${stdout.trim()}`;
}
const consumer = resolve(temp, "consumer");
const store = resolve(temp, "pnpm-store");
await mkdir(store, { recursive: true });
await prepareConsumer(consumer);
await pnpm(["install"], consumer, store, true);
const lockfile = await readFile(resolve(consumer, "pnpm-lock.yaml"), "utf8");
if (!lockfile.includes("@mighty-decks/components")) throw new Error("Consumer lockfile does not resolve the package.");
if (source.startsWith("git+") && !lockfile.includes(source.slice(source.indexOf("#") + 1))) throw new Error("Consumer lockfile does not pin the requested Git commit.");
if (lockfile.includes("registry.npmjs.org/@mighty-decks/components")) throw new Error("Consumer lockfile resolved the package from the registry.");
const frozen = resolve(temp, "frozen");
const frozenStore = resolve(temp, "pnpm-store-frozen");
await mkdir(frozenStore, { recursive: true });
await prepareConsumer(frozen);
await cp(resolve(consumer, "pnpm-lock.yaml"), resolve(frozen, "pnpm-lock.yaml"));
await pnpm(["install", "--frozen-lockfile"], frozen, frozenStore, true);
await pnpm(["install", "--frozen-lockfile"], consumer, store);
for (const script of ["check:imports", "check:mdx", "typecheck", "typecheck:nodenext", "build"]) await pnpm(["run", script], consumer, store);
await pnpm(["exec", "mighty-decks-components", "copy-static", "--out", "public"], consumer, store);
const copied = JSON.parse(await readFile(resolve(consumer, "public", "mighty-decks", "generated", "manifest.json"), "utf8"));
if (!copied.cards?.length) throw new Error("Consumer cannot read the package catalogue manifest.");
if (expectedDistribution) {
  const installed = JSON.parse(await readFile(resolve(consumer, "node_modules", "@mighty-decks", "components", "distribution.json"), "utf8"));
  for (const [key, expected] of Object.entries(expectedDistribution)) {
    if (installed[key] !== expected) throw new Error(`Installed distribution metadata mismatch for ${key}.`);
  }
}
console.log(`Consumer fixture passed from ${gitIndex >= 0 || stageIndex >= 0 ? "Git" : "tarball"}${pnpmVersion ? ` with pnpm ${pnpmVersion}` : ""} in ${temp}.`);
