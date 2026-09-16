# Mighty Decks package guides

The runtime npm package contains React components, styles, CSVs, the catalogue
manifest, and runtime art. It does not contain static PNG card exports. For
Markdown images, download the matching release archive and extract it beside the
files produced by `mighty-decks-components copy-static --out <public-dir>`.

The public export helper (`@mighty-decks/components/export`) supplies the
catalogue, its content version, static-entry enumeration, and custom-card input
validation.

- [Rulebook](./mighty-decks-rulebook.md) is the package's main rules reference.
- [Fast-session storyteller guide](./mighty-decks-fast-session-storyteller-system-prompt.md) is a single-player, fast-session profile.
- [Guide differences](./guide-differences.md) explains how these guides differ from this application.
- [Localization roadmap](./localization-roadmap.md) records phase-two language and print work.
