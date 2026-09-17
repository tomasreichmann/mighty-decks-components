import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { cp, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import test from "node:test";
const exec = promisify(execFile);
const packageRoot = resolve(import.meta.dirname, "..");
const git = (cwd, argumentsList) => exec("git", argumentsList, { cwd });
const fixture = async () => {
    const root = await mkdtemp(join(tmpdir(), "mighty-decks-hooks-"));
    await Promise.all([
        cp(resolve(packageRoot, "scripts"), join(root, "scripts"), { recursive: true }),
        cp(resolve(packageRoot, ".githooks"), join(root, ".githooks"), { recursive: true }),
    ]);
    return root;
};
test("installs only safe local hooks and rejects a seeded lint violation", async () => {
    const root = await fixture();
    try {
        await Promise.all([
            cp(resolve(packageRoot, "package.json"), join(root, "package.json")),
            cp(resolve(packageRoot, "pnpm-lock.yaml"), join(root, "pnpm-lock.yaml")),
            cp(resolve(packageRoot, ".gitignore"), join(root, ".gitignore")),
            cp(resolve(packageRoot, "tsconfig.json"), join(root, "tsconfig.json")),
            cp(resolve(packageRoot, "eslint.config.mjs"), join(root, "eslint.config.mjs")),
            cp(resolve(packageRoot, "src"), join(root, "src"), { recursive: true }),
            symlink(resolve(packageRoot, "node_modules"), join(root, "node_modules"), "junction"),
        ]);
        await git(root, ["init", "--quiet"]);
        await exec(process.execPath, ["scripts/install-hooks.mjs"], { cwd: root });
        assert.equal((await git(root, ["config", "--local", "--get", "core.hooksPath"])).stdout.trim(), ".githooks");
        await writeFile(join(root, "src", "bad.ts"), "const value: any = 1;\n");
        await git(root, ["config", "user.email", "test@example.invalid"]);
        await git(root, ["config", "user.name", "Hook Test"]);
        await git(root, ["add", "."]);
        await assert.rejects(() => git(root, ["commit", "-m", "seeded lint violation"]), /no-explicit-any/);
    }
    finally {
        await rm(root, { recursive: true, force: true });
    }
});
test("does not overwrite an existing hooks path", async () => {
    const root = await fixture();
    try {
        await git(root, ["init", "--quiet"]);
        await git(root, ["config", "--local", "core.hooksPath", "custom-hooks"]);
        await assert.rejects(() => exec(process.execPath, ["scripts/install-hooks.mjs"], { cwd: root }), /core\.hooksPath is already/);
        assert.equal((await git(root, ["config", "--local", "--get", "core.hooksPath"])).stdout.trim(), "custom-hooks");
    }
    finally {
        await rm(root, { recursive: true, force: true });
    }
});
