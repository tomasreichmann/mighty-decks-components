import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, relative, resolve } from "node:path";
import { chromium } from "playwright";
import { createServer } from "vite";
import { contentVersion, enumerateStaticCards, getCard } from "../src/catalog";
import { planExport } from "./export-plan.mjs";
const packageRoot = resolve(import.meta.dirname, "..");
const hash = (value) => createHash("sha256").update(value).digest("hex");
const parseArgs = () => {
    const args = process.argv.slice(2);
    const get = (name) => {
        const index = args.indexOf(name);
        return index >= 0 ? args[index + 1] : undefined;
    };
    const height = get("--height");
    return { family: get("--type"), slug: get("--id"), layout: get("--layout"), height: height ? Number.parseInt(height, 10) : undefined };
};
const outputPath = (entry) => `png/en/${entry.family}/${entry.slug}/${entry.layout}/${entry.height}.png`;
const matches = (entry, filter) => (!filter.family || entry.family === filter.family) && (!filter.slug || entry.slug === filter.slug) && (!filter.layout || entry.layout === filter.layout) && (!filter.height || entry.height === filter.height);
const isFullActorOverlay = (entry) => entry.layout === "full" && (entry.family === "actor-role" || entry.family === "actor-special");
const assertPathWithin = (path, root, label) => {
    const pathRelativeToRoot = relative(root, path);
    if (pathRelativeToRoot === "" || (!pathRelativeToRoot.startsWith("..") && !pathRelativeToRoot.includes(":")))
        return;
    throw new Error(`${label} must stay within ${root}: ${path}`);
};
const assertActorOverlayDescription = (entry) => {
    if (!isFullActorOverlay(entry))
        return;
    if (!getCard(entry.family, entry.slug)?.description?.trim())
        throw new Error(`Missing description for ${entry.id} (${entry.layout}/${entry.height}).`);
};
const sharedFingerprint = async () => hash(JSON.stringify(await Promise.all([
    "src/react/cards.module.css", "src/react/index.tsx", "export-app/main.tsx", "assets/inventory.json",
].map(async (path) => [path, hash(await readFile(resolve(packageRoot, path)).catch(() => ""))]))));
const filter = parseArgs();
const requestedCompact512 = filter.layout === "compact" && filter.height === 512;
const entries = (requestedCompact512
    ? enumerateStaticCards().filter((entry) => entry.layout === "compact").map((entry) => ({ ...entry, width: 315, height: 512 }))
    : enumerateStaticCards()).filter((entry) => matches(entry, filter));
if (entries.length === 0)
    throw new Error("No static cards match the requested filter.");
for (const entry of entries)
    assertActorOverlayDescription(entry);
const allEntries = requestedCompact512 ? entries : enumerateStaticCards();
const shared = await sharedFingerprint();
const expectedAll = allEntries.map((entry) => ({ ...entry, path: outputPath(entry), fingerprint: hash(JSON.stringify({ entry, shared })) }));
const generated = resolve(packageRoot, "generated");
const previousPath = resolve(generated, "png-manifest.json");
const previous = JSON.parse(await readFile(previousPath, "utf8").catch(() => "{\"entries\":[]}"));
const hasFilter = Boolean(filter.family || filter.slug || filter.layout || filter.height);
const selected = new Set(entries.map(outputPath));
const baselineComplete = previous.entries.length === expectedAll.length && previous.entries.every((entry) => expectedAll.some((expected) => expected.path === entry.path));
const partial = hasFilter && !baselineComplete;
const expected = partial ? expectedAll.filter((entry) => selected.has(entry.path)) : expectedAll;
const plan = planExport(expected, partial ? { entries: [] } : previous);
const renderPaths = plan.render.filter((path) => !hasFilter || selected.has(path));
if (renderPaths.length === 0 && plan.remove.length === 0) {
    console.log("PNG inventory is unchanged; skipped browser rendering.");
    process.exit(0);
}
const staging = resolve(packageRoot, ".export-staging");
assertPathWithin(staging, packageRoot, "Export staging path");
assertPathWithin(resolve(generated, "png"), generated, "PNG output path");
await rm(staging, { recursive: true, force: true });
await mkdir(staging, { recursive: true });
if (!partial && previous.entries.length > 0)
    await cp(resolve(generated, "png"), resolve(staging, "png"), { recursive: true, force: true });
const renderSet = new Set(renderPaths);
const rendered = new Map();
if (renderPaths.length > 0) {
    const server = await createServer({ root: packageRoot, logLevel: "error", server: { host: "127.0.0.1" } });
    await server.listen();
    const address = server.resolvedUrls?.local[0];
    if (!address)
        throw new Error("Vite did not expose a local exporter URL.");
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 700, height: 1100 }, deviceScaleFactor: 1 });
    let browserErrors = [];
    page.on("console", (message) => { if (message.type() === "error" && !message.text().includes("createRoot()"))
        browserErrors.push(message.text()); });
    try {
        for (const [index, entry] of expected.filter((entry) => renderSet.has(entry.path)).entries()) {
            browserErrors = [];
            const query = new URLSearchParams({ family: entry.family, slug: entry.slug, layout: entry.layout, width: String(entry.width) });
            await page.goto(`${address}?${query}`, { waitUntil: "networkidle" });
            const validation = await page.evaluate(async ({ actorOverlay, special, description }) => {
                await document.fonts.ready;
                await Promise.all([...document.images].map((image) => image.decode().catch(() => undefined)));
                const missingImages = [...document.images].filter((image) => image.naturalWidth === 0).map((image) => image.currentSrc || image.src);
                const svgImageHrefs = [...document.querySelectorAll("svg image")].map((image) => image.getAttribute("href")).filter((href) => Boolean(href));
                const missingSvgImages = (await Promise.all(svgImageHrefs.map(async (href) => (await fetch(href)).ok ? undefined : href))).filter((href) => Boolean(href));
                if (!actorOverlay)
                    return { missingImages, missingSvgImages };
                const region = document.querySelector(`[data-card-text-region="${special ? "footer" : "main"}"]`);
                const inner = region?.firstElementChild?.firstElementChild;
                const bounds = region?.getBoundingClientRect();
                const innerBounds = inner?.getBoundingClientRect();
                return { missingImages, missingSvgImages, hasDescription: inner?.textContent?.trim() === description, descriptionFits: Boolean(bounds && innerBounds && innerBounds.width <= bounds.width + 0.5 && innerBounds.height <= bounds.height + 0.5) };
            }, { actorOverlay: isFullActorOverlay(entry), special: entry.family === "actor-special", description: getCard(entry.family, entry.slug)?.description });
            const card = page.locator("[data-card-export] article");
            const box = await card.boundingBox();
            if (!box || Math.abs(box.width - entry.width) > 1 || Math.abs(box.height - entry.height) > 1)
                throw new Error(`Incorrect export geometry for ${entry.id}: ${JSON.stringify(box)}`);
            if (validation.missingImages.length > 0 || validation.missingSvgImages.length > 0)
                throw new Error(`Missing artwork for ${entry.id}: ${[...validation.missingImages, ...validation.missingSvgImages].join(", ")}`);
            if (isFullActorOverlay(entry) && !validation.hasDescription)
                throw new Error(`Missing rendered description for ${entry.id}.`);
            if (isFullActorOverlay(entry) && !validation.descriptionFits)
                throw new Error(`Actor description does not fit for ${entry.id} (${entry.layout}/${entry.height}).`);
            if (browserErrors.length > 0)
                throw new Error(`Browser errors for ${entry.id}: ${browserErrors.join("; ")}`);
            const destination = resolve(staging, entry.path);
            await mkdir(resolve(destination, ".."), { recursive: true });
            await page.screenshot({ path: destination, clip: { x: box.x, y: box.y, width: entry.width, height: entry.height }, omitBackground: true });
            rendered.set(entry.path, hash(await readFile(destination)));
            if ((index + 1) % 25 === 0 || index + 1 === renderPaths.length)
                console.log(`Rendered ${index + 1}/${renderPaths.length}.`);
        }
    }
    finally {
        await browser.close();
        await server.close();
    }
}
try {
    for (const path of plan.remove)
        await rm(resolve(staging, path), { force: true });
    const previousByPath = new Map(previous.entries.map((entry) => [entry.path, entry]));
    const manifestEntries = expected.map((entry) => {
        const prior = previousByPath.get(entry.path);
        const checksum = rendered.get(entry.path) ?? prior?.checksum;
        if (!checksum)
            throw new Error(`Missing staged PNG for ${entry.path}.`);
        return rendered.has(entry.path) || partial ? { ...entry, checksum } : prior;
    });
    const manifestPath = partial ? resolve(generated, "png-manifest.filtered.json") : previousPath;
    await writeFile(resolve(staging, "manifest.json"), JSON.stringify({ locale: "en", contentVersion, sharedFingerprint: shared, entries: manifestEntries }, null, 2) + "\n");
    if (!partial)
        await rm(resolve(generated, "png"), { recursive: true, force: true });
    await cp(resolve(staging, "png"), resolve(generated, "png"), { recursive: true, force: true });
    await writeFile(manifestPath, JSON.stringify({ locale: "en", contentVersion, sharedFingerprint: shared, entries: manifestEntries }, null, 2) + "\n");
}
finally {
    await rm(staging, { recursive: true, force: true });
}
console.log(`Exported ${renderPaths.length} PNG cards (${basename(staging)} staging).`);
