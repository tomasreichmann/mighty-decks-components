# Mighty Decks package guides

The root Git package contains React components, styles, CSVs, the catalogue
manifest, fonts, artwork, and static PNG card exports. Consumers install one full
commit SHA and serve the exported `assets/` and `generated/` paths directly from
`node_modules`; no release archive, exporter, or manual copy step is required.

The public export helper (`@mighty-decks/components/export`) supplies the
catalogue, its content version, static-entry enumeration, and custom-card input
validation.

- [Rulebook](./mighty-decks-rulebook.md) is the package's main rules reference.
- [Fast-session storyteller guide](./mighty-decks-fast-session-storyteller-system-prompt.md) is a single-player, fast-session profile.
- [Guide differences](./guide-differences.md) explains how these guides differ from this application.
- [Localization roadmap](./localization-roadmap.md) records phase-two language and print work.
