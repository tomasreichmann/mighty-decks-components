import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useId, useRef, useState } from "react";
import { getCard } from "../catalog.js";
import styles from "./cards.module.css";
export const CardStyleBoundary = ({ children }) => _jsx("div", { className: styles.boundary, children: children });
export const resolveAssetUrl = (assetBaseUrl, path) => `${assetBaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
const asLabel = (value) => typeof value === "string" || typeof value === "number" ? String(value) : "Card";
const SvgText = ({ x, y, width, height, children, fontSize, minFontSize = fontSize, color = "#121b23", fontFamily = "MightyDecksKalam", weight = 700, region }) => {
    const outerRef = useRef(null);
    const innerRef = useRef(null);
    const [fittedFontSize, setFittedFontSize] = useState(fontSize);
    useEffect(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner)
            return;
        const fit = () => {
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
    return _jsx("foreignObject", { x: x, y: y, width: width, height: height, "data-card-text-region": region, children: _jsx("div", { ref: outerRef, style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color, fontFamily, fontWeight: weight, overflow: "hidden" }, children: _jsx("div", { ref: innerRef, style: { maxWidth: "100%", overflowWrap: "break-word", fontSize: fittedFontSize, lineHeight: 1.08 }, children: children }) }) });
};
export const LayeredCard = ({ className, style, assetBaseUrl = "/mighty-decks/assets", backgroundUri = "/backgrounds/paper-with-image-shadow.png", imageUri, imageOverlayUri, noun = "Card", nounDeck, nounCornerIcon, adjective, adjectiveDeck, adjectiveCornerIcon, nounEffect, adjectiveEffect, titleColor = "#121b23", layout = "full", transparent = false, showHeader = true, footerHeight = 38 }) => {
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
    return _jsx(CardStyleBoundary, { children: _jsx("article", { className: [styles.card, className].filter(Boolean).join(" "), style: style, "aria-label": asLabel(compact ? compactTitle : noun), "data-card-layer": transparent ? "overlay" : "base", children: _jsxs("svg", { viewBox: "0 0 204 332", width: "100%", height: "100%", role: "img", "aria-label": asLabel(compact ? compactTitle : noun), children: [_jsxs("defs", { children: [_jsx("pattern", { id: paperId, width: "1", height: "1", patternUnits: "objectBoundingBox", children: _jsx("image", { href: background, width: "204", height: "332", preserveAspectRatio: "xMidYMid slice" }) }), _jsx("clipPath", { id: artId, children: _jsx("rect", { x: compact ? 57 : 24, y: compact ? 30 : 44, width: compact ? 90 : 156, height: compact ? 90 : 98, rx: "6" }) })] }), !transparent ? _jsxs(_Fragment, { children: [_jsx("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: `url(#${paperId})` }), _jsx("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: "none", stroke: "#6d5435", strokeWidth: "2" })] }) : null, !compact && !transparent && showHeader ? _jsxs(_Fragment, { children: [_jsx("text", { x: "168", y: "25", textAnchor: "end", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: asLabel(nounDeck) }), cornerIcon ? _jsx("image", { href: cornerIcon, x: "173", y: "11", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null] }) : null, image ? _jsxs("g", { clipPath: `url(#${artId})`, children: [_jsx("image", { href: image, x: compact ? 57 : 24, y: compact ? 30 : 44, width: compact ? 90 : 156, height: compact ? 90 : 98, preserveAspectRatio: "xMidYMid meet" }), overlay ? _jsx("image", { href: overlay, x: compact ? 57 : 24, y: compact ? 30 : 44, width: compact ? 90 : 156, height: compact ? 90 : 98, preserveAspectRatio: "xMidYMid meet" }) : null] }) : null, !compact && !transparent && (adjectiveDeck || adjectiveCorner) ? _jsxs("g", { transform: "translate(185 90) rotate(90)", children: [adjectiveCorner ? _jsx("image", { href: adjectiveCorner, x: "-58", y: "-10", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null, _jsx("text", { x: "-36", y: "3", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: asLabel(adjectiveDeck) })] }) : null, compact ? _jsx(SvgText, { x: 12, y: 137, width: 180, height: 142, fontSize: 30, minFontSize: 24, color: titleColor, children: compactTitle }) : _jsxs(_Fragment, { children: [_jsx(SvgText, { x: 16, y: 148, width: 172, height: 20, fontSize: 16, minFontSize: 11, color: "#121b23", children: adjective }), _jsx(SvgText, { x: 16, y: 167, width: 172, height: 24, fontSize: 20, minFontSize: 12, color: titleColor, children: noun }), _jsxs(_Fragment, { children: [_jsx(SvgText, { x: 16, y: 194, width: 172, height: mainHeight, fontSize: 11, minFontSize: 8, color: "#23303d", fontFamily: "MightyDecksShantell", weight: 400, region: "main", children: nounEffect }), _jsx(SvgText, { x: 16, y: footerY, width: 172, height: footerHeight, fontSize: 11, minFontSize: 8, color: "#121b23", fontFamily: "MightyDecksShantell", region: "footer", children: adjectiveEffect })] })] })] }) }) });
};
const titleToneBySlug = { "special-action": "#d99600", success: "#1aa62b", "partial-success": "#65738b", chaos: "#f20170", fumble: "#090f15" };
const cornerIconByFamily = { outcome: "/types/outcome.png", effect: "/types/effect.png", stunt: "/types/stunt.png", "actor-base": "/types/actor.png", "actor-role": "/types/actor.png", "actor-special": "/types/actor.png", "asset-base": "/types/asset.png", "asset-modifier": "/types/asset.png", counter: "/types/counter.png" };
export const GameCard = ({ type, slug, locale = "en", layout, className, assetBaseUrl }) => { const card = getCard(type, slug); if (!card || locale !== "en")
    throw new Error(`Unknown ${type} card '${slug}' for locale '${locale}'.`); const isRole = type === "actor-role"; const isSpecial = type === "actor-special"; const isModifier = type === "asset-modifier"; const isOverlay = isRole || isSpecial || isModifier; const footerHeight = card.footer && card.footer.length > 100 ? 60 : undefined; return _jsx(LayeredCard, { assetBaseUrl: assetBaseUrl, className: className, layout: layout, transparent: isOverlay, showHeader: type !== "actor-base", imageUri: isRole ? undefined : card.artworkPath, noun: isSpecial || isModifier || type === "actor-base" ? "" : card.title, adjective: isSpecial || isModifier ? card.title : undefined, nounDeck: card.deck ?? type, nounCornerIcon: cornerIconByFamily[type], nounEffect: isSpecial || isModifier ? undefined : card.body ?? card.description, adjectiveEffect: isSpecial || isModifier ? card.body ?? card.description : card.footer, footerHeight: footerHeight, titleColor: titleToneBySlug[slug] }); };
export const OutcomeCard = (props) => _jsx(GameCard, { type: "outcome", ...props });
export const EffectCard = (props) => _jsx(GameCard, { type: "effect", ...props });
export const StuntCard = (props) => _jsx(GameCard, { type: "stunt", ...props });
export const AssetModifierCard = (props) => _jsx(GameCard, { type: "asset-modifier", ...props });
const actorImageUri = (slug) => `/actors/base/${slug.replaceAll("_", "-")}.png`;
export const ActorCard = ({ baseLayerSlug, tacticalRoleSlug, tacticalSpecialSlug, custom, ...props }) => {
    if (custom)
        return _jsx(LayeredCard, { ...props, imageUri: custom.imageUrl, noun: custom.noun, adjective: custom.adjective, nounEffect: props.nounEffect ?? custom.nounDescription, adjectiveEffect: props.adjectiveEffect ?? custom.adjectiveDescription, nounDeck: custom.deck ?? "custom" });
    const role = tacticalRoleSlug ? getCard("actor-role", tacticalRoleSlug) : undefined;
    const special = tacticalSpecialSlug ? getCard("actor-special", tacticalSpecialSlug) : undefined;
    return _jsx(LayeredCard, { ...props, noun: role?.title ?? "", adjective: special?.title, nounEffect: props.nounEffect ?? role?.body ?? role?.description, adjectiveEffect: props.adjectiveEffect ?? special?.body ?? special?.description, nounDeck: "actor", adjectiveDeck: tacticalSpecialSlug ? "base mod" : undefined, nounCornerIcon: "/types/actor.png", adjectiveCornerIcon: tacticalSpecialSlug ? "/types/actor.png" : undefined, imageUri: baseLayerSlug ? actorImageUri(baseLayerSlug) : undefined, imageOverlayUri: tacticalSpecialSlug ? actorImageUri(tacticalSpecialSlug) : undefined });
};
const assetImageUri = (slug) => `/assets/${slug.startsWith("medieval_") ? "medieval" : "base"}/${slug.replace(/^medieval_|^base_/, "")}.png`;
export const AssetCard = ({ baseAssetSlug, modifierSlug, ...props }) => { const base = getCard("asset-base", baseAssetSlug); const modifier = modifierSlug ? getCard("asset-modifier", modifierSlug) : undefined; return _jsx(LayeredCard, { ...props, noun: base?.title ?? "Unknown Asset", adjective: modifier?.title, nounDeck: base?.deck ?? (baseAssetSlug.startsWith("medieval_") ? "medieval" : "base"), adjectiveDeck: modifier?.deck, nounCornerIcon: "/types/asset.png", adjectiveCornerIcon: modifier ? "/types/asset.png" : undefined, nounEffect: base?.body, adjectiveEffect: modifier?.body, imageUri: base?.artworkPath ?? assetImageUri(baseAssetSlug), imageOverlayUri: modifier?.artworkPath ?? (modifierSlug ? assetImageUri(modifierSlug) : undefined) }); };
export const CounterCard = ({ iconSlug, title, currentValue, maxValue, ...props }) => _jsx(LayeredCard, { ...props, imageUri: `/counters/${iconSlug}.png`, noun: title, adjective: maxValue === undefined ? currentValue : `${currentValue} / ${maxValue}`, nounDeck: "counter" });
export const CompactCard = (props) => _jsx(LayeredCard, { ...props, layout: "compact" });
export const ActorCardTextWithIcons = ({ text }) => _jsx(_Fragment, { children: text });
export const SceneCardFrame = ({ title, description, imageUrl, imageAlt = "", className }) => _jsxs("article", { className: [styles.scene, className].filter(Boolean).join(" "), children: [imageUrl ? _jsx("img", { src: imageUrl, alt: imageAlt }) : null, _jsx("h2", { children: title }), description ? _jsx("p", { children: description }) : null] });
export const LocationCard = (props) => _jsx(SceneCardFrame, { ...props });
export const EncounterCard = (props) => _jsx(SceneCardFrame, { ...props });
export const QuestCard = (props) => _jsx(SceneCardFrame, { ...props });
