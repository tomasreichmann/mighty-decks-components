---
name: mighty-decks-components
description: Use when rendering, exporting, or documenting the reusable Mighty Decks React cards and their catalog resources.
---

# Mighty Decks components

For a source checkout, prepare resources with `pnpm assets:prepare`, generate
CSV/manifest data with `pnpm generate:data`, build with `pnpm build:library`,
and run the complete explicit release step with `pnpm release:prepare`.
`pnpm release:check` is read-only. Do not edit `generated/`; update the catalog
source and regenerate.

For a consumer, import `@mighty-decks/components/styles.css` once and cards from `@mighty-decks/components/react`. Choose `layout="full"` or `layout="compact"` explicitly. Use `ActorCard` and `AssetCard` layer slugs for compositions; use the catalog and CSV files for lookup rather than guessing display text.

Install the package from a full reachable Git SHA. Consumers can resolve
`@mighty-decks/components/assets/*`, `generated/*`, and `docs/*` directly from
the installed package; do not copy selected files or run a component generator.
MDX can import React cards. Ordinary Markdown should link the server route that
maps to the installed package resources. Provide meaningful image alt text. `en`
is the only locale. Preserve original artwork and do not claim the PNGs are
print-ready.

Read [the package guide index](../../docs/en/README.md), [guide differences](../../docs/en/guide-differences.md), and [the localization roadmap](../../docs/en/localization-roadmap.md) before changing rules text or adding a locale. Package installation does not install this skill: copy/register this folder in the consuming agent environment only when the consumer chooses to do so.
