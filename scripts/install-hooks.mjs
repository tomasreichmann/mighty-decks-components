import { execFile } from "node:child_process";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";

const exec = promisify(execFile);
const packageRoot = resolve(import.meta.dirname, "..");
const git = async (argumentsList) => exec("git", argumentsList, { cwd: packageRoot });
const configured = await git(["config", "--local", "--get", "core.hooksPath"])
  .then(({ stdout }) => stdout.trim())
  .catch(() => "");

if (configured && configured !== ".githooks") {
  throw new Error(`core.hooksPath is already '${configured}'. Leave it intact or configure hooks manually.`);
}

if (!configured) {
  const { stdout } = await git(["rev-parse", "--git-path", "hooks"]);
  const existingHooks = await readdir(resolve(packageRoot, stdout.trim()))
    .catch(() => [])
    .then((entries) => entries.filter((entry) => !entry.endsWith(".sample")));
  if (existingHooks.length > 0) {
    throw new Error(`Existing Git hooks found (${existingHooks.join(", ")}). Refusing to replace them.`);
  }
  await git(["config", "--local", "core.hooksPath", ".githooks"]);
}

console.log("Installed repository-local hooks from .githooks.");
