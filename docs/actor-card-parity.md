# Actor card visual parity

Actor fronts are based on the upstream Mighty Decks prototype revision
`cefe6918d34fc302a31fcb7676d97a43d7e1f15b`, inspected on 2026-09-18 at the
Base Actor Cards and Base Tactical Roles print pages. The prototype uses a
54×86 mm print card with bleed; this package preserves its established 204×332
logical canvas (629×1024 and 315×512 full exports). This is a visual adaptation,
not a physical print-size match.

The implementation preserves the paper base, small upper-left art miniature,
transparent role/special layers, role and special headers, ordered mechanics,
and aligned special bonuses. Actor mechanics remain available as plaintext to
consumers and assistive technology while known tokens render as decorative
images. Unknown tokens are retained as literal text.

## Verification

Run the focused browser check after changing Actor rendering, mechanics, or
assets:

```powershell
pnpm verify:actor-parity
```

The check compares standalone role and special layers with assembled Actors at
204px native width and 176px rules width, after fonts and images have loaded.
It checks title, role-column, bonus-column, footer and artwork coordinates within
one CSS pixel, typography, 16px logical icon dimensions, overflow, image loading,
and console/resource errors. Minion, Tank, Artillery, Marksman, Fast, Fiery,
Charging and Armoured cover repeated effects, ranges, empty bonus rows and
conditional/replacement bonuses. It also retains the 629x1024 export checks.

Checkerboard, light and dark screenshots plus measured bounds are saved under
`.agent-logs/actor-parity/`. Empowered and Fast Asset modifiers are compared with
assembled Tools for transparent unprinted regions and shared adjective/footer
placement; Tools and assembled Assets retain paper. Marksman Stunt is checked
for its catalog prose, independently of the Actor role with the same slug.

## Renderer changes (2026-09-18)

Actor roles and specials share three reserved 16px mechanics rows, with the role
column right aligned and the bonus column left aligned. Standalone specials use
the same artwork and 38px footer as their assembled contribution. Special art
ends at canvas y=142, above the adjective region starting at y=148; the browser
check also guards this separation. Text descendants
inherit each region's fitted typography and ink instead of overriding it with a
16px reset. Actor icon artwork is 16px on the 204px canvas (about 13.8px at 176px).
Actor presentation lookup is restricted to Actor families so same-name Stunts and
Effects retain their own rules. Catalog mechanics and accessible descriptions are
unchanged. No new dependencies or environment variables are required.

The visual target intentionally excludes upstream print controls, crop marks,
bleed, backs, and page layout.

The export app explicitly imports the authored `src/react/index.tsx`. This repo
also contains older emitted `.js` siblings, which an extensionless import can
select and combine with current CSS. Keep that explicit source import when
changing the exporter. Typechecking permits TypeScript import extensions; the
library build emits declarations only through TypeScript.

## Full-card parity contract (2026-10-04)

All five layered card families use black (`#121b23`) full-front noun and adjective
slots in bold bundled Kalam with Chromium's synthetic italic. The bundled font has
normal 400/700 faces; synthesis is deliberate and uses the same Chromium in React
and exports. Compact titles retain their existing style and Outcome color.
Every opaque full card with base art has exactly one 20×20 copy of that art at
logical `(29, 48)`, painted after the main art. Transparent layers and compact cards
have none. This position preserves the measured Actor baseline and now covers
Assets, Stunts, Outcomes, and Effects, including opaque artwork.

The shared footer uses bundled Shantell 700 at 11px, line height 1.08, fitted in
0.5px steps down to 8px inside the 172×38 region at `(16, 280)`. Longer catalog
footers may borrow main-region space; Fast and Charging exercise the fixed Actor
region with plain and tokenized wrapping. Mechanics and accessible copy are unchanged.

`pnpm verify:actor-parity` checks all five families at 204px and 176px, including
opaque/empty artwork, compact exclusions, typography, miniature geometry/paint
order, Minion icon counts/range, loaded bundled fonts, and individual light/dark/
checkerboard clips. After regenerating the full inventory, run
`pnpm verify:actor-parity -- --exports` to compare live 629×1024 exporter clips with
checked-in PNGs and verify overlay alpha. The pixel gate permits fewer than 1% of
pixels to differ by over 16 channel levels and mean maximum-channel delta below 1;
this accommodates clipping/antialiasing only, not changed content or geometry.
Before evidence is retained under `.agent-logs/card-visual-parity/before/`; current
verification output is under `.agent-logs/actor-parity/`. Never update reference
PNGs by hand or use the browser check to rewrite them.
