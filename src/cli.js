#!/usr/bin/env node
import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
const main = async () => {
    const [, , command, option, destination] = process.argv;
    if (command === "copy-static" && option === "--out" && destination) {
        const packageRoot = resolve(import.meta.dirname, "..");
        const outputRoot = resolve(destination, "mighty-decks");
        await mkdir(outputRoot, { recursive: true });
        for (const folder of ["docs", "skills"]) {
            await cp(resolve(packageRoot, folder), resolve(outputRoot, folder), { recursive: true, force: true });
        }
        await cp(resolve(packageRoot, "assets", "fonts"), resolve(outputRoot, "assets", "fonts"), { recursive: true, force: true });
        await cp(resolve(packageRoot, "generated", "csv"), resolve(outputRoot, "generated", "csv"), { recursive: true, force: true });
        await mkdir(resolve(outputRoot, "generated"), { recursive: true });
        await cp(resolve(packageRoot, "generated", "manifest.json"), resolve(outputRoot, "generated", "manifest.json"), { force: true });
        await rm(resolve(outputRoot, "generated", "png"), { recursive: true, force: true });
    }
    else {
        console.error("Usage: mighty-decks-components copy-static --out <directory>");
        process.exitCode = 1;
    }
};
void main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
});
