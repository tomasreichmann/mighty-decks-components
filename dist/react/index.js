import { jsx as t, jsxs as h, Fragment as I } from "react/jsx-runtime";
import { useId as oe, useRef as X, useState as ie, useEffect as ae } from "react";
import { i as k } from "../export-Gl2EurF_.js";
const re = "_boundary_15bft_9", ce = "_card_15bft_15", le = "_actorRules_15bft_40", de = "_actorRuleRow_15bft_41", he = "_actorIconText_15bft_42", ge = "_actorIcons_15bft_43", ue = "_srOnly_15bft_45", pe = "_scene_15bft_52", g = {
  boundary: re,
  card: ce,
  actorRules: le,
  actorRuleRow: de,
  actorIconText: he,
  actorIcons: ge,
  srOnly: ue,
  scene: pe
}, S = (e, i) => `${e.replace(/\/$/, "")}/${i.replace(/^\//, "")}`, fe = ({ children: e }) => t("div", { className: g.boundary, children: e }), H = ({ title: e, artworkPath: i, kind: n, layout: a = "full", className: s, assetBaseUrl: r = "/mighty-decks/assets", style: o }) => {
  const c = S(r, i), l = S(r, "/backgrounds/paper-with-image-shadow.png"), d = S(r, n === "actor" ? "/types/actor.png" : "/types/map.png"), u = a === "compact";
  return t(fe, { children: t("article", { className: [g.card, g.illustrated, s].filter(Boolean).join(" "), style: o, "aria-label": e, "data-card-kind": n, children: h("svg", { viewBox: "0 0 204 332", width: "100%", height: "100%", role: "img", "aria-label": e, children: [h("defs", { children: [t("clipPath", { id: `illustrated-${n}`, children: t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11" }) }), h("linearGradient", { id: `shade-${n}`, x1: "0", x2: "1", children: [t("stop", { offset: "0", stopColor: "#101820", stopOpacity: ".74" }), t("stop", { offset: ".38", stopColor: "#101820", stopOpacity: ".15" }), t("stop", { offset: "1", stopColor: "#101820", stopOpacity: "0" })] })] }), h("g", { clipPath: `url(#illustrated-${n})`, children: [n === "actor" ? t("image", { href: l, x: "1", y: "1", width: "202", height: "330", preserveAspectRatio: "xMidYMid slice" }) : null, n === "actor" ? t("image", { href: c, x: "1", y: "1", width: "202", height: "330", preserveAspectRatio: "xMidYMid slice" }) : t("image", { href: c, x: "-64", y: "64", width: "332", height: "204", transform: "rotate(90 102 166)", preserveAspectRatio: "xMidYMid slice" }), n === "location" ? t("rect", { x: "1", y: "1", width: "202", height: "62", fill: `url(#shade-${n})` }) : null, n === "actor" && !u ? t("image", { href: c, x: "13", y: "12", width: "30", height: "30", preserveAspectRatio: "xMidYMid meet" }) : null] }), t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: "none", stroke: n === "actor" ? "#6d5435" : "#ddcfb4", strokeWidth: "2" }), u ? h(I, { children: [t("rect", { x: "1", y: "238", width: "202", height: "93", fill: "rgba(12, 20, 27, .68)" }), t("text", { x: "102", y: "278", textAnchor: "middle", fill: "#f5ead6", style: { fontFamily: "MightyDecksKalam", fontSize: 18, fontWeight: 700 }, children: n === "location" ? e : "medieval" })] }) : h(I, { children: [t("text", { x: n === "location" ? "13" : "168", y: "25", textAnchor: n === "location" ? "start" : "end", fill: n === "location" ? "#f5ead6" : "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: n === "actor" ? "medieval" : e }), t("text", { x: n === "location" ? "13" : "168", y: "38", textAnchor: n === "location" ? "start" : "end", fill: n === "location" ? "#f5ead6" : "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 8, fontWeight: 700 }, children: n === "actor" ? "Actor" : "medieval" }), t("image", { href: d, x: "174", y: "11", width: "17", height: "17", preserveAspectRatio: "xMidYMid meet" })] })] }) }) });
}, ye = ({ children: e }) => /* @__PURE__ */ t("div", { className: g.boundary, children: e }), b = (e, i) => `${e.replace(/\/$/, "")}/${i.replace(/^\//, "")}`, B = (e) => typeof e == "string" || typeof e == "number" ? String(e) : "Card", $ = ({ x: e, y: i, width: n, height: a, children: s, fontSize: r, minFontSize: o = r, color: c = "#121b23", fontFamily: l = "MightyDecksKalam", weight: d = 700, region: u }) => {
  const v = X(null), p = X(null), [M, w] = ie(r);
  return ae(() => {
    var m;
    const j = v.current, y = p.current;
    if (!j || !y) return;
    const R = () => {
      let f = r;
      for (y.style.fontSize = `${f}px`; f > o && (y.scrollWidth > j.clientWidth || y.scrollHeight > j.clientHeight); )
        f -= 0.5, y.style.fontSize = `${f}px`;
      w(f);
    };
    (m = document.fonts) == null || m.ready.then(R).catch(() => {
    }), R();
    const _ = new ResizeObserver(R);
    return _.observe(j), () => _.disconnect();
  }, [s, r, o]), /* @__PURE__ */ t("foreignObject", { x: e, y: i, width: n, height: a, "data-card-text-region": u, children: /* @__PURE__ */ t("div", { ref: v, style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: c, fontFamily: l, fontWeight: d, overflow: "hidden" }, children: /* @__PURE__ */ t("div", { ref: p, style: { maxWidth: "100%", overflowWrap: "break-word", fontSize: M, lineHeight: 1.08 }, children: s }) }) });
}, C = ({ className: e, style: i, assetBaseUrl: n = "/mighty-decks/assets", backgroundUri: a = "/backgrounds/paper-with-image-shadow.png", imageUri: s, imageOverlayUri: r, noun: o = "Card", nounDeck: c, nounCornerIcon: l, adjective: d, adjectiveDeck: u, adjectiveCornerIcon: v, nounEffect: p, adjectiveEffect: M, titleColor: w = "#121b23", layout: j = "full", transparent: y = !1, showHeader: R = !0, footerHeight: _ = 38, actorBase: m = !1, actorOverlay: f = !1 }) => {
  const x = j === "compact", F = o || d, ne = b(n, a), A = s ? b(n, s) : void 0, U = r ? b(n, r) : void 0, G = l ? b(n, l) : void 0, D = v ? b(n, v) : void 0, K = oe().replace(/:/g, ""), q = `${K}-paper`, L = `${K}-art`, Q = 318 - _, se = Q - 196, N = x ? 57 : m ? 20 : 24, W = x ? 30 : m ? 42 : 44, O = x ? 90 : m ? 164 : 156, Y = x ? 90 : m ? 118 : 98;
  return /* @__PURE__ */ t(ye, { children: /* @__PURE__ */ t("article", { className: [g.card, e].filter(Boolean).join(" "), style: i, "aria-label": B(x ? F : o), "data-card-layer": y ? "overlay" : "base", children: /* @__PURE__ */ h("svg", { viewBox: "0 0 204 332", width: "100%", height: "100%", role: "img", "aria-label": B(x ? F : o), children: [
    /* @__PURE__ */ h("defs", { children: [
      /* @__PURE__ */ t("pattern", { id: q, width: "1", height: "1", patternUnits: "objectBoundingBox", children: /* @__PURE__ */ t("image", { href: ne, width: "204", height: "332", preserveAspectRatio: "xMidYMid slice" }) }),
      /* @__PURE__ */ t("clipPath", { id: L, children: /* @__PURE__ */ t("rect", { x: N, y: W, width: O, height: Y, rx: m ? 0 : 6 }) })
    ] }),
    y ? null : /* @__PURE__ */ h(I, { children: [
      /* @__PURE__ */ t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: `url(#${q})` }),
      m ? null : /* @__PURE__ */ t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: "none", stroke: "#6d5435", strokeWidth: "2" })
    ] }),
    !x && !y && R ? /* @__PURE__ */ h(I, { children: [
      /* @__PURE__ */ t("text", { x: "168", y: "25", textAnchor: "end", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: B(c) }),
      G ? /* @__PURE__ */ t("image", { href: G, x: "173", y: "11", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null
    ] }) : null,
    m && A && !x ? /* @__PURE__ */ t("image", { href: A, x: "29", y: "48", width: "20", height: "20", preserveAspectRatio: "xMidYMid meet" }) : null,
    A ? /* @__PURE__ */ h("g", { clipPath: `url(#${L})`, children: [
      /* @__PURE__ */ t("image", { href: A, x: N, y: W, width: O, height: Y, preserveAspectRatio: "xMidYMid meet" }),
      U ? /* @__PURE__ */ t("image", { href: U, x: f ? -15 : N, y: f ? 26 : W, width: f ? 234 : O, height: f ? 150 : Y, preserveAspectRatio: "xMidYMid meet", opacity: f ? 0.85 : 1 }) : null
    ] }) : null,
    !x && !y && (u || D) ? /* @__PURE__ */ h("g", { transform: "translate(185 90) rotate(90)", children: [
      D ? /* @__PURE__ */ t("image", { href: D, x: "-58", y: "-10", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null,
      /* @__PURE__ */ t("text", { x: "-36", y: "3", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: B(u) })
    ] }) : null,
    x ? /* @__PURE__ */ t($, { x: 12, y: 137, width: 180, height: 142, fontSize: 30, minFontSize: 24, color: w, children: F }) : /* @__PURE__ */ h(I, { children: [
      /* @__PURE__ */ t($, { x: 16, y: 148, width: 172, height: 20, fontSize: 16, minFontSize: 11, color: "#121b23", children: d }),
      /* @__PURE__ */ t($, { x: 16, y: 167, width: 172, height: 24, fontSize: 20, minFontSize: 12, color: w, children: o }),
      /* @__PURE__ */ h(I, { children: [
        /* @__PURE__ */ t($, { x: 16, y: 194, width: 172, height: se, fontSize: 11, minFontSize: 8, color: "#23303d", fontFamily: "MightyDecksShantell", weight: 400, region: "main", children: p }),
        /* @__PURE__ */ t($, { x: 16, y: Q, width: 172, height: _, fontSize: 11, minFontSize: 8, color: "#121b23", fontFamily: "MightyDecksShantell", region: "footer", children: M })
      ] })
    ] })
  ] }) }) });
}, me = { "special-action": "#d99600", success: "#1aa62b", "partial-success": "#65738b", chaos: "#f20170", fumble: "#090f15" }, xe = { outcome: "/types/outcome.png", effect: "/types/effect.png", stunt: "/types/stunt.png", "actor-base": "/types/actor.png", "actor-role": "/types/actor.png", "actor-special": "/types/actor.png", "asset-base": "/types/asset.png", "asset-modifier": "/types/asset.png", counter: "/types/counter.png", location: "/types/map.png" }, E = ({ type: e, slug: i, locale: n = "en", layout: a, className: s, assetBaseUrl: r }) => {
  const o = k(e, i);
  if (!o || n !== "en") throw new Error(`Unknown ${e} card '${i}' for locale '${n}'.`);
  if (e === "location") return /* @__PURE__ */ t(H, { title: o.title, artworkPath: o.artworkPath ?? "", kind: "location", layout: a, className: s, assetBaseUrl: r });
  if (e === "actor-base" && o.deck === "medieval") return /* @__PURE__ */ t(H, { title: o.title, artworkPath: o.artworkPath ?? "", kind: "actor", layout: a, className: s, assetBaseUrl: r });
  const c = e === "actor-role", l = e === "actor-special", d = e === "asset-modifier", u = c || l, v = u || d, p = P(o), M = l ? 75 : o.footer && o.footer.length > 100 ? 60 : void 0, w = p ? /* @__PURE__ */ t(te, { presentation: p, assetBaseUrl: r, description: o.description }) : o.body ?? o.description, j = p != null && p.special ? /* @__PURE__ */ h("span", { children: [
    /* @__PURE__ */ t("span", { className: g.srOnly, "data-card-description": !0, children: o.description }),
    /* @__PURE__ */ t(z, { assetBaseUrl: r, text: p.special })
  ] }) : o.body ?? o.description;
  return /* @__PURE__ */ t(C, { assetBaseUrl: r, className: s, layout: a, transparent: v, showHeader: u || e !== "actor-base", actorBase: e === "actor-base", actorOverlay: l, imageUri: c ? void 0 : o.artworkPath, noun: l || d || e === "actor-base" ? "" : o.title, adjective: l || d ? o.title : void 0, nounDeck: o.deck ?? e, nounCornerIcon: xe[e], nounEffect: l ? w : d ? void 0 : w, adjectiveEffect: l || d ? j : o.footer, footerHeight: M, titleColor: me[i] });
}, be = (e) => /* @__PURE__ */ t(E, { type: "outcome", ...e }), Ie = (e) => /* @__PURE__ */ t(E, { type: "effect", ...e }), ze = (e) => /* @__PURE__ */ t(E, { type: "stunt", ...e }), Ce = (e) => /* @__PURE__ */ t(E, { type: "asset-modifier", ...e }), J = (e) => {
  var i;
  return ((i = k("actor-base", e)) == null ? void 0 : i.artworkPath) ?? `/actors/base/${e.replaceAll("_", "-")}.png`;
}, Me = ({ baseLayerSlug: e, tacticalRoleSlug: i, tacticalSpecialSlug: n, custom: a, ...s }) => {
  if (a) return /* @__PURE__ */ t(C, { ...s, imageUri: a.imageUrl, noun: a.noun, adjective: a.adjective, nounEffect: s.nounEffect ?? a.nounDescription, adjectiveEffect: s.adjectiveEffect ?? a.adjectiveDescription, nounDeck: a.deck ?? "custom" });
  const r = e ? k("actor-base", e) : void 0;
  if ((r == null ? void 0 : r.deck) === "medieval" && !i && !n) return /* @__PURE__ */ t(H, { title: r.title, artworkPath: r.artworkPath ?? "", kind: "actor", layout: s.layout, className: s.className, style: s.style, assetBaseUrl: s.assetBaseUrl });
  const o = i ? k("actor-role", i) : void 0, c = n ? k("actor-special", n) : void 0, l = P(o), d = P(c);
  return /* @__PURE__ */ t(C, { ...s, actorBase: !!e, actorOverlay: !!n, noun: (o == null ? void 0 : o.title) ?? "", adjective: c == null ? void 0 : c.title, nounEffect: s.nounEffect ?? (l ? /* @__PURE__ */ t(te, { presentation: l, bonusPresentation: d, assetBaseUrl: s.assetBaseUrl, description: o == null ? void 0 : o.description }) : (o == null ? void 0 : o.body) ?? (o == null ? void 0 : o.description)), adjectiveEffect: s.adjectiveEffect ?? (d != null && d.special ? /* @__PURE__ */ h("span", { children: [
    /* @__PURE__ */ t("span", { className: g.srOnly, "data-card-description": !0, children: c == null ? void 0 : c.description }),
    /* @__PURE__ */ t(z, { assetBaseUrl: s.assetBaseUrl, text: d.special })
  ] }) : (c == null ? void 0 : c.body) ?? (c == null ? void 0 : c.description)), nounDeck: "actor", adjectiveDeck: n ? "base mod" : void 0, nounCornerIcon: "/types/actor.png", adjectiveCornerIcon: n ? "/types/actor.png" : void 0, imageUri: e ? J(e) : void 0, imageOverlayUri: n ? J(n) : void 0 });
}, Z = (e) => `/assets/${e.startsWith("medieval_") ? "medieval" : "base"}/${e.replace(/^medieval_|^base_/, "")}.png`, Re = ({ baseAssetSlug: e, modifierSlug: i, ...n }) => {
  const a = k("asset-base", e), s = i ? k("asset-modifier", i) : void 0;
  return /* @__PURE__ */ t(C, { ...n, noun: (a == null ? void 0 : a.title) ?? "Unknown Asset", adjective: s == null ? void 0 : s.title, nounDeck: (a == null ? void 0 : a.deck) ?? (e.startsWith("medieval_") ? "medieval" : "base"), adjectiveDeck: s == null ? void 0 : s.deck, nounCornerIcon: "/types/asset.png", adjectiveCornerIcon: s ? "/types/asset.png" : void 0, nounEffect: a == null ? void 0 : a.body, adjectiveEffect: s == null ? void 0 : s.body, imageUri: (a == null ? void 0 : a.artworkPath) ?? Z(e), imageOverlayUri: (s == null ? void 0 : s.artworkPath) ?? (i ? Z(i) : void 0) });
}, _e = ({ iconSlug: e, title: i, currentValue: n, maxValue: a, ...s }) => /* @__PURE__ */ t(C, { ...s, imageUri: `/counters/${e}.png`, noun: i, adjective: a === void 0 ? n : `${n} / ${a}`, nounDeck: "counter" }), $e = (e) => /* @__PURE__ */ t(C, { ...e, layout: "compact" }), ee = {
  injury: "/effects/injury.png",
  distress: "/effects/distress.png",
  burning: "/effects/burning.png",
  freezing: "/effects/freezing.png",
  stuck: "/effects/stuck.png",
  hindered: "/effects/hindered.png",
  complication: "/effects/complication.png",
  boost: "/effects/boost.png",
  direct: "/textIcons/direct.png",
  heal: "/textIcons/heal.png",
  melee: "/textIcons/melee.png",
  push: "/textIcons/push.png",
  range: "/textIcons/range.png",
  ranged: "/textIcons/ranged.png",
  replace: "/textIcons/replace.png",
  shield: "/textIcons/shield.png",
  speed: "/textIcons/speed.png",
  splash: "/textIcons/splash.png",
  tactics: "/textIcons/tactics.png",
  toughness: "/textIcons/toughness.png"
}, ve = { toughness: "toughness", shield: "shield", melee: "melee", ranged: "ranged", direct: "direct", heal: "heal", range: "range", splash: "splash", replace: "replace", speed: "speed", ...Object.fromEntries(Object.keys(ee).map((e) => [e, e])) }, V = /\[([a-z-]+?)(\d+)?\]/gi, z = ({ text: e, assetBaseUrl: i = "/mighty-decks/assets" }) => {
  const n = [];
  let a = 0;
  for (const s of e.matchAll(V)) {
    n.push(e.slice(a, s.index));
    const [, r, o] = s, c = r.toLowerCase(), l = Math.min(Number(o ?? 1), 9), d = ee[c];
    n.push(!d || !Number.isInteger(l) || l < 1 ? s[0] : /* @__PURE__ */ t("span", { className: g.actorIcons, "aria-hidden": "true", children: Array.from({ length: l }, (u, v) => /* @__PURE__ */ t("img", { src: b(i, d), alt: "" }, v)) }, `${c}-${s.index}`)), a = (s.index ?? 0) + s[0].length;
  }
  return n.push(e.slice(a)), /* @__PURE__ */ t("span", { className: g.actorIconText, "aria-label": e.replace(V, (s, r, o) => ` ${o ?? ""} ${ve[r] ?? r} `).replace(/\s+/g, " ").trim(), children: n });
}, P = (e) => e ? {
  pawn: { toughness: "[toughness]", actions: ["[melee][injury]", "[ranged][injury][range]1"] },
  minion: { toughness: "[toughness2]", actions: ["[melee][injury]", "[ranged][injury][range]1-2"] },
  thug: { toughness: "[toughness2]", actions: ["[melee][injury2]", "[ranged][injury][range]1"] },
  brute: { toughness: "[toughness3]", actions: ["[melee][injury2]", "[melee][injury][splash]"] },
  tank: { toughness: "[toughness6]", actions: ["[melee][injury2]", "[direct][push][range]1[splash]"] },
  champion: { toughness: "[toughness4]", actions: ["[melee][injury3]", "[direct][distress2][splash]"] },
  assassin: { toughness: "[toughness2]", actions: ["[melee][injury4]", "[direct][complication2][splash]"] },
  skirmisher: { toughness: "[toughness2]", actions: ["2x[melee][injury]", "2x[ranged][injury][range]1-2"] },
  ranger: { toughness: "[toughness3]", actions: ["[ranged][injury2][range]1-2", "[melee][injury2]"] },
  stalker: { toughness: "[toughness2]", actions: ["[melee][injury3]", "[ranged][injury3][range]1-2"] },
  commando: { toughness: "[toughness3]", actions: ["[melee][injury3]", "3x[ranged][injury][range]1-2"] },
  marksman: { toughness: "[toughness2]", actions: ["[ranged][injury3][range]1-3", "[melee][injury]"] },
  sniper: { toughness: "[toughness2]", actions: ["[ranged][injury4][range]1-∞", "[melee][injury]"] },
  grenadier: { toughness: "[toughness2]", actions: ["[ranged][injury2][range]1[splash]", "[melee][injury]"] },
  bomber: { toughness: "[toughness3]", actions: ["[ranged][injury3][range]0[splash]"] },
  artillery: { toughness: "[toughness2]", actions: ["[ranged][injury2][range]1-∞[splash]"] },
  tough: { toughnessBonus: "+[toughness2]" },
  shielded: { toughnessBonus: "+[shield]", special: "-1[injury] taken" },
  armoured: { toughnessBonus: "+[shield2]", special: "-2[injury] taken" },
  alpha: { toughnessBonus: "+[toughness]", actionBonuses: ["+[injury]", "+[injury]"], special: "+[toughness] and +[injury] for all attacks" },
  dangerous: { actionBonuses: ["+[injury]"], special: "Primary attack also deals +[injury]" },
  burning: { actionBonuses: ["+[burning]"], special: "Primary attack also deals +[burning]" },
  fiery: { actionBonuses: [null, "[replace][burning]"], special: "Secondary attack deals [burning] instead" },
  freezing: { actionBonuses: ["+[freezing]"], special: "Primary attack also deals +[freezing]" },
  icy: { actionBonuses: [null, "[replace][freezing]"], special: "Secondary attack deals [freezing] instead" },
  irritating: { actionBonuses: ["+[distress]"], special: "Primary attack also deals +[distress]" },
  corrupting: { actionBonuses: [null, "[replace][distress]"], special: "Secondary attack deals [distress] instead" },
  fast: { special: "Moves an extra zone per turn" },
  harassing: { actionBonuses: [null, "+[complication]"], special: "Secondary attack also deals +[complication]" },
  slowing: { actionBonuses: [null, "+[hindered]"], special: "Secondary attack also deals +[hindered]" },
  elemental: { actionBonuses: ["+[freezing]/+[burning]", "+[freezing]/+[burning]"], special: "All attacks can deal [freezing] or [burning]" },
  charging: { actionBonuses: ["(+[injury2])"], special: "Primary attack also deals +[injury2] when entering a zone" },
  suicide: { special: "Can die and deal 2x[injury][splash]" },
  grabbing: { actionBonuses: ["(+[stuck])", "(+[stuck])"], special: "[melee] attack also deals +[stuck]" },
  webbing: { actionBonuses: ["+[stuck][splash]", null], special: "Primary attack also deals +[stuck][splash]" },
  reaching: { actionBonuses: ["([range]0-1)", "([range]0-1)"], special: "[melee] attack reaches to the adjacent zones" },
  healing: { special: "Heal 2x[injury] from one ally in the zone" },
  restoring: { special: "Heal [injury] from all allies in the zone" },
  regenerating: { toughnessBonus: "[heal2]", special: "Heal [injury2] at the end of the turn" },
  encouraging: { special: "[boost] all allies in the zone" }
}[e.slug] ?? (e.family === "actor-special" ? { special: e.description } : void 0) : void 0, te = ({ presentation: e, bonusPresentation: i, assetBaseUrl: n, description: a }) => {
  var s;
  return /* @__PURE__ */ h("span", { className: g.actorRules, children: [
    /* @__PURE__ */ t("span", { className: g.srOnly, "data-card-description": !0, children: a }),
    e.toughness || i != null && i.toughnessBonus ? /* @__PURE__ */ h("span", { className: g.actorRuleRow, children: [
      /* @__PURE__ */ t(z, { assetBaseUrl: n, text: e.toughness ?? "" }),
      /* @__PURE__ */ t(z, { assetBaseUrl: n, text: (i == null ? void 0 : i.toughnessBonus) ?? "" })
    ] }) : null,
    (s = e.actions) == null ? void 0 : s.map((r, o) => {
      var c;
      return /* @__PURE__ */ h("span", { className: g.actorRuleRow, children: [
        /* @__PURE__ */ t(z, { assetBaseUrl: n, text: r }),
        /* @__PURE__ */ t(z, { assetBaseUrl: n, text: ((c = i == null ? void 0 : i.actionBonuses) == null ? void 0 : c[o]) ?? "" })
      ] }, o);
    })
  ] });
}, T = ({ title: e, description: i, imageUrl: n, imageAlt: a = "", className: s }) => /* @__PURE__ */ h("article", { className: [g.scene, s].filter(Boolean).join(" "), children: [
  n ? /* @__PURE__ */ t("img", { src: n, alt: a }) : null,
  /* @__PURE__ */ t("h2", { children: e }),
  i ? /* @__PURE__ */ t("p", { children: i }) : null
] }), Ae = (e) => /* @__PURE__ */ t(T, { ...e }), Be = (e) => /* @__PURE__ */ t(T, { ...e }), Ee = (e) => /* @__PURE__ */ t(T, { ...e });
export {
  Me as ActorCard,
  z as ActorCardTextWithIcons,
  Re as AssetCard,
  Ce as AssetModifierCard,
  ye as CardStyleBoundary,
  $e as CompactCard,
  _e as CounterCard,
  Ie as EffectCard,
  Be as EncounterCard,
  E as GameCard,
  C as LayeredCard,
  Ae as LocationCard,
  be as OutcomeCard,
  Ee as QuestCard,
  T as SceneCardFrame,
  ze as StuntCard,
  b as resolveAssetUrl
};
