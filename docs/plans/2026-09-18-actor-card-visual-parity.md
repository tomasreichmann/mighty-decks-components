# Actor Card Visual Parity Implementation Plan

> **Execution:** Use superpowers:executing-plans to implement this plan task by task. Work in the current directory and preserve unrelated changes. This document records research and planned work; it does not claim implementation or regenerated artifacts.

**Goal:** Match the referenced Actor bases, tactical roles, and specials in full-size React cards and composable PNGs, including artwork, typography, icon mechanics, headers, and layer alignment.

**Architecture:** Keep presentation records in the owned catalogue and types in `src/contracts`. Add a small internal Actor presentation component shared by `GameCard` and `ActorCard`, retaining the existing SVG/export pipeline and public entry points. Import the necessary original assets once; never depend on the prototype repository at runtime or build time.

**Tech Stack:** TypeScript, React 18, CSS modules, SVG/foreignObject, existing Playwright/Chromium export tooling, Node tests, pnpm.

## Reference and evidence

Inspected on 2026-09-18:

- [Base Actor Cards](https://board-game-prototypes.netlify.app/mighty-decks/preparing-the-game/base-actor-cards): paper bases, central illustration, and a miniature of that illustration at the upper left. No role title or mechanical rules on the base.
- [Base Tactical Roles](https://board-game-prototypes.netlify.app/mighty-decks/preparing-the-game/base-tactical-roles): transparent role/special layers, small deck/type headers, handwritten titles, and rows of colored mechanical icons. White is the print sheet behind the overlays, not an overlay background.
- [Source directory pinned to the inspected revision](https://github.com/tomasreichmann/board-game-prototypes/tree/cefe6918d34fc302a31fcb7676d97a43d7e1f15b/src/prototypes/kick-ass-cards/components/gameComponents).

The source chain for these specific pages is:

1. `components/preparingTheGame/BaseActorCardsPrintControls.tsx` and `BaseTacticalRolesPrintControls.tsx`.
2. `components/gameComponents/LayeredActorCard.tsx` → `LayeredCard.tsx` → `Card.tsx`.
3. `data/tactical-roles.ts`, `data/actors-deck.ts`, original images, fonts, and theme styles.

All paths in that list are relative to upstream `src/prototypes/kick-ass-cards/`. The older upstream `ActorCard.tsx`, `TacticalRoleOverlay.tsx`, and `ActorCardWithTacticalOverlay.tsx` are **not** the renderers used by the linked pages. Do not port their layout accidentally.

Local evidence: inspected `src/react/index.tsx`, `cards.module.css`, catalogue/contracts, asset preparation, export validation, and existing Actor tests, plus `generated/png/en/actor-base/animal_blue/full/512.png` and `generated/png/en/actor-role/minion/full/512.png`. The generated base has a brown rounded outline and no miniature; the generated role uses prose. These observations establish the gaps, not a measured pixel-difference baseline. Live deployment-to-source revision equivalence remains to be verified during baseline capture.

## Scope and decisions

- Match **full** Actor fronts: base alone, role alone, special alone, and their composition. Include all 16 roles and 24 specials, plus every existing base; do not import upstream print-copy multiplicities into the catalogue.
- Preserve public slugs, asset-base URLs, custom Actor content, effect overrides, catalogue descriptions, CSS isolation, and existing full output sizes (629×1024 and 315×512).
- Keep compact 157×256 as the existing reduced-detail product. Verify it remains usable, but do not claim parity with a compact upstream reference that was not provided.
- Preserve plaintext descriptions as accessible/consumer-facing mechanics. Add structured presentation data; do not reverse-parse English descriptions into icons.
- Match the source's role/bonus columns and special footer. Showing a bonus symbol alongside its explanatory footer is intentional reference behavior; do not also add it into the role's base totals.
- The layered upstream renderer does not render a separate speed row despite `speed` being present in its data. Preserve movement in descriptions/accessibility rather than inserting a new visible row. Fast retains its visible special explanation.
- Keep the current export canvas contract. Upstream print settings use 54×86 mm plus 3 mm bleed; this is not the same aspect ratio as 204×332. Normalize reference captures to the package canvas and record that adaptation explicitly. Exact physical print-size parity would require a separately agreed export-contract change.
- Exclude print controls, page layout, crop marks, bleed, card backs, deployment, and publishing. Do not copy the apparent upstream tactical back-face label typo (`Asset`).
- This supersedes the earlier overlay plan's deferral of icon-layout work. Existing description, transparency, and asset checks remain valuable but must be adapted to the icon rendering contract.

## Gap map

| Area | Current package | Reference target / action |
| --- | --- | --- |
| Base | Generic rounded brown outline; artwork only | Paper treatment, reference art scale/placement, miniature at upper left; distinguish print edges from card decoration |
| Overlay header | Hidden whenever `transparent` is true | Role `base` header with Actor icon; special `base mod` header rotated as in source |
| Titles | Generic 16/20-unit adjective/noun sizes | Measure reference title font, weight, line height and baseline; retain empty title slots for composability |
| Main mechanics | Centered paragraph at 11 units | Toughness row then ordered action rows; role occupies the left two-thirds, bonuses the right third, with source-sized gap |
| Special mechanics | Footer prose only | Toughness/action bonuses aligned to the role rows plus tokenized footer |
| Icon text | `ActorCardTextWithIcons` returns raw text | Render recognized bracket tokens, repetitions, and ordinary text using owned icon assets |
| Overlay artwork | Same box as base art; rendering depends on base image | Source overlay is scaled 150%, shifted upward 18%, with a top fade; works standalone and composed |
| Data | Descriptions but no structured actions/bonuses | Capture source presentation fields, including order, counts, replacement markers and optional rows |
| Export validation | Requires exact prose in main/footer | Verify semantic content, visible icon inventory, geometry, asset loading and fit |

## Task 1: Freeze the visual target

**Files:** Create `docs/actor-card-parity.md` and `tests/fixtures/actor-parity/reference.json`; store temporary comparison images under ignored `output/actor-parity/`.

1. Record the pinned upstream commit, live URLs, capture date, Chromium version, viewport, device scale, font readiness, and reference print settings. Check whether the live rendering agrees with the pinned source before treating them as interchangeable.
2. Capture individual front-card regions, separating trim, bleed and page decoration. Measure art bounds, miniature position, title baselines, header transform, rule rows, column gap, footer bounds, colors, and font metrics in normalized card coordinates.
3. Capture Animal Blue and a tall/asymmetric base, Pawn, Minion, Tank, Skirmisher, Sniper, Artillery, Tough, Armoured, Fiery, Charging and Fast. Capture a long-footer special as well. Inspect later sheets, not only the first repeated Pawn row.
4. Record the intentional aspect-ratio adaptation and card-edge decision. Remove the package's synthetic brown stroke for Actors if comparison confirms it has no counterpart; do not infer square screen corners solely from print output.
5. Define reference cases by stable family/slug and composition, not upstream DOM position. Save measured anchors and source provenance in the fixture; keep large exploratory screenshots outside authored assets.

**Validation:** Each target case has an identifiable reference and measured geometry. No implementation values are invented from the first screenshot. This task supplies the exact coordinates for Task 4.

## Task 2: Own the mechanical presentation data and assets

**Files:** Create `src/contracts/actorPresentation.ts`; modify `src/catalog.ts`, `src/data/catalog.en.json`, `resources/artwork-manifest.json`, `tests/catalog.test.ts`, `tests/fixtures/catalog-baseline.json`, and `docs/migration-baseline.md`. Add required files under `resources/originals/textIcons/`; update `NOTICE`/`LICENSES` only where the imported assets require it.

1. Define a minimal optional `actorPresentation` field on catalogue records. Its contract covers `toughness`, ordered `actions` (structured action or icon-text string), `toughnessBonus`, nullable ordered `actionBonuses`, and icon-text `special`. Structured actions retain type, count, ordered effects/joins, splash, and range. Keep deck and artwork path in their existing fields.
2. Transcribe all 40 role/special records from pinned `data/tactical-roles.ts`, preserving ordering and null slots. Set role deck to `base` and special deck to `base mod`. Use existing `artworkPath` for special art; do not synthesize a filename for absent artwork.
3. Audit semantics against retained English descriptions. Cover Tank's six toughness icons, Skirmisher's repeated attacks, Sniper/Artillery infinity range, Artillery's single action, Tough's bonus without footer, Fiery's secondary replacement, and Charging's conditional double injury.
4. Inventory the actual token names from all records. Copy only the referenced original text icons, including action, effect, replacement, range and splash symbols, with provenance. `[injury2]` means two injury icons, not an `injury2.png` requirement.
5. Compare the existing paper/art assets with upstream originals before copying replacements. Reuse matching files and the existing asset-preparation pipeline; do not add a second asset loader or network dependency.
6. Update catalogue baseline/content-version policy deliberately, preserving record IDs and count. Add coverage for field completeness, action order, and valid icon references.

**Validation commands:**

```powershell
rtk pnpm assets:prepare
rtk pnpm exec tsx --test tests/catalog.test.ts tests/standalone.test.ts
```

Expected: all owned icon paths exist and semantics/order match the source. Do not weaken baseline tests to accept arbitrary changes.

## Task 3: Implement icon text and Actor rule rows

**Files:** Create `src/react/actorPresentation.tsx`; modify `src/react/index.tsx`, `src/react/cards.module.css`, and `tests/catalog.test.ts`.

1. Replace the public `ActorCardTextWithIcons` stub with an internal implementation re-exported under the same name. Preserve the existing `text` prop; add optional `assetBaseUrl` with the package default.
2. Recognize `[name]` and positive repetition suffixes such as `[toughness6]`. Preserve ordinary text, whitespace, punctuation, `+`, `/`, `|`, parentheses, and infinity. Unknown/malformed tokens remain readable literal text rather than broken URLs. Use a known asset map and bound repetition for public input.
3. Provide meaningful accessible text for token sequences; prevent decorative repeated images from producing repetitive announcements. Resolve every icon through the same asset-base mechanism as card artwork.
4. Render the toughness row and ordered action rows with repeated effect icons, action count prefixes, splash and range. Match the source distinction between `2x` attacks and two effect icons.
5. Render special bonuses in corresponding right-column rows, retaining empty slots. Render the special's icon-text footer separately. Do not invent missing attacks or calculate gameplay totals.
6. Add focused behavioral tests for repeated tokens, literal fallback, custom asset base, action ordering/counts, optional rows, and Fiery's secondary-only bonus. Avoid snapshots coupled to incidental nesting or class names.

**Validation:** Run `rtk pnpm exec tsx --test tests/catalog.test.ts` before/after the implementation; new behavioral cases should first fail against the stub and then pass. Existing plaintext descriptions remain available to consumers.

## Task 4: Apply measured Actor geometry and unify composition

**Files:** Modify `src/react/actorPresentation.tsx`, `src/react/index.tsx`, `src/react/cards.module.css`, `export-app/main.tsx`, and `tests/catalog.test.ts`.

1. Reuse the existing card shell/text fitting where appropriate. Keep Actor geometry scoped to Actor rendering; do not globally reposition Outcome, Asset, Stunt, or Counter cards to match this reference.
2. Implement the measured paper, base art and upper-left miniature. Make base-only `GameCard` and base-only `ActorCard` agree, including header ownership and accessible naming.
3. Allow headers on transparent Actor overlays. Use catalogue deck labels, correct icon size and reference rotation/origin for the special header.
4. Place adjective, noun, role rows, bonus rows and footer in fixed shared coordinates from Task 1. Empty slots still reserve their region. A standalone special must occupy precisely the same bonus/footer space as a composed special.
5. Render special art independently of base-image presence. Apply the reference scale, offset and fade identically for standalone and composed modes. Avoid clipping enlarged special art to the old base-art rectangle.
6. Route `GameCard` Actor families and `ActorCard` through this presentation implementation. Preserve custom cards and explicit `nounEffect`/`adjectiveEffect` overrides; specify/test override precedence rather than rendering duplicate default content.
7. Extend the existing export-app preview with a small deterministic Actor comparison set: layers individually, stacked layers, and composed React cards. Keep inspection controls out of the public runtime API.
8. Check compact base/role/special and custom cards, including a visible special title. Preserve non-Actor appearance with representative before/after captures.

**Validation:** `rtk pnpm check:fast` and focused catalogue tests pass. At both full sizes, layer stacks and composed cards have matching content/geometry, no unintended opaque overlay background, and no clipped artwork or mechanics. Review white, dark, and checkerboard backdrops.

## Task 5: Make export checks understand icon mechanics

**Files:** Modify `scripts/export.ts`, `tests/generation.test.ts`, and `tests/incremental-export.test.ts` as needed; create `scripts/verify-actor-parity.mjs` and a `verify:actor-parity` script in `package.json`. Reuse the existing export-app and installed Playwright.

1. Replace the current `inner.textContent === description` requirement for structured Actors. Validate expected role/action/bonus/footer regions and semantic values from the owned presentation record. Preserve prose validation for explicit prose fallback cases.
2. Require fonts and all HTML/SVG images to load, then require fitting to settle before capture. Check every populated mechanics region for overflow; a hidden accessible description is not proof that icons are visible.
3. Add a focused browser verification command that checks the reference cases, captures before/after comparison artifacts, and asserts normalized anchor tolerances. Keep browser orchestration in scripts, outside runtime code.
4. Compare standalone PNG stacking with composed React output. Compare actual full PNG dimensions, alpha, artwork transforms and row anchors; DOM-only tests are insufficient.
5. Prove failures for a missing icon, clipped rule row, omitted secondary bonus and missing special art. Keep these as test fixtures/controlled cases, not production mutations.
6. Check incremental fingerprinting includes new renderer files, presentation data and icon assets. A cache hit must not keep old prose PNGs after this change.

**Acceptance tolerance:** With one pinned browser/font environment, target anchor differences of at most 1 logical unit on the 204×332 canvas. Compare normalized reference captures visually at 100% and enlarged scale. Document antialiasing differences rather than imposing an uncalibrated whole-card pixel percentage. Fixed local regression fixtures should catch later geometry/content changes; they must not merely bless the new implementation as its own upstream reference.

**Validation commands:**

```powershell
rtk pnpm exec tsx --test tests/generation.test.ts tests/incremental-export.test.ts
rtk pnpm verify:actor-parity
```

The second command is introduced by this task; it does not exist at plan-writing time.

## Task 6: Regenerate, review, and document the result

**Files:** Generated artifacts from the existing pipeline; update `docs/actor-card-parity.md`, `docs/maintenance.md`, and relevant Actor usage guidance in `README.md`.

1. Run the normal package gate and generate a small diagnostic set sequentially:

   ```powershell
   rtk pnpm check
   rtk pnpm generate:png --type actor-base --id animal_blue --layout full --height 1024
   rtk pnpm generate:png --type actor-role --id minion --layout full --height 1024
   rtk pnpm generate:png --type actor-special --id armoured --layout full --height 1024
   ```

2. Open those exact PNGs and run the composition comparisons. Resolve discrepancies before full generation. Filtered exports write a filtered manifest and are not the final inventory.
3. Run `rtk pnpm generate:png` sequentially, then `rtk pnpm verify:actor-parity`. Validate the complete manifest's paths/checksums. Normal `pnpm check` does not render PNGs.
4. Inspect all role/special contact sheets at both full sizes and representative bases, plus compact regressions. Explicitly check dense toughness, repeated attacks, replacement/conditional bonuses, single-action roles, long footer copy, and the absence of unintended backgrounds.
5. Confirm new runtime icon assets are included by distribution preparation/verification. Use the actual current package scripts: `release:check` exists; `check:release` currently does not, despite the root instruction mentioning it. Do not claim a release check passed without preparing its required artifacts.
6. Apply the local `maintenance-drift-review` skill to the implementation. Check there is one Actor presentation path, stable public exports, no external repository imports, no unneeded dependencies, and no stale text-only export checks.
7. Record intentional differences, reference revision, commands actually run, comparison outputs and regenerated inventory. Review only the task's diff; the working copy already contains unrelated packaging/release changes. Do not stage or commit those implicitly.

## Definition of done

- All full Actor layers reproduce the measured reference hierarchy: miniature/art, headers, titles, role icons, aligned special bonuses and footer.
- All 16 roles and 24 specials have complete, correctly ordered mechanical presentation; source copy multiplicities do not create catalogue duplicates.
- Base → role → special PNG composition matches the shared React composition at 1024 and 512 output heights.
- No clipping, broken images, wrong token repetition, missing optional-art handling, or opaque overlay rectangle appears in the verification matrix.
- Plaintext descriptions, custom props, accessible labels, asset-base behavior, compact output, and non-Actor renderers remain supported.
- Reference geometry checks, focused behavioral tests, `pnpm check`, browser/export checks, and complete artifact checksum verification pass.
- The report explicitly distinguishes visual parity within the existing canvas from upstream physical print dimensions, bleed, and backs.

## Execution order

Run Tasks 1–6 in order. Review a representative base + role + special composition after Task 4 before producing the complete PNG set. Prefer small reviewable commits for reference/data, rendering, and validation/artifacts if committing is requested; this planning task does not implement or commit them.
