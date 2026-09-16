import assert from "node:assert/strict";
import { ESLint } from "eslint";
import { resolve } from "node:path";
import test from "node:test";

const packageRoot = resolve(import.meta.dirname, "..");
const eslint = new ESLint({ cwd: packageRoot, overrideConfigFile: "eslint.config.mjs" });

const ruleIds = async (code: string, filePath: string): Promise<string[]> =>
  (await eslint.lintText(code, { filePath })).map((result) =>
    result.messages.map((message) => message.ruleId ?? "parse-error"),
  ).flat();

const expectRule = async (code: string, filePath: string, ruleId: string): Promise<void> => {
  assert.ok((await ruleIds(code, filePath)).includes(ruleId), `${ruleId} should reject ${filePath}`);
};

test("rejects catalog, renderer, contracts, and library boundary violations", async () => {
  await expectRule('import "./react/index";', "src/catalog.ts", "no-restricted-imports");
  await expectRule('import "node:fs";', "src/react/index.tsx", "no-restricted-imports");
  await expectRule('await import("node:fs");', "src/react/index.tsx", "no-restricted-syntax");
  await expectRule('import "../catalog";', "src/contracts/cardExport.ts", "no-restricted-imports");
  await expectRule('export * from "../scripts/generate";', "src/index.ts", "no-restricted-imports");
});

test("rejects floating promises, any, and unexplained suppressions", async () => {
  await expectRule("Promise.resolve();", "src/catalog.ts", "@typescript-eslint/no-floating-promises");
  await expectRule("const value: any = 1;", "src/catalog.ts", "@typescript-eslint/no-explicit-any");
  await expectRule("// @ts-expect-error\nconst value: string = 1;", "src/catalog.ts", "@typescript-eslint/ban-ts-comment");
});

test("permits Node access in the CLI and renderer access in exporter tooling", async () => {
  assert.ok(!(await ruleIds('import { readFile } from "node:fs/promises"; async function main() { await readFile("x"); } void main().catch(() => undefined);', "src/cli.ts")).includes("no-restricted-imports"));
  assert.ok(!(await ruleIds('import { GameCard } from "../src/react"; void GameCard;', "scripts/export.ts")).includes("no-restricted-imports"));
});
