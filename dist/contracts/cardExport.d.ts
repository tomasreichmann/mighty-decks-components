import { z } from "zod";
export declare const cardFamilies: readonly ["outcome", "effect", "stunt", "actor-base", "actor-role", "actor-special", "asset-base", "asset-modifier", "counter", "location", "encounter", "quest"];
export type CardFamily = (typeof cardFamilies)[number];
export declare const cardFamilySchema: z.ZodEnum<["outcome", "effect", "stunt", "actor-base", "actor-role", "actor-special", "asset-base", "asset-modifier", "counter", "location", "encounter", "quest"]>;
export declare const supportedCardLocales: readonly ["en"];
export type CardLocale = (typeof supportedCardLocales)[number];
export declare const cardLocaleSchema: z.ZodEnum<["en"]>;
export declare const customCardSchema: z.ZodObject<{
    family: z.ZodEnum<["outcome", "effect", "stunt", "actor-base", "actor-role", "actor-special", "asset-base", "asset-modifier", "counter", "location", "encounter", "quest"]>;
    id: z.ZodString;
    title: z.ZodString;
    artworkPath: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    footer: z.ZodOptional<z.ZodString>;
    deck: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    family: "outcome" | "effect" | "stunt" | "actor-base" | "actor-role" | "actor-special" | "asset-base" | "asset-modifier" | "counter" | "location" | "encounter" | "quest";
    id: string;
    title: string;
    artworkPath?: string | undefined;
    body?: string | undefined;
    footer?: string | undefined;
    deck?: string | undefined;
}, {
    family: "outcome" | "effect" | "stunt" | "actor-base" | "actor-role" | "actor-special" | "asset-base" | "asset-modifier" | "counter" | "location" | "encounter" | "quest";
    id: string;
    title: string;
    artworkPath?: string | undefined;
    body?: string | undefined;
    footer?: string | undefined;
    deck?: string | undefined;
}>;
export type CustomCard = z.infer<typeof customCardSchema>;
export declare const cardExportInputSchema: z.ZodObject<{
    locale: z.ZodEnum<["en"]>;
    cards: z.ZodArray<z.ZodObject<{
        family: z.ZodEnum<["outcome", "effect", "stunt", "actor-base", "actor-role", "actor-special", "asset-base", "asset-modifier", "counter", "location", "encounter", "quest"]>;
        id: z.ZodString;
        title: z.ZodString;
        artworkPath: z.ZodOptional<z.ZodString>;
        body: z.ZodOptional<z.ZodString>;
        footer: z.ZodOptional<z.ZodString>;
        deck: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        family: "outcome" | "effect" | "stunt" | "actor-base" | "actor-role" | "actor-special" | "asset-base" | "asset-modifier" | "counter" | "location" | "encounter" | "quest";
        id: string;
        title: string;
        artworkPath?: string | undefined;
        body?: string | undefined;
        footer?: string | undefined;
        deck?: string | undefined;
    }, {
        family: "outcome" | "effect" | "stunt" | "actor-base" | "actor-role" | "actor-special" | "asset-base" | "asset-modifier" | "counter" | "location" | "encounter" | "quest";
        id: string;
        title: string;
        artworkPath?: string | undefined;
        body?: string | undefined;
        footer?: string | undefined;
        deck?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    locale: "en";
    cards: {
        family: "outcome" | "effect" | "stunt" | "actor-base" | "actor-role" | "actor-special" | "asset-base" | "asset-modifier" | "counter" | "location" | "encounter" | "quest";
        id: string;
        title: string;
        artworkPath?: string | undefined;
        body?: string | undefined;
        footer?: string | undefined;
        deck?: string | undefined;
    }[];
}, {
    locale: "en";
    cards: {
        family: "outcome" | "effect" | "stunt" | "actor-base" | "actor-role" | "actor-special" | "asset-base" | "asset-modifier" | "counter" | "location" | "encounter" | "quest";
        id: string;
        title: string;
        artworkPath?: string | undefined;
        body?: string | undefined;
        footer?: string | undefined;
        deck?: string | undefined;
    }[];
}>;
export type CardExportInput = z.infer<typeof cardExportInputSchema>;
export declare const validateCardExportInput: (input: unknown) => CardExportInput;
//# sourceMappingURL=cardExport.d.ts.map