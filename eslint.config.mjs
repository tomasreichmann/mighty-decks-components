import js from "@eslint/js";
import tseslint from "typescript-eslint";

const nodeBuiltinPatterns = [
  "assert", "buffer", "child_process", "cluster", "console", "constants", "crypto",
  "dgram", "diagnostics_channel", "dns", "domain", "events", "fs", "http", "http2",
  "https", "module", "net", "os", "path", "perf_hooks", "process", "punycode",
  "querystring", "readline", "repl", "stream", "string_decoder", "sys", "timers",
  "tls", "trace_events", "tty", "url", "util", "v8", "vm", "wasi", "worker_threads", "zlib",
].flatMap((name) => [name, `${name}/*`, `node:${name}`, `node:${name}/*`]);

const noNodeImports = {
  "no-restricted-imports": ["error", {
    paths: nodeBuiltinPatterns
      .filter((name) => !name.endsWith("/*"))
      .map((name) => ({ name, message: "Browser-facing code must not import Node built-ins." })),
    patterns: nodeBuiltinPatterns
      .filter((name) => name.endsWith("/*"))
      .map((group) => ({ group: [group], message: "Browser-facing code must not import Node built-ins." })),
  }],
  "no-restricted-syntax": ["error", {
    selector: "ImportExpression > Literal[value=/^(node:|assert$|buffer$|child_process$|cluster$|console$|constants$|crypto$|dgram$|diagnostics_channel$|dns$|domain$|events$|fs$|http$|http2$|https$|module$|net$|os$|path$|perf_hooks$|process$|punycode$|querystring$|readline$|repl$|stream$|string_decoder$|sys$|timers$|tls$|trace_events$|tty$|url$|util$|v8$|vm$|wasi$|worker_threads$|zlib$)/]",
    message: "Browser-facing code must not dynamically import Node built-ins.",
  }],
};

export default [
  { ignores: ["assets/**", "dist/**", "distribution/**", "generated/**", "node_modules/**", "output/**", "tests/consumer/**", "**/*.json"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      globals: {
        Buffer: "readonly", ResizeObserver: "readonly", URLSearchParams: "readonly",
        console: "readonly", document: "readonly", fetch: "readonly", process: "readonly", window: "readonly",
      },
    },
  },
  {
    files: ["**/*.mjs", "eslint.config.mjs"],
    languageOptions: { globals: { console: "readonly", fetch: "readonly", process: "readonly" } },
  },
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  })),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
    linterOptions: { reportUnusedDisableDirectives: "error" },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": ["error", { "ts-expect-error": "allow-with-description", "ts-ignore": true }],
      "@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: false }],
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "no-empty": ["error", { allowEmptyCatch: false }],
    },
  },
  {
    files: ["src/react/**/*.{ts,tsx}"],
    rules: noNodeImports,
  },
  {
    files: ["tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-floating-promises": ["error", {
        ignoreVoid: false,
        allowForKnownSafeCalls: [{ from: "file", name: "test", path: "node:test" }],
      }],
    },
  },
  {
    files: ["src/contracts/**/*.ts"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{ group: ["**/catalog*"], message: "Contracts must not depend on catalog data." }, { group: ["**/react/**"], message: "Contracts must not depend on rendering." }, { group: ["**/scripts/**"], message: "Contracts must not depend on tooling." }] }],
    },
  },
  {
    files: ["src/catalog.ts"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{ group: ["**/react/**"], message: "Catalog must not depend on rendering." }, { group: ["**/scripts/**"], message: "Catalog must not depend on tooling." }] }],
    },
  },
  {
    files: ["src/index.ts", "src/export.ts"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{ group: ["**/scripts/**"], message: "Library runtime code must not import scripts." }, { group: ["**/export-app/**"], message: "Library runtime code must not import exporter UI." }] }],
    },
  },
];
