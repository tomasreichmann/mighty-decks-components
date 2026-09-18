import type { CSSProperties } from "react";
type CardLayout = "full" | "compact";
interface IllustratedCardProps {
    title: string;
    artworkPath: string;
    kind: "actor" | "location";
    layout?: CardLayout;
    className?: string;
    assetBaseUrl?: string;
    style?: CSSProperties;
}
export declare const IllustratedCard: ({ title, artworkPath, kind, layout, className, assetBaseUrl, style }: IllustratedCardProps) => JSX.Element;
export {};
//# sourceMappingURL=illustratedCards.d.ts.map