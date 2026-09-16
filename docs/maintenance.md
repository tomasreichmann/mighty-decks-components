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
