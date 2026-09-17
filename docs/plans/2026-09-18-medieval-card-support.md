# Medieval Card Support Implementation Plan

> **Execution:** Use superpowers:executing-plans to implement this plan task by task. Work in the current directory, preserve unrelated/concurrent changes, and re-read the renderer before editing it. This document is an audit and plan, not an implementation record.

**Goal:** Add the missing 40 medieval Actor portraits and 48 medieval Location cards to the owned catalogue, React rendering, runtime assets, CSV data and PNG exports, while preserving the 47 medieval assets already supported.

**Architecture:** Extend the existing catalogue and export pipeline, using `actor-base` with `deck: "medieval"` for portraits and the existing contract family `location` for locations. Implement small internal portrait/location renderers with a shared image-card shell only where it actually reduces duplication. Keep upstream data and art as pinned, locally owned inputs, with no build-time or runtime fetches.

**Tech Stack:** TypeScript, React, CSS modules/SVG, existing asset preparation, Vite, Playwright/Chromium, Node tests and pnpm. No new dependencies planned.

## Inclusion audit — 2026-09-18

| Requested set | Reference inventory | Current package | Result |
| --- | --- | --- | --- |
| [Medieval Asset Cards](https://board-game-prototypes.netlify.app/mighty-decks/preparing-the-game/medieval-asset-cards) | 47 distinct medieval records | All 47 records, 47 original/runtime artwork files, and 141 PNGs across three presets | Included; five text differences need documenting/reconciliation |
| [Medieval Actors](https://board-game-prototypes.netlify.app/mighty-decks/preparing-the-game/medieval-actors) | 48 print slots, 40 unique portraits | No medieval Actor records or corresponding owned artwork | Missing |
| [Medieval Locations](https://board-game-prototypes.netlify.app/mighty-decks/preparing-the-game/medieval-locations) | 48 active locations | No Location records or corresponding owned artwork; generic `LocationCard` only | Missing catalogue/render/export support |

The 141 medieval asset PNG files exist and their SHA-256 checksums match the current full PNG manifest. This confirms artifact inclusion/integrity, not pixel parity or freshness against every concurrent source edit. Local medieval asset slugs match all 47 upstream medieval slugs after trimming upstream whitespace; there are no missing asset cards.

The asset page uses `AssetCardsPrintControls.tsx`, which selects all non-sci-fi assets, not exclusively medieval records. Its visible 175 items are repeated print copies, not 175 unique medieval cards. The package also includes 22 base assets, for 69 `asset-base` records total. Do not import duplicate records to match a print counter.

All three live pages were visually inspected after images loaded. Source inspected at commit **`cefe6918d34fc302a31fcb7676d97a43d7e1f15b`**:

- [Print-control sources](https://github.com/tomasreichmann/board-game-prototypes/tree/cefe6918d34fc302a31fcb7676d97a43d7e1f15b/src/prototypes/kick-ass-cards/components/preparingTheGame): `AssetCardsPrintControls.tsx`, `MedievalActorCardsPrintControls.tsx`, `MedievalLocationsPrintControls.tsx`.
- [Asset records](https://github.com/tomasreichmann/board-game-prototypes/blob/cefe6918d34fc302a31fcb7676d97a43d7e1f15b/src/prototypes/kick-ass-cards/data/assets-en.csv).
- Upstream public art directories: `public/mighty-decks/actors/medieval/`, `public/mighty-decks/locations/medieval/`; shared reference images include `actor.png`, `map.png`, and `paper.png`.

The upstream folders contain 41 Actor PNGs and 50 Location JPGs, more than the pages use. Import the active page inventories, not every file in those directories. Town Hall is commented out of the locations list.

### Asset text differences

| Existing slug | Difference from pinned upstream | Treatment |
| --- | --- | --- |
| `medieval_plate_armor` | Local copy abbreviates the protection wording | Record as wording adaptation; verify equivalent meaning |
| `medieval_hand_cannon` | Local range 0–2; upstream range 1–2 and a same-zone −1 Effect rule | Explicit mechanics discrepancy; reconcile provenance before changing |
| `medieval_cannon` | Local range 1+; upstream range 2+, −1 Effect at range 1, and cannot target the same zone | Explicit mechanics discrepancy; reconcile provenance before changing |
| `medieval_key` | Missing terminal question mark locally | Copy difference |
| `medieval_ore` | Missing terminal question mark locally | Copy difference |

The current catalogue was captured from Storyteller, not directly from this prototype revision. Do not silently overwrite its gameplay copy as a side effect of adding missing sets. Record whether these are intentional adaptations; if the source history does not settle the two mechanical differences, leave existing behavior and identify the decision for review. Missing Actor/Location support does not depend on that decision.

## Support contract and relationship to Actor parity

- This is a companion to [the Actor visual-parity plan](2026-09-18-actor-card-visual-parity.md), not a replacement. Its tactical icon rules apply to layered Actor cards. The medieval page uses a separate local `ImageCard` with full-height portrait art, miniature, `medieval` deck label and Actor corner icon; it has no visible name or tactical rules.
- Add medieval portraits as `actor-base` records with stable namespaced slugs, e.g. `medieval_villager` and `medieval_female_villager`. Store actual artwork paths; never derive medieval paths using the current base-only underscore replacement.
- `GameCard` renders a medieval portrait faithfully. `ActorCard` with only a medieval base should render the same portrait. If a tactical role/special is explicitly supplied, use the shared tactical layout with the resolved medieval artwork so rules remain legible; document this as a composition adaptation rather than the reference portrait layout.
- Add static `location` catalogue support while keeping `encounter` and `quest` outside the static catalogue. `location` already exists in `src/contracts/cardExport.ts`, but `src/catalog.ts` currently excludes it.
- Keep existing `LocationCard({ title, description, imageUrl, imageAlt })` behavior compatible. Route catalogue-backed locations through `GameCard`; no replacement of the generic scene component or new public wrapper is necessary.
- Keep current export dimensions: full 629×1024 and 315×512; compact 157×256. Full Locations reproduce the reference's 90-degree scene rotation with an upright header. Compact versions use the same scene orientation and a legible simplified header; they are an adaptation, not a claim of compact upstream parity.
- Match card fronts within this canvas. Exact 54×86 mm print geometry, bleed, duplex sheet reversal, copy counts and card backs are outside this support increment. Retain provenance for the existing Location back face, but do not count it as a supported export.

## Task 1: Lock the missing inventories and IDs

**Files:** Create `tests/fixtures/medieval-card-inventory.json`; update `docs/migration-baseline.md`.

1. Capture active page records at the pinned revision with source path, display title, proposed family/slug and artwork path. Preserve source order while deduplicating repeated Actor image URIs.
2. Actor inventory: 20 portraits under `/actors/medieval/` and 20 under `/actors/medieval/female/`. The first group is `villager`, `alchemist`, `aristocrat`, `bandit`, `beggar`, `child`, `craftsman`, `elder`, `farmer`, `hunter`, `idiot`, `knight`, `marksman`, `merchant`, `militia`, `pikeman`, `priest`, `rogue`, `scholar`, `shopkeeper`. The female group uses the same names except `crazy-cat-lady`, `nun`, and `scribe` replace `idiot`, `priest`, and `scholar`. Keep these distinct identities; infer no gameplay roles from their names.
3. Location inventory (source filename stems): `dungeon`, `forrest`, `garden`, `graveyard`, `harbor`, `lake`, `market`, `mine_shaft`, `pantry`, `pasture`, `quarry`, `road`, `servants_quarters`, `sewer`, `swamp`, `tavern`, `town_square`, `townhouse_bath_room`, `townhouse_bedchamber`, `townhouse_corridor`, `townhouse_dining_room`, `townhouse_nursery`, `townhouse_study`, `village`, `vine_cellar`, `warehouse`, `weapons_shop`, `workshop`, `armory`, `bakery`, `barracks`, `bathhouse`, `butchery`, `camp`, `castle_bastion`, `castle_bailey`, `castle_corridor`, `castle_dining_room`, `castle_gate`, `cave`, `church`, `clearing`, `mountain_trail`, `prison_cell`, `dark_alley`, `library`, `apothecary`, `winery`.
4. Prefix Location slugs with `medieval_`, preserving source filename stems. Preserve display labels such as `Forrest`, `Servants Room` and `Vine Cellar` for this import; any editorial corrections must be explicit and must not break asset paths.
5. Record 40/48 unique counts, the Actor print multiplicities, excluded unused files, reference URLs and source revision. Do not store print duplicates as separate catalogue cards.

**Validation:** Inventory has 88 unique new IDs and exact source-art mappings, with no collision against the existing 265 IDs. Subsequent count expectations assume no independent catalogue expansion.

## Task 2: Import artwork and extend the catalogue

**Files:** Modify `src/catalog.ts`, `src/data/catalog.en.json`, `resources/artwork-manifest.json`, `tests/catalog.test.ts`, `tests/fixtures/catalog-baseline.json`; add files under `resources/originals/actors/medieval/` and `resources/originals/locations/medieval/`. Update `NOTICE`/`LICENSES` for applicable source attribution; use `src/contracts` for any new presentation type.

1. Add failing inventory tests requiring all 40 medieval Actor records and all 48 Location records, exact family/deck/path assignments, and unique stable IDs. Preserve existing 47 medieval asset IDs.
2. Copy the 88 referenced originals from pinned upstream paths, retaining PNG transparency and JPG format. Compare shared paper/header icons with existing assets; reuse identical assets or import the exact reference versions through the owned manifest. Do not substitute `/types/actor.png` for upstream `/actor.png` without checking the visual difference.
3. Remove only `location` from the catalogue family's exclusion. Update exhaustive family maps and consumers found with `rg`; do not indiscriminately enable every contract family as a static family.
4. Add 88 English presentation records, `deck: "medieval"`, exact asset paths, and accessible titles. Actor titles are metadata, not new visible labels. Do not invent descriptions, stats, encounters or location rules.
5. Update content version and the reviewed catalogue baseline. Expected catalogue is 353 cards, including 84 Actor bases and 48 Locations; 47 medieval assets remain unchanged. The standard three-preset inventory becomes 1,059 entries, an increase of 264.
6. Run the existing asset preparation and data generation. No network imports, sibling-repository fallback or hand-edited `assets/`/`generated/` files.

```powershell
rtk pnpm assets:prepare
rtk pnpm generate:data
rtk pnpm exec tsx --test tests/catalog.test.ts tests/standalone.test.ts tests/generation.test.ts
```

**Expected:** Inventory/baseline tests pass; all referenced runtime assets exist; generated `actor-base.csv` includes 40 additions and `location.csv` includes 48 records.

## Task 3: Render medieval Actor portraits

**Files:** Modify `src/react/index.tsx`, `src/react/cards.module.css`, `tests/catalog.test.ts`; create `src/react/illustratedCards.tsx` for the internal illustrated card rendering used here and in Task 4. Use `export-app/main.tsx` for preview cases.

1. Resolve base artwork via `getCard("actor-base", baseLayerSlug)?.artworkPath`, keeping any necessary existing fallback for legacy custom callers. Test nested female paths and collisions such as base `aristocrat` versus `medieval_aristocrat`.
2. Render the reference portrait layout for medieval base-only cards: paper, top-left miniature, deck/Actor header, and full-height body portrait. Measure the upstream `object-cover` framing and shadow in representative tall/wide portraits; do not fit it into the tactical renderer's small illustration slot.
3. Route both `GameCard` and base-only `ActorCard` to the same implementation. Preserve `assetBaseUrl`, class/style behavior, accessible labeling, custom cards, and compact output.
4. Test the deliberate tactical-composition branch with a medieval villager + Minion + Fast, including female artwork. Reuse the in-progress Actor parity renderer; do not implement another icon/rule parser.
5. Inspect villager, female villager, aristocrat, bandit, knight and female crazy-cat-lady at both full sizes. Check complete image loading, miniature/header alignment and art crop.

**Validation:** `rtk pnpm exec tsx --test tests/catalog.test.ts` and `rtk pnpm check:fast` pass. Base-only entry points agree visually; tactical compositions stay legible and retain their layer contract.

## Task 4: Render catalogue Locations without breaking scene cards

**Files:** Modify `src/react/illustratedCards.tsx`, `src/react/index.tsx`, `src/react/cards.module.css`, `export-app/main.tsx`, `tests/catalog.test.ts`, `tests/consumer/check-imports.ts`.

1. Dispatch `GameCard(type="location")` to the internal illustrated card renderer. Keep the existing generic `LocationCard` props/rendering unchanged and add a consumer regression check for them.
2. Render full-card scene art rotated 90 degrees, with the source's title on the left and medieval/map header on the right. Reproduce the locally darkened/blurred header region and readable light text; do not rotate the entire card/header or darken the entire scene.
3. Use the package canvas and scale consistently in React and exports. Source bleed is a print concern; avoid hard-coding print page dimensions into runtime cards.
4. Add semantic checks for correct Location title, scene path, custom asset base, and no Actor/tactical rules. Inspect Dungeon, Forrest, Harbor, Townhouse Bedchamber and Castle Dining Room for crop, orientation, long-title fit and header contrast.
5. Verify compact locations retain identifiable artwork and readable titles. Do not render generic scene-card paragraphs or the generic 332px-wide scene frame in static Location exports.

**Validation:** Focused catalogue/consumer checks and `rtk pnpm check:fast` pass; browser inspection confirms the source orientation and legible headers at both full sizes.

## Task 5: Verify export coverage and regenerate artifacts

**Files:** Modify `scripts/export.ts`, `tests/export.test.ts`, `tests/generation.test.ts`, `tests/incremental-export.test.ts`, and distribution tests only where new family/assets require it.

1. Ensure enumeration/export accepts Location entries without weakening unknown-family validation. Check all HTML/SVG image requests, font readiness, dimensions and populated header bounds before capture.
2. Add the new internal renderer to export fingerprint inputs so changes invalidate cached PNGs. Preserve asset-inventory/data fingerprinting and sequential staging behavior.
3. Add focused exporter coverage for a medieval portrait and a Location, plus an intentional missing-art failure. Tests should exercise behavior, not simply search for a CSS class.
4. Run the normal gate and diagnostic exports sequentially:

   ```powershell
   rtk pnpm check
   rtk pnpm generate:png --type actor-base --id medieval_villager --layout full --height 1024
   rtk pnpm generate:png --type actor-base --id medieval_female_villager --layout full --height 512
   rtk pnpm generate:png --type location --id medieval_dungeon --layout full --height 1024
   rtk pnpm generate:png --type location --id medieval_forrest --layout compact --height 256
   ```

5. Inspect the actual files, not only previews. Then run `rtk pnpm generate:png` to produce the full authoritative inventory. A filtered diagnostic run is not proof that every card exists or that the complete manifest is current.
6. Require 120 medieval Actor PNGs and 144 medieval Location PNGs, alongside the existing 141 medieval asset PNGs. Check paths, dimensions and SHA-256 against the complete manifest. Adjust aggregate totals only for explicitly reviewed concurrent catalogue additions.
7. Generate contact sheets in ignored `output/` and inspect all 88 additions for missing art, incorrect portrait variants, upside-down header text, clipped titles and unintended backgrounds. Check original base Actors, asset cards and generic scenes for regressions.
8. Verify distribution includes nested female PNGs, Location JPGs, shared icons, `location.csv` and the updated manifest. Use `distribution:prepare`/`distribution:check` when validating prepared distributions; run release checks only after their required artifacts are prepared. No publishing is part of this plan.

## Task 6: Document scope and asset discrepancies

**Files:** Update `README.md`, `docs/maintenance.md`, `docs/migration-baseline.md`, and the companion Actor parity plan's scope/link as appropriate.

1. Document catalogue examples: `GameCard` for `actor-base:medieval_villager`, `actor-base:medieval_female_villager`, and `location:medieval_dungeon`; document custom `assetBaseUrl` and unchanged generic `LocationCard` usage.
2. Explain portrait-only versus tactical Actor layout, Location image rotation, compact adaptation and the exclusion of print copies/backs. Show paths to generated examples.
3. Record the five medieval asset text differences above. Reconcile from source history; if changes are justified, update descriptions, baseline and relevant expected-mechanics tests together and regenerate affected outputs. Do not block missing-set support on an unresolved gameplay-copy choice.
4. Use the local `maintenance-drift-review` skill. Confirm one catalogue source, no duplicated tactical renderer, no runtime import of scripts or upstream repositories, stable public API and no unnecessary dependencies.
5. Report actual commands, artifact counts, remaining intentional differences and evidence. Preserve concurrent Actor parity work; do not claim it was implemented by this plan.

## Completion criteria

- All 47 existing medieval assets remain discoverable and exportable; copy discrepancies are explicitly recorded or deliberately resolved.
- All 40 unique medieval portraits and 48 active Locations have stable catalogue entries, owned artwork, working React cards and all three PNG presets.
- The new fronts reproduce the respective reference layouts within the existing canvas; medieval portraits are not inadvertently forced into tactical-base framing.
- Nested female artwork paths, accessible names, custom asset roots, generic `LocationCard`, tactical composition and existing families remain functional.
- Normal package checks, focused browser/export checks, complete manifest checksums and distribution coverage pass.
- No print multiplicity duplicates, unused upstream artwork, invented rules, external runtime dependencies, or publication are introduced.
