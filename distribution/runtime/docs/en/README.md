# Mighty Decks package guides

The runtime Git distribution package contains React components, styles, CSVs, the catalogue
manifest, and fonts. Card images and static PNG card exports are versioned GitHub
Release attachments. For React or Markdown images, run
`mighty-decks-components copy-static --out <public-dir>`, then download the
matching `mighty-decks-components-<version>-runtime-assets.tar.gz` attachment
and extract it into `<public-dir>` (for example,
`tar -xzf mighty-decks-components-<version>-runtime-assets.tar.gz -C <public-dir>`).
This creates the expected
`mighty-decks/assets` directory for offline use.

Pin the full commit from `dist-v<VERSION>`, not a source ref, branch, or floating
tag. The matching GitHub release manifest records the source commit, distribution
commit, package/content versions, and archive checksums.

The public export helper (`@mighty-decks/components/export`) supplies the
catalogue, its content version, static-entry enumeration, and custom-card input
validation.

- [Rulebook](./mighty-decks-rulebook.md) is the package's main rules reference.
- [Fast-session storyteller guide](./mighty-decks-fast-session-storyteller-system-prompt.md) is a single-player, fast-session profile.
- [Guide differences](./guide-differences.md) explains how these guides differ from this application.
- [Localization roadmap](./localization-roadmap.md) records phase-two language and print work.
