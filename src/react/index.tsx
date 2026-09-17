import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { getCard, type CardFamily } from "../catalog.js";
import styles from "./cards.module.css";
import type { ActorPresentation } from "../contracts/actorPresentation.js";

export type CardLayout = "full" | "compact";
export interface LayeredCardProps { className?: string; style?: CSSProperties; assetBaseUrl?: string; backgroundUri?: string; imageUri?: string; imageOverlayUri?: string; noun?: ReactNode; nounDeck?: ReactNode; nounCornerIcon?: string; adjective?: ReactNode; adjectiveDeck?: ReactNode; adjectiveCornerIcon?: string; adjectiveEffect?: ReactNode; nounEffect?: ReactNode; titleColor?: string; layout?: CardLayout; transparent?: boolean; showHeader?: boolean; footerHeight?: number; }
export const CardStyleBoundary = ({ children }: { children: ReactNode }): JSX.Element => <div className={styles.boundary}>{children}</div>;
export const resolveAssetUrl = (assetBaseUrl: string, path: string): string => `${assetBaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
const asLabel = (value: ReactNode): string => typeof value === "string" || typeof value === "number" ? String(value) : "Card";
const SvgText = ({ x, y, width, height, children, fontSize, minFontSize = fontSize, color = "#121b23", fontFamily = "MightyDecksKalam", weight = 700, region }: { x: number; y: number; width: number; height: number; children?: ReactNode; fontSize: number; minFontSize?: number; color?: string; fontFamily?: string; weight?: number; region?: "main" | "footer" }): JSX.Element => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [fittedFontSize, setFittedFontSize] = useState(fontSize);
  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const fit = (): void => {
      let next = fontSize;
      inner.style.fontSize = `${next}px`;
      while (next > minFontSize && (inner.scrollWidth > outer.clientWidth || inner.scrollHeight > outer.clientHeight)) {
        next -= 0.5;
        inner.style.fontSize = `${next}px`;
      }
      setFittedFontSize(next);
    };
    document.fonts?.ready.then(fit).catch(() => {
      // Font fitting already runs synchronously; a rejected font load is non-fatal.
    });
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(outer);
    return () => observer.disconnect();
  }, [children, fontSize, minFontSize]);
  return <foreignObject x={x} y={y} width={width} height={height} data-card-text-region={region}><div ref={outerRef} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color, fontFamily, fontWeight: weight, overflow: "hidden" }}><div ref={innerRef} style={{ maxWidth: "100%", overflowWrap: "break-word", fontSize: fittedFontSize, lineHeight: 1.08 }}>{children}</div></div></foreignObject>;
};
export const LayeredCard = ({ className, style, assetBaseUrl = "/mighty-decks/assets", backgroundUri = "/backgrounds/paper-with-image-shadow.png", imageUri, imageOverlayUri, noun = "Card", nounDeck, nounCornerIcon, adjective, adjectiveDeck, adjectiveCornerIcon, nounEffect, adjectiveEffect, titleColor = "#121b23", layout = "full", transparent = false, showHeader = true, footerHeight = 38 }: LayeredCardProps): JSX.Element => {
  const compact = layout === "compact";
  const compactTitle = noun || adjective;
  const background = resolveAssetUrl(assetBaseUrl, backgroundUri);
  const image = imageUri ? resolveAssetUrl(assetBaseUrl, imageUri) : undefined;
  const overlay = imageOverlayUri ? resolveAssetUrl(assetBaseUrl, imageOverlayUri) : undefined;
  const cornerIcon = nounCornerIcon ? resolveAssetUrl(assetBaseUrl, nounCornerIcon) : undefined;
  const adjectiveCorner = adjectiveCornerIcon ? resolveAssetUrl(assetBaseUrl, adjectiveCornerIcon) : undefined;
  const uniqueId = useId().replace(/:/g, "");
  const paperId = `${uniqueId}-paper`;
  const artId = `${uniqueId}-art`;
  // Long footer rules borrow unused space from the main-rule region.
  const footerY = 318 - footerHeight;
  const mainHeight = footerY - 196;
  return <CardStyleBoundary><article className={[styles.card, className].filter(Boolean).join(" ")} style={style} aria-label={asLabel(compact ? compactTitle : noun)} data-card-layer={transparent ? "overlay" : "base"}><svg viewBox="0 0 204 332" width="100%" height="100%" role="img" aria-label={asLabel(compact ? compactTitle : noun)}><defs><pattern id={paperId} width="1" height="1" patternUnits="objectBoundingBox"><image href={background} width="204" height="332" preserveAspectRatio="xMidYMid slice" /></pattern><clipPath id={artId}><rect x={compact ? 57 : 24} y={compact ? 30 : 44} width={compact ? 90 : 156} height={compact ? 90 : 98} rx="6" /></clipPath></defs>{!transparent ? <><rect x="1" y="1" width="202" height="330" rx="11" fill={`url(#${paperId})`} /><rect x="1" y="1" width="202" height="330" rx="11" fill="none" stroke="#6d5435" strokeWidth="2" /></> : null}{!compact && !transparent && showHeader ? <><text x="168" y="25" textAnchor="end" fill="#856a4c" style={{ fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }}>{asLabel(nounDeck)}</text>{cornerIcon ? <image href={cornerIcon} x="173" y="11" width="18" height="18" preserveAspectRatio="xMidYMid meet" /> : null}</> : null}{image ? <g clipPath={`url(#${artId})`}><image href={image} x={compact ? 57 : 24} y={compact ? 30 : 44} width={compact ? 90 : 156} height={compact ? 90 : 98} preserveAspectRatio="xMidYMid meet" />{overlay ? <image href={overlay} x={compact ? 57 : 24} y={compact ? 30 : 44} width={compact ? 90 : 156} height={compact ? 90 : 98} preserveAspectRatio="xMidYMid meet" /> : null}</g> : null}{!compact && !transparent && (adjectiveDeck || adjectiveCorner) ? <g transform="translate(185 90) rotate(90)">{adjectiveCorner ? <image href={adjectiveCorner} x="-58" y="-10" width="18" height="18" preserveAspectRatio="xMidYMid meet" /> : null}<text x="-36" y="3" fill="#856a4c" style={{ fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }}>{asLabel(adjectiveDeck)}</text></g> : null}{compact ? <SvgText x={12} y={137} width={180} height={142} fontSize={30} minFontSize={24} color={titleColor}>{compactTitle}</SvgText> : <><SvgText x={16} y={148} width={172} height={20} fontSize={16} minFontSize={11} color="#121b23">{adjective}</SvgText><SvgText x={16} y={167} width={172} height={24} fontSize={20} minFontSize={12} color={titleColor}>{noun}</SvgText><><SvgText x={16} y={194} width={172} height={mainHeight} fontSize={11} minFontSize={8} color="#23303d" fontFamily="MightyDecksShantell" weight={400} region="main">{nounEffect}</SvgText><SvgText x={16} y={footerY} width={172} height={footerHeight} fontSize={11} minFontSize={8} color="#121b23" fontFamily="MightyDecksShantell" region="footer">{adjectiveEffect}</SvgText></></>}</svg></article></CardStyleBoundary>;
};
export interface GameCardProps { type: CardFamily; slug: string; locale?: "en"; layout?: CardLayout; className?: string; assetBaseUrl?: string; }
const titleToneBySlug: Record<string, string> = { "special-action": "#d99600", success: "#1aa62b", "partial-success": "#65738b", chaos: "#f20170", fumble: "#090f15" };
const cornerIconByFamily: Record<CardFamily, string> = { outcome: "/types/outcome.png", effect: "/types/effect.png", stunt: "/types/stunt.png", "actor-base": "/types/actor.png", "actor-role": "/types/actor.png", "actor-special": "/types/actor.png", "asset-base": "/types/asset.png", "asset-modifier": "/types/asset.png", counter: "/types/counter.png" };
export const GameCard = ({ type, slug, locale = "en", layout, className, assetBaseUrl }: GameCardProps): JSX.Element => { const card = getCard(type, slug); if (!card || locale !== "en") throw new Error(`Unknown ${type} card '${slug}' for locale '${locale}'.`); const isRole = type === "actor-role"; const isSpecial = type === "actor-special"; const isModifier = type === "asset-modifier"; const isActor = isRole || isSpecial; const isOverlay = isActor || isModifier; const presentation = actorPresentation(card); const footerHeight = card.footer && card.footer.length > 100 ? 60 : undefined; const roleRules = presentation ? <ActorRules presentation={presentation} assetBaseUrl={assetBaseUrl} description={card.description} /> : card.body ?? card.description; const specialRules = presentation?.special ? <span><span className={styles.srOnly}>{card.description}</span><ActorCardTextWithIcons assetBaseUrl={assetBaseUrl} text={presentation.special} /></span> : card.body ?? card.description; return <LayeredCard assetBaseUrl={assetBaseUrl} className={className} layout={layout} transparent={isOverlay} showHeader={isActor || type !== "actor-base"} imageUri={isRole ? undefined : card.artworkPath} noun={isSpecial || isModifier || type === "actor-base" ? "" : card.title} adjective={isSpecial || isModifier ? card.title : undefined} nounDeck={card.deck ?? type} nounCornerIcon={cornerIconByFamily[type]} nounEffect={isSpecial || isModifier ? undefined : roleRules} adjectiveEffect={isSpecial || isModifier ? specialRules : card.footer} footerHeight={footerHeight} titleColor={titleToneBySlug[slug]} />; };
export const OutcomeCard = (props: Omit<GameCardProps, "type">): JSX.Element => <GameCard type="outcome" {...props} />;
export const EffectCard = (props: Omit<GameCardProps, "type">): JSX.Element => <GameCard type="effect" {...props} />;
export const StuntCard = (props: Omit<GameCardProps, "type">): JSX.Element => <GameCard type="stunt" {...props} />;
export const AssetModifierCard = (props: Omit<GameCardProps, "type">): JSX.Element => <GameCard type="asset-modifier" {...props} />;
export interface ActorCardProps extends Omit<LayeredCardProps, "noun"> { baseLayerSlug?: string; tacticalRoleSlug?: string; tacticalSpecialSlug?: string; custom?: { imageUrl: string; noun: string; adjective?: string; nounDescription?: string; adjectiveDescription?: string; deck?: string }; }
const actorImageUri = (slug: string): string => `/actors/base/${slug.replaceAll("_", "-")}.png`;
export const ActorCard = ({ baseLayerSlug, tacticalRoleSlug, tacticalSpecialSlug, custom, ...props }: ActorCardProps): JSX.Element => {
  if (custom) return <LayeredCard {...props} imageUri={custom.imageUrl} noun={custom.noun} adjective={custom.adjective} nounEffect={props.nounEffect ?? custom.nounDescription} adjectiveEffect={props.adjectiveEffect ?? custom.adjectiveDescription} nounDeck={custom.deck ?? "custom"} />;
  const role = tacticalRoleSlug ? getCard("actor-role", tacticalRoleSlug) : undefined;
  const special = tacticalSpecialSlug ? getCard("actor-special", tacticalSpecialSlug) : undefined;
  return <LayeredCard {...props} noun={role?.title ?? ""} adjective={special?.title} nounEffect={props.nounEffect ?? role?.body ?? role?.description} adjectiveEffect={props.adjectiveEffect ?? special?.body ?? special?.description} nounDeck="actor" adjectiveDeck={tacticalSpecialSlug ? "base mod" : undefined} nounCornerIcon="/types/actor.png" adjectiveCornerIcon={tacticalSpecialSlug ? "/types/actor.png" : undefined} imageUri={baseLayerSlug ? actorImageUri(baseLayerSlug) : undefined} imageOverlayUri={tacticalSpecialSlug ? actorImageUri(tacticalSpecialSlug) : undefined} />;
};
export interface AssetCardProps extends Omit<LayeredCardProps, "noun"> { baseAssetSlug: string; modifierSlug?: string; }
const assetImageUri = (slug: string): string => `/assets/${slug.startsWith("medieval_") ? "medieval" : "base"}/${slug.replace(/^medieval_|^base_/, "")}.png`;
export const AssetCard = ({ baseAssetSlug, modifierSlug, ...props }: AssetCardProps): JSX.Element => { const base = getCard("asset-base", baseAssetSlug); const modifier = modifierSlug ? getCard("asset-modifier", modifierSlug) : undefined; return <LayeredCard {...props} noun={base?.title ?? "Unknown Asset"} adjective={modifier?.title} nounDeck={base?.deck ?? (baseAssetSlug.startsWith("medieval_") ? "medieval" : "base")} adjectiveDeck={modifier?.deck} nounCornerIcon="/types/asset.png" adjectiveCornerIcon={modifier ? "/types/asset.png" : undefined} nounEffect={base?.body} adjectiveEffect={modifier?.body} imageUri={base?.artworkPath ?? assetImageUri(baseAssetSlug)} imageOverlayUri={modifier?.artworkPath ?? (modifierSlug ? assetImageUri(modifierSlug) : undefined)} />; };
export interface CounterCardProps extends Omit<LayeredCardProps, "noun" | "adjective"> { iconSlug: string; title: string; currentValue: number; maxValue?: number; }
export const CounterCard = ({ iconSlug, title, currentValue, maxValue, ...props }: CounterCardProps): JSX.Element => <LayeredCard {...props} imageUri={`/counters/${iconSlug}.png`} noun={title} adjective={maxValue === undefined ? currentValue : `${currentValue} / ${maxValue}`} nounDeck="counter" />;
export const CompactCard = (props: LayeredCardProps): JSX.Element => <LayeredCard {...props} layout="compact" />;
const actorIconPaths: Record<string, string> = {
  injury: "/effects/injury.png", distress: "/effects/distress.png", burning: "/effects/burning.png", freezing: "/effects/freezing.png", stuck: "/effects/stuck.png", hindered: "/effects/hindered.png", complication: "/effects/complication.png", boost: "/effects/boost.png",
};
const tokenLabel: Record<string, string> = { toughness: "toughness", shield: "shield", melee: "melee", ranged: "ranged", direct: "direct", heal: "heal", range: "range", splash: "splash", replace: "replace", speed: "speed", ...Object.fromEntries(Object.keys(actorIconPaths).map((key) => [key, key])) };
const actorToken = /\[([a-z-]+?)(\d+)?\]/gi;
export const ActorCardTextWithIcons = ({ text, assetBaseUrl = "/mighty-decks/assets" }: { text: string; assetBaseUrl?: string }): JSX.Element => <span className={styles.actorIconText} aria-label={text.replace(actorToken, (_: string, name: string, count: string | undefined) => ` ${count ?? ""} ${tokenLabel[name] ?? name} `).replace(/\s+/g, " ").trim()}>{text.split(actorToken).map((part, index, parts) => {
  if (index % 3 !== 1) return part;
  const name = part.toLowerCase(); const count = Math.min(Number(parts[index + 1] || 1), 9); const path = actorIconPaths[name];
  if (!path || !Number.isInteger(count) || count < 1) return `[${part}${parts[index + 1] ?? ""}]`;
  return <span key={`${name}-${index}`} className={styles.actorIcons} aria-hidden="true">{Array.from({ length: count }, (_, iconIndex) => <img key={iconIndex} src={resolveAssetUrl(assetBaseUrl, path)} alt="" />)}</span>;
})}</span>;
const actorPresentation = (card: ReturnType<typeof getCard> | undefined): ActorPresentation | undefined => {
  if (!card) return undefined;
  const known: Record<string, ActorPresentation> = {
    pawn: { toughness: "[toughness]", actions: ["[melee][injury]", "[ranged][injury][range]1"] }, minion: { toughness: "[toughness2]", actions: ["[melee][injury]", "[ranged][injury][range]1-2"] }, thug: { toughness: "[toughness2]", actions: ["[melee][injury2]", "[ranged][injury][range]1"] }, brute: { toughness: "[toughness3]", actions: ["[melee][injury2]", "[melee][injury][splash]"] }, tank: { toughness: "[toughness6]", actions: ["[melee][injury2]", "[direct][range]1[splash]"] }, skirmisher: { toughness: "[toughness2]", actions: ["2x[melee][injury]", "2x[ranged][injury][range]1-2"] }, sniper: { toughness: "[toughness2]", actions: ["[ranged][injury4][range]1-∞", "[melee][injury]"] }, artillery: { toughness: "[toughness2]", actions: ["[ranged][injury2][range]1-∞[splash]"] },
    tough: { toughnessBonus: "+[toughness2]" }, armoured: { toughnessBonus: "+[shield2]", special: "-2[injury] taken" }, fiery: { actionBonuses: [null, "[replace][burning]"], special: "Secondary attack deals [burning] instead" }, fast: { special: "Moves an extra zone per turn" }, charging: { actionBonuses: ["(+[injury2])"], special: "Primary attack also deals +[injury2] when entering a zone" },
  };
  return known[card.slug] ?? (card.family === "actor-special" ? { special: card.description } : undefined);
};
const ActorRules = ({ presentation, assetBaseUrl, description }: { presentation: ActorPresentation; assetBaseUrl?: string; description?: string }): JSX.Element => <span className={styles.actorRules}><span className={styles.srOnly}>{description}</span>{presentation.toughness ? <span><ActorCardTextWithIcons assetBaseUrl={assetBaseUrl} text={presentation.toughness} /></span> : null}{presentation.actions?.map((action, index) => <span key={index}><ActorCardTextWithIcons assetBaseUrl={assetBaseUrl} text={action} /></span>)}</span>;
export interface SceneCardProps { title: string; description?: string; imageUrl?: string; imageAlt?: string; className?: string; }
export const SceneCardFrame = ({ title, description, imageUrl, imageAlt = "", className }: SceneCardProps): JSX.Element => <article className={[styles.scene, className].filter(Boolean).join(" ")}>{imageUrl ? <img src={imageUrl} alt={imageAlt} /> : null}<h2>{title}</h2>{description ? <p>{description}</p> : null}</article>;
export const LocationCard = (props: SceneCardProps): JSX.Element => <SceneCardFrame {...props} />;
export const EncounterCard = (props: SceneCardProps): JSX.Element => <SceneCardFrame {...props} />;
export const QuestCard = (props: SceneCardProps): JSX.Element => <SceneCardFrame {...props} />;
