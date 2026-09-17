import { jsx as t, Fragment as C, jsxs as g } from "react/jsx-runtime";
import { useId as L, useRef as O, useState as q, useEffect as G } from "react";
import { i as j } from "../export-BrA47ZDD.js";
const K = "_boundary_1maee_9", Q = "_card_1maee_15", J = "_scene_1maee_47", D = {
  boundary: K,
  card: Q,
  scene: J
}, X = ({ children: e }) => /* @__PURE__ */ t("div", { className: D.boundary, children: e }), b = (e, c) => `${e.replace(/\/$/, "")}/${c.replace(/^\//, "")}`, E = (e) => typeof e == "string" || typeof e == "number" ? String(e) : "Card", k = ({ x: e, y: c, width: r, height: o, children: n, fontSize: a, minFontSize: i = a, color: m = "#121b23", fontFamily: d = "MightyDecksKalam", weight: h = 700, region: v }) => {
  const y = O(null), $ = O(null), [F, M] = q(a);
  return G(() => {
    var s;
    const p = y.current, l = $.current;
    if (!p || !l) return;
    const x = () => {
      let f = a;
      for (l.style.fontSize = `${f}px`; f > i && (l.scrollWidth > p.clientWidth || l.scrollHeight > p.clientHeight); )
        f -= 0.5, l.style.fontSize = `${f}px`;
      M(f);
    };
    (s = document.fonts) == null || s.ready.then(x).catch(() => {
    }), x();
    const w = new ResizeObserver(x);
    return w.observe(p), () => w.disconnect();
  }, [n, a, i]), /* @__PURE__ */ t("foreignObject", { x: e, y: c, width: r, height: o, "data-card-text-region": v, children: /* @__PURE__ */ t("div", { ref: y, style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: m, fontFamily: d, fontWeight: h, overflow: "hidden" }, children: /* @__PURE__ */ t("div", { ref: $, style: { maxWidth: "100%", overflowWrap: "break-word", fontSize: F, lineHeight: 1.08 }, children: n }) }) });
}, u = ({ className: e, style: c, assetBaseUrl: r = "/mighty-decks/assets", backgroundUri: o = "/backgrounds/paper-with-image-shadow.png", imageUri: n, imageOverlayUri: a, noun: i = "Card", nounDeck: m, nounCornerIcon: d, adjective: h, adjectiveDeck: v, adjectiveCornerIcon: y, nounEffect: $, adjectiveEffect: F, titleColor: M = "#121b23", layout: p = "full", transparent: l = !1, showHeader: x = !0, footerHeight: w = 38 }) => {
  const s = p === "compact", f = i || h, T = b(r, o), A = n ? b(r, n) : void 0, W = a ? b(r, a) : void 0, R = d ? b(r, d) : void 0, _ = y ? b(r, y) : void 0, S = L().replace(/:/g, ""), U = `${S}-paper`, Y = `${S}-art`, H = 318 - w, N = H - 196;
  return /* @__PURE__ */ t(X, { children: /* @__PURE__ */ t("article", { className: [D.card, e].filter(Boolean).join(" "), style: c, "aria-label": E(s ? f : i), "data-card-layer": l ? "overlay" : "base", children: /* @__PURE__ */ g("svg", { viewBox: "0 0 204 332", width: "100%", height: "100%", role: "img", "aria-label": E(s ? f : i), children: [
    /* @__PURE__ */ g("defs", { children: [
      /* @__PURE__ */ t("pattern", { id: U, width: "1", height: "1", patternUnits: "objectBoundingBox", children: /* @__PURE__ */ t("image", { href: T, width: "204", height: "332", preserveAspectRatio: "xMidYMid slice" }) }),
      /* @__PURE__ */ t("clipPath", { id: Y, children: /* @__PURE__ */ t("rect", { x: s ? 57 : 24, y: s ? 30 : 44, width: s ? 90 : 156, height: s ? 90 : 98, rx: "6" }) })
    ] }),
    l ? null : /* @__PURE__ */ g(C, { children: [
      /* @__PURE__ */ t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: `url(#${U})` }),
      /* @__PURE__ */ t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: "none", stroke: "#6d5435", strokeWidth: "2" })
    ] }),
    !s && !l && x ? /* @__PURE__ */ g(C, { children: [
      /* @__PURE__ */ t("text", { x: "168", y: "25", textAnchor: "end", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: E(m) }),
      R ? /* @__PURE__ */ t("image", { href: R, x: "173", y: "11", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null
    ] }) : null,
    A ? /* @__PURE__ */ g("g", { clipPath: `url(#${Y})`, children: [
      /* @__PURE__ */ t("image", { href: A, x: s ? 57 : 24, y: s ? 30 : 44, width: s ? 90 : 156, height: s ? 90 : 98, preserveAspectRatio: "xMidYMid meet" }),
      W ? /* @__PURE__ */ t("image", { href: W, x: s ? 57 : 24, y: s ? 30 : 44, width: s ? 90 : 156, height: s ? 90 : 98, preserveAspectRatio: "xMidYMid meet" }) : null
    ] }) : null,
    !s && !l && (v || _) ? /* @__PURE__ */ g("g", { transform: "translate(185 90) rotate(90)", children: [
      _ ? /* @__PURE__ */ t("image", { href: _, x: "-58", y: "-10", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null,
      /* @__PURE__ */ t("text", { x: "-36", y: "3", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: E(v) })
    ] }) : null,
    s ? /* @__PURE__ */ t(k, { x: 12, y: 137, width: 180, height: 142, fontSize: 30, minFontSize: 24, color: M, children: f }) : /* @__PURE__ */ g(C, { children: [
      /* @__PURE__ */ t(k, { x: 16, y: 148, width: 172, height: 20, fontSize: 16, minFontSize: 11, color: "#121b23", children: h }),
      /* @__PURE__ */ t(k, { x: 16, y: 167, width: 172, height: 24, fontSize: 20, minFontSize: 12, color: M, children: i }),
      /* @__PURE__ */ g(C, { children: [
        /* @__PURE__ */ t(k, { x: 16, y: 194, width: 172, height: N, fontSize: 11, minFontSize: 8, color: "#23303d", fontFamily: "MightyDecksShantell", weight: 400, region: "main", children: $ }),
        /* @__PURE__ */ t(k, { x: 16, y: H, width: 172, height: w, fontSize: 11, minFontSize: 8, color: "#121b23", fontFamily: "MightyDecksShantell", region: "footer", children: F })
      ] })
    ] })
  ] }) }) });
}, Z = { "special-action": "#d99600", success: "#1aa62b", "partial-success": "#65738b", chaos: "#f20170", fumble: "#090f15" }, V = { outcome: "/types/outcome.png", effect: "/types/effect.png", stunt: "/types/stunt.png", "actor-base": "/types/actor.png", "actor-role": "/types/actor.png", "actor-special": "/types/actor.png", "asset-base": "/types/asset.png", "asset-modifier": "/types/asset.png", counter: "/types/counter.png" }, z = ({ type: e, slug: c, locale: r = "en", layout: o, className: n, assetBaseUrl: a }) => {
  const i = j(e, c);
  if (!i || r !== "en") throw new Error(`Unknown ${e} card '${c}' for locale '${r}'.`);
  const m = e === "actor-role", d = e === "actor-special", h = e === "asset-modifier", v = m || d || h, y = i.footer && i.footer.length > 100 ? 60 : void 0;
  return /* @__PURE__ */ t(u, { assetBaseUrl: a, className: n, layout: o, transparent: v, showHeader: e !== "actor-base", imageUri: m ? void 0 : i.artworkPath, noun: d || h || e === "actor-base" ? "" : i.title, adjective: d || h ? i.title : void 0, nounDeck: i.deck ?? e, nounCornerIcon: V[e], nounEffect: d || h ? void 0 : i.body ?? i.description, adjectiveEffect: d || h ? i.body ?? i.description : i.footer, footerHeight: y, titleColor: Z[c] });
}, oe = (e) => /* @__PURE__ */ t(z, { type: "outcome", ...e }), ie = (e) => /* @__PURE__ */ t(z, { type: "effect", ...e }), re = (e) => /* @__PURE__ */ t(z, { type: "stunt", ...e }), ce = (e) => /* @__PURE__ */ t(z, { type: "asset-modifier", ...e }), P = (e) => `/actors/base/${e.replaceAll("_", "-")}.png`, se = ({ baseLayerSlug: e, tacticalRoleSlug: c, tacticalSpecialSlug: r, custom: o, ...n }) => {
  if (o) return /* @__PURE__ */ t(u, { ...n, imageUri: o.imageUrl, noun: o.noun, adjective: o.adjective, nounEffect: n.nounEffect ?? o.nounDescription, adjectiveEffect: n.adjectiveEffect ?? o.adjectiveDescription, nounDeck: o.deck ?? "custom" });
  const a = c ? j("actor-role", c) : void 0, i = r ? j("actor-special", r) : void 0;
  return /* @__PURE__ */ t(u, { ...n, noun: (a == null ? void 0 : a.title) ?? "", adjective: i == null ? void 0 : i.title, nounEffect: n.nounEffect ?? (a == null ? void 0 : a.body) ?? (a == null ? void 0 : a.description), adjectiveEffect: n.adjectiveEffect ?? (i == null ? void 0 : i.body) ?? (i == null ? void 0 : i.description), nounDeck: "actor", adjectiveDeck: r ? "base mod" : void 0, nounCornerIcon: "/types/actor.png", adjectiveCornerIcon: r ? "/types/actor.png" : void 0, imageUri: e ? P(e) : void 0, imageOverlayUri: r ? P(r) : void 0 });
}, B = (e) => `/assets/${e.startsWith("medieval_") ? "medieval" : "base"}/${e.replace(/^medieval_|^base_/, "")}.png`, ae = ({ baseAssetSlug: e, modifierSlug: c, ...r }) => {
  const o = j("asset-base", e), n = c ? j("asset-modifier", c) : void 0;
  return /* @__PURE__ */ t(u, { ...r, noun: (o == null ? void 0 : o.title) ?? "Unknown Asset", adjective: n == null ? void 0 : n.title, nounDeck: (o == null ? void 0 : o.deck) ?? (e.startsWith("medieval_") ? "medieval" : "base"), adjectiveDeck: n == null ? void 0 : n.deck, nounCornerIcon: "/types/asset.png", adjectiveCornerIcon: n ? "/types/asset.png" : void 0, nounEffect: o == null ? void 0 : o.body, adjectiveEffect: n == null ? void 0 : n.body, imageUri: (o == null ? void 0 : o.artworkPath) ?? B(e), imageOverlayUri: (n == null ? void 0 : n.artworkPath) ?? (c ? B(c) : void 0) });
}, de = ({ iconSlug: e, title: c, currentValue: r, maxValue: o, ...n }) => /* @__PURE__ */ t(u, { ...n, imageUri: `/counters/${e}.png`, noun: c, adjective: o === void 0 ? r : `${r} / ${o}`, nounDeck: "counter" }), he = (e) => /* @__PURE__ */ t(u, { ...e, layout: "compact" }), le = ({ text: e }) => /* @__PURE__ */ t(C, { children: e }), I = ({ title: e, description: c, imageUrl: r, imageAlt: o = "", className: n }) => /* @__PURE__ */ g("article", { className: [D.scene, n].filter(Boolean).join(" "), children: [
  r ? /* @__PURE__ */ t("img", { src: r, alt: o }) : null,
  /* @__PURE__ */ t("h2", { children: e }),
  c ? /* @__PURE__ */ t("p", { children: c }) : null
] }), fe = (e) => /* @__PURE__ */ t(I, { ...e }), ge = (e) => /* @__PURE__ */ t(I, { ...e }), ye = (e) => /* @__PURE__ */ t(I, { ...e });
export {
  se as ActorCard,
  le as ActorCardTextWithIcons,
  ae as AssetCard,
  ce as AssetModifierCard,
  X as CardStyleBoundary,
  he as CompactCard,
  de as CounterCard,
  ie as EffectCard,
  ge as EncounterCard,
  z as GameCard,
  u as LayeredCard,
  fe as LocationCard,
  oe as OutcomeCard,
  ye as QuestCard,
  I as SceneCardFrame,
  re as StuntCard,
  b as resolveAssetUrl
};
