import { z } from "zod";
export const cardFamilies = [
    "outcome",
    "effect",
    "stunt",
    "actor-base",
    "actor-role",
    "actor-special",
    "asset-base",
    "asset-modifier",
    "counter",
    "location",
    "encounter",
    "quest",
];
export const cardFamilySchema = z.enum(cardFamilies);
export const supportedCardLocales = ["en"];
export const cardLocaleSchema = z.enum(supportedCardLocales);
export const customCardSchema = z.object({
    family: cardFamilySchema,
    id: z.string().min(1),
    title: z.string().min(1),
    artworkPath: z.string().min(1).optional(),
    body: z.string().optional(),
    footer: z.string().optional(),
    deck: z.string().optional(),
});
export const cardExportInputSchema = z.object({
    locale: cardLocaleSchema,
    cards: z.array(customCardSchema),
});
export const validateCardExportInput = (input) => cardExportInputSchema.parse(input);
