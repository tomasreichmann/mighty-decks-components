# Runtime assets release design

## Decision

Publish `@mighty-decks/components` as a lightweight npm package containing the
compiled library, catalogue data, fonts, documentation, skills, and licenses.
Do not include card-image runtime assets in the npm tarball. Package size made
that distribution method unusable.

Publish the complete `assets/` directory as one versioned
`mighty-decks-components-<version>-runtime-assets.tar.gz` attachment on the
matching GitHub Release. It will contain a top-level `mighty-decks/assets/`
directory so consumers can extract it directly into their static public
directory.

## Consumer flow

1. Install the npm package.
2. Run `mighty-decks-components copy-static --out public` to copy fonts,
   catalogue data, docs, and skills to `public/mighty-decks`.
3. Download the runtime-assets archive for the identical package version and
   extract it into `public`. This supplies `public/mighty-decks/assets`.

The React API and its default asset URL remain `/mighty-decks/assets`; after the
one-time extraction, Markdown and React consumers work offline.

## Release flow

Release validation creates and hashes both the slim npm tarball and the runtime
assets archive. The GitHub Action uploads the runtime-assets archive, PNG export
archives, and release manifest, then publishes only the slim tarball to npm.
Verification checks the runtime-assets archive structure and checksum alongside
the existing artifacts.

## Error handling and tests

`copy-static` must continue to work without image assets in an installed npm
package. Its tests will prove that it copies fonts and data but no image files.
Artifact tests will require the release archive to contain every prepared asset
under the expected extraction path, while package-surface tests will require
image assets to be excluded from npm.
