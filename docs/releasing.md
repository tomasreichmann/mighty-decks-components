# Releasing Mighty Decks components

Releases deliver a prebuilt package from the immutable `dist` branch. They do
not publish this package to npm.

## Local preflight

From a clean source checkout, run:

```powershell
pnpm check
pnpm exec playwright install chromium
pnpm pack:runtime
pnpm package:runtime-assets
pnpm generate:png
pnpm stage:git -- --source-commit (git rev-parse HEAD)
pnpm verify:consumer -- --git-stage output/git-package
```

`output/git-package` is generated release input. Do not commit it to the source
branch. Runtime assets and selected PNG archives remain GitHub Release assets.

## Publish

Create and push an annotated source tag whose version matches `package.json`,
then dispatch the single `Release` workflow with that `v<VERSION>` tag. The
workflow rebuilds from the source tag, creates an append-only distribution
commit/tag `dist-v<VERSION>`, uploads assets and `release-manifest.json`, then
validates the published GitHub release. It must never force-push `dist` or
retarget a published tag.

If validation fails, leave its diagnostics intact and release a new version;
consumers continue to use the last pinned distribution SHA. Roll back consumers
by restoring their previous package spec, lockfile, and matching release record
together.

## Verify

```powershell
pnpm verify:release -- --version VERSION --repository OWNER/REPO
```

This validates GitHub release assets, the source/distribution tag relationship,
and the release manifest's digests. It performs no npm registry lookup.
