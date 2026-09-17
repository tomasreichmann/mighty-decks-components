# Mighty Decks components

English-first React card components, presentation catalogue data, CSV exports,
runtime artwork, and static PNG export tooling for Mighty Decks.

```tsx
import "@mighty-decks/components/styles.css";
import { GameCard, ActorCard } from "@mighty-decks/components/react";

<GameCard type="outcome" slug="success" layout="full" />
<GameCard type="outcome" slug="success" layout="compact" />
<ActorCard baseLayerSlug="guard_blue" tacticalRoleSlug="thug" />
```

`en` is currently the only accepted locale. IDs are language-neutral; callers
must handle an unsupported locale rather than assuming translation. Compact and
full layout are independent from output density.

## Consume the root Git package

Consumers pin one reachable 40-character Git commit SHA and install it with pnpm.
The package includes its compiled JavaScript, CSS/fonts, artwork, CSVs, PNGs, and
English documentation. Serve the exported `assets/` and `generated/` directories
from `node_modules`; do not copy package resources into the consumer or run its
generator during installation.

For package authors, run `pnpm release:prepare` and `pnpm release:check` before
committing generated artifacts. The former is explicit and may render PNGs; the
latter is read-only and is never an install hook. See the
[maintainer workflow](https://github.com/tomasreichmann/mighty-decks-components/blob/main/docs/maintenance.md)
for checks and distribution maintenance.

`@mighty-decks/components/export` exports `cardCatalog`, `contentVersion`,
`enumerateStaticCards`, and `validateCardExportInput`. Generated resources are
derived from the catalogue; edit the catalogue source rather than output files.

See [the packaged guides](./docs/en/) and [the usage skill](./skills/mighty-decks-components/SKILL.md).

## License

Source code is [MIT licensed](./LICENSE). Original card content, artwork, and
documentation are licensed under [CC BY 4.0](./LICENSES/CC-BY-4.0.md), so you
may share and adapt them for any purpose with appropriate attribution. Bundled
fonts remain under their respective SIL Open Font License terms.

## Fonts and artwork

The package bundles the original card artwork and local Kalam and Shantell Sans
font files so card faces do not inherit a consumer application's typography.
See [third-party notices](./assets/THIRD-PARTY-NOTICES.md) for the bundled font
licenses.
