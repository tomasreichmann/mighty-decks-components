import { jsx as t, Fragment as C, jsxs as l } from "react/jsx-runtime";
import { useId as H, useRef as P, useState as T, useEffect as N } from "react";
import { i as j } from "../export-srKAVBjV.js";
const L = "_boundary_1maee_9", q = "_card_1maee_15", G = "_scene_1maee_47", D = {
  boundary: L,
  card: q,
  scene: G
}, K = ({ children: e }) => /* @__PURE__ */ t("div", { className: D.boundary, children: e }), b = (e, c) => `${e.replace(/\/$/, "")}/${c.replace(/^\//, "")}`, E = (e) => typeof e == "string" || typeof e == "number" ? String(e) : "Card", k = ({ x: e, y: c, width: r, height: o, children: n, fontSize: s, minFontSize: i = s, color: g = "#121b23", fontFamily: d = "MightyDecksKalam", weight: f = 700, region: u }) => {
  const x = P(null), $ = P(null), [F, M] = T(s);
  return N(() => {
    var m;
    const v = x.current, h = $.current;
    if (!v || !h) return;
    const w = () => {
      let y = s;
      for (h.style.fontSize = `${y}px`; y > i && (h.scrollWidth > v.clientWidth || h.scrollHeight > v.clientHeight); )
        y -= 0.5, h.style.fontSize = `${y}px`;
      M(y);
    };
    (m = document.fonts) == null || m.ready.then(w).catch(() => {
    }), w();
    const a = new ResizeObserver(w);
    return a.observe(v), () => a.disconnect();
  }, [n, s, i]), /* @__PURE__ */ t("foreignObject", { x: e, y: c, width: r, height: o, "data-card-text-region": u, children: /* @__PURE__ */ t("div", { ref: x, style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: g, fontFamily: d, fontWeight: f, overflow: "hidden" }, children: /* @__PURE__ */ t("div", { ref: $, style: { maxWidth: "100%", overflowWrap: "break-word", fontSize: F, lineHeight: 1.08 }, children: n }) }) });
}, p = ({ className: e, style: c, assetBaseUrl: r = "/mighty-decks/assets", backgroundUri: o = "/backgrounds/paper-with-image-shadow.png", imageUri: n, imageOverlayUri: s, noun: i = "Card", nounDeck: g, nounCornerIcon: d, adjective: f, adjectiveDeck: u, adjectiveCornerIcon: x, nounEffect: $, adjectiveEffect: F, titleColor: M = "#121b23", layout: v = "full", transparent: h = !1, showHeader: w = !0 }) => {
  const a = v === "compact", m = i || f, y = b(r, o), A = n ? b(r, n) : void 0, W = s ? b(r, s) : void 0, R = d ? b(r, d) : void 0, _ = x ? b(r, x) : void 0, S = H().replace(/:/g, ""), U = `${S}-paper`, O = `${S}-art`;
  return /* @__PURE__ */ t(K, { children: /* @__PURE__ */ t("article", { className: [D.card, e].filter(Boolean).join(" "), style: c, "aria-label": E(a ? m : i), "data-card-layer": h ? "overlay" : "base", children: /* @__PURE__ */ l("svg", { viewBox: "0 0 204 332", width: "100%", height: "100%", role: "img", "aria-label": E(a ? m : i), children: [
    /* @__PURE__ */ l("defs", { children: [
      /* @__PURE__ */ t("pattern", { id: U, width: "1", height: "1", patternUnits: "objectBoundingBox", children: /* @__PURE__ */ t("image", { href: y, width: "204", height: "332", preserveAspectRatio: "xMidYMid slice" }) }),
      /* @__PURE__ */ t("clipPath", { id: O, children: /* @__PURE__ */ t("rect", { x: a ? 57 : 24, y: a ? 30 : 44, width: a ? 90 : 156, height: a ? 90 : 98, rx: "6" }) })
    ] }),
    h ? null : /* @__PURE__ */ l(C, { children: [
      /* @__PURE__ */ t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: `url(#${U})` }),
      /* @__PURE__ */ t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: "none", stroke: "#6d5435", strokeWidth: "2" })
    ] }),
    !a && !h && w ? /* @__PURE__ */ l(C, { children: [
      /* @__PURE__ */ t("text", { x: "168", y: "25", textAnchor: "end", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: E(g) }),
      R ? /* @__PURE__ */ t("image", { href: R, x: "173", y: "11", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null
    ] }) : null,
    A ? /* @__PURE__ */ l("g", { clipPath: `url(#${O})`, children: [
      /* @__PURE__ */ t("image", { href: A, x: a ? 57 : 24, y: a ? 30 : 44, width: a ? 90 : 156, height: a ? 90 : 98, preserveAspectRatio: "xMidYMid meet" }),
      W ? /* @__PURE__ */ t("image", { href: W, x: a ? 57 : 24, y: a ? 30 : 44, width: a ? 90 : 156, height: a ? 90 : 98, preserveAspectRatio: "xMidYMid meet" }) : null
    ] }) : null,
    !a && !h && (u || _) ? /* @__PURE__ */ l("g", { transform: "translate(185 90) rotate(90)", children: [
      _ ? /* @__PURE__ */ t("image", { href: _, x: "-58", y: "-10", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null,
      /* @__PURE__ */ t("text", { x: "-36", y: "3", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: E(u) })
    ] }) : null,
    a ? /* @__PURE__ */ t(k, { x: 12, y: 137, width: 180, height: 142, fontSize: 30, minFontSize: 24, color: M, children: m }) : /* @__PURE__ */ l(C, { children: [
      /* @__PURE__ */ t(k, { x: 16, y: 148, width: 172, height: 20, fontSize: 16, minFontSize: 11, color: "#121b23", children: f }),
      /* @__PURE__ */ t(k, { x: 16, y: 167, width: 172, height: 24, fontSize: 20, minFontSize: 12, color: M, children: i }),
      /* @__PURE__ */ l(C, { children: [
        /* @__PURE__ */ t(k, { x: 16, y: 194, width: 172, height: 84, fontSize: 11, minFontSize: 8, color: "#23303d", fontFamily: "MightyDecksShantell", weight: 400, region: "main", children: $ }),
        /* @__PURE__ */ t(k, { x: 16, y: 280, width: 172, height: 38, fontSize: 11, minFontSize: 8, color: "#121b23", fontFamily: "MightyDecksShantell", region: "footer", children: F })
      ] })
    ] })
  ] }) }) });
}, Q = { "special-action": "#d99600", success: "#1aa62b", "partial-success": "#65738b", chaos: "#f20170", fumble: "#090f15" }, J = { outcome: "/types/outcome.png", effect: "/types/effect.png", stunt: "/types/stunt.png", "actor-base": "/types/actor.png", "actor-role": "/types/actor.png", "actor-special": "/types/actor.png", "asset-base": "/types/asset.png", "asset-modifier": "/types/asset.png", counter: "/types/counter.png" }, z = ({ type: e, slug: c, locale: r = "en", layout: o, className: n, assetBaseUrl: s }) => {
  const i = j(e, c);
  if (!i || r !== "en") throw new Error(`Unknown ${e} card '${c}' for locale '${r}'.`);
  const g = e === "actor-role", d = e === "actor-special", f = e === "asset-modifier";
  return /* @__PURE__ */ t(p, { assetBaseUrl: s, className: n, layout: o, transparent: g || d || f, showHeader: e !== "actor-base", imageUri: g ? void 0 : i.artworkPath, noun: d || f || e === "actor-base" ? "" : i.title, adjective: d || f ? i.title : void 0, nounDeck: i.deck ?? e, nounCornerIcon: J[e], nounEffect: d ? void 0 : i.body ?? i.description, adjectiveEffect: d ? i.body ?? i.description : i.footer, titleColor: Q[c] });
}, ee = (e) => /* @__PURE__ */ t(z, { type: "outcome", ...e }), te = (e) => /* @__PURE__ */ t(z, { type: "effect", ...e }), ne = (e) => /* @__PURE__ */ t(z, { type: "stunt", ...e }), oe = (e) => /* @__PURE__ */ t(z, { type: "asset-modifier", ...e }), Y = (e) => `/actors/base/${e.replaceAll("_", "-")}.png`, ie = ({ baseLayerSlug: e, tacticalRoleSlug: c, tacticalSpecialSlug: r, custom: o, ...n }) => {
  if (o) return /* @__PURE__ */ t(p, { ...n, imageUri: o.imageUrl, noun: o.noun, adjective: o.adjective, nounEffect: n.nounEffect ?? o.nounDescription, adjectiveEffect: n.adjectiveEffect ?? o.adjectiveDescription, nounDeck: o.deck ?? "custom" });
  const s = c ? j("actor-role", c) : void 0, i = r ? j("actor-special", r) : void 0;
  return /* @__PURE__ */ t(p, { ...n, noun: (s == null ? void 0 : s.title) ?? "", adjective: i == null ? void 0 : i.title, nounEffect: n.nounEffect ?? (s == null ? void 0 : s.body) ?? (s == null ? void 0 : s.description), adjectiveEffect: n.adjectiveEffect ?? (i == null ? void 0 : i.body) ?? (i == null ? void 0 : i.description), nounDeck: "actor", adjectiveDeck: r ? "base mod" : void 0, nounCornerIcon: "/types/actor.png", adjectiveCornerIcon: r ? "/types/actor.png" : void 0, imageUri: e ? Y(e) : void 0, imageOverlayUri: r ? Y(r) : void 0 });
}, B = (e) => `/assets/${e.startsWith("medieval_") ? "medieval" : "base"}/${e.replace(/^medieval_|^base_/, "")}.png`, re = ({ baseAssetSlug: e, modifierSlug: c, ...r }) => {
  const o = j("asset-base", e), n = c ? j("asset-modifier", c) : void 0;
  return /* @__PURE__ */ t(p, { ...r, noun: (o == null ? void 0 : o.title) ?? "Unknown Asset", adjective: n == null ? void 0 : n.title, nounDeck: (o == null ? void 0 : o.deck) ?? (e.startsWith("medieval_") ? "medieval" : "base"), adjectiveDeck: n == null ? void 0 : n.deck, nounCornerIcon: "/types/asset.png", adjectiveCornerIcon: n ? "/types/asset.png" : void 0, nounEffect: o == null ? void 0 : o.body, adjectiveEffect: n == null ? void 0 : n.body, imageUri: (o == null ? void 0 : o.artworkPath) ?? B(e), imageOverlayUri: (n == null ? void 0 : n.artworkPath) ?? (c ? B(c) : void 0) });
}, ce = ({ iconSlug: e, title: c, currentValue: r, maxValue: o, ...n }) => /* @__PURE__ */ t(p, { ...n, imageUri: `/counters/${e}.png`, noun: c, adjective: o === void 0 ? r : `${r} / ${o}`, nounDeck: "counter" }), ae = (e) => /* @__PURE__ */ t(p, { ...e, layout: "compact" }), se = ({ text: e }) => /* @__PURE__ */ t(C, { children: e }), I = ({ title: e, description: c, imageUrl: r, imageAlt: o = "", className: n }) => /* @__PURE__ */ l("article", { className: [D.scene, n].filter(Boolean).join(" "), children: [
  r ? /* @__PURE__ */ t("img", { src: r, alt: o }) : null,
  /* @__PURE__ */ t("h2", { children: e }),
  c ? /* @__PURE__ */ t("p", { children: c }) : null
] }), de = (e) => /* @__PURE__ */ t(I, { ...e }), he = (e) => /* @__PURE__ */ t(I, { ...e }), le = (e) => /* @__PURE__ */ t(I, { ...e });
export {
  ie as ActorCard,
  se as ActorCardTextWithIcons,
  re as AssetCard,
  oe as AssetModifierCard,
  K as CardStyleBoundary,
  ae as CompactCard,
  ce as CounterCard,
  te as EffectCard,
  he as EncounterCard,
  z as GameCard,
  p as LayeredCard,
  de as LocationCard,
  ee as OutcomeCard,
  le as QuestCard,
  I as SceneCardFrame,
  ne as StuntCard,
  b as resolveAssetUrl
};
