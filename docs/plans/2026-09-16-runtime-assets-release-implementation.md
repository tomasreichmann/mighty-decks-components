# Runtime assets release implementation plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the npm tarball publishable while delivering complete runtime
images as a versioned, verifiable GitHub Release asset.

**Architecture:** npm excludes image assets but keeps fonts, data, compiled code,
and static documentation. A release script stages `assets/` beneath
`mighty-decks/assets/` and creates a deterministic archive. The release manifest
and GitHub workflow treat that archive as a required release attachment.

**Tech Stack:** Node.js 22, TypeScript, `tar`, Node test runner, pnpm, GitHub
Actions.

---

### Task 1: Define the slim npm package surface

**Files:**
- Modify: `package.json`
- Modify: `tests/package-surface.test.ts`
- Modify: `tests/package.test.ts`

**Step 1: Write failing tests**

Assert that `package.json` lists `assets/fonts` rather than the whole `assets`
directory and that a packed runtime tarball has font files but no non-font image
files.

**Step 2: Run tests to verify failure**

Run: `pnpm assets:prepare && pnpm generate:data && pnpm build && pnpm pack:runtime && pnpm exec tsx --test tests/package-surface.test.ts tests/package.test.ts`

Expected: FAIL because the current tarball contains image assets.

**Step 3: Implement the minimal package metadata change**

Replace `assets` with `assets/fonts` in the npm `files` allowlist.

**Step 4: Run tests to verify pass**

Run the Task 1 command again. Expected: PASS.

### Task 2: Build and verify a runtime-assets release archive

**Files:**
- Create: `scripts/package-runtime-assets.mjs`
- Modify: `scripts/artifact-lib.mjs`
- Modify: `scripts/package-pngs.mjs`
- Modify: `scripts/verify-artifacts.mjs`
- Modify: `package.json`
- Modify: `tests/artifacts.test.ts`

**Step 1: Write failing artifact tests**

Require a release manifest `runtimeAssets` entry and assert the archive contains
only safe paths under `mighty-decks/assets/`, including each item from
`assets/inventory.json`.

**Step 2: Run tests to verify failure**

Run: `pnpm exec tsx --test tests/artifacts.test.ts`

Expected: FAIL because no runtime-assets archive or manifest field exists.

**Step 3: Implement the archive command**

Create a deterministic gzip tarball named
`mighty-decks-components-<version>-runtime-assets.tar.gz`, stage assets beneath
`mighty-decks/assets`, enforce configured host limits, hash it, and store its
metadata in `output/runtime-assets-pack.json`. Feed that metadata into the
release manifest and verify checksum/path/inventory completeness.

**Step 4: Run tests to verify pass**

Run: `pnpm package:runtime-assets && pnpm archive:png && pnpm verify:artifacts && pnpm exec tsx --test tests/artifacts.test.ts`

Expected: PASS.

### Task 3: Make consumers and releases use the split artifacts

**Files:**
- Modify: `src/cli.ts`
- Modify: `tests/static-copy.test.ts`
- Modify: `scripts/verify-consumer.mjs`
- Modify: `scripts/verify-browser.ts`
- Modify: `.github/workflows/release.yml`
- Modify: `docs/en/README.md`
- Modify: `docs/releasing.md`

**Step 1: Write failing static-copy test**

Assert that `copy-static` succeeds with a package fixture containing fonts but
without any card-image directory and reports that runtime images come from the
matching GitHub Release archive.

**Step 2: Run test to verify failure**

Run: `pnpm exec tsx --test tests/static-copy.test.ts`

Expected: FAIL because the CLI copies the full `assets` directory.

**Step 3: Implement minimal consumer/release behavior**

Copy only `assets/fonts` from the npm package; preserve existing data/docs/skills
copies. Update the browser verifier to extract the local release archive before
building the fixture. Update the release workflow to create, verify, and upload
the runtime-assets archive while publishing the slim tarball. Document the
version-matched extraction command.

**Step 4: Run focused tests to verify pass**

Run: `pnpm exec tsx --test tests/static-copy.test.ts && pnpm verify:consumer -- --tarball output/runtime.tgz && pnpm verify:browser -- --tarball output/runtime.tgz --runtime-assets output/mighty-decks-components-0.1.0-runtime-assets.tar.gz`

Expected: PASS.

### Task 4: Release-candidate verification

**Files:**
- Modify if necessary: `scripts/verify-release.mjs`
- Test: existing package, artifact, consumer, and browser checks

**Step 1: Run the full release-candidate command**

Run: `pnpm check && pnpm pack:runtime && pnpm package:runtime-assets && pnpm archive:png && pnpm verify:artifacts && pnpm test:package && pnpm verify:browser -- --tarball output/runtime.tgz --runtime-assets output/mighty-decks-components-0.1.0-runtime-assets.tar.gz`

Expected: all checks pass and `output/runtime.tgz` is below the registry’s
upload threshold.

**Step 2: Commit implementation**

Run: `git add package.json src scripts tests docs .github && git commit -m "fix: ship runtime imagery as release asset"`

