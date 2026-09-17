export type ActorAction = string;
/** Presentation-only mechanics for Actor layers.  Descriptions remain the public
 * accessible rules text; this record controls the printed icon rows. */
export interface ActorPresentation {
    toughness?: string;
    actions?: readonly ActorAction[];
    toughnessBonus?: string;
    actionBonuses?: readonly (string | null)[];
    special?: string;
}
//# sourceMappingURL=actorPresentation.d.ts.map