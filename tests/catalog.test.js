import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { cardCatalog, enumerateStaticCards, getCard, staticCardPresets, validateCardExportInput, } from "../src/catalog";
test("all Actor roles and specials include descriptions", () => {
    const actors = cardCatalog.filter((card) => card.family === "actor-role" || card.family === "actor-special");
    assert.equal(actors.length, 40);
    for (const card of actors)
        assert.ok(card.description?.trim(), `${card.id} needs a description`);
});
test("Actor mechanics retain representative role and special semantics", () => {
    const descriptions = new Map(cardCatalog
        .filter((card) => card.family === "actor-role" || card.family === "actor-special")
        .map((card) => [card.slug, card.description]));
    assert.equal(descriptions.get("minion"), "Toughness 2. Move 1 zone. Melee: 1 Injury. Ranged: 1 Injury, range 1-2.");
    assert.equal(descriptions.get("artillery"), "Toughness 2. Move 1 zone. Ranged: 2 Injuries, range 1 or more, splash.");
    assert.doesNotMatch(descriptions.get("artillery") ?? "", /Melee/);
    assert.equal(descriptions.get("armoured"), "-2 Injuries taken.");
    assert.equal(descriptions.get("fast"), "Moves an extra zone per turn.");
    assert.equal(descriptions.get("tough"), "+2 Toughness.");
    assert.equal(descriptions.get("fiery"), "Secondary attack deals Burning instead.");
    assert.equal(descriptions.get("charging"), "Primary attack also deals +2 Injuries when entering a zone.");
});
test("renders Actor descriptions on overlays and combined cards", async () => {
    const { createServer } = await import("vite");
    const { createElement } = await import("react");
    const { renderToStaticMarkup } = await import("react-dom/server");
    const server = await createServer({ server: { middlewareMode: true } });
    try {
        const { GameCard, ActorCard, LayeredCard } = await server.ssrLoadModule("/src/react/index.tsx");
        const overlay = renderToStaticMarkup(createElement(LayeredCard, { transparent: true, nounEffect: "Role rules", adjectiveEffect: "Special rules" }));
        assert.ok(overlay.includes("Role rules"));
        assert.ok(overlay.includes("Special rules"));
        const combined = renderToStaticMarkup(createElement(ActorCard, {
            baseLayerSlug: "civilian",
            tacticalRoleSlug: "minion",
            tacticalSpecialSlug: "fast",
        }));
        assert.match(combined, /Toughness 2\. Move 1 zone\. Melee: 1 Injury\. Ranged: 1 Injury, range 1-2\./);
        assert.match(combined, /Moves an extra zone per turn\./);
        assert.match(combined, /data-card-text-region="main"/);
        assert.match(combined, /data-card-text-region="footer"/);
        const custom = renderToStaticMarkup(createElement(ActorCard, {
            custom: { imageUrl: "/custom.png", noun: "Custom", nounDescription: "Custom role rule", adjectiveDescription: "Custom special rule" },
            nounEffect: "Explicit role rule",
            adjectiveEffect: "Explicit special rule",
        }));
        assert.match(custom, /Explicit role rule/);
        assert.match(custom, /Explicit special rule/);
        for (const card of cardCatalog.filter((entry) => entry.family === "actor-role" || entry.family === "actor-special")) {
            assert.ok(card.description);
            const expected = renderToStaticMarkup(createElement("span", null, card.description)).slice(6, -7);
            assert.ok(renderToStaticMarkup(createElement(GameCard, { type: card.family, slug: card.slug })).includes(expected), card.id);
            const combined = renderToStaticMarkup(createElement(ActorCard, {
                baseLayerSlug: "civilian",
                ...(card.family === "actor-role" ? { tacticalRoleSlug: card.slug } : { tacticalSpecialSlug: card.slug }),
            }));
            assert.ok(combined.includes(expected), `combined ${card.id}`);
        }
    }
    finally {
        await server.close();
    }
});
test("catalogue contains the complete pinned medieval inventory", async () => {
    const inventory = JSON.parse(await readFile(resolve(import.meta.dirname, "fixtures/medieval-card-inventory.json"), "utf8"));
    assert.equal(inventory.actors.length, 40);
    assert.equal(inventory.locations.length, 48);
    assert.equal(new Set([...inventory.actors, ...inventory.locations].map((card) => card.id)).size, 88);
    for (const card of [...inventory.actors, ...inventory.locations])
        assert.deepEqual(cardCatalog.find(({ id }) => id === card.id), card);
    assert.equal(cardCatalog.length, 353);
    assert.equal(enumerateStaticCards().length, 1059);
});
test("renders medieval portrait and location cards through their dedicated layouts", async () => {
    const { createServer } = await import("vite");
    const { createElement } = await import("react");
    const { renderToStaticMarkup } = await import("react-dom/server");
    const server = await createServer({ server: { middlewareMode: true } });
    try {
        const { ActorCard, GameCard, LocationCard } = await server.ssrLoadModule("/src/react/index.tsx");
        const portrait = renderToStaticMarkup(createElement(GameCard, { type: "actor-base", slug: "medieval_female_villager", assetBaseUrl: "/custom-assets" }));
        assert.match(portrait, /actors\/medieval\/female\/villager\.png/);
        assert.match(portrait, /data-card-kind="actor"/);
        const composed = renderToStaticMarkup(createElement(ActorCard, { baseLayerSlug: "medieval_villager", tacticalRoleSlug: "minion", tacticalSpecialSlug: "fast" }));
        assert.match(composed, /actors\/medieval\/villager\.png/);
        assert.match(composed, /Toughness 2/);
        const location = renderToStaticMarkup(createElement(GameCard, { type: "location", slug: "medieval_townhouse_bedchamber", layout: "compact", assetBaseUrl: "/custom-assets" }));
        assert.match(location, /locations\/medieval\/townhouse_bedchamber\.jpg/);
        assert.match(location, /data-card-kind="location"/);
        const generic = renderToStaticMarkup(createElement(LocationCard, { title: "Generic scene", imageUrl: "/scene.jpg", description: "Unchanged" }));
        assert.match(generic, /Generic scene/);
        assert.match(generic, /Unchanged/);
    }
    finally {
        await server.close();
    }
});
test("Actor icon text repeats known tokens without exposing their numeric suffix", async () => {
    const { createServer } = await import("vite");
    const { createElement } = await import("react");
    const { renderToStaticMarkup } = await import("react-dom/server");
    const server = await createServer({ server: { middlewareMode: true } });
    try {
        const { ActorCardTextWithIcons } = await server.ssrLoadModule("/src/react/index.tsx");
        const markup = renderToStaticMarkup(createElement(ActorCardTextWithIcons, {
            text: "+[injury2] / [unknown]",
            assetBaseUrl: "/custom-assets",
        }));
        assert.equal((markup.match(/effects\/injury\.png/g) ?? []).length, 2);
        assert.match(markup, /\/custom-assets\/effects\/injury\.png/);
        assert.match(markup, /\[unknown\]/);
        assert.doesNotMatch(markup, />2</);
    }
    finally {
        await server.close();
    }
});
test("renders Asset modifier rules in the footer slot for standalone and layered cards", async () => {
    const { createServer } = await import("vite");
    const { createElement } = await import("react");
    const { renderToStaticMarkup } = await import("react-dom/server");
    const server = await createServer({ server: { middlewareMode: true } });
    try {
        const { AssetCard, GameCard } = await server.ssrLoadModule("/src/react/index.tsx");
        const textInRegion = (markup, region) => {
            const match = markup.match(new RegExp(`data-card-text-region="${region}"[^>]*><div[^>]*><div[^>]*>(.*?)</div></div>`));
            return match?.[1] ?? "";
        };
        for (const modifier of cardCatalog.filter((card) => card.family === "asset-modifier")) {
            const standalone = renderToStaticMarkup(createElement(GameCard, { type: "asset-modifier", slug: modifier.slug }));
            assert.equal(textInRegion(standalone, "main"), "", `${modifier.id} must not use the base-rule slot`);
            assert.equal(textInRegion(standalone, "footer"), modifier.body ?? modifier.description ?? "", `${modifier.id} must use the modifier-rule slot`);
        }
        for (const [baseAssetSlug, modifierSlug] of [["base_artillery_weapon", "base_permanent"], ["base_tools", "base_hidden"], ["base_resources", "base_insulating"]]) {
            const combined = renderToStaticMarkup(createElement(AssetCard, { baseAssetSlug, modifierSlug }));
            assert.match(textInRegion(combined, "main"), /\S/, `${baseAssetSlug} must retain its base rule`);
            assert.match(textInRegion(combined, "footer"), /\S/, `${modifierSlug} must retain its modifier rule`);
        }
    }
    finally {
        await server.close();
    }
});
test("consumable Asset bodies contain real line breaks", () => {
    for (const slug of ["base_healing", "base_comfort", "base_surge"]) {
        const card = getCard("asset-base", slug);
        assert.ok(card?.body?.includes("\n"), `${slug} needs a line break`);
        assert.doesNotMatch(card?.body ?? "", /\\\\n/, `${slug} must not contain an escaped line break`);
    }
});
test("allocates a readable footer region for long Effect rules", async () => {
    const { createServer } = await import("vite");
    const { createElement } = await import("react");
    const { renderToStaticMarkup } = await import("react-dom/server");
    const server = await createServer({ server: { middlewareMode: true } });
    try {
        const { GameCard } = await server.ssrLoadModule("/src/react/index.tsx");
        const complication = renderToStaticMarkup(createElement(GameCard, { type: "effect", slug: "complication" }));
        assert.match(complication, /<foreignObject x="16" y="258" width="172" height="60" data-card-text-region="footer">/);
    }
    finally {
        await server.close();
    }
});
test("compact Actor special overlays retain their title", async () => {
    const { createServer } = await import("vite");
    const { createElement } = await import("react");
    const { renderToStaticMarkup } = await import("react-dom/server");
    const server = await createServer({ server: { middlewareMode: true } });
    try {
        const { GameCard } = await server.ssrLoadModule("/src/react/index.tsx");
        const compactSpecial = renderToStaticMarkup(createElement(GameCard, { type: "actor-special", slug: "fast", layout: "compact" }));
        assert.match(compactSpecial, />Fast</);
    }
    finally {
        await server.close();
    }
});
test("rejects unsupported locales and incomplete custom cards", () => {
    assert.throws(() => validateCardExportInput({ locale: "cs", cards: [] }));
    assert.throws(() => validateCardExportInput({ locale: "en", cards: [{ family: "asset" }] }));
});
test("enumerates each standard card once per preset without deck-quantity duplication", () => {
    const entries = enumerateStaticCards();
    const success = entries.filter((entry) => entry.id === "outcome:success");
    assert.equal(success.length, 3);
    assert.deepEqual(success.map((entry) => `${entry.layout}/${entry.height}`), ["full/1024", "full/512", "compact/256"]);
    assert.deepEqual(staticCardPresets, [
        { layout: "full", width: 629, height: 1024 },
        { layout: "full", width: 315, height: 512 },
        { layout: "compact", width: 157, height: 256 },
    ]);
});
