import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import "../src/react/cards.module.css";
import { ActorCard, AssetCard, GameCard } from "../src/react";
const params = new URLSearchParams(window.location.search);
const family = params.get("family");
const slug = params.get("slug");
const layout = params.get("layout") === "compact" ? "compact" : "full";
const width = Number.parseInt(params.get("width") ?? "204", 10);
const scale = Number.isFinite(width) && width > 0 ? width / 204 : 1;
const SingleCard = () => {
    if (family && slug) {
        return _jsx(GameCard, { type: family, slug: slug, layout: layout, assetBaseUrl: "/assets" });
    }
    return _jsx(GameCard, { type: "outcome", slug: "success", assetBaseUrl: "/assets" });
};
createRoot(document.getElementById("root")).render(family ? (_jsx("main", { style: { margin: 0, padding: 0, width: 204, height: 332, zoom: scale }, children: _jsx("div", { "data-card-export": true, children: _jsx(SingleCard, {}) }) })) : (_jsxs("main", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, padding: 24, background: "#243038", minHeight: "100vh" }, children: [_jsx(GameCard, { type: "outcome", slug: "success", assetBaseUrl: "/assets" }), _jsx(GameCard, { type: "effect", slug: "taken-out", assetBaseUrl: "/assets" }), _jsx(GameCard, { type: "stunt", slug: "weaponMaintenance", assetBaseUrl: "/assets" }), _jsx(ActorCard, { baseLayerSlug: "guard_blue", tacticalRoleSlug: "thug", tacticalSpecialSlug: "tough", assetBaseUrl: "/assets" }), _jsx(AssetCard, { baseAssetSlug: "base_light_weapon", modifierSlug: "base_empowered", assetBaseUrl: "/assets" }), _jsx(GameCard, { type: "counter", slug: "agreement", assetBaseUrl: "/assets" })] })));
