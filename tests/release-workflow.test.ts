import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { chmod, cp, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

import { publishGitDistribution } from "../scripts/publish-git-distribution.mjs";

const packageRoot = resolve(import.meta.dirname, "..");

test("publishes Git distribution refs without npm publication", async () => {
  const workflow = await readFile(resolve(packageRoot, ".github", "workflows", "release.yml"), "utf8");
  assert.doesNotMatch(workflow, /npm (publish|view)/);
  assert.doesNotMatch(workflow, /id-token: write/);
  assert.match(workflow, /stage:git/);
  assert.match(workflow, /pnpm check:release/);
  assert.match(workflow, /publish-git-distribution\.mjs/);
  assert.match(workflow, /gh release create .*--draft/);
});

test("CI checks staged Git consumers with both supported pnpm versions", async () => {
  const workflow = await readFile(resolve(packageRoot, ".github", "workflows", "ci.yml"), "utf8");
  assert.match(workflow, /--pnpm-version 10\.29\.3/);
});

test("publishes an independent distribution root then appends later releases", async () => {
  const temp = await mkdtemp(join(tmpdir(), "mighty-decks-dist-publisher-"));
  const remote = join(temp, "remote.git");
  const first = join(temp, "first");
  const second = join(temp, "second");
  await mkdir(first, { recursive: true });
  await writeFile(join(first, "package.json"), '{"name":"@mighty-decks/components","version":"1.0.0"}\n');
  await writeFile(join(first, "obsolete.txt"), "remove me\n");
  await publishGitDistribution({ remote, stagedDirectory: first, version: "1.0.0" });
  await cp(first, second, { recursive: true });
  await rm(join(second, "obsolete.txt"));
  await writeFile(join(second, "package.json"), '{"name":"@mighty-decks/components","version":"1.1.0"}\n');
  await writeFile(join(second, "current.txt"), "keep me\n");
  const published = await publishGitDistribution({ remote, stagedDirectory: second, version: "1.1.0" });
  assert.equal(published.created, true);
  const history = execFileSync("git", ["--git-dir", remote, "rev-list", "--parents", "-n", "1", "refs/heads/dist"], { encoding: "utf8" });
  assert.match(history.trim(), /^[a-f0-9]{40} [a-f0-9]{40}$/);
  const tree = execFileSync("git", ["--git-dir", remote, "ls-tree", "-r", "--name-only", "dist"], { encoding: "utf8" });
  assert.doesNotMatch(tree, /obsolete\.txt/);
  assert.match(tree, /current\.txt/);
});

test("reuses only a matching immutable distribution tag", async () => {
  const temp = await mkdtemp(join(tmpdir(), "mighty-decks-dist-retry-"));
  const remote = join(temp, "remote.git");
  const staged = join(temp, "staged");
  await mkdir(staged, { recursive: true });
  await writeFile(join(staged, "package.json"), '{"name":"@mighty-decks/components","version":"1.0.0"}\n');
  const first = await publishGitDistribution({ remote, stagedDirectory: staged, version: "1.0.0" });
  const retry = await publishGitDistribution({ remote, stagedDirectory: staged, version: "1.0.0" });
  assert.deepEqual(retry, { ...first, created: false });
  await writeFile(join(staged, "package.json"), '{"name":"@mighty-decks/components","version":"1.0.0","changed":true}\n');
  await assert.rejects(publishGitDistribution({ remote, stagedDirectory: staged, version: "1.0.0" }), /does not match/);
});

test("leaves the distribution branch untouched when an atomic push rejects its tag", async () => {
  const temp = await mkdtemp(join(tmpdir(), "mighty-decks-dist-atomic-"));
  const remote = join(temp, "remote.git");
  const first = join(temp, "first");
  const next = join(temp, "next");
  await mkdir(first, { recursive: true });
  await writeFile(join(first, "package.json"), '{"name":"@mighty-decks/components","version":"1.0.0"}\n');
  await publishGitDistribution({ remote, stagedDirectory: first, version: "1.0.0" });
  const before = execFileSync("git", ["--git-dir", remote, "rev-parse", "refs/heads/dist"], { encoding: "utf8" }).trim();
  const hook = join(remote, "hooks", "pre-receive");
  await writeFile(hook, "#!/bin/sh\nwhile read old new ref; do\n  case \"$ref\" in refs/tags/*) exit 1;; esac\ndone\nexit 0\n");
  await chmod(hook, 0o755);
  await mkdir(next, { recursive: true });
  await writeFile(join(next, "package.json"), '{"name":"@mighty-decks/components","version":"1.1.0"}\n');
  await assert.rejects(publishGitDistribution({ remote, stagedDirectory: next, version: "1.1.0" }), /failed to push|pre-receive hook declined/i);
  const after = execFileSync("git", ["--git-dir", remote, "rev-parse", "refs/heads/dist"], { encoding: "utf8" }).trim();
  assert.equal(after, before);
  assert.throws(() => execFileSync("git", ["--git-dir", remote, "show-ref", "--verify", "--quiet", "refs/tags/dist-v1.1.0"]));
});
