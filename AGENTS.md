# Mighty Decks components

This standalone package owns reusable card components, catalog data, runtime assets,
and export tooling. Run `pnpm check` for normal verification; `pnpm check:release`
also validates browser exports and release artifacts.

Keep authored sources separate from generated `assets/`, `generated/`, `dist/`, and
`output/`. Search existing exports and callers with `rg` before adding helpers or
components. Add dependencies only for a concrete gap.

Ownership: `src/contracts` owns schemas/types; `src/catalog.ts` owns catalog data and
static presets; `src/react` consumes catalog/contracts and browser APIs; `src/cli.ts`
is the Node entry point; `scripts` create artifacts; `export-app` renders exports.
Library runtime code never imports scripts or export-app code. See
[docs/maintenance.md](docs/maintenance.md) and the local
[maintenance review skill](.agents/skills/maintenance-drift-review/SKILL.md).
