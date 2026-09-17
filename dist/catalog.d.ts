import { validateCardExportInput, type CardExportInput, type CardFamily as ContractCardFamily } from "./contracts/cardExport.js";
import type { ActorPresentation } from "./contracts/actorPresentation.js";
export declare const contentVersion: string;
export declare const supportedLocale: "en";
export type CardFamily = Exclude<ContractCardFamily, "encounter" | "quest">;
export interface CatalogCard {
    id: string;
    family: CardFamily;
    slug: string;
    title: string;
    locale: "en";
    description?: string;
    body?: string;
    footer?: string;
    deck?: string;
    artworkPath?: string;
    actorPresentation?: ActorPresentation;
}
export declare const cardCatalog: CatalogCard[];
export declare const getCard: (family: CardFamily, slug: string) => CatalogCard | undefined;
export interface StaticCardEntry extends CatalogCard {
    layout: "full" | "compact";
    width: number;
    height: number;
}
export declare const staticCardPresets: ({
    layout: "full";
    width: number;
    height: number;
} | {
    layout: "compact";
    width: number;
    height: number;
})[];
export declare const enumerateStaticCards: () => StaticCardEntry[];
export { validateCardExportInput, type CardExportInput };
//# sourceMappingURL=catalog.d.ts.map