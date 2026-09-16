# Maintenance Drift Guardrails Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Prevent new maintenance drift in this standalone card-component package without creating a second maintenance burden.

**Architecture:** Put deterministic rules in the existing TypeScript/test workflow plus one ESLint configuration. Use short, scoped agent instructions and one repository-local review skill for decisions that require judgment. Local hooks provide early feedback; a clean-checkout CI job provides enforcement.

**Tech Stack:** Existing pnpm, TypeScript, React, Vite, Zod, Node test runner through tsx, and Playwright; add ESLint and typescript-eslint only for the initial rollout.

---

## Scope and evidence

Based on `D:/projects/AI-OS/docs/guides/maintenance-drift-review-guide.md`, reviewed on 2026-09-16. Its governing principle applies throughout: prioritize new regressions and touched areas, and extract by responsibility rather than arbitrary size.

This is a plan only. Do not install hooks, dependencies, change behavior, or restructure components as part of writing it. During implementation, work in the current working copy and preserve unrelated work; do not create a worktree. The repository currently has no commits and all project files are untracked, so do not assume `HEAD` exists or stage everything indiscriminately.

Observed facts:

| Location | Finding | Consequence for guardrails |
| --- | --- | --- |
| `tsconfig.json` | Already enables strict mode, unused locals/parameters, override and switch checks | Retain these checks; do not duplicate them with another type checker |
| `tsconfig.json` | Excludes `export-app/main.tsx` and `vite.config.ts` | Expand authoring coverage while preserving library-only declaration output |
| `scripts/generate.ts` | Reads `../../apps/web/public`, despite standalone resource preparation in `scripts/prepare-assets.ts` | Repair this before enforcing standalone generation |
| `README.md`, `skills/mighty-decks-components/SKILL.md` | Recommend nonexistent `components:build` and `components:generate` scripts | Correct the canonical workflow and review guidance when scripts change |
| `src/react/index.tsx` | Combines text fitting, SVG rendering, lookup, compositions, wrappers, and public exports; much JSX is compressed into long lines | Responsibility review is more useful than a line-count cap |
| `src/catalog.ts`, `scripts/generate.ts` | Static presets appear in both enumeration and manifest generation | Establish one source for that shared contract |
| `tests/standalone.test.ts` | Private-source check covers only `src` and two configs, using specific text patterns | It does not protect tool scripts against sibling-repo filesystem dependencies |
| `tests/fixtures/catalog-baseline.json` | Full catalog baseline duplicates release content intentionally | Treat this as a reviewed content contract, not automatically as a bad snapshot |
| `package.json` | Public root, React, export, CSS, CSV and PNG entries plus CLI; broad `docs` and `skills` pack inclusion | Test installed-package behavior and keep maintainer-only plans/instructions out of consumer artifacts |
| Repository | No local AGENTS files, lint configuration, hooks or CI configuration found | Introduce a small coherent baseline |

Validation follow-up: fnm is installed, but its installed versions initially did not include the pinned Node 22.14.0. Installed it with `fnm install 22.14.0`, initialized the check process with `fnm env --shell powershell | Out-String | Invoke-Expression`, and selected it with `fnm use 22.14.0`. The default Node version was not changed. With Node 22.14.0 and pnpm 10.0.0, `pnpm typecheck` passed; `pnpm test` ran 13 tests, with 12 passing and one failing in `tests/static-copy.test.ts:66`: Windows returned `EPERM` when the test attempted to rename the shared `assets/` directory to `assets-unavailable-for-test`. The cause of that file lock has not been established. Existing `assets/` and `dist/` directories are ignored outputs and cannot establish clean-checkout correctness.

**Revalidation required before implementation:** The working copy evolved after the initial review. It now includes `generate:runtime`, `generate:png`, `pack:runtime`, `archive:png`, `verify:artifacts`, and additional artifact/static-copy tests. The npm package deliberately excludes PNG exports; PNGs are separate archives. These current contracts supersede the earlier PNG-package assumptions below: preserve that split, reuse the existing commands/tests, and do not restore a `/png` npm export or add redundant packaging infrastructure. Recheck which baseline repairs remain necessary before executing Task 1. In Tasks 5–6, validate runtime tarballs and PNG archives separately using the existing artifact tools. For the failing static-copy test, prefer a temporary isolated package fixture over renaming the checkout's shared assets; confirm the actual failure cause before changing the test.

## What belongs where

| Guide concern | Initial protection | Enforcement |
| --- | --- | --- |
| Oversized files | Review changed modules for mixed responsibilities; highlight renderer growth | Advisory |
| Folder sprawl | Add subfolders only for actual ownership boundaries | Advisory |
| Parallel implementations | Search existing exports/usages before adding helpers or components | Review skill |
| Dead-code sediment | Existing compiler checks plus review superseded code and dependencies | Compiler + review |
| Brittle tests | Test public behavior, domain invariants and artifacts, not CSS class names or incidental DOM | Scoped test guidance |
| Architecture erosion | Typed import restrictions and standalone/package integration tests | Lint + CI |
| Copy-and-modify | Review meaningful duplication; centralize static presets | Review + focused contract test |
| Type/error erosion | Typed lint rules for promises, unsafe values, suppression comments and empty catches | Lint |
| Dependency/config proliferation | Require a concrete gap before adding tools | Root guidance + review |
| Stale guidance | Canonical commands, scoped docs, packaged consumer skill updated together | Review + workflow smoke checks |

## Task 1: Establish a reproducible standalone baseline

**Modify:** `package.json`, `scripts/generate.ts`, `src/catalog.ts`, `tests/catalog.test.ts`, `tsconfig.json`, `README.md`, `skills/mighty-decks-components/SKILL.md`.

**Create:** `tests/generation.test.ts`.

1. Make the pinned Node runtime available, then run `node --version`, `pnpm --version`, and `pnpm install --frozen-lockfile`. Inspect the inconsistent-looking npm engine requirement alongside the pnpm pin; remove the npm requirement if npm is not a supported workflow rather than inventing a second workflow.
2. Capture results for `pnpm assets:prepare`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. Repair only failures needed to establish these checks. Record any unrelated findings separately.
3. Add a behavior test that runs CSV/manifest generation from a temporary standalone fixture containing the required project inputs, with no sibling application. Assert catalog IDs, CSV escaping and manifest presets. Before fixing the generator, verify failure is attributable to its sibling-path dependency, not missing fixture files.
4. Remove sibling-app asset copying from `scripts/generate.ts`; `scripts/prepare-assets.ts` must remain the sole path from `resources/originals` and `resources/artwork-manifest.json` to `assets/`. Preserve manifest-driven artwork aliases.
5. Export the preset definition from its existing owner in `src/catalog.ts` and derive both enumeration and the generated manifest from it. Keep the existing full/compact sizes. Do not silently add the exporter's optional compact/512 override to the standard set.
6. Define `generate:data` as `tsx scripts/generate.ts`, `generate:png` as `tsx scripts/export.ts`, and make `generate` run asset preparation followed by both. Keep data generation cheap enough for integration checks without Chromium.
7. Include `export-app/**/*.tsx` and `vite.config.ts` in authoring typechecks; keep `tsconfig.build.json` scoped to `src`.
8. Replace stale commands with the actual standalone commands. Document asset preparation before tests/build, and Chromium installation before PNG generation. Make `pack:local` use a repo-local ignored output directory rather than `../../output`.

**Acceptance:** With the pinned runtime, `pnpm assets:prepare`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm generate:data` succeed from the isolated fixture/checkout. Existing tests can explicitly depend on asset preparation; the aggregate check must provide that prerequisite.

## Task 2: Add concise scoped instructions

**Create:** `AGENTS.md`, `src/react/AGENTS.md`, `scripts/AGENTS.md`, `tests/AGENTS.md`, `docs/maintenance.md`.

**Modify:** `README.md`.

1. Keep root guidance short: package purpose, canonical verification command, standalone operation, ownership map, source-versus-output policy, reuse search, and dependency justification. Link to detailed maintainer workflow rather than duplicating it everywhere.
2. State the existing dependency direction:
   - `src/contracts` owns input schemas/types and may use Zod; it does not depend on catalog, React, CLI or tools.
   - `src/catalog.ts` owns catalog data and static presets; it may depend on contracts, not rendering or tooling.
   - `src/react` consumes catalog/contracts and browser APIs; it does not consume Node APIs, Playwright, Vite or CLI code.
   - `src/cli.ts` is the Node entry point. `scripts` orchestrate artifacts; `export-app` hosts the renderer for exports. Neither is imported by library runtime code.
   - Consumers use package exports. Internal source imports are permitted where they follow these boundaries.
3. In `src/react/AGENTS.md`, identify existing reusable rendering pieces and require a responsibility review when adding another concern to the entry file. Preserve CSS isolation, asset base behavior, accessible labeling and layout/density independence. Keep public exports stable if implementations move later.
4. In `scripts/AGENTS.md`, specify repo-local inputs, explicit output roots, validated destructive paths, observable failures, resource cleanup and staging before publication. No sibling-repository fallback.
5. In `tests/AGENTS.md`, prefer behavioral tests; retain intentional catalog baselines with reviewed updates. Geometry and asset completeness are real export contracts. CSS classes, arbitrary DOM nesting and mutable copy usually are not.
6. Put pipeline setup, check selection and justified exception policy in `docs/maintenance.md`; link it from the README. Do not create instructions in every folder.

**Acceptance:** Walk through a renderer edit, schema edit and generator edit and confirm applicable instructions have clear ownership, correct commands and no contradictory copies. Every instruction should either protect an observed contract or implement a guide concern.

## Task 3: Add one optional maintenance-review skill

**Create:** `.agents/skills/maintenance-drift-review/SKILL.md`.

**Modify:** `AGENTS.md`.

1. Adapt the ten checks from the supplied guide to the ownership map and known hotspots above. Keep it self-contained: the external `AI-OS` checkout must not be required.
2. Trigger after meaningful changes to rendering, contracts, assets/exporting or packaging, and for explicitly requested drift reviews. Do not require a lengthy review for every typo.
3. Start from changed files and affected callers. Include untracked files for an initial repository; use a supplied comparison base when available. Search overlapping symbols and usages with `rg` before recommending a new abstraction.
4. Report only actionable findings with severity (`blocker`, `important`, `minor`), location, drift, maintenance impact and smallest correction. Report no meaningful drift explicitly when appropriate. Do not turn unrelated debt into a merge condition.
5. Link the skill from root instructions for agents that do not automatically discover `.agents/skills`. Keep the existing packaged consumer skill focused on use of the library; do not put repository governance in it.

**Acceptance:** Exercise the review instructions against the known stale commands and sibling asset dependency and verify they produce specific findings. Exercise them against a small harmless edit and verify they do not demand a refactor. This is guidance, not a claim of automatic enforcement.

## Task 4: Introduce focused typed linting

**Create:** `eslint.config.mjs`, `tests/guardrails.test.ts`.

**Modify:** `package.json`, `pnpm-lock.yaml`; fix actionable lint findings in covered authored files.

1. Select mutually compatible ESLint/typescript-eslint versions that support the pinned runtime. Use one flat config covering authored TypeScript, TSX and config code. Exclude generated assets, build output, dependency directories and content JSON.
2. Enable a focused baseline: `no-explicit-any`, `ban-ts-comment` (reject `@ts-ignore`; require explained `@ts-expect-error`), `no-floating-promises` with `ignoreVoid: false`, `no-misused-promises`, unsafe assignment/argument/member/call/return checks, and `no-empty` with empty catches disallowed. Report unused disable directives. Retain compiler ownership of unused locals/parameters.
3. Address actual contracts rather than adding blanket casts or disables. Specifically inspect `void main()` in the CLI and `void document.fonts?.ready.then(fit)` in the renderer. A `void` prefix must not count as handling rejection. Allow only narrowly justified safe APIs, such as test registration if the chosen rule configuration requires it.
4. Configure file-scoped restricted imports for the ownership rules from Task 2, covering re-exports as well as imports. Forbid both `node:` and bare Node built-ins in browser-facing code; permit Node APIs in CLI/tools/tests. Handle dynamic imports explicitly because static import restrictions alone do not cover them. Test both existing relative import spellings and alternate spellings that resolve to the same forbidden module.
5. Add small ESLint-API fixture tests for allowed and rejected cases: catalog importing renderer; renderer importing Node; contracts importing catalog; library importing scripts; ignored promise; `any`; suppression without explanation. Include positive fixtures for legitimate CLI filesystem access and exporter use of the renderer. Avoid a standalone custom architecture engine; extend tooling only if these cases cannot be expressed reliably.
6. Add `lint` as `eslint . --max-warnings 0`. Fix baseline violations before making this mandatory. Any exceptional suppression needs a local reason and a removal condition; do not exempt whole source areas.

**Acceptance:** `pnpm lint` passes and fixture tests demonstrate that each boundary/error rule actually rejects its negative example. Strict TS checks remain enabled. No styling rewrite or component split is required to satisfy this task.

Technical references: [typescript-eslint promise handling](https://typescript-eslint.io/rules/no-floating-promises/) documents the `void` escape and typed-lint requirement; [ESLint restricted imports](https://eslint.org/docs/latest/rules/no-restricted-imports) documents static import restrictions. Verify selected-version configuration during implementation.

## Task 5: Protect the standalone and published-package contracts

**Create:** `tests/package.test.ts`.

**Modify:** `tests/standalone.test.ts`, `package.json`, and build/export code only if contract checks expose a failure.

1. Keep useful catalog-baseline checks. Replace or narrow the old string-based architecture check once lint covers its import restrictions; do not maintain two competing implementations of the same rule.
2. Extend the standalone fixture test to prepare assets, generate data and build without neighboring repositories. This behavior check catches filesystem coupling that import lint cannot detect.
3. Add a separate package integration command, `test:package`, and exclude its expensive test file from the default unit-test set using an explicit cross-platform runner/file list. Reuse `node:test` and tsx; do not add a new test runner.
4. Build and pack into a temporary directory, install the tarball in a minimal temporary consumer with declared peers, and verify JS imports and TypeScript resolution for `.`, `/react` and `/export`. Verify CSS/font assets, CLI executable behavior and `copy-static --out` outputs. A source-only typecheck is insufficient to test declaration paths in the tarball.
5. Narrow package inclusion to consumer content such as `docs/en` and `skills/mighty-decks-components`. Exclude `docs/plans`, `docs/maintenance.md`, repository AGENTS files, local review skills, test fixtures and tool configs. Assert representative inclusions/exclusions in the packed artifact.
6. Separate lightweight data/build packaging checks from full PNG packaging. For the full release check, install Chromium, run complete generation, then verify every standard entry has its PNG, correct dimensions and a corresponding checksum entry. Use the existing Playwright exporter rather than a second browser test framework.
7. Verify filtered exports do not destroy or overwrite unrelated catalog/PNG manifests. Current filtered export copies staging's `manifest.json` into `generated`, while data generation also writes `generated/manifest.json`; establish distinct artifact ownership if this test confirms a collision.

**Acceptance:** Lightweight package integration passes without a browser; the full release check validates CSV and PNG export paths against real generated files. A missing declaration target, missing font, private sibling dependency or manifest overwrite must fail a behavioral check. Do not require exact PNG bytes across operating systems.

## Task 6: Wire local feedback and authoritative checks

**Create:** `.githooks/pre-commit`, `scripts/install-hooks.mjs`.

**Modify:** `package.json`, `docs/maintenance.md`, `.gitignore` if new test output paths need exclusion.

**Create when the hosting provider is established:** its native CI configuration; use `.github/workflows/check.yml` only if this repository is hosted on GitHub. No remote/CI provider has been established by this review.

1. Define commands with these responsibilities:

   | Command | Work |
   | --- | --- |
   | `check:fast` | `pnpm lint && pnpm typecheck` |
   | `check` | `pnpm assets:prepare && pnpm check:fast && pnpm test && pnpm build && pnpm generate:data` |
   | `test:package` | Dedicated lightweight package integration described in Task 5 |
   | `check:release` | `pnpm check`, full PNG generation, then full package/CLI validation |
   | `hooks:install` | Run the explicit local hook installer |

2. Use native Git hooks initially, avoiding Husky/lint-staged dependencies. The installer must inspect existing `core.hooksPath` and hooks and stop with an actionable explanation rather than overwrite them. Set repository-local `core.hooksPath` to `.githooks` only when safe. Do not change global Git config or auto-install hooks for package consumers.
3. Have the pre-commit hook run `pnpm check:fast` over the small authored tree, read-only, with no automatic formatting or staging. This avoids staged-file list portability and partial-staging mutation problems. Document that unrelated working-tree errors can block the local hook; CI validates the actual committed checkout. Ensure LF line endings and executable mode for Git on Unix; verify Git for Windows execution.
4. Measure runtime. Keep browser work, packaging and full generation out of pre-commit. If typed checks become disruptive, move typechecking to CI before adding a complex staged-file framework.
5. CI uses the pinned Node/pnpm versions, frozen lockfile installation, `pnpm check` and `pnpm test:package` in a clean checkout. Linux runs on every PR; run Windows coverage for the exporter/packaging because existing code explicitly handles Windows file operations. Full Chromium generation belongs in release validation, with a representative smoke export on relevant PR changes if affordable.
6. Configure the actual CI check as required in repository hosting settings when available. Hooks can be bypassed and do not provide central enforcement. Do not claim enforcement until the remote required-check setting is verified.

**Acceptance:** In a disposable temporary Git repository, hook installation preserves existing hooks/config, works before the first commit and rejects a seeded lint violation. A clean checkout runs the complete standard check without local ignored artifacts. CI fails for a seeded dependency-boundary violation and missing package export target. Remove temporary violations afterward.

## Rollout and deliberate exclusions

Implement Tasks 1–4 first, then package coverage and hooks/CI. Keep baseline repair, guidance and enforcement as separate reviewable changes; commit only intended files when committing is authorized. Do not enable a gate whose required baseline is known to fail.

Do not add these initially:

- Hard line-count, complexity or folder-size gates: the current compressed renderer makes line counts misleading, and arbitrary extraction would create churn.
- Automatic duplicate-code blockers or naming bans such as `New*`: intentional component variants and trivial wrappers need judgment.
- Knip, dependency-cruiser, extra test runners, or a custom drift dashboard: first establish the existing compiler, lint and package boundaries. Reconsider unused-export tooling when the public API grows enough that manual review misses dead internals.
- Prettier/Stylelint solely for this task: formatting is useful but does not establish the maintenance contracts under review. A separate formatting decision can make the renderer more readable later.
- Blanket snapshot bans or mass baseline replacement: the catalog fixture is a deliberate release-content assertion.
- A broad renderer refactor: identify useful extraction boundaries in review, then change them only when feature work or a concrete maintenance issue warrants it.
- Per-folder agent files everywhere, copied rulebooks, or runtime dependencies on the external guide repository.

After two or three meaningful changes, review hook duration, false positives and whether the skill caught actionable drift. Remove noisy rules, adjust narrow exceptions with reasons, and add a new hard rule only for a recurring, deterministic failure.

## Completion checklist

- [ ] Pinned toolchain works and clean-checkout baseline is recorded.
- [ ] Generation no longer reads a sibling application; presets have one owner.
- [ ] Scoped instructions and the local review skill describe existing boundaries accurately.
- [ ] Lint negative fixtures prove type/promise and dependency restrictions.
- [ ] Export app and Vite configuration participate in typechecking.
- [ ] Package tests validate consumer imports, types, CLI and artifacts.
- [ ] Maintainer plans and guidance stay out of the consumer tarball.
- [ ] Local hooks work without overwriting user configuration or staging files.
- [ ] CI runs the same checks; required-check settings are verified when a host is available.
- [ ] Full release export passes with Chromium, including manifest ownership and asset checks.
- [ ] Stale commands are corrected and no unrelated cleanup was required.
