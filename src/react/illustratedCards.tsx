import type { CSSProperties } from "react";
import styles from "./cards.module.css";

type CardLayout = "full" | "compact";
const resolveAssetUrl = (assetBaseUrl: string, path: string): string => `${assetBaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
const CardStyleBoundary = ({ children }: { children: JSX.Element }): JSX.Element => <div className={styles.boundary}>{children}</div>;

interface IllustratedCardProps {
  title: string;
  artworkPath: string;
  kind: "actor" | "location";
  layout?: CardLayout;
  className?: string;
  assetBaseUrl?: string;
  style?: CSSProperties;
}

export const IllustratedCard = ({ title, artworkPath, kind, layout = "full", className, assetBaseUrl = "/mighty-decks/assets", style }: IllustratedCardProps): JSX.Element => {
  const image = resolveAssetUrl(assetBaseUrl, artworkPath);
  const paper = resolveAssetUrl(assetBaseUrl, "/backgrounds/paper-with-image-shadow.png");
  const actorIcon = resolveAssetUrl(assetBaseUrl, kind === "actor" ? "/types/actor.png" : "/types/map.png");
  const compact = layout === "compact";
  return <CardStyleBoundary><article className={[styles.card, styles.illustrated, className].filter(Boolean).join(" ")} style={style} aria-label={title} data-card-kind={kind}>
    <svg viewBox="0 0 204 332" width="100%" height="100%" role="img" aria-label={title}>
      <defs><clipPath id={`illustrated-${kind}`}><rect x="1" y="1" width="202" height="330" rx="11" /></clipPath><linearGradient id={`shade-${kind}`} x1="0" x2="1"><stop offset="0" stopColor="#101820" stopOpacity=".74" /><stop offset=".38" stopColor="#101820" stopOpacity=".15" /><stop offset="1" stopColor="#101820" stopOpacity="0" /></linearGradient></defs>
      <g clipPath={`url(#illustrated-${kind})`}>
        {kind === "actor" ? <image href={paper} x="1" y="1" width="202" height="330" preserveAspectRatio="xMidYMid slice" /> : null}
        {kind === "actor" ? <image href={image} x="1" y="1" width="202" height="330" preserveAspectRatio="xMidYMid slice" /> : <image href={image} x="-64" y="64" width="332" height="204" transform="rotate(90 102 166)" preserveAspectRatio="xMidYMid slice" />}
        {kind === "location" ? <rect x="1" y="1" width="202" height="62" fill={`url(#shade-${kind})`} /> : null}
        {kind === "actor" && !compact ? <image href={image} x="13" y="12" width="30" height="30" preserveAspectRatio="xMidYMid meet" /> : null}
      </g>
      <rect x="1" y="1" width="202" height="330" rx="11" fill="none" stroke={kind === "actor" ? "#6d5435" : "#ddcfb4"} strokeWidth="2" />
      {!compact ? <><text x={kind === "location" ? "13" : "168"} y="25" textAnchor={kind === "location" ? "start" : "end"} fill={kind === "location" ? "#f5ead6" : "#856a4c"} style={{ fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }}>{kind === "actor" ? "medieval" : title}</text><text x={kind === "location" ? "13" : "168"} y="38" textAnchor={kind === "location" ? "start" : "end"} fill={kind === "location" ? "#f5ead6" : "#856a4c"} style={{ fontFamily: "MightyDecksShantell", fontSize: 8, fontWeight: 700 }}>{kind === "actor" ? "Actor" : "medieval"}</text><image href={actorIcon} x="174" y="11" width="17" height="17" preserveAspectRatio="xMidYMid meet" /></> : <><rect x="1" y="238" width="202" height="93" fill="rgba(12, 20, 27, .68)" /><text x="102" y="278" textAnchor="middle" fill="#f5ead6" style={{ fontFamily: "MightyDecksKalam", fontSize: 18, fontWeight: 700 }}>{kind === "location" ? title : "medieval"}</text></>}
    </svg>
  </article></CardStyleBoundary>;
};
