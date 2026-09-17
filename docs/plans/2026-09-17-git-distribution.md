# Git Distribution Implementation Plan

> Execution guide: use `superpowers:executing-plans` to implement this plan task by task. Work in the current checkout, preserve unrelated changes, and do not create a worktree.

**Goal:** Let other projects install `@mighty-decks/components` from a pinned Git commit, with no npm publishing, registry lookup for this package, or consumer-side package build.

**Architecture:** Generate a ready-to-install package tree on a separate `dist` branch of this repository. Consumers pin its full commit SHA. Source tags and GitHub Releases continue to identify matching runtime-art and PNG archives; a release manifest binds those artifacts to both source and distribution commits.

**Tech stack:** Existing Node 22.14.0, pnpm 10, Git, GitHub Actions/Releases, Vite/TypeScript, Node tests, and existing archive tooling.

**Status:** Updated on 2026-09-17 with a publisher-first recovery sequence. Repository-side implementation exists in the working tree but is not release-ready. The reported upstream check found neither a `dist` branch nor a `dist-v*` tag, so Exiles migration remains blocked on a verified first distribution release. Focused verification and clean diff checks were reported; the full release gate was started but did not finish within the command window and is not claimed as passing. The next unused package version must be selected before publication; examples below contain deliberate placeholders.

## Publisher-first recovery sequence

Treat the first verified distribution release as a separate milestone before migrating Exiles. Preserve the working `v0.1.3` tarball dependencies until that milestone passes; do not invent a distribution SHA, relax digest checks, or change the chosen delivery strategy to bypass the dependency.

The blocker is not exclusively external. Inspection of the working-tree release workflow identified three remaining gaps against Task 4: it creates a new root distribution commit on every run instead of appending to existing history, publishes the source release before verification instead of validating a draft, and does not run the complete release gate before pushing distribution refs.

Execute the remaining work in this order:

1. Finish and review Tasks 1–4, including bootstrap versus append behavior, atomic branch/tag publication, retry validation, and draft verification. Preserve unrelated working-tree changes.
2. Complete the full release gate and staged Git consumer checks. Use a persistent process or CI and retain the final exit status and logs; a command-window timeout is neither a pass nor proof of failure. Resume observing an existing process if it is still running before starting another run.
3. Complete the first-release milestone in Task 4a from committed source at the next unused version. The current package version is `0.1.3`; check remote source/distribution tags and GitHub Releases before selecting a new version, and never rewrite the existing release.
4. Verify the actual hosted Git SHA and matching source, package/content identity, and archive digests. Record the verified handoff values from the published manifest.
5. Only then execute Task 5, updating all three Exiles dependency pins, its generated lockfile, and its release record together. Finish Task 6 with the real released SHA and verification evidence.

Publisher implementation and local validation can proceed before any distribution ref exists. Only the hosted checks, consumer migration, and documentation requiring a real published SHA depend on publication. This plan update does not itself authorize pushing refs or publishing a release.

## Requirements and findings

The consumer brief is `D:/projects/exiles-of-the-hungry-void/docs/mighty-decks-components.md`; its longer implementation history is `docs/plans/2026-09-16-mighty-decks-components.md` in that repository.

The following table records the original pre-implementation findings; the status and recovery sequence above describe the current working-tree checkpoint.

| Requirement | Original evidence | Planned behavior |
| --- | --- | --- |
| No npm publishing | `.github/workflows/release.yml` invokes `npm view` and `npm publish`; `scripts/verify-release.mjs` requires registry integrity and attestations | Release and verification use Git and GitHub only for this package |
| Actual Git dependency | Exiles root, server and web currently use the GitHub `v0.1.3/runtime.tgz` URL | All three dependencies use the same `git+https` URL with a full distribution commit SHA |
| Installable public API | `package.json` exports `dist/*` and generated CSVs, but `.gitignore` excludes build output; there is no `prepare` hook | Distribution commit contains JS, declarations, CSS, CLI and generated data already built |
| Existing editor behavior | Exiles resolves standard cards to core/medieval PNGs and uses the package catalog | Preserve that rendering strategy, Markdown syntax, local diagnostics, paths and offline runtime |
| React consumers | The package file list includes fonts, but excludes most runtime artwork | Document the matching runtime-assets archive as an additional requirement for React rendering |
| Version agreement | Exiles metadata and validation hard-code `0.1.3`; preparation does not prove installed package identity | Validate dependency pins, installed version/content and archive versions together before replacing resources |
| Source/artifact separation | Repository instructions separate authored sources from generated directories | Keep generated files off the source branch; generate the distribution branch mechanically |

“Without npm” means no publishing or obtaining **this package** from the npm registry. pnpm remains the installer, and third-party dependencies such as React and Zod still come from their normal registry. Existing local `npm pack` calls may remain: packing a local directory does not publish it or need npm credentials. Eliminating all registry dependencies or every use of the npm executable is a separate goal.

## Choice of delivery

1. **Recommended: prebuilt Git distribution.** Meets the explicit Git requirement and installs without package lifecycle builds. Adds one small generated branch and one staging script. Large PNGs and runtime artwork remain release assets, avoiding their accumulation in Git history.
2. **Lowest-change alternative: retain GitHub release tarballs.** Already used by Exiles and already avoids registry delivery. Removing the npm publish gate alone makes this viable, but it is an HTTPS tarball dependency rather than a Git dependency. Keep `runtime.tgz` as compatibility/rollback delivery.
3. **Source Git dependency with `prepare`.** Requires consumer installation to build generated assets and TypeScript using development dependencies and package-manager lifecycle permissions. It transfers build complexity to every consumer and conflicts with the current explicit-generation model; do not choose it.

pnpm documents Git repositories and remote tarballs as supported sources in its [pnpm 10 installation documentation](https://pnpm.io/10.x/cli/add). Git dependency preparation can trigger a build based on manifest fields; see [npm's Git dependency documentation](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#git-urls-as-dependencies). Treat behavior on pnpm 10.0.0 and the consumer's 10.29.3 as a verification requirement, not something current documentation alone proves.

## Distribution contract

The generated repository tree has `package.json` at its root, not under `package/`:

```text
package.json
dist/                         # ESM JS, declarations, CSS, executable CLI
assets/fonts/
generated/csv/
generated/manifest.json
docs/en/
skills/mighty-decks-components/
README.md
LICENSE
NOTICE
LICENSES/
distribution.json             # source identity, package/content versions
```

Derive its files from the validated local runtime tarball instead of introducing a second hand-maintained package file list. Unpack it safely, remove its leading `package/`, and transform its manifest mechanically: preserve name, version, exports, bin, types, engines, dependencies, peers and license metadata; remove author-only scripts, devDependencies, packageManager, publishConfig and workspace configuration; set `private: true`. Keep the CLI executable in the Git index. Ensure packaging includes `distribution.json` when pnpm repacks the Git checkout. Do not add install/prepare/prepack hooks.

`distribution.json` contains `schemaVersion: 1`, `packageName`, `packageVersion`, `contentVersion`, `sourceCommit` and `runtimeTarballSha256`. It must not contain its own Git commit hash. The external release manifest records the resulting distribution commit, avoiding a circular hash dependency. Preserve existing runtime tarball identity separately because the sanitized Git manifest makes the distribution tree intentionally differ from the original tarball.

Use source tags `v<VERSION>` and distribution tags `dist-v<VERSION>`. The `dist` branch has an independent history, beginning without source history; subsequent releases append normally. Never reset, force-push or retarget published distribution tags. Consumers pin the full SHA reachable from that tag, never `main`, `dist`, a floating tag, or a source-tag SHA.

```json
{
  "dependencies": {
    "@mighty-decks/components": "git+https://github.com/tomasreichmann/mighty-decks-components.git#<FULL_DISTRIBUTION_COMMIT_SHA>"
  }
}
```

Code imports and the CLI name remain unchanged. Git installation does not install an agent skill automatically. Initial installation needs access to GitHub and third-party dependencies; offline runtime is distinct from a completely cold offline install.

## Task 1: Generate and verify the distribution tree

**Create:** `scripts/stage-git-package.mjs`, `tests/git-package.test.ts`.
**Modify:** `package.json` (add `stage:git` and include the new tests).
**Reuse:** `scripts/pack-runtime.mjs`, `scripts/artifact-lib.mjs`, existing `tar` dependency and package-surface assertions.

1. Write tests using temporary artifact fixtures for the expected root layout, preserved exports, absent lifecycle hooks/dev tools, included provenance metadata and executable CLI. Reject missing declarations/fonts/catalog data, unsafe archive entries, symlinks escaping the staging directory, and a version different from the requested release.
2. Run `pnpm exec tsx --test tests/git-package.test.ts`; expect failure until staging exists.
3. Implement staging from `output/runtime.tgz` into ignored `output/git-package/`, requiring an explicit full source SHA. Resolve and validate owned output paths before replacement. Generate stable JSON and derive package/content identity from the actual artifact, not only the current checkout.
4. Validate all exported targets and CLI support files. Do not include `resources/originals`, source scripts, export-app, node_modules, PNGs, or the tarball itself.
5. Run `pnpm check`, `pnpm pack:runtime`, then the proposed `pnpm stage:git -- --source-commit <SOURCE_SHA>` and the focused test. Confirm the staged directory matches the contract.

**Acceptance:** A generated package can be used without reading anything from the author's working directory. Building it does not mutate authored sources or create a Git worktree.

## Task 2: Test a real Git installation

**Modify:** `scripts/verify-consumer.mjs`, `tests/consumer/package.json`, `.github/workflows/ci.yml`, `package.json`.
**Create:** `tests/git-consumer.test.ts` (or one focused orchestration test invoking the extended verifier).

1. Extend the existing verifier to accept mutually exclusive `--tarball <path>` and `--git <url#sha>` sources and explicit package-manager selection. Reuse its import, MDX, declaration, NodeNext, Vite and CLI checks rather than duplicating the fixture.
2. Initialize a disposable standalone Git repository from the staged tree, commit it and install via a `git+file` URL with its commit SHA. This is a temporary test repository, not a worktree or a checkout switch in the user's repository.
3. On pnpm 10.0.0 and 10.29.3, test a fresh store, generate the consumer lockfile, then reinstall from that frozen lockfile in a fresh consumer directory/store. Verify the resolved SHA and that no `@mighty-decks/components` registry dependency was introduced.
4. Run a package-install smoke check with scripts disabled to prove it needs no lifecycle execution. Run normal fixture build checks separately with the fixture's own toolchain appropriately enabled; do not confuse a Vite/esbuild fixture requirement with a package build requirement.
5. Check every public entry point, CSS/font bundling, CSV access, CLI resources, notices and distribution metadata. Add the Git fixture to CI on Windows and Linux; no PNG generation is required for this narrow check.
6. After the first candidate is pushed, repeat installation with its actual GitHub HTTPS URL and full SHA before announcing support. Local Git tests do not prove the hosted download/repacking path works.

**Acceptance:** Fresh consumers resolve the package from Git, install ready-built files, and pass existing consumer checks without package-specific build approvals or Playwright installation.

## Task 3: Bind Git and release assets to one source revision

**Modify:** `scripts/package-pngs.mjs`, `scripts/artifact-lib.mjs`, `scripts/verify-artifacts.mjs`, `scripts/verify-release.mjs`, `tests/artifacts.test.ts`.

1. Add a versioned `gitDistribution` record to the release manifest: repository URL, full commit SHA, `dist-v<VERSION>` tag. Preserve runtime tarball, runtime-assets and PNG archive SHA-256 records.
2. Require the actual checked-out source tag's full SHA for release provenance. Replace `process.env.GITHUB_SHA` as the release identity source: a manually dispatched workflow may be running at a different revision. Reject `uncommitted-local` when finalizing a release; allow local diagnostic builds without presenting them as releases.
3. Generate artifacts from the selected source revision, stage/commit the Git tree, then finalize the external manifest with its commit SHA. This is an explicit two-phase operation; do not bake the final external manifest back into the distribution commit.
4. Test package-version/content-version/source mismatches, missing archives, digest failures and a distribution tag pointing to the wrong SHA. Verify `distribution.json` from the installed candidate agrees with the external manifest and the original tarball digest.
5. Rewrite `verify:release` to fetch GitHub release metadata and assets, resolve source/distribution tags, verify hashes and install the Git package for consumer checks. Remove mandatory registry repository/integrity/attestation queries. Describe the replacement as Git commit and artifact integrity checks, not npm provenance.

**Acceptance:** A release cannot pass validation with catalog code from one revision and PNGs/runtime art from another. Already-published releases are never rewritten to retrofit this format.

## Task 4: Remove npm from the release gate

**Modify:** `.github/workflows/release.yml`, `tests/release-workflow.test.ts`, `package.json` (remove `publishConfig`; mark source package private if compatible with local pack tests).

1. Replace the current downloaded-candidate/npm-publish sequence with: validate a `v<VERSION>` input, check out its exact source commit, install pinned tools, install Chromium, and run `pnpm check:release` once. This builds and checks the complete candidate from source rather than trusting locally uploaded artifacts. Reuse already-produced artifacts for staging and uploading.
2. Remove npm `registry-url`, npm global upgrade solely for publishing, `npm view`, `npm publish`, `id-token: write` and registry bootstrap exceptions. Keep `contents: write` only where needed to push distribution refs and publish release assets. No npm login, token, trusted-publisher setup or 2FA step is needed.
3. Use a temporary standalone repository to create `dist-v<VERSION>`. Bootstrap an independent root commit only when the remote `dist` branch does not exist. Otherwise fetch its current tip, replace the package tree with the staged candidate (including removing obsolete files), and create a child commit so distribution history stays append-only. Preserve the source checkout throughout. Use argument arrays for Git commands; do not interpolate unchecked workflow inputs into shell code.
4. Complete the full local release gate and staged Git consumer checks before pushing. Push the new branch commit and tag atomically, without force; serialize release jobs to avoid concurrent updates. A retry reuses an existing distribution tag only after its provenance and complete file tree match the intended candidate; otherwise fail and require a new version. Reject unexpected remote state rather than overwriting it.
5. Install and verify the pushed Git SHA, finalize/upload the matching manifest, `runtime.tgz`, runtime-assets archive and both PNG archives to a draft source release. Verify draft assets and provenance through authenticated access; extend the existing release verifier as needed so candidate and public verification share the integrity checks. Publish the draft only after all candidate checks pass. Keep the draft if validation fails; consumers continue using the last good pin.
6. Run the rewritten public `verify:release` after publication. If it fails, report failure and retain diagnostics; never retarget a published tag or silently overwrite released bytes. Repair via a new version.
7. Replace the test that explicitly requires `npm publish` with checks for required Git distribution/validation stages and absence of registry publication. Cover first-release bootstrap, a second release preserving parent history and removing obsolete files, atomic push failure, matching retries, conflicting retries, and version/tag validation through executable helper tests where practical, not only workflow text matching. Verify that failed candidate checks prevent draft publication.

**Acceptance:** A complete release succeeds using repository credentials and public third-party dependency installation, without any Mighty Decks npm registry entry or npm publishing credentials. Ordinary PR CI only stages/tests locally and never pushes.

## Task 4a: Publish and verify the first distribution release

**Depends on:** Completed publisher implementation and local verification in Tasks 1–4. Publication requires authorization; prepare the concrete candidate and verification evidence before requesting any missing approval.

**Modify:** `package.json` and any tracked version-coupled metadata required by the existing tooling. Use `.github/workflows/release.yml`, `scripts/verify-consumer.mjs`, and `scripts/verify-release.mjs` for publication and verification; do not add a separate manual packaging path.

1. Check upstream refs with `git ls-remote --heads --tags origin` and inspect existing GitHub Releases. Select the next unused package version, update version-coupled metadata, and commit the reviewed publisher changes and version update. Do not reuse `v0.1.3` or include unrelated working-tree changes.
2. Run `pnpm check:release` to completion from the committed candidate and retain logs and exit status. Run `pnpm stage:git -- --source-commit <FULL_SOURCE_SHA>` and `pnpm verify:consumer -- --git-stage output/git-package`, including the pnpm 10.0.0 and 10.29.3 checks specified in Task 2. Investigate failures before publishing; focused checks alone do not satisfy this gate.
3. Once publication is authorized, make the reviewed source and workflow available upstream, create and push the annotated `v<VERSION>` source tag, and dispatch the single Release workflow for that exact tag. The workflow must rebuild and validate that source, bootstrap `dist` if absent, atomically push its commit/tag, and prepare the draft with matching artifacts.
4. Before publishing the draft, run the hosted Git consumer checks against `git+https://github.com/tomasreichmann/mighty-decks-components.git#<FULL_DISTRIBUTION_SHA>` with fresh stores and frozen-lockfile reinstalls on both required pnpm versions. Check the installed `distribution.json` against the source commit, package/content versions, runtime tarball digest, and draft manifest; verify every archive digest. A passing local Git installation cannot substitute for this hosted check.
5. Publish only after draft checks pass, then run `pnpm verify:release -- --version <VERSION> --repository tomasreichmann/mighty-decks-components` to completion. Retain failure diagnostics and keep Exiles on its old pins if verification fails; never retarget published refs or overwrite published bytes to repair a release.
6. Record the handoff from the verified published manifest: release version and URL, source SHA, distribution tag and full SHA, exact Git package spec, content version, and archive URLs and SHA-256 digests. Include the runtime tarball digest for provenance and both core/medieval PNG archives needed by Exiles. Record the successful workflow run and hosted verification evidence alongside these values.

**Acceptance / handoff gate:** The source and distribution refs exist upstream, the published manifest and downloaded artifacts agree, fresh hosted Git consumer checks pass, and public release verification exits successfully. Only these verified values may populate Exiles dependency and release-record changes. Publisher completion alone does not complete the overall migration.

## Task 5: Migrate Exiles without changing card semantics

All paths in this task are relative to `D:/projects/exiles-of-the-hungry-void`.

**Modify:** root `package.json`, `apps/server/package.json`, `apps/web/package.json`, `pnpm-lock.yaml`, `scripts/mighty-decks-release.json`, `scripts/prepare-mighty-decks.mjs`, `scripts/prepare-mighty-decks.test.mjs`, `docs/mighty-decks-components.md`, `docs/plans/2026-09-16-mighty-decks-components.md`.

1. Require the Task 4a handoff gate to pass before changing dependency pins or release metadata. Keep the working `v0.1.3` tarball pins until then. In one migration change, set all three package dependencies to the exact same verified Git URL/full SHA, regenerate the lockfile using pnpm 10.29.3, and update the release record with the matching handoff values; do not hand-edit lockfile resolutions.
2. Extend release metadata with `contentVersion`, `sourceCommit`, `gitCommit` and `packageSpec`; replace the misleading `packageUrl` field. Keep `version` and both archive entries with their actual verified digests. Obtain values from the released manifest, never placeholders or guessed hashes.
3. Replace hard-coded `0.1.3` validators with validation against the explicit release record. Require one core and one medieval archive, exact versioned filenames and expected repository/release URL, valid full SHAs and digests. Reject duplicate groups even if there are two entries.
4. Before downloading or touching public output, compare all workspace package specs with the release record and check installed package/version/content/provenance. Check the lockfile through pnpm's resolved dependency report or an appropriate existing parser, rather than relying only on the version string; different Git commits can carry the same package version.
5. Validate the extracted `generated/png-manifest-core.json` and `generated/png-manifest-medieval.json` against package/content versions, group and required file inventory. Preserve checksum verification, local cache, resource routes, license copying and explicit `cards:prepare` behavior. Ensure failures leave the previous valid output available, including a copy/rename failure during replacement.
6. Add focused tests for mixed workspace pins, wrong installed identity, mismatched archive versions, duplicate groups, corrupt cache and a failed preparation preserving prior output. Keep existing unresolved-reference diagnostics and the audit baseline; Git delivery does not fix missing cards or actor mechanics.
7. Run `node --test scripts/prepare-mighty-decks.test.mjs scripts/audit-mighty-decks.test.mjs`, `pnpm cards:prepare` twice, `pnpm cards:audit`, `pnpm typecheck`, `pnpm test`, `pnpm build` and `pnpm test:e2e`. The audit may report already-documented unresolved references; compare against the baseline rather than declaring all legacy content valid. Browser write tests must use temporary adventure workspaces.
8. Confirm representative core/medieval cards and fonts load with external network requests blocked after preparation, in dev and production and with a temporary `ADVENTURE_ROOT`. Confirm no rendering or encounter-authoring changes accompanied the delivery migration.

**Rollback:** Restore all three prior dependency specs, the prior lockfile and prior release metadata together, then run `pnpm install --frozen-lockfile` and `pnpm cards:prepare`. Keep old releases available so rollback does not depend on rebuilding old assets.

## Task 6: Document installation for other consumers

**Modify:** `README.md`, `docs/maintenance.md`, `docs/en/README.md`, `skills/mighty-decks-components/SKILL.md`; mark older source-repository runtime-release plans as superseded only for npm delivery decisions.

1. Show a real released Git SHA dependency, unchanged import examples, `pnpm exec mighty-decks-components copy-static --out public`, and the matching archive manifest. Provide separate short recipes for catalog-only consumers, React consumers needing runtime artwork, and PNG consumers needing selected PNG archives.
2. Explain that source refs are for development and `dist-v*` refs identify installable builds. Document updating dependency SHA, source/package/content identity and archive digests as one change with a committed lockfile.
3. Document the single GitHub release action, local preflight commands, failed-draft recovery, immutable refs and rollback. Remove npm publication from active setup/release instructions; historical descriptions can remain explicitly historical.
4. Run `pnpm check` after implementation, the Git consumer checks, and the full release gate for the release candidate. Apply the local maintenance-drift review to affected packaging boundaries and callers, keeping one staging path and one consumer fixture.

## Completion criteria

- A fresh external pnpm consumer installs the real GitHub distribution SHA and all public APIs/CLI work.
- Frozen-lockfile installs are repeatable; no package install build or PNG rendering runs.
- The source branch still contains authored inputs; generated distribution history contains only the runtime package.
- GitHub release publication and verification never require npm publishing or a Mighty Decks registry lookup.
- Git identity, package/content versions and selected archive digests are validated together.
- Exiles retains current fixed PNG rendering, local resource serving, audit diagnostics and rollback.

This planning change does not publish a release, push Git refs, upgrade dependencies or run the implementation verification commands above.
