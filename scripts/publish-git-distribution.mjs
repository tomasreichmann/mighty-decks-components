import { execFile } from "node:child_process";
import { Buffer } from "node:buffer";
import { cp, lstat, mkdtemp, mkdir, readdir, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";

const exec = promisify(execFile);
const gitCommand = process.platform === "win32" ? "git.exe" : "git";
const git = (args, options = {}) => exec(gitCommand, args, { maxBuffer: 1024 * 1024, ...options });

const filesMatch = async (left, right) => {
  const entries = async (directory, relative = "") => {
    const result = new Map();
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (entry.name === ".git") continue;
      const path = join(directory, entry.name);
      const key = join(relative, entry.name).replace(/\\/g, "/");
      if (entry.isDirectory()) for (const [child, kind] of await entries(path, key)) result.set(child, kind);
      else if (entry.isFile()) result.set(key, "file");
      else result.set(key, "other");
    }
    return result;
  };
  const leftEntries = await entries(left);
  const rightEntries = await entries(right);
  if (leftEntries.size !== rightEntries.size) return false;
  for (const [path, kind] of leftEntries) {
    if (rightEntries.get(path) !== kind || kind !== "file") return false;
    if (!Buffer.from(await readFile(join(left, path))).equals(await readFile(join(right, path)))) return false;
  }
  return true;
};

const replaceTree = async (destination, source) => {
  for (const entry of await readdir(destination, { withFileTypes: true })) {
    if (entry.name !== ".git") await rm(join(destination, entry.name), { recursive: true, force: true });
  }
  for (const entry of await readdir(source, { withFileTypes: true })) {
    if (entry.name === ".git") throw new Error("The staged Git package must not contain .git.");
    await cp(join(source, entry.name), join(destination, entry.name), { recursive: true, force: true });
  }
};

const output = (name, value) => {
  if (process.env.GITHUB_OUTPUT) return import("node:fs/promises").then(({ appendFile }) => appendFile(process.env.GITHUB_OUTPUT, `${name}=${value}\n`));
};

export const publishGitDistribution = async ({ remote, stagedDirectory, version, branch = "dist" }) => {
  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version)) throw new Error("Distribution version is invalid.");
  const staged = resolve(stagedDirectory);
  if (!(await stat(staged)).isDirectory() || (await readdir(staged)).includes(".git")) throw new Error("Staged Git package must be a directory without .git.");
  const tag = `dist-v${version}`;
  const temp = await mkdtemp(join(tmpdir(), "mighty-decks-dist-publish-"));
  try {
    const localRemote = !/^[a-z]+:\/\//i.test(remote) ? resolve(remote) : undefined;
    if (localRemote) {
      const exists = await lstat(localRemote).then(() => true).catch(() => false);
      if (!exists) await git(["init", "--bare", localRemote]);
    }
    const existing = join(temp, "existing");
    await git(["clone", "--no-checkout", remote, existing]);
    await git(["-C", existing, "config", "core.autocrlf", "false"]);
    const tagRef = (await git(["-C", existing, "rev-parse", "--verify", `refs/tags/${tag}^{}`]).catch(() => ({ stdout: "" }))).stdout.trim();
    if (tagRef) {
      await git(["-C", existing, "checkout", "--detach", tag]);
      if (!(await filesMatch(staged, existing))) throw new Error(`Published distribution tag ${tag} does not match the staged package.`);
      await output("sha", tagRef);
      return { sha: tagRef, tag, created: false };
    }

    const branchRef = (await git(["-C", existing, "rev-parse", "--verify", `refs/remotes/origin/${branch}`]).catch(() => ({ stdout: "" }))).stdout.trim();
    const work = join(temp, "work");
    if (branchRef) await git(["clone", "--branch", branch, "--single-branch", remote, work]);
    else {
      await mkdir(work);
      await git(["-C", work, "init"]);
      await git(["-C", work, "remote", "add", "origin", remote]);
    }
    await git(["-C", work, "config", "core.autocrlf", "false"]);
    await replaceTree(work, staged);
    await git(["-C", work, "config", "user.name", "github-actions[bot]"]);
    await git(["-C", work, "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"]);
    await git(["-C", work, "add", "--all"]);
    const changed = await git(["-C", work, "diff", "--cached", "--quiet"]).then(() => false).catch(() => true);
    if (!changed) throw new Error(`Distribution branch ${branch} already has the staged package but ${tag} is missing.`);
    await git(["-C", work, "commit", "-m", `dist: ${tag}`]);
    const { stdout } = await git(["-C", work, "rev-parse", "HEAD"]);
    const sha = stdout.trim();
    await git(["-C", work, "tag", tag, sha]);
    await git(["-C", work, "push", "--atomic", "origin", `HEAD:refs/heads/${branch}`, `refs/tags/${tag}`]);
    await output("sha", sha);
    return { sha, tag, created: true };
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
};

const args = process.argv.slice(2);
const value = (name) => args[args.indexOf(name) + 1];
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  const result = await publishGitDistribution({ remote: value("--remote"), stagedDirectory: value("--staged"), version: value("--version") });
  console.log(JSON.stringify(result));
}
