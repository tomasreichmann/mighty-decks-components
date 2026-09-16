# Releasing Mighty Decks components

## Current status

Local artifact validation is ready. The public repository is
`tomasreichmann/mighty-decks-components`; code is MIT licensed and original
content, artwork, and documentation are CC BY 4.0. npm scope access and the
first-publication procedure for `@mighty-decks/components@0.1.0` still require
maintainer action before a release workflow or trusted publisher is enabled.

Do not put npm write tokens in repository secrets. Do not publish a placeholder
or create a release before those decisions are recorded.

## Local candidate validation

Run the following commands from a clean source checkout:

```powershell
pnpm install --frozen-lockfile --prod=false
pnpm generate:runtime
pnpm build
pnpm exec playwright install chromium
pnpm generate:png
pnpm pack:runtime
pnpm archive:png
pnpm verify:artifacts
pnpm verify:consumer -- --tarball output/runtime.tgz
pnpm verify:browser -- --tarball output/runtime.tgz
```

The resulting `output/runtime.tgz`, two PNG archives, and
`output/release-manifest.json` are a matched candidate set. Do not regenerate a
tarball after it has been validated. A future authorized release workflow must
upload those exact files, verify their hashes, finalize an immutable GitHub
release, and publish that same runtime tarball through npm OIDC.

## Post-publication verification

After an authorized release has completed, run:

```powershell
pnpm verify:release -- --version VERSION --repository OWNER/REPO
```

The verifier fails closed unless the registry package version, repository URL,
tarball integrity, and provenance-attestation metadata match the validated
release manifest. Run `npm audit signatures` from a fresh registry-installed
consumer fixture as the complementary signature check.
