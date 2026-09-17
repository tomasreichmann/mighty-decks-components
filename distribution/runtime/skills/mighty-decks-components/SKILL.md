---
name: mighty-decks-components
description: Use when rendering, exporting, or documenting the reusable Mighty Decks React cards and their catalog resources.
---

# Mighty Decks components

For a source checkout, prepare resources with `pnpm assets:prepare`, generate
CSV/manifest data with `pnpm generate:data`, and build with `pnpm build`.
`pnpm generate:png` is an author-only browser export and requires Chromium;
`pnpm generate` runs both. Do not edit `generated/`; update the catalog source
and regenerate.

For a consumer, import `@mighty-decks/components/styles.css` once and cards from `@mighty-decks/components/react`. Choose `layout="full"` or `layout="compact"` explicitly. Use `ActorCard` and `AssetCard` layer slugs for compositions; use the catalog and CSV files for lookup rather than guessing display text.

Install the package from the full SHA behind its matching `dist-v<VERSION>` Git
tag, not from a source branch/tag. React consumers must additionally extract the
matching runtime-assets release archive after `copy-static`; PNG users select the
matching core and/or medieval PNG archive.

`copy-static` copies runtime assets, CSV/manifest data, guides, and this skill,
but never a PNG catalogue. MDX can import React cards. Ordinary Markdown should
link PNGs from the matching versioned release archive after it is separately
downloaded and extracted beside the copied resources. Provide meaningful image
alt text. `en` is the only locale. Preserve original artwork and do not claim
the PNGs are print-ready.

Read [the package guide index](../../docs/en/README.md), [guide differences](../../docs/en/guide-differences.md), and [the localization roadmap](../../docs/en/localization-roadmap.md) before changing rules text or adding a locale. Package installation does not install this skill: copy/register this folder in the consuming agent environment only when the consumer chooses to do so.
