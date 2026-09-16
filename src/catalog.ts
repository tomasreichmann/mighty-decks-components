import catalogue from "./data/catalog.en.json";
import {
  validateCardExportInput,
  type CardExportInput,
  type CardFamily as ContractCardFamily,
} from "./contracts/cardExport.js";

export const contentVersion = catalogue.contentVersion;
export const supportedLocale = "en" as const;
export type CardFamily = Exclude<
  ContractCardFamily,
  "location" | "encounter" | "quest"
>;
export interface CatalogCard { id: string; family: CardFamily; slug: string; title: string; locale: "en"; description?: string; body?: string; footer?: string; deck?: string; artworkPath?: string; }

// The checked-in JSON is captured from the source catalogue and guarded by
// tests/standalone.test.ts so consumers never depend on Storyteller at build
// time.
export const cardCatalog = catalogue.cards as CatalogCard[];
export const getCard = (family: CardFamily, slug: string): CatalogCard | undefined => cardCatalog.find((card) => card.family === family && card.slug === slug);
export interface StaticCardEntry extends CatalogCard {
  layout: "full" | "compact";
  width: number;
  height: number;
}
export const staticCardPresets = [
  { layout: "full" as const, width: 629, height: 1024 },
  { layout: "full" as const, width: 315, height: 512 },
  { layout: "compact" as const, width: 157, height: 256 },
];
export const enumerateStaticCards = (): StaticCardEntry[] => cardCatalog.flatMap((card) =>
  staticCardPresets.map((preset) => ({ ...card, ...preset })),
);
export { validateCardExportInput, type CardExportInput };
