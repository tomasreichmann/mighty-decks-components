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
rtk pnpm verify:actor-parity
```

It renders Animal Blue, Minion, Tank, Artillery, Armoured, Fiery, and Fast at
629×1024, and rejects missing images, incorrect geometry, and overflowing text
regions. The normal package check does not render PNGs; generate diagnostic
cards separately when reviewing visual output:

```powershell
rtk pnpm generate:png --type actor-base --id animal_blue --layout full --height 1024
rtk pnpm generate:png --type actor-role --id minion --layout full --height 1024
rtk pnpm generate:png --type actor-special --id armoured --layout full --height 1024
```

The visual target intentionally excludes upstream print controls, crop marks,
bleed, backs, and page layout.
