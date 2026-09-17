import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import test from "node:test";

const exec = promisify(execFile);

test("consumer verifier rejects ambiguous package sources", async () => {
  await assert.rejects(
    exec(process.execPath, ["scripts/verify-consumer.mjs", "--tarball", "output/runtime.tgz", "--git", "git+file:///repo#aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]),
    /exactly one of --tarball, --git, or --git-stage/,
  );
});

test("consumer verifier rejects an invalid explicit pnpm version before installing", async () => {
  await assert.rejects(
    exec(process.execPath, ["scripts/verify-consumer.mjs", "--pnpm-version", "latest"]),
    /pnpm version must be a full semantic version/,
  );
});

test("consumer verifier rejects invalid expected distribution metadata before installing", async () => {
  await assert.rejects(
    exec(process.execPath, ["scripts/verify-consumer.mjs", "--expected-distribution", "not-json"]),
    /Expected distribution metadata must be valid JSON/,
  );
});
