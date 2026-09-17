# Git file distribution

`distribution/` is the committed consumer contract. It contains a script-free
local workspace runtime and public static files, including PNG exports. It is
prepared locally; consumers never build, render, download an archive, or fetch
this repository during install or deployment.

Run `pnpm distribution:prepare` after an unfiltered `pnpm generate:png`, then
run `pnpm distribution:check`. The manifest records every output hash, source
input fingerprint, stable toolchain identity, and PNG group membership. A
failed preparation leaves the prior complete distribution in place.

Current baseline: 264 ignored PNGs measured at approximately 228 MB before
the first committed distribution. Keep generated PNGs out of authoring caches;
only `distribution/` is tracked. `base` catalogue entries are exposed as the
`core` consumer group and `medieval` entries retain that group name.

The runtime owns compiled JS, declarations, CSS, fonts, CSV/manifest data,
English guides, skills, and notices. Public files retain `/mighty-decks/assets`
and `/mighty-decks/generated/png` URL shapes. Source inputs remain authoritative.
