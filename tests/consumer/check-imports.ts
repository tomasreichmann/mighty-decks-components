import {
  cardCatalog,
  cardExportInputSchema,
  cardFamilies,
  cardFamilySchema,
  cardLocaleSchema,
  contentVersion,
  customCardSchema,
  enumerateStaticCards,
  getCard,
  packageResourceBase,
  supportedCardLocales,
  validateCardExportInput,
} from "@mighty-decks/components";
import {
  cardCatalog as exportCatalog,
  contentVersion as exportContentVersion,
  enumerateStaticCards as exportEntries,
  validateCardExportInput as exportValidate,
} from "@mighty-decks/components/export";
import * as react from "@mighty-decks/components/react";

const custom = validateCardExportInput({
  locale: "en",
  cards: [{ family: "location", id: "scene", title: "A scene", body: "Optional" }],
});
void [
  cardCatalog, cardExportInputSchema, cardFamilies, cardFamilySchema,
  cardLocaleSchema, contentVersion, customCardSchema, enumerateStaticCards,
  getCard, packageResourceBase, supportedCardLocales, custom, exportCatalog,
  exportContentVersion, exportEntries, exportValidate, react.GameCard,
  react.CardStyleBoundary, react.resolveAssetUrl, react.LayeredCard,
  react.OutcomeCard, react.EffectCard, react.StuntCard, react.AssetModifierCard,
  react.ActorCard, react.AssetCard, react.CounterCard, react.CompactCard,
  react.ActorCardTextWithIcons, react.SceneCardFrame, react.LocationCard,
  react.EncounterCard, react.QuestCard,
];
