# Maintainer workflow

Use Node 22.14.0 and pnpm 10. Run `pnpm assets:prepare` before tests or builds when
assets are absent. `pnpm check` is the normal clean-checkout gate; `pnpm test:package`
checks a packed consumer; `pnpm check:release` additionally runs PNG generation and
artifact validation. Install Chromium before PNG work with
`pnpm exec playwright install chromium`.

Use narrow, explained suppressions only when a concrete tool limitation exists, with a
removal condition beside the suppression. Hooks are optional early feedback and do not
replace CI. Install the repository-local pre-commit check with `pnpm hooks:install`.
It runs `pnpm check:fast` without changing formatting or staged files; unrelated
working-tree errors can therefore block a commit. Generated outputs are never hand-edited.

`pnpm check` refreshes source-derived data but does not render PNGs. Use
`pnpm generate:png` to regenerate the complete PNG inventory and its authoritative
`generated/png-manifest.json`; run it sequentially because exports share
`.export-staging`. A filtered `pnpm generate:png --type …` updates only matching
PNGs and writes `generated/png-manifest.filtered.json`, so it is useful for
diagnostics but not a release-ready inventory refresh.

Actor bases are opaque artwork layers. Full-size Actor role and special PNGs are
transparent, composable rule layers: roles contain the main mechanical rules and
specials contain the footer rule. Compact Actor images are reduced-detail thumbnails;
they retain a meaningful title but intentionally omit rule descriptions.

## Git distribution releases

Runtime packages are delivered through the immutable `dist` branch. Run
`pnpm pack:runtime`, then `pnpm stage:git -- --source-commit <full-source-sha>`
to produce `output/git-package/`; never commit that generated tree to the source
branch. The release workflow builds this package, commits it to `dist`, tags it as
`dist-v<VERSION>`, and binds that commit to `release-manifest.json`. It does not
publish to npm. A failed draft/release validation is repaired with a new version;
never force-push `dist` or retarget published tags.
