import { chromium } from "playwright";
import { createServer } from "vite";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const cases = [
  ["actor-base", "animal_blue"], ["actor-role", "minion"], ["actor-role", "tank"],
  ["actor-role", "artillery"], ["actor-special", "armoured"], ["actor-special", "fiery"], ["actor-special", "fast"],
];
const server = await createServer({ root, logLevel: "error", server: { host: "127.0.0.1" } });
await server.listen();
const address = server.resolvedUrls?.local[0];
if (!address) throw new Error("Vite did not expose a local parity verification URL.");
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 700, height: 1100 }, deviceScaleFactor: 1 });
  for (const [family, slug] of cases) {
    await page.goto(`${address}?${new URLSearchParams({ family, slug, layout: "full", width: "629" })}`, { waitUntil: "networkidle" });
    const result = await page.evaluate(async () => {
      await document.fonts.ready;
      const card = document.querySelector("[data-card-export] article");
      const bounds = card?.getBoundingClientRect();
      const failedImages = [...document.querySelectorAll("img")].filter((image) => image.naturalWidth === 0).map((image) => image.currentSrc);
      const regionSizes = [...document.querySelectorAll("[data-card-text-region]")].map((region) => {
        const inner = region.firstElementChild?.firstElementChild;
        const regionBounds = region.getBoundingClientRect(); const innerBounds = inner?.getBoundingClientRect();
        return { region: region.getAttribute("data-card-text-region"), width: innerBounds?.width ?? 0, height: innerBounds?.height ?? 0, maxWidth: regionBounds.width, maxHeight: regionBounds.height };
      });
      const mechanics = regionSizes.every((size) => size.width <= size.maxWidth + .5 && size.height <= size.maxHeight + .5);
      return { bounds, failedImages, mechanics, regionSizes };
    });
    if (!result.bounds || Math.abs(result.bounds.width - 629) > 1 || Math.abs(result.bounds.height - 1024) > 1) throw new Error(`Incorrect full-card geometry for ${family}:${slug}.`);
    if (result.failedImages.length) throw new Error(`Missing images for ${family}:${slug}: ${result.failedImages.join(", ")}`);
    if (!result.mechanics) throw new Error(`Overflowing Actor mechanics for ${family}:${slug}: ${JSON.stringify(result)}.`);
  }
} finally {
  await browser.close();
  await server.close();
}
console.log(`Verified ${cases.length} Actor parity cases.`);
