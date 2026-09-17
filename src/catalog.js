import catalogue from "./data/catalog.en.json";
import { validateCardExportInput, } from "./contracts/cardExport.js";
export const contentVersion = catalogue.contentVersion;
export const supportedLocale = "en";
// The checked-in JSON is captured from the source catalogue and guarded by
// tests/standalone.test.ts so consumers never depend on Storyteller at build
// time.
export const cardCatalog = [...catalogue.cards, ...catalogue.medievalCards];
export const getCard = (family, slug) => cardCatalog.find((card) => card.family === family && card.slug === slug);
export const staticCardPresets = [
    { layout: "full", width: 629, height: 1024 },
    { layout: "full", width: 315, height: 512 },
    { layout: "compact", width: 157, height: 256 },
];
export const enumerateStaticCards = () => cardCatalog.flatMap((card) => staticCardPresets.map((preset) => ({ ...card, ...preset })));
export { validateCardExportInput };
