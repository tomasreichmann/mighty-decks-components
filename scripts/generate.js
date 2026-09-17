import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { cardCatalog, contentVersion, staticCardPresets } from "../src/catalog";
const packageRoot = resolve(import.meta.dirname, "..");
const outputRoot = resolve(packageRoot, "generated");
const quote = (value) => `"${(value ?? "").replaceAll('"', '""')}"`;
// PNG exports are generated separately. Only clear the CSV projection so a
// runtime refresh cannot erase an existing catalogue export.
await rm(resolve(outputRoot, "csv"), { recursive: true, force: true });
await mkdir(resolve(outputRoot, "csv"), { recursive: true });
const catalogByFamily = cardCatalog.reduce((groups, card) => {
    (groups[card.family] ??= []).push(card);
    return groups;
}, {});
for (const [family, cards] of Object.entries(catalogByFamily)) {
    const rows = cards ?? [];
    const csv = ["id,locale,family,slug,title,description,artwork_path,content_version", ...rows.map((card) => [card.id, card.locale, card.family, card.slug, card.title, card.description, card.artworkPath, contentVersion].map(quote).join(","))].join("\n") + "\n";
    await writeFile(resolve(outputRoot, "csv", `${family}.csv`), csv, "utf8");
}
const presets = staticCardPresets.reduce((groups, { layout, width, height }) => {
    (groups[layout] ??= []).push({ width, height });
    return groups;
}, {});
await writeFile(resolve(outputRoot, "manifest.json"), JSON.stringify({ contentVersion, locale: "en", cards: cardCatalog, presets }, null, 2) + "\n");
console.log(`Generated ${cardCatalog.length} catalog records and CSV projections.`);
