import { execFile } from "node:child_process";
import { cp, mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { promisify } from "node:util";

const exec = promisify(execFile);
const packageRoot = resolve(import.meta.dirname, "..");
const fixture = resolve(packageRoot, "tests", "consumer");
const args = process.argv.slice(2);
const tarballArgument = args.indexOf("--tarball");
const tarball = resolve(packageRoot, tarballArgument >= 0 ? args[tarballArgument + 1] : "output/runtime.tgz");
const npmCli = resolve(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js");
const npm = async (argumentsList, cwd, cache) => exec(process.execPath, [npmCli, ...argumentsList], {
  cwd,
  env: { ...process.env, npm_config_cache: cache, npm_config_userconfig: resolve(cwd, ".npmrc") },
  maxBuffer: 1024 * 1024,
});

const temp = await mkdtemp(resolve(tmpdir(), "mighty-decks-consumer-"));
const cache = resolve(temp, "npm-cache");
await cp(fixture, temp, { recursive: true });
await mkdir(cache, { recursive: true });
await writeFile(resolve(temp, ".npmrc"), "registry=https://registry.npmjs.org/\n");
const installArgs = [
  "install", "--save-dev", "--registry=https://registry.npmjs.org/",
  tarball, "react@18.3.1", "react-dom@18.3.1",
];
await npm(["install", "--ignore-scripts", "--save-dev", "--registry=https://registry.npmjs.org/", tarball, "react@18.3.1", "react-dom@18.3.1"], temp, cache);
await npm(installArgs, temp, cache);
await npm(["run", "check:imports"], temp, cache);
await npm(["run", "check:mdx"], temp, cache);
await npm(["run", "typecheck"], temp, cache);
await npm(["run", "typecheck:nodenext"], temp, cache);
await npm(["run", "build"], temp, cache);
await npm(["exec", "mighty-decks-components", "--", "copy-static", "--out", "public"], temp, cache);
const manifest = JSON.parse(await readFile(resolve(temp, "public", "mighty-decks", "generated", "manifest.json"), "utf8"));
if (manifest.cards.length === 0) throw new Error("Packed consumer cannot read catalogue manifest.");
console.log(`Consumer fixture passed in ${temp}.`);
