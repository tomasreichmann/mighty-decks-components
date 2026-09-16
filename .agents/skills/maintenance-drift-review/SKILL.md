---
name: maintenance-drift-review
description: Review meaningful Mighty Decks package changes for maintenance drift.
---

# Maintenance drift review

Use after meaningful rendering, contracts, assets/exporting, or packaging changes, or
when explicitly requested. Skip a lengthy review for harmless copy edits.

Start with changed and untracked files (or a supplied comparison base), then inspect
affected callers. Use `rg` for overlapping symbols/usages before proposing abstractions.
Review: responsibility growth, unnecessary folders, parallel implementations, obsolete
code/configuration, brittle incidental tests, boundary erosion, meaningful duplication,
type/error handling, dependency justification, and stale instructions.

Report only actionable findings as `blocker`, `important`, or `minor`, including
location, drift, maintenance impact, and the smallest correction. State explicitly when
there is no meaningful drift. Do not turn unrelated debt into a merge condition.
