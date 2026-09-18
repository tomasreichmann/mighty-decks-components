import { type CSSProperties, type ReactNode } from "react";
import { type CardFamily } from "../catalog.js";
export type CardLayout = "full" | "compact";
export interface LayeredCardProps {
    className?: string;
    style?: CSSProperties;
    assetBaseUrl?: string;
    backgroundUri?: string;
    imageUri?: string;
    imageOverlayUri?: string;
    noun?: ReactNode;
    nounDeck?: ReactNode;
    nounCornerIcon?: string;
    adjective?: ReactNode;
    adjectiveDeck?: ReactNode;
    adjectiveCornerIcon?: string;
    adjectiveEffect?: ReactNode;
    nounEffect?: ReactNode;
    titleColor?: string;
    layout?: CardLayout;
    transparent?: boolean;
    showHeader?: boolean;
    footerHeight?: number;
    actorBase?: boolean;
    actorOverlay?: boolean;
    actorLayout?: boolean;
}
export declare const CardStyleBoundary: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export declare const resolveAssetUrl: (assetBaseUrl: string, path: string) => string;
export declare const LayeredCard: ({ className, style, assetBaseUrl, backgroundUri, imageUri, imageOverlayUri, noun, nounDeck, nounCornerIcon, adjective, adjectiveDeck, adjectiveCornerIcon, nounEffect, adjectiveEffect, titleColor, layout, transparent, showHeader, footerHeight, actorBase, actorOverlay, actorLayout }: LayeredCardProps) => JSX.Element;
export interface GameCardProps {
    type: CardFamily;
    slug: string;
    locale?: "en";
    layout?: CardLayout;
    className?: string;
    assetBaseUrl?: string;
}
export declare const GameCard: ({ type, slug, locale, layout, className, assetBaseUrl }: GameCardProps) => JSX.Element;
export declare const OutcomeCard: (props: Omit<GameCardProps, "type">) => JSX.Element;
export declare const EffectCard: (props: Omit<GameCardProps, "type">) => JSX.Element;
export declare const StuntCard: (props: Omit<GameCardProps, "type">) => JSX.Element;
export declare const AssetModifierCard: (props: Omit<GameCardProps, "type">) => JSX.Element;
export interface ActorCardProps extends Omit<LayeredCardProps, "noun"> {
    baseLayerSlug?: string;
    tacticalRoleSlug?: string;
    tacticalSpecialSlug?: string;
    custom?: {
        imageUrl: string;
        noun: string;
        adjective?: string;
        nounDescription?: string;
        adjectiveDescription?: string;
        deck?: string;
    };
}
export declare const ActorCard: ({ baseLayerSlug, tacticalRoleSlug, tacticalSpecialSlug, custom, ...props }: ActorCardProps) => JSX.Element;
export interface AssetCardProps extends Omit<LayeredCardProps, "noun"> {
    baseAssetSlug: string;
    modifierSlug?: string;
}
export declare const AssetCard: ({ baseAssetSlug, modifierSlug, ...props }: AssetCardProps) => JSX.Element;
export interface CounterCardProps extends Omit<LayeredCardProps, "noun" | "adjective"> {
    iconSlug: string;
    title: string;
    currentValue: number;
    maxValue?: number;
}
export declare const CounterCard: ({ iconSlug, title, currentValue, maxValue, ...props }: CounterCardProps) => JSX.Element;
export declare const CompactCard: (props: LayeredCardProps) => JSX.Element;
export declare const ActorCardTextWithIcons: ({ text, assetBaseUrl }: {
    text: string;
    assetBaseUrl?: string;
}) => JSX.Element;
export interface SceneCardProps {
    title: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    className?: string;
}
export declare const SceneCardFrame: ({ title, description, imageUrl, imageAlt, className }: SceneCardProps) => JSX.Element;
export declare const LocationCard: (props: SceneCardProps) => JSX.Element;
export declare const EncounterCard: (props: SceneCardProps) => JSX.Element;
export declare const QuestCard: (props: SceneCardProps) => JSX.Element;
//# sourceMappingURL=index.d.ts.map