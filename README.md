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

## Consume the checked-in distribution

Consumers pin a full source commit and copy only the required distribution files
into their own repository. Do not install the source branch, a floating tag, or a
GitHub release archive. Copy `consumer/sync-mighty-decks.mjs` and
`consumer/mighty-decks.config.example.json` into the consumer, then run the sync
with the chosen 40-character commit SHA. Commit the generated lockfile and managed
files with the consumer change.

For package authors, run `pnpm assets:prepare`, `pnpm generate:data`, and `pnpm build`.
`pnpm generate:png` is a separate browser-export command and requires Playwright
Chromium (`pnpm exec playwright install chromium`). `pnpm generate` prepares assets
and runs both generation steps; it is never an install hook. See the
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
