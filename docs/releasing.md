# Releasing Mighty Decks components

## Current status

Local artifact validation is ready. The public repository is
`tomasreichmann/mighty-decks-components`; code is MIT licensed and original
content, artwork, and documentation are CC BY 4.0. npm scope access and the
first-publication procedure for `@mighty-decks/components@0.1.0` require
maintainer action.

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
pnpm package:runtime-assets
pnpm archive:png
pnpm verify:artifacts
pnpm verify:consumer -- --tarball output/runtime.tgz
pnpm verify:browser -- --tarball output/runtime.tgz --runtime-assets output/mighty-decks-components-VERSION-runtime-assets.tar.gz
```

The resulting `output/runtime.tgz`, runtime-assets archive, two PNG archives, and
`output/release-manifest.json` are a matched candidate set. Do not regenerate a
tarball after it has been validated. Upload these exact files as a draft release,
then manually dispatch the `Release` workflow with that tag. The workflow runs
the fast source gate, publishes the uploaded slim runtime tarball through npm
OIDC, and makes the draft release public. The runtime-assets attachment must
have the same package version as the npm package.

## Local release publication

For a new version, create and push the annotated tag after local validation, then
create a draft release with the candidate artifacts:

```powershell
$tag = "vVERSION"
git tag -a $tag -m $tag
git push origin $tag
gh release create $tag output/runtime.tgz output/mighty-decks-components-*-runtime-assets.tar.gz output/mighty-decks-components-*-png-*.tar.gz output/release-manifest.json --draft --title $tag
gh workflow run Release --ref main --field tag=$tag
```

Use the workflow URL printed by `gh run list --workflow Release --limit 1` to
watch publication. The workflow refuses a non-draft release and retains the
draft if npm publication fails.

## Post-publication verification

After an authorized release has completed, run:

```powershell
pnpm verify:release -- --version VERSION --repository OWNER/REPO
```

The verifier fails closed unless the registry package version, repository URL,
tarball integrity, and provenance-attestation metadata match the validated
release manifest. Run `npm audit signatures` from a fresh registry-installed
consumer fixture as the complementary signature check.
