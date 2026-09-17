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
export const LayeredCard = ({ className, style, assetBaseUrl = "/mighty-decks/assets", backgroundUri = "/backgrounds/paper-with-image-shadow.png", imageUri, imageOverlayUri, noun = "Card", nounDeck, nounCornerIcon, adjective, adjectiveDeck, adjectiveCornerIcon, nounEffect, adjectiveEffect, titleColor = "#121b23", layout = "full", transparent = false, showHeader = true, footerHeight = 38, actorBase = false, actorOverlay = false }) => {
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
    const artX = compact ? 57 : actorBase ? 20 : 24;
    const artY = compact ? 30 : actorBase ? 42 : 44;
    const artWidth = compact ? 90 : actorBase ? 164 : 156;
    const artHeight = compact ? 90 : actorBase ? 118 : 98;
    return _jsx(CardStyleBoundary, { children: _jsx("article", { className: [styles.card, className].filter(Boolean).join(" "), style: style, "aria-label": asLabel(compact ? compactTitle : noun), "data-card-layer": transparent ? "overlay" : "base", children: _jsxs("svg", { viewBox: "0 0 204 332", width: "100%", height: "100%", role: "img", "aria-label": asLabel(compact ? compactTitle : noun), children: [_jsxs("defs", { children: [_jsx("pattern", { id: paperId, width: "1", height: "1", patternUnits: "objectBoundingBox", children: _jsx("image", { href: background, width: "204", height: "332", preserveAspectRatio: "xMidYMid slice" }) }), _jsx("clipPath", { id: artId, children: _jsx("rect", { x: artX, y: artY, width: artWidth, height: artHeight, rx: actorBase ? 0 : 6 }) })] }), !transparent ? _jsxs(_Fragment, { children: [_jsx("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: `url(#${paperId})` }), !actorBase ? _jsx("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: "none", stroke: "#6d5435", strokeWidth: "2" }) : null] }) : null, !compact && !transparent && showHeader ? _jsxs(_Fragment, { children: [_jsx("text", { x: "168", y: "25", textAnchor: "end", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: asLabel(nounDeck) }), cornerIcon ? _jsx("image", { href: cornerIcon, x: "173", y: "11", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null] }) : null, actorBase && image && !compact ? _jsx("image", { href: image, x: "29", y: "48", width: "20", height: "20", preserveAspectRatio: "xMidYMid meet" }) : null, image ? _jsxs("g", { clipPath: `url(#${artId})`, children: [_jsx("image", { href: image, x: artX, y: artY, width: artWidth, height: artHeight, preserveAspectRatio: "xMidYMid meet" }), overlay ? _jsx("image", { href: overlay, x: actorOverlay ? -15 : artX, y: actorOverlay ? 26 : artY, width: actorOverlay ? 234 : artWidth, height: actorOverlay ? 150 : artHeight, preserveAspectRatio: "xMidYMid meet", opacity: actorOverlay ? .85 : 1 }) : null] }) : null, !compact && !transparent && (adjectiveDeck || adjectiveCorner) ? _jsxs("g", { transform: "translate(185 90) rotate(90)", children: [adjectiveCorner ? _jsx("image", { href: adjectiveCorner, x: "-58", y: "-10", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null, _jsx("text", { x: "-36", y: "3", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: asLabel(adjectiveDeck) })] }) : null, compact ? _jsx(SvgText, { x: 12, y: 137, width: 180, height: 142, fontSize: 30, minFontSize: 24, color: titleColor, children: compactTitle }) : _jsxs(_Fragment, { children: [_jsx(SvgText, { x: 16, y: 148, width: 172, height: 20, fontSize: 16, minFontSize: 11, color: "#121b23", children: adjective }), _jsx(SvgText, { x: 16, y: 167, width: 172, height: 24, fontSize: 20, minFontSize: 12, color: titleColor, children: noun }), _jsxs(_Fragment, { children: [_jsx(SvgText, { x: 16, y: 194, width: 172, height: mainHeight, fontSize: 11, minFontSize: 8, color: "#23303d", fontFamily: "MightyDecksShantell", weight: 400, region: "main", children: nounEffect }), _jsx(SvgText, { x: 16, y: footerY, width: 172, height: footerHeight, fontSize: 11, minFontSize: 8, color: "#121b23", fontFamily: "MightyDecksShantell", region: "footer", children: adjectiveEffect })] })] })] }) }) });
};
const titleToneBySlug = { "special-action": "#d99600", success: "#1aa62b", "partial-success": "#65738b", chaos: "#f20170", fumble: "#090f15" };
const cornerIconByFamily = { outcome: "/types/outcome.png", effect: "/types/effect.png", stunt: "/types/stunt.png", "actor-base": "/types/actor.png", "actor-role": "/types/actor.png", "actor-special": "/types/actor.png", "asset-base": "/types/asset.png", "asset-modifier": "/types/asset.png", counter: "/types/counter.png" };
export const GameCard = ({ type, slug, locale = "en", layout, className, assetBaseUrl }) => { const card = getCard(type, slug); if (!card || locale !== "en")
    throw new Error(`Unknown ${type} card '${slug}' for locale '${locale}'.`); const isRole = type === "actor-role"; const isSpecial = type === "actor-special"; const isModifier = type === "asset-modifier"; const isActor = isRole || isSpecial; const isOverlay = isActor || isModifier; const presentation = actorPresentation(card); const footerHeight = isSpecial && (presentation?.special?.length ?? 0) > 25 ? 60 : card.footer && card.footer.length > 100 ? 60 : undefined; const roleRules = presentation ? _jsx(ActorRules, { presentation: presentation, assetBaseUrl: assetBaseUrl, description: card.description }) : card.body ?? card.description; const specialRules = presentation?.special ? _jsxs("span", { children: [_jsx("span", { className: styles.srOnly, children: card.description }), _jsx(ActorCardTextWithIcons, { assetBaseUrl: assetBaseUrl, text: presentation.special })] }) : card.body ?? card.description; return _jsx(LayeredCard, { assetBaseUrl: assetBaseUrl, className: className, layout: layout, transparent: isOverlay, showHeader: isActor || type !== "actor-base", actorBase: type === "actor-base", actorOverlay: isSpecial, imageUri: isRole ? undefined : card.artworkPath, noun: isSpecial || isModifier || type === "actor-base" ? "" : card.title, adjective: isSpecial || isModifier ? card.title : undefined, nounDeck: card.deck ?? type, nounCornerIcon: cornerIconByFamily[type], nounEffect: isSpecial ? roleRules : isModifier ? undefined : roleRules, adjectiveEffect: isSpecial || isModifier ? specialRules : card.footer, footerHeight: footerHeight, titleColor: titleToneBySlug[slug] }); };
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
    const rolePresentation = actorPresentation(role);
    const specialPresentation = actorPresentation(special);
    return _jsx(LayeredCard, { ...props, actorBase: Boolean(baseLayerSlug), actorOverlay: Boolean(tacticalSpecialSlug), noun: role?.title ?? "", adjective: special?.title, nounEffect: props.nounEffect ?? (rolePresentation ? _jsx(ActorRules, { presentation: rolePresentation, bonusPresentation: specialPresentation, assetBaseUrl: props.assetBaseUrl, description: role?.description }) : role?.body ?? role?.description), adjectiveEffect: props.adjectiveEffect ?? (specialPresentation?.special ? _jsxs("span", { children: [_jsx("span", { className: styles.srOnly, children: special?.description }), _jsx(ActorCardTextWithIcons, { assetBaseUrl: props.assetBaseUrl, text: specialPresentation.special })] }) : special?.body ?? special?.description), nounDeck: "actor", adjectiveDeck: tacticalSpecialSlug ? "base mod" : undefined, nounCornerIcon: "/types/actor.png", adjectiveCornerIcon: tacticalSpecialSlug ? "/types/actor.png" : undefined, imageUri: baseLayerSlug ? actorImageUri(baseLayerSlug) : undefined, imageOverlayUri: tacticalSpecialSlug ? actorImageUri(tacticalSpecialSlug) : undefined });
};
const assetImageUri = (slug) => `/assets/${slug.startsWith("medieval_") ? "medieval" : "base"}/${slug.replace(/^medieval_|^base_/, "")}.png`;
export const AssetCard = ({ baseAssetSlug, modifierSlug, ...props }) => { const base = getCard("asset-base", baseAssetSlug); const modifier = modifierSlug ? getCard("asset-modifier", modifierSlug) : undefined; return _jsx(LayeredCard, { ...props, noun: base?.title ?? "Unknown Asset", adjective: modifier?.title, nounDeck: base?.deck ?? (baseAssetSlug.startsWith("medieval_") ? "medieval" : "base"), adjectiveDeck: modifier?.deck, nounCornerIcon: "/types/asset.png", adjectiveCornerIcon: modifier ? "/types/asset.png" : undefined, nounEffect: base?.body, adjectiveEffect: modifier?.body, imageUri: base?.artworkPath ?? assetImageUri(baseAssetSlug), imageOverlayUri: modifier?.artworkPath ?? (modifierSlug ? assetImageUri(modifierSlug) : undefined) }); };
export const CounterCard = ({ iconSlug, title, currentValue, maxValue, ...props }) => _jsx(LayeredCard, { ...props, imageUri: `/counters/${iconSlug}.png`, noun: title, adjective: maxValue === undefined ? currentValue : `${currentValue} / ${maxValue}`, nounDeck: "counter" });
export const CompactCard = (props) => _jsx(LayeredCard, { ...props, layout: "compact" });
const actorIconPaths = {
    injury: "/effects/injury.png", distress: "/effects/distress.png", burning: "/effects/burning.png", freezing: "/effects/freezing.png", stuck: "/effects/stuck.png", hindered: "/effects/hindered.png", complication: "/effects/complication.png", boost: "/effects/boost.png",
};
const tokenLabel = { toughness: "toughness", shield: "shield", melee: "melee", ranged: "ranged", direct: "direct", heal: "heal", range: "range", splash: "splash", replace: "replace", speed: "speed", ...Object.fromEntries(Object.keys(actorIconPaths).map((key) => [key, key])) };
const actorToken = /\[([a-z-]+?)(\d+)?\]/gi;
export const ActorCardTextWithIcons = ({ text, assetBaseUrl = "/mighty-decks/assets" }) => {
    const children = [];
    let end = 0;
    for (const match of text.matchAll(actorToken)) {
        children.push(text.slice(end, match.index));
        const [, rawName, rawCount] = match;
        const name = rawName.toLowerCase();
        const count = Math.min(Number(rawCount ?? 1), 9);
        const path = actorIconPaths[name];
        children.push(!path || !Number.isInteger(count) || count < 1 ? match[0] : _jsx("span", { className: styles.actorIcons, "aria-hidden": "true", children: Array.from({ length: count }, (_, iconIndex) => _jsx("img", { src: resolveAssetUrl(assetBaseUrl, path), alt: "" }, iconIndex)) }, `${name}-${match.index}`));
        end = (match.index ?? 0) + match[0].length;
    }
    children.push(text.slice(end));
    return _jsx("span", { className: styles.actorIconText, "aria-label": text.replace(actorToken, (_, name, count) => ` ${count ?? ""} ${tokenLabel[name] ?? name} `).replace(/\s+/g, " ").trim(), children: children });
};
const actorPresentation = (card) => {
    if (!card)
        return undefined;
    const known = {
        pawn: { toughness: "[toughness]", actions: ["[melee][injury]", "[ranged][injury][range]1"] }, minion: { toughness: "[toughness2]", actions: ["[melee][injury]", "[ranged][injury][range]1-2"] }, thug: { toughness: "[toughness2]", actions: ["[melee][injury2]", "[ranged][injury][range]1"] }, brute: { toughness: "[toughness3]", actions: ["[melee][injury2]", "[melee][injury][splash]"] }, tank: { toughness: "[toughness6]", actions: ["[melee][injury2]", "[direct][push][range]1[splash]"] }, champion: { toughness: "[toughness4]", actions: ["[melee][injury3]", "[direct][distress2][splash]"] }, assassin: { toughness: "[toughness2]", actions: ["[melee][injury4]", "[direct][complication2][splash]"] }, skirmisher: { toughness: "[toughness2]", actions: ["2x[melee][injury]", "2x[ranged][injury][range]1-2"] }, ranger: { toughness: "[toughness3]", actions: ["[ranged][injury2][range]1-2", "[melee][injury2]"] }, stalker: { toughness: "[toughness2]", actions: ["[melee][injury3]", "[ranged][injury3][range]1-2"] }, commando: { toughness: "[toughness3]", actions: ["[melee][injury3]", "3x[ranged][injury][range]1-2"] }, marksman: { toughness: "[toughness2]", actions: ["[ranged][injury3][range]1-3", "[melee][injury]"] }, sniper: { toughness: "[toughness2]", actions: ["[ranged][injury4][range]1-∞", "[melee][injury]"] }, grenadier: { toughness: "[toughness2]", actions: ["[ranged][injury2][range]1[splash]", "[melee][injury]"] }, bomber: { toughness: "[toughness3]", actions: ["[ranged][injury3][range]0[splash]"] }, artillery: { toughness: "[toughness2]", actions: ["[ranged][injury2][range]1-∞[splash]"] },
        tough: { toughnessBonus: "+[toughness2]" }, shielded: { toughnessBonus: "+[shield]", special: "-1[injury] taken" }, armoured: { toughnessBonus: "+[shield2]", special: "-2[injury] taken" }, alpha: { toughnessBonus: "+[toughness]", actionBonuses: ["+[injury]", "+[injury]"], special: "+[toughness] and +[injury] for all attacks" }, dangerous: { actionBonuses: ["+[injury]"], special: "Primary attack also deals +[injury]" }, burning: { actionBonuses: ["+[burning]"], special: "Primary attack also deals +[burning]" }, fiery: { actionBonuses: [null, "[replace][burning]"], special: "Secondary attack deals [burning] instead" }, freezing: { actionBonuses: ["+[freezing]"], special: "Primary attack also deals +[freezing]" }, icy: { actionBonuses: [null, "[replace][freezing]"], special: "Secondary attack deals [freezing] instead" }, irritating: { actionBonuses: ["+[distress]"], special: "Primary attack also deals +[distress]" }, corrupting: { actionBonuses: [null, "[replace][distress]"], special: "Secondary attack deals [distress] instead" }, fast: { special: "Moves an extra zone per turn" }, harassing: { actionBonuses: [null, "+[complication]"], special: "Secondary attack also deals +[complication]" }, slowing: { actionBonuses: [null, "+[hindered]"], special: "Secondary attack also deals +[hindered]" }, elemental: { actionBonuses: ["+[freezing]/+[burning]", "+[freezing]/+[burning]"], special: "All attacks can deal [freezing] or [burning]" }, charging: { actionBonuses: ["(+[injury2])"], special: "Primary attack also deals +[injury2] when entering a zone" }, suicide: { special: "Can die and deal 2x[injury][splash]" }, grabbing: { actionBonuses: ["(+[stuck])", "(+[stuck])"], special: "[melee] attack also deals +[stuck]" }, webbing: { actionBonuses: ["+[stuck][splash]", null], special: "Primary attack also deals +[stuck][splash]" }, reaching: { actionBonuses: ["([range]0-1)", "([range]0-1)"], special: "[melee] attack reaches to the adjacent zones" }, healing: { special: "Heal 2x[injury] from one ally in the zone" }, restoring: { special: "Heal [injury] from all allies in the zone" }, regenerating: { toughnessBonus: "[heal2]", special: "Heal [injury2] at the end of the turn" }, encouraging: { special: "[boost] all allies in the zone" },
    };
    return known[card.slug] ?? (card.family === "actor-special" ? { special: card.description } : undefined);
};
const ActorRules = ({ presentation, bonusPresentation, assetBaseUrl, description }) => _jsxs("span", { className: styles.actorRules, children: [_jsx("span", { className: styles.srOnly, children: description }), presentation.toughness || bonusPresentation?.toughnessBonus ? _jsxs("span", { className: styles.actorRuleRow, children: [_jsx(ActorCardTextWithIcons, { assetBaseUrl: assetBaseUrl, text: presentation.toughness ?? "" }), _jsx(ActorCardTextWithIcons, { assetBaseUrl: assetBaseUrl, text: bonusPresentation?.toughnessBonus ?? "" })] }) : null, presentation.actions?.map((action, index) => _jsxs("span", { className: styles.actorRuleRow, children: [_jsx(ActorCardTextWithIcons, { assetBaseUrl: assetBaseUrl, text: action }), _jsx(ActorCardTextWithIcons, { assetBaseUrl: assetBaseUrl, text: bonusPresentation?.actionBonuses?.[index] ?? "" })] }, index))] });
export const SceneCardFrame = ({ title, description, imageUrl, imageAlt = "", className }) => _jsxs("article", { className: [styles.scene, className].filter(Boolean).join(" "), children: [imageUrl ? _jsx("img", { src: imageUrl, alt: imageAlt }) : null, _jsx("h2", { children: title }), description ? _jsx("p", { children: description }) : null] });
export const LocationCard = (props) => _jsx(SceneCardFrame, { ...props });
export const EncounterCard = (props) => _jsx(SceneCardFrame, { ...props });
export const QuestCard = (props) => _jsx(SceneCardFrame, { ...props });
