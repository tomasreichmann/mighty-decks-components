# Actor Overlay Generation Implementation Plan

> **Execution:** Use superpowers:executing-plans to implement this plan task by task. Work in the current working copy; preserve unrelated changes. This document is a plan, not an implementation or regeneration record.

**Goal:** Generate transparent Actor Role and Special PNG overlays with complete, correct mechanical descriptions, and verify the actual files compose with Actor bases.

**Architecture:** Keep presentation data in the owned catalogue and render both React cards and PNG exports through the existing renderer. An Actor consists of an opaque illustrated base, a transparent role layer, and an optional transparent special layer. The export script generates and validates artifacts; no runtime or build dependency on the Storyteller repository is introduced.

**Tech stack:** TypeScript, React, SVG, Vite, Playwright/Chromium, Node test runner, pnpm.

## Evidence and scope

- The reported `generated/png/en/actor-special/armoured/full/1024.png` and `generated/png/en/actor-role/artillery/full/1024.png` were inspected. Both lack descriptions and have September 16 timestamps.
- The current working copy contains the earlier fix: descriptions for 16 roles and 24 specials, transparent-layer text rendering, and ActorCard description wiring. Preserve and audit those changes rather than implementing them again.
- `pnpm check` prepares assets, generates catalogue/CSV data, lints, type-checks, tests, and builds. It does **not** render PNGs. The earlier verification therefore did not update the files the user consumes.
- `scripts/export.ts` renders `GameCard` through `export-app/main.tsx`. Filtered exports replace matching PNGs and write `generated/png-manifest.filtered.json`; they do not update the complete `generated/png-manifest.json`.
- Storyteller references, read-only: `apps/web/src/data/actorCards.ts`, `apps/web/src/components/cards/ActorCard.tsx`, and `ActorCardTextWithIcons.tsx` under `D:/projects/mighty-decks-ai-storyteller`. Its renderer shows role toughness/actions, special bonuses, and a special footer. The package currently transcribes mechanics as English text rather than reproducing that icon layout.
- Rules-page content belongs to a separate plan in Storyteller. Do not edit that repository as part of this work. Do not deploy or publish a release.

## Required layer contract

| Layer | Visible content | Background and placement |
| --- | --- | --- |
| Actor base, e.g. Civilian | Base artwork/symbol | Opaque card background; no role or special rules |
| Actor role, e.g. Minion | Role title, toughness, movement, each available attack with count, effect, range and splash | Transparent; title and main mechanical text area |
| Actor special, e.g. Fast | Special title, overlay artwork where defined, complete special description | Transparent; adjective title and bottom description area |

All layers use the same canvas and coordinates. Stacking base → role → special must preserve the information in each layer. Show special bonuses once; do not silently turn role statistics into computed totals while also displaying the same bonus separately. Do not invent a melee or secondary attack for roles that lack one.

Full presets are 629×1024 and 315×512. Compact 157×256 is an existing reduced-detail preset: keep it distinct from full rules cards, preserve meaningful titles for both roles and specials, and document that it omits descriptions. The current compact renderer uses only the noun, while specials use the adjective; test and correct that blank-title case. Do not change full-card requirements to fit compact thumbnails.

## Task 1: Audit and lock down mechanical text

**Files:** `src/data/catalog.en.json`, `tests/catalog.test.ts`, `tests/fixtures/catalog-baseline.json`, `docs/migration-baseline.md`.

1. Compare all 40 existing descriptions with the read-only Storyteller data. Check repeated attacks, conditional effects, replacement versus additional effects, armour, healing, range, and splash. Keep the provenance note accurate.
2. Add focused expected-content tests for these representative contracts, in addition to the existing all-cards nonempty checks:
   - Minion: Toughness 2, movement 1 zone, melee 1 Injury, ranged 1 Injury at range 1–2.
   - Artillery: Toughness 2, movement 1 zone, ranged 2 Injuries with splash at range 1 or more; no invented melee attack.
   - Armoured: 2 fewer Injuries taken.
   - Fast: moves an extra zone per turn.
   - Tough: +2 Toughness despite having no original `special` string.
   - Fiery and Charging: preserve replacement and conditional bonus semantics respectively.
3. Run `pnpm exec tsx --test tests/catalog.test.ts`. Correct any demonstrated copy errors in the owned catalogue and deliberately update the baseline fixture. Do not add sibling imports or a permanent cross-repository generation script.

## Task 2: Verify rendering and composition

**Files:** `src/react/index.tsx`, `tests/catalog.test.ts`; use `export-app/main.tsx` for browser previews.

1. Extend behavioral coverage to assert that role text appears in the main area and special text in the footer, including a combined Civilian + Minion + Fast card. Keep custom Actor descriptions and explicit effect overrides working.
2. Add a compact-special title regression test, run it to observe the current failure, and make the smallest renderer correction.
3. Inspect actual overlays stacked over the Civilian base at identical dimensions. Compare content and placement with the combined React card. Check artwork blending as well as text: combined artwork currently uses opacity 0.8, while standalone artwork is opaque. Resolve any visible composition discrepancy consistently in the shared renderer.
4. Verify empty optional fields produce no placeholder text; role and special regions do not collide; overlays introduce no opaque rectangle. Preserve other card families' behavior when changing shared `LayeredCard` logic.
5. Run the targeted tests and `pnpm check:fast`. Keep English descriptions as the scope of this fix; a complete icon-layout redesign is not required to regenerate correct overlays.

## Task 3: Add export-time checks that catch missing descriptions

**Files:** `scripts/export.ts`; keep browser-only verification in export tooling, not library runtime code. Add a focused test in an existing suitable test file, or a dedicated export test with its package-script entry if needed.

1. Before screenshot capture, require the expected catalogue description in full Actor role/special cards. A missing description must fail the export with family, slug, and preset identified.
2. After fonts load and text fitting settles, verify that the description's inner element fits its SVG foreignObject container. DOM presence alone does not prove visible text. Avoid fixed timing sleeps as a readiness contract.
3. Retain geometry, asset, and browser-error checks. SVG `<image>` resources are not covered by `document.images`; cover SVG resource failures when validating Actor artwork.
4. Exercise a missing-text and an overflow failure without permanently changing production copy, then restore normal inputs and verify successful export. Keep assertions on behavior, not CSS class names or a whole-card pixel snapshot.
5. Before recursive output cleanup, validate resolved staging/output paths are inside the intended package output roots, as required by `scripts/AGENTS.md`. Run exports sequentially because they share `.export-staging`.

## Task 4: Generate the files and inspect them

**Generated outputs:** `generated/png/en/actor-role/**`, `generated/png/en/actor-special/**`, `generated/png-manifest*.json`. Never hand-edit PNGs or manifests.

1. Run `pnpm check` to refresh data and verify the package. Install Chromium with `pnpm exec playwright install chromium` only if missing.
2. Produce small diagnostic exports, sequentially:

   ```powershell
   pnpm generate:png --type actor-special --id armoured --layout full --height 1024
   pnpm generate:png --type actor-role --id artillery --layout full --height 1024
   ```

3. Open the **exact files** named by the user. Inspect on a light background or over a base card so transparent areas are not confused with black pixels. Verify text, transparency, dimensions, clipping, and alpha around the card. Compare hashes with the old files; changed timestamps alone are insufficient.
4. Inspect Civilian + Minion + Fast as three stacked PNG layers, plus Artillery + Armoured. Check 1024 and 512 full presets and the compact title behavior.
5. Run unfiltered `pnpm generate:png` to refresh the complete PNG inventory and authoritative PNG manifest. This currently renders 265 cards × 3 presets = 795 PNGs, including 120 role/special PNGs. A pair of filtered exports is not the final deliverable because it leaves the full manifest stale.
6. Check every complete-manifest path exists and its SHA-256 matches the file. Confirm all 40 Actor descriptions are present in full-size export DOM checks and that all 80 full Actor overlays passed overflow checks. Inspect representative generated PNGs visually, not just browser previews.
7. Do not archive or publish as part of this task. If release archives are separately requested, rebuild them only from this complete regenerated manifest and run the repository release checks.

## Task 5: Document and hand off

**Files:** `docs/maintenance.md` and, if necessary, the PNG usage section of `README.md`.

1. State that source/data checks do not refresh PNGs. Document `pnpm generate:png`, full versus filtered manifest ownership, and sequential exporter execution.
2. Document full overlays as composable rules-bearing layers and compact images as reduced-detail thumbnails.
3. Review the diff using the local maintenance-drift-review skill. Preserve unrelated `.vscode/` and existing working-copy changes.
4. Report commands actually run, artifact counts, manifest/hash verification, and links to the two corrected PNGs. State explicitly if generation is incomplete; do not claim generated files are fixed based only on React tests.

## Acceptance criteria

- The user's exact Armoured and Artillery 1024 PNGs visibly contain their correct descriptions.
- All 16 role and 24 special full overlays render complete mechanics without clipping at both supported full resolutions.
- Civilian + Minion + Fast composes into an illustrated card with Minion mechanics and Fast's bottom description; no duplicated or obscured rules.
- Transparent overlays retain alpha and matching geometry; compact specials have a visible title and documented reduced detail.
- The complete generated inventory and manifest checksums agree with the current source.
- `pnpm check`, targeted export checks, and visual inspection pass. No sibling-repository dependency, generated-file hand edits, or publication is introduced.
