import { jsx as t, jsxs as h, Fragment as M } from "react/jsx-runtime";
import { useId as ie, useRef as Z, useState as re, useEffect as ce } from "react";
import { i as j } from "../export-Gl2EurF_.js";
const le = "_boundary_tk60w_9", de = "_card_tk60w_17", he = "_actorRules_tk60w_43", ge = "_actorRuleRow_tk60w_45", ue = "_actorIconText_tk60w_51", pe = "_actorIcons_tk60w_53", fe = "_srOnly_tk60w_57", ye = "_scene_tk60w_65", p = {
  boundary: le,
  card: de,
  actorRules: he,
  actorRuleRow: ge,
  actorIconText: ue,
  actorIcons: pe,
  srOnly: fe,
  scene: ye
}, T = (e, a) => `${e.replace(/\/$/, "")}/${a.replace(/^\//, "")}`, me = ({ children: e }) => t("div", { className: p.boundary, children: e }), U = ({ title: e, artworkPath: a, kind: n, layout: i = "full", className: s, assetBaseUrl: r = "/mighty-decks/assets", style: o }) => {
  const c = T(r, a), l = T(r, "/backgrounds/paper-with-image-shadow.png"), d = T(r, n === "actor" ? "/types/actor.png" : "/types/map.png"), g = i === "compact";
  return t(me, { children: t("article", { className: [p.card, p.illustrated, s].filter(Boolean).join(" "), style: o, "aria-label": e, "data-card-kind": n, children: h("svg", { viewBox: "0 0 204 332", width: "100%", height: "100%", role: "img", "aria-label": e, children: [h("defs", { children: [t("clipPath", { id: `illustrated-${n}`, children: t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11" }) }), h("linearGradient", { id: `shade-${n}`, x1: "0", x2: "1", children: [t("stop", { offset: "0", stopColor: "#101820", stopOpacity: ".74" }), t("stop", { offset: ".38", stopColor: "#101820", stopOpacity: ".15" }), t("stop", { offset: "1", stopColor: "#101820", stopOpacity: "0" })] })] }), h("g", { clipPath: `url(#illustrated-${n})`, children: [n === "actor" ? t("image", { href: l, x: "1", y: "1", width: "202", height: "330", preserveAspectRatio: "xMidYMid slice" }) : null, n === "actor" ? t("image", { href: c, x: "1", y: "1", width: "202", height: "330", preserveAspectRatio: "xMidYMid slice" }) : t("image", { href: c, x: "-64", y: "64", width: "332", height: "204", transform: "rotate(90 102 166)", preserveAspectRatio: "xMidYMid slice" }), n === "location" ? t("rect", { x: "1", y: "1", width: "202", height: "62", fill: `url(#shade-${n})` }) : null, n === "actor" && !g ? t("image", { href: c, x: "13", y: "12", width: "30", height: "30", preserveAspectRatio: "xMidYMid meet" }) : null] }), t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: "none", stroke: n === "actor" ? "#6d5435" : "#ddcfb4", strokeWidth: "2" }), g ? h(M, { children: [t("rect", { x: "1", y: "238", width: "202", height: "93", fill: "rgba(12, 20, 27, .68)" }), t("text", { x: "102", y: "278", textAnchor: "middle", fill: "#f5ead6", style: { fontFamily: "MightyDecksKalam", fontSize: 18, fontWeight: 700 }, children: n === "location" ? e : "medieval" })] }) : h(M, { children: [t("text", { x: n === "location" ? "13" : "168", y: "25", textAnchor: n === "location" ? "start" : "end", fill: n === "location" ? "#f5ead6" : "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: n === "actor" ? "medieval" : e }), t("text", { x: n === "location" ? "13" : "168", y: "38", textAnchor: n === "location" ? "start" : "end", fill: n === "location" ? "#f5ead6" : "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 8, fontWeight: 700 }, children: n === "actor" ? "Actor" : "medieval" }), t("image", { href: d, x: "174", y: "11", width: "17", height: "17", preserveAspectRatio: "xMidYMid meet" })] })] }) }) });
}, xe = ({ children: e }) => /* @__PURE__ */ t("div", { className: p.boundary, children: e }), C = (e, a) => `${e.replace(/\/$/, "")}/${a.replace(/^\//, "")}`, E = (e) => typeof e == "string" || typeof e == "number" ? String(e) : "Card", R = ({ x: e, y: a, width: n, height: i, children: s, fontSize: r, minFontSize: o = r, color: c = "#121b23", fontFamily: l = "MightyDecksKalam", weight: d = 700, region: g, alignEnd: y = !1 }) => {
  const f = Z(null), b = Z(null), [w, _] = re(r);
  return ce(() => {
    var x;
    const m = f.current, v = b.current;
    if (!m || !v) return;
    const I = () => {
      let k = r;
      for (v.style.fontSize = `${k}px`; k > o && (v.scrollWidth > m.clientWidth || v.scrollHeight > m.clientHeight); )
        k -= 0.5, v.style.fontSize = `${k}px`;
      _(k);
    };
    (x = document.fonts) == null || x.ready.then(I).catch(() => {
    }), I();
    const z = new ResizeObserver(I);
    return z.observe(m), () => z.disconnect();
  }, [s, r, o]), /* @__PURE__ */ t("foreignObject", { x: e, y: a, width: n, height: i, "data-card-text-region": g, children: /* @__PURE__ */ t("div", { ref: f, style: { width: "100%", height: "100%", display: "flex", alignItems: y ? "flex-end" : "center", paddingBottom: y ? 4 : 0, justifyContent: "center", textAlign: "center", color: c, fontFamily: l, fontWeight: d, overflow: "hidden" }, children: /* @__PURE__ */ t("div", { ref: b, style: { maxWidth: "100%", overflowWrap: "break-word", fontSize: w, lineHeight: 1.08 }, children: s }) }) });
}, B = ({ className: e, style: a, assetBaseUrl: n = "/mighty-decks/assets", backgroundUri: i = "/backgrounds/paper-with-image-shadow.png", imageUri: s, imageOverlayUri: r, noun: o = "Card", nounDeck: c, nounCornerIcon: l, adjective: d, adjectiveDeck: g, adjectiveCornerIcon: y, nounEffect: f, adjectiveEffect: b, titleColor: w = "#121b23", layout: _ = "full", transparent: m = !1, showHeader: v = !0, footerHeight: I = 38, actorBase: z = !1, actorOverlay: x = !1, actorLayout: k = !1 }) => {
  const u = _ === "compact", W = o || d, oe = C(n, i), $ = s ? C(n, s) : void 0, N = r ? C(n, r) : void 0, K = l ? C(n, l) : void 0, O = y ? C(n, y) : void 0, q = ie().replace(/:/g, ""), Q = `${q}-paper`, X = `${q}-art`, J = 318 - I, ae = J - 196, A = z || x, Y = u ? 57 : A ? 20 : 24, P = u ? 30 : A ? 42 : 44, S = u ? 90 : A ? 164 : 156, H = u ? 90 : A ? 118 : 98;
  return /* @__PURE__ */ t(xe, { children: /* @__PURE__ */ t("article", { className: [p.card, e].filter(Boolean).join(" "), style: a, "aria-label": E(u ? W : o), "data-card-layer": m ? "overlay" : "base", children: /* @__PURE__ */ h("svg", { viewBox: "0 0 204 332", width: "100%", height: "100%", role: "img", "aria-label": E(u ? W : o), children: [
    /* @__PURE__ */ h("defs", { children: [
      /* @__PURE__ */ t("pattern", { id: Q, width: "1", height: "1", patternUnits: "objectBoundingBox", children: /* @__PURE__ */ t("image", { href: oe, width: "204", height: "332", preserveAspectRatio: "xMidYMid slice" }) }),
      /* @__PURE__ */ t("clipPath", { id: X, children: /* @__PURE__ */ t("rect", { x: Y, y: P, width: S, height: H, rx: A ? 0 : 6 }) })
    ] }),
    m ? null : /* @__PURE__ */ h(M, { children: [
      /* @__PURE__ */ t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: `url(#${Q})` }),
      z ? null : /* @__PURE__ */ t("rect", { x: "1", y: "1", width: "202", height: "330", rx: "11", fill: "none", stroke: "#6d5435", strokeWidth: "2" })
    ] }),
    !u && !m && v ? /* @__PURE__ */ h(M, { children: [
      /* @__PURE__ */ t("text", { x: "168", y: "25", textAnchor: "end", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: E(c) }),
      K ? /* @__PURE__ */ t("image", { href: K, x: "173", y: "11", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null
    ] }) : null,
    z && $ && !u ? /* @__PURE__ */ t("image", { href: $, x: "29", y: "48", width: "20", height: "20", preserveAspectRatio: "xMidYMid meet" }) : null,
    $ || N ? /* @__PURE__ */ h("g", { clipPath: `url(#${X})`, children: [
      $ ? /* @__PURE__ */ t("image", { href: $, x: Y, y: P, width: S, height: H, preserveAspectRatio: "xMidYMid meet" }) : null,
      N ? /* @__PURE__ */ t("image", { href: N, x: x && !u ? 24 : Y, y: x && !u ? 44 : P, width: x && !u ? 156 : S, height: x && !u ? 98 : H, preserveAspectRatio: "xMidYMid meet", opacity: x ? 0.85 : 1 }) : null
    ] }) : null,
    !u && !m && (g || O) ? /* @__PURE__ */ h("g", { transform: "translate(185 90) rotate(90)", children: [
      O ? /* @__PURE__ */ t("image", { href: O, x: "-58", y: "-10", width: "18", height: "18", preserveAspectRatio: "xMidYMid meet" }) : null,
      /* @__PURE__ */ t("text", { x: "-36", y: "3", fill: "#856a4c", style: { fontFamily: "MightyDecksShantell", fontSize: 9, fontWeight: 700 }, children: E(g) })
    ] }) : null,
    u ? /* @__PURE__ */ t(R, { x: 12, y: 137, width: 180, height: 142, fontSize: 30, minFontSize: 24, color: w, children: W }) : /* @__PURE__ */ h(M, { children: [
      /* @__PURE__ */ t(R, { x: 16, y: 148, width: 172, height: 20, fontSize: 16, minFontSize: 11, color: "#121b23", children: d }),
      /* @__PURE__ */ t(R, { x: 16, y: 167, width: 172, height: 24, fontSize: 20, minFontSize: 12, color: w, children: o }),
      /* @__PURE__ */ h(M, { children: [
        /* @__PURE__ */ t(R, { x: 16, y: 194, width: 172, height: ae, fontSize: 11, minFontSize: 8, color: "#23303d", fontFamily: "MightyDecksShantell", weight: 400, region: "main", alignEnd: k, children: f }),
        /* @__PURE__ */ t(R, { x: 16, y: J, width: 172, height: I, fontSize: 11, minFontSize: 8, color: "#121b23", fontFamily: "MightyDecksShantell", region: "footer", children: b })
      ] })
    ] })
  ] }) }) });
}, we = { "special-action": "#d99600", success: "#1aa62b", "partial-success": "#65738b", chaos: "#f20170", fumble: "#090f15" }, ve = { outcome: "/types/outcome.png", effect: "/types/effect.png", stunt: "/types/stunt.png", "actor-base": "/types/actor.png", "actor-role": "/types/actor.png", "actor-special": "/types/actor.png", "asset-base": "/types/asset.png", "asset-modifier": "/types/asset.png", counter: "/types/counter.png", location: "/types/map.png" }, D = ({ type: e, slug: a, locale: n = "en", layout: i, className: s, assetBaseUrl: r }) => {
  const o = j(e, a);
  if (!o || n !== "en") throw new Error(`Unknown ${e} card '${a}' for locale '${n}'.`);
  if (e === "location") return /* @__PURE__ */ t(U, { title: o.title, artworkPath: o.artworkPath ?? "", kind: "location", layout: i, className: s, assetBaseUrl: r });
  if (e === "actor-base" && o.deck === "medieval") return /* @__PURE__ */ t(U, { title: o.title, artworkPath: o.artworkPath ?? "", kind: "actor", layout: i, className: s, assetBaseUrl: r });
  const c = e === "actor-role", l = e === "actor-special", d = e === "asset-modifier", g = c || l, y = g || d, f = L(o), b = o.footer && o.footer.length > 100 ? 60 : void 0, w = f ? /* @__PURE__ */ t(se, { presentation: l ? {} : f, bonusPresentation: l ? f : void 0, assetBaseUrl: r, description: o.description }) : o.body ?? o.description, _ = f != null && f.special ? /* @__PURE__ */ h("span", { children: [
    /* @__PURE__ */ t("span", { className: p.srOnly, "data-card-description": !0, children: o.description }),
    /* @__PURE__ */ t(F, { assetBaseUrl: r, text: f.special })
  ] }) : o.body ?? o.description;
  return /* @__PURE__ */ t(B, { assetBaseUrl: r, className: s, layout: i, transparent: y, showHeader: g || e !== "actor-base", actorBase: e === "actor-base", actorOverlay: l, actorLayout: g, imageUri: c || l ? void 0 : o.artworkPath, imageOverlayUri: l ? o.artworkPath : void 0, noun: l || d || e === "actor-base" ? "" : o.title, adjective: l || d ? o.title : void 0, nounDeck: o.deck ?? e, nounCornerIcon: ve[e], nounEffect: l ? w : d ? void 0 : w, adjectiveEffect: l || d ? _ : o.footer, footerHeight: b, titleColor: we[a] });
}, ze = (e) => /* @__PURE__ */ t(D, { type: "outcome", ...e }), Ce = (e) => /* @__PURE__ */ t(D, { type: "effect", ...e }), Me = (e) => /* @__PURE__ */ t(D, { type: "stunt", ...e }), Be = (e) => /* @__PURE__ */ t(D, { type: "asset-modifier", ...e }), V = (e) => {
  var a;
  return ((a = j("actor-base", e)) == null ? void 0 : a.artworkPath) ?? `/actors/base/${e.replaceAll("_", "-")}.png`;
}, _e = ({ baseLayerSlug: e, tacticalRoleSlug: a, tacticalSpecialSlug: n, custom: i, ...s }) => {
  if (i) return /* @__PURE__ */ t(B, { ...s, imageUri: i.imageUrl, noun: i.noun, adjective: i.adjective, nounEffect: s.nounEffect ?? i.nounDescription, adjectiveEffect: s.adjectiveEffect ?? i.adjectiveDescription, nounDeck: i.deck ?? "custom" });
  const r = e ? j("actor-base", e) : void 0;
  if ((r == null ? void 0 : r.deck) === "medieval" && !a && !n) return /* @__PURE__ */ t(U, { title: r.title, artworkPath: r.artworkPath ?? "", kind: "actor", layout: s.layout, className: s.className, style: s.style, assetBaseUrl: s.assetBaseUrl });
  const o = a ? j("actor-role", a) : void 0, c = n ? j("actor-special", n) : void 0, l = L(o), d = L(c);
  return /* @__PURE__ */ t(B, { ...s, actorLayout: !0, actorBase: !!e, actorOverlay: !!n, noun: (o == null ? void 0 : o.title) ?? "", adjective: c == null ? void 0 : c.title, nounEffect: s.nounEffect ?? (l ? /* @__PURE__ */ t(se, { presentation: l, bonusPresentation: d, assetBaseUrl: s.assetBaseUrl, description: o == null ? void 0 : o.description }) : (o == null ? void 0 : o.body) ?? (o == null ? void 0 : o.description)), adjectiveEffect: s.adjectiveEffect ?? (d != null && d.special ? /* @__PURE__ */ h("span", { children: [
    /* @__PURE__ */ t("span", { className: p.srOnly, "data-card-description": !0, children: c == null ? void 0 : c.description }),
    /* @__PURE__ */ t(F, { assetBaseUrl: s.assetBaseUrl, text: d.special })
  ] }) : (c == null ? void 0 : c.body) ?? (c == null ? void 0 : c.description)), nounDeck: "actor", adjectiveDeck: n ? "base mod" : void 0, nounCornerIcon: "/types/actor.png", adjectiveCornerIcon: n ? "/types/actor.png" : void 0, imageUri: e ? V(e) : void 0, imageOverlayUri: n ? V(n) : void 0 });
}, ee = (e) => `/assets/${e.startsWith("medieval_") ? "medieval" : "base"}/${e.replace(/^medieval_|^base_/, "")}.png`, $e = ({ baseAssetSlug: e, modifierSlug: a, ...n }) => {
  const i = j("asset-base", e), s = a ? j("asset-modifier", a) : void 0;
  return /* @__PURE__ */ t(B, { ...n, noun: (i == null ? void 0 : i.title) ?? "Unknown Asset", adjective: s == null ? void 0 : s.title, nounDeck: (i == null ? void 0 : i.deck) ?? (e.startsWith("medieval_") ? "medieval" : "base"), adjectiveDeck: s == null ? void 0 : s.deck, nounCornerIcon: "/types/asset.png", adjectiveCornerIcon: s ? "/types/asset.png" : void 0, nounEffect: i == null ? void 0 : i.body, adjectiveEffect: s == null ? void 0 : s.body, imageUri: (i == null ? void 0 : i.artworkPath) ?? ee(e), imageOverlayUri: (s == null ? void 0 : s.artworkPath) ?? (a ? ee(a) : void 0) });
}, Ae = ({ iconSlug: e, title: a, currentValue: n, maxValue: i, ...s }) => /* @__PURE__ */ t(B, { ...s, imageUri: `/counters/${e}.png`, noun: a, adjective: i === void 0 ? n : `${n} / ${i}`, nounDeck: "counter" }), Re = (e) => /* @__PURE__ */ t(B, { ...e, layout: "compact" }), ne = {
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
}, ke = { toughness: "toughness", shield: "shield", melee: "melee", ranged: "ranged", direct: "direct", heal: "heal", range: "range", splash: "splash", replace: "replace", speed: "speed", ...Object.fromEntries(Object.keys(ne).map((e) => [e, e])) }, te = /\[([a-z-]+?)(\d+)?\]/gi, F = ({ text: e, assetBaseUrl: a = "/mighty-decks/assets" }) => {
  const n = [];
  let i = 0;
  for (const s of e.matchAll(te)) {
    n.push(e.slice(i, s.index));
    const [, r, o] = s, c = r.toLowerCase(), l = Math.min(Number(o ?? 1), 9), d = ne[c];
    n.push(!d || !Number.isInteger(l) || l < 1 ? s[0] : /* @__PURE__ */ t("span", { className: p.actorIcons, "aria-hidden": "true", children: Array.from({ length: l }, (g, y) => /* @__PURE__ */ t("img", { src: C(a, d), alt: "" }, y)) }, `${c}-${s.index}`)), i = (s.index ?? 0) + s[0].length;
  }
  return n.push(e.slice(i)), /* @__PURE__ */ t("span", { className: p.actorIconText, "aria-label": e.replace(te, (s, r, o) => ` ${o ?? ""} ${ke[r] ?? r} `).replace(/\s+/g, " ").trim(), children: n });
}, L = (e) => !e || e.family !== "actor-role" && e.family !== "actor-special" ? void 0 : {
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
}[e.slug] ?? (e.family === "actor-special" ? { special: e.description } : void 0), se = ({ presentation: e, bonusPresentation: a, assetBaseUrl: n, description: i }) => {
  var r, o, c, l;
  const s = [
    [e.toughness, a == null ? void 0 : a.toughnessBonus],
    [(r = e.actions) == null ? void 0 : r[0], (o = a == null ? void 0 : a.actionBonuses) == null ? void 0 : o[0]],
    [(c = e.actions) == null ? void 0 : c[1], (l = a == null ? void 0 : a.actionBonuses) == null ? void 0 : l[1]]
  ];
  return /* @__PURE__ */ h("span", { className: p.actorRules, children: [
    /* @__PURE__ */ t("span", { className: p.srOnly, "data-card-description": !0, children: i }),
    s.map(([d, g], y) => /* @__PURE__ */ h("span", { className: p.actorRuleRow, children: [
      /* @__PURE__ */ t(F, { assetBaseUrl: n, text: d ?? "" }),
      /* @__PURE__ */ t(F, { assetBaseUrl: n, text: g ?? "" })
    ] }, y))
  ] });
}, G = ({ title: e, description: a, imageUrl: n, imageAlt: i = "", className: s }) => /* @__PURE__ */ h("article", { className: [p.scene, s].filter(Boolean).join(" "), children: [
  n ? /* @__PURE__ */ t("img", { src: n, alt: i }) : null,
  /* @__PURE__ */ t("h2", { children: e }),
  a ? /* @__PURE__ */ t("p", { children: a }) : null
] }), Ee = (e) => /* @__PURE__ */ t(G, { ...e }), Fe = (e) => /* @__PURE__ */ t(G, { ...e }), De = (e) => /* @__PURE__ */ t(G, { ...e });
export {
  _e as ActorCard,
  F as ActorCardTextWithIcons,
  $e as AssetCard,
  Be as AssetModifierCard,
  xe as CardStyleBoundary,
  Re as CompactCard,
  Ae as CounterCard,
  Ce as EffectCard,
  Fe as EncounterCard,
  D as GameCard,
  B as LayeredCard,
  Ee as LocationCard,
  ze as OutcomeCard,
  De as QuestCard,
  G as SceneCardFrame,
  Me as StuntCard,
  C as resolveAssetUrl
};
