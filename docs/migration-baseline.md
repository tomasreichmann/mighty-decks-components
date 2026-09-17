# Migration baseline

The standalone presentation catalogue was captured from Storyteller commit
`eeb90ed3ec18fd1f136583a239d7ac16835c8d35` on 2026-09-16. It contains 265
normalized English presentation records and no gameplay authority. The
standalone test fixture guards the record ordering, content version, and static
entry IDs.

On 2026-09-17, the 16 Actor role and 24 Actor special descriptions omitted by
the initial extraction were restored from `apps/web/src/data/actorCards.ts` at
the same Storyteller commit. Icon-based statistics and effects were transcribed
as English presentation text in the owned catalogue and its baseline fixture.
There is no build-time dependency on that source project.

On 2026-09-18, the pinned `board-game-prototypes` revision
`cefe6918d34fc302a31fcb7676d97a43d7e1f15b` supplied 40 unique medieval Actor
portraits and 48 active medieval Locations. The owned inventory fixture records
their exact paths and excludes the unused Town Hall scene. The catalogue now has
353 records and 1,059 standard static presets. Existing medieval asset copy was
not silently changed: `medieval_plate_armor` is abbreviated; `medieval_hand_cannon`
and `medieval_cannon` retain the local range/mechanics adaptations; and
`medieval_key` and `medieval_ore` retain their local terminal-punctuation copies.

The public-release identity and rights gates remain in the Storyteller decision
record. This baseline is local extraction evidence, not license approval or
publication authorization.
