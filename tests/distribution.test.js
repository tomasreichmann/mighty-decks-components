import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import test from "node:test";
const packageRoot = resolve(import.meta.dirname, "..");
const runVerifier = (root, source) => new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, ["scripts/verify-distribution.mjs", "--root", root, ...(source ? ["--source", source] : [])], { cwd: packageRoot });
    let output = "";
    child.stdout.on("data", (chunk) => { output += chunk; });
    child.stderr.on("data", (chunk) => { output += chunk; });
    child.once("error", reject);
    child.once("close", (code) => resolveRun({ code: code ?? 1, output }));
});
const runPrepare = (source, output, skipBuild = true) => new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, ["scripts/prepare-distribution.mjs", "--source", source, "--out", output, ...(skipBuild ? ["--skip-build"] : [])], { cwd: packageRoot });
    let outputText = "";
    child.stdout.on("data", (chunk) => { outputText += chunk; });
    child.stderr.on("data", (chunk) => { outputText += chunk; });
    child.once("error", reject);
    child.once("close", (code) => resolveRun({ code: code ?? 1, output: outputText }));
});
const copyFixtureSources = async (source) => {
    await Promise.all([
        mkdir(join(source, "generated"), { recursive: true }),
        mkdir(join(source, "src", "data"), { recursive: true }),
    ]);
    await Promise.all([
        cp(resolve(packageRoot, "package.json"), join(source, "package.json")),
        cp(resolve(packageRoot, "dist"), join(source, "dist"), { recursive: true }),
        cp(resolve(packageRoot, "assets"), join(source, "assets"), { recursive: true }),
        cp(resolve(packageRoot, "generated", "csv"), join(source, "generated", "csv"), { recursive: true }),
        cp(resolve(packageRoot, "generated", "manifest.json"), join(source, "generated", "manifest.json")),
        cp(resolve(packageRoot, "docs", "en"), join(source, "docs", "en"), { recursive: true }),
        cp(resolve(packageRoot, "skills"), join(source, "skills"), { recursive: true }),
        cp(resolve(packageRoot, "LICENSE"), join(source, "LICENSE")),
        cp(resolve(packageRoot, "NOTICE"), join(source, "NOTICE")),
        cp(resolve(packageRoot, "LICENSES"), join(source, "LICENSES"), { recursive: true }),
        cp(resolve(packageRoot, "src", "data", "catalog.en.json"), join(source, "src", "data", "catalog.en.json")),
    ]);
    const png = join(source, "generated", "png", "en", "outcome", "success", "full");
    await mkdir(png, { recursive: true });
    await writeFile(join(png, "1024.png"), "fixture-png");
    await writeFile(join(source, "generated", "png-manifest.json"), JSON.stringify({
        locale: "en",
        entries: [{ family: "outcome", slug: "success", layout: "full", width: 629, height: 1024, path: "png/en/outcome/success/full/1024.png", checksum: "fixture" }],
    }));
};
test("rejects a distribution runtime with a missing exported CSS target", async () => {
    const source = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-source-"));
    const output = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-output-"));
    try {
        await copyFixtureSources(source);
        assert.equal((await runPrepare(source, output)).code, 0);
        await rm(join(output, "runtime", "dist", "styles.css"));
        const manifestPath = join(output, "manifest.json");
        const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
        manifest.files = manifest.files.filter((file) => file.path !== "runtime/dist/styles.css");
        await writeFile(manifestPath, `${JSON.stringify(manifest)}\n`);
        const result = await runVerifier(output, source);
        assert.notEqual(result.code, 0);
        assert.match(result.output, /missing runtime export target: dist\/styles\.css/i);
    }
    finally {
        await Promise.all([rm(source, { recursive: true, force: true }), rm(output, { recursive: true, force: true })]);
    }
});
test("prepares a script-free runtime with public assets and an inventory", async () => {
    const source = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-source-"));
    const output = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-output-"));
    try {
        await copyFixtureSources(source);
        const prepared = await runPrepare(source, output);
        assert.equal(prepared.code, 0, prepared.output);
        const runtimePackage = JSON.parse(await readFile(join(output, "runtime", "package.json"), "utf8"));
        assert.equal(runtimePackage.scripts, undefined);
        await readFile(join(output, "public", "mighty-decks", "assets", "fonts", "mighty-decks-kalam-400.ttf"));
        const manifest = JSON.parse(await readFile(join(output, "manifest.json"), "utf8"));
        assert.deepEqual(manifest.groups.core.png, ["public/mighty-decks/generated/png/en/outcome/success/full/1024.png"]);
        assert.equal((await runVerifier(output, source)).code, 0);
    }
    finally {
        await Promise.all([rm(source, { recursive: true, force: true }), rm(output, { recursive: true, force: true })]);
    }
});
test("exposes local distribution prepare and check commands", async () => {
    const packageJson = JSON.parse(await readFile(resolve(packageRoot, "package.json"), "utf8"));
    assert.equal(packageJson.scripts["distribution:prepare"], "node scripts/prepare-distribution.mjs");
    assert.equal(packageJson.scripts["distribution:check"], "node scripts/verify-distribution.mjs");
    assert.match(packageJson.scripts.test, /tests\/distribution\.test\.ts/);
});
test("rejects changed distribution bytes and stale source inputs", async () => {
    const source = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-source-"));
    const output = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-output-"));
    try {
        await copyFixtureSources(source);
        assert.equal((await runPrepare(source, output)).code, 0);
        await writeFile(join(output, "runtime", "dist", "index.js"), "changed");
        const changedOutput = await runVerifier(output, source);
        assert.notEqual(changedOutput.code, 0);
        assert.match(changedOutput.output, /distribution file hash mismatch/i);
        assert.equal((await runPrepare(source, output)).code, 0);
        await writeFile(join(source, "src", "data", "catalog.en.json"), "changed");
        const changedSource = await runVerifier(output, source);
        assert.notEqual(changedSource.code, 0);
        assert.match(changedSource.output, /distribution input fingerprint mismatch/i);
    }
    finally {
        await Promise.all([rm(source, { recursive: true, force: true }), rm(output, { recursive: true, force: true })]);
    }
});
test("skips runtime generation when the existing distribution input fingerprint matches", async () => {
    const source = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-source-"));
    const output = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-output-"));
    try {
        await copyFixtureSources(source);
        assert.equal((await runPrepare(source, output)).code, 0);
        const repeated = await runPrepare(source, output, false);
        assert.equal(repeated.code, 0, repeated.output);
        assert.match(repeated.output, /skipped runtime generation/i);
    }
    finally {
        await Promise.all([rm(source, { recursive: true, force: true }), rm(output, { recursive: true, force: true })]);
    }
});
test("assigns deckless catalogue entries to the core PNG group", async () => {
    const source = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-source-"));
    const output = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-output-"));
    try {
        await copyFixtureSources(source);
        await rm(join(source, "generated", "png"), { recursive: true, force: true });
        const png = join(source, "generated", "png", "en", "actor-base", "animal_blue", "full");
        await mkdir(png, { recursive: true });
        await writeFile(join(png, "1024.png"), "fixture-png");
        await writeFile(join(source, "generated", "png-manifest.json"), JSON.stringify({
            locale: "en",
            entries: [{ family: "actor-base", slug: "animal_blue", layout: "full", width: 629, height: 1024, path: "png/en/actor-base/animal_blue/full/1024.png", checksum: "fixture" }],
        }));
        assert.equal((await runPrepare(source, output)).code, 0);
        const manifest = JSON.parse(await readFile(join(output, "manifest.json"), "utf8"));
        assert.deepEqual(manifest.groups.core.png, ["public/mighty-decks/generated/png/en/actor-base/animal_blue/full/1024.png"]);
    }
    finally {
        await Promise.all([rm(source, { recursive: true, force: true }), rm(output, { recursive: true, force: true })]);
    }
});
test("ignores transient JavaScript emitted beside TypeScript authoring sources", async () => {
    const source = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-source-"));
    const output = await mkdtemp(join(tmpdir(), "mighty-decks-distribution-output-"));
    try {
        await copyFixtureSources(source);
        const emitted = join(source, "src", "catalog.js");
        await writeFile(emitted, "temporary output");
        assert.equal((await runPrepare(source, output)).code, 0);
        await rm(emitted);
        assert.equal((await runVerifier(output, source)).code, 0);
    }
    finally {
        await Promise.all([rm(source, { recursive: true, force: true }), rm(output, { recursive: true, force: true })]);
    }
});
test("keeps every checked-in distribution path out of generated-output ignores", async () => {
    const ignore = await readFile(join(packageRoot, ".gitignore"), "utf8");
    assert.match(ignore, /^!distribution\/\*\*$/m);
});
