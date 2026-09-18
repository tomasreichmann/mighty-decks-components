import { chromium } from "playwright";
import { createServer } from "vite";
import { resolve } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, ".agent-logs/actor-parity");
await mkdir(output, { recursive: true });
const fixtureModule = `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { GameCard, ActorCard, AssetCard } from '/src/react/index.tsx';
const e = React.createElement;
const fixtures = [];
function add(id, Component, props) {
  fixtures.push(e('section', { key: id, 'data-fixture': id },
    e('h2', null, id), e(Component, { ...props, assetBaseUrl: '' })));
}
for (const role of ['minion', 'tank', 'artillery', 'marksman']) {
  add(role, GameCard, { type: 'actor-role', slug: role });
  add(role + '-assembled', ActorCard, {
    baseLayerSlug: 'civilian', tacticalRoleSlug: role,
  });
}
for (const special of ['fast', 'fiery', 'charging', 'armoured']) {
  add(special, GameCard, { type: 'actor-special', slug: special });
  add(special + '-assembled', ActorCard, {
    baseLayerSlug: 'civilian', tacticalRoleSlug: 'minion',
    tacticalSpecialSlug: special,
  });
}
add('stunt-marksman', GameCard, { type: 'stunt', slug: 'marksman' });
for (const modifier of ['base_empowered', 'base_fast']) {
  add(modifier, GameCard, { type: 'asset-modifier', slug: modifier });
  add(modifier + '-assembled', AssetCard, {
    baseAssetSlug: 'base_tools', modifierSlug: modifier,
  });
}
add('tools', AssetCard, { baseAssetSlug: 'base_tools' });
createRoot(document.getElementById('root')).render(e('main', null, ...fixtures));
`;
const server = await createServer({
  root,
  logLevel: "error",
  plugins: [
    {
      name: "actor-parity-fixtures",
      resolveId(id) {
        if (id === "virtual:parity") return id;
      },
      load(id) {
        if (id === "virtual:parity") return fixtureModule;
      },
    },
  ],
  server: { host: "127.0.0.1" },
});
await server.listen();
const address = server.resolvedUrls?.local[0];
const browser = await chromium.launch({ headless: true });
const reports = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1400, height: 1200 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("pageerror", (error) => {
    errors.push(error.message);
    console.error(error.message);
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(response.url() + ":" + response.status());
  });
  await page.route("**/parity", async (route) =>
    route.fulfill({
      contentType: "text/html",
      body: await server.transformIndexHtml(
        "/parity",
        `<html><style>body{margin:20px}main{display:grid;grid-template-columns:repeat(5,max-content);gap:20px}section{width:204px;background:repeating-conic-gradient(#d7d7d7 0% 25%,white 0% 50%) 0/16px 16px}h2{font:12px sans-serif;height:24px;background:white;margin:0}article{width:100%!important}</style><div id="root"></div><script type="module" src="/@id/virtual:parity"></script></html>`,
      ),
    }),
  );
  await page.goto(`${address}parity`, { waitUntil: "networkidle" });
  await page.waitForSelector('[data-fixture="tools"] article');
  for (const width of [204, 176]) {
    await page
      .locator("section")
      .evaluateAll(
        (sections, width) =>
          sections.forEach((section) => (section.style.width = width + "px")),
        width,
      );
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        [...document.querySelectorAll("img, image")].map(
          (element) =>
            new Promise((done, reject) => {
              const img = new window.Image();
              img.onload = done;
              img.onerror = () => reject(new Error("Missing image " + img.src));
              img.src =
                element.getAttribute("src") ?? element.getAttribute("href");
            }),
        ),
      );
      await new Promise((done) =>
        window.requestAnimationFrame(() => window.requestAnimationFrame(done)),
      );
    });
    const samples = await page.evaluate(() =>
      Object.fromEntries(
        [...document.querySelectorAll("section")].map((section) => {
          const card = section.querySelector("article"),
            origin = card.getBoundingClientRect();
          const rect = (element) => {
            const b = element.getBoundingClientRect(),
              s = window.getComputedStyle(element);
            return {
              x: b.x - origin.x,
              y: b.y - origin.y,
              width: b.width,
              height: b.height,
              color: s.color,
              font: s.fontSize,
              text: element.getAttribute("aria-label") ?? element.textContent,
              icons: [...element.querySelectorAll("img")].map(rect),
            };
          };
          const regions = [...card.querySelectorAll("foreignObject")];
          const rows = [
            ...card.querySelectorAll('[data-card-text-region="main"] span'),
          ].filter(
            (element) =>
              window.getComputedStyle(element).display === "grid" &&
              window.getComputedStyle(element).gridTemplateColumns.split(" ")
                .length === 2,
          );
          return [
            section.dataset.fixture,
            {
              regions: regions.map((region) =>
                rect(region.firstElementChild.firstElementChild),
              ),
              rows: rows.map((row) => [...row.children].map(rect)),
              icons: [...card.querySelectorAll("img")].map(rect),
              art: [...card.querySelectorAll("g > image")].map((image) => ({
                ...rect(image),
                href: image.getAttribute("href"),
                opacity: window.getComputedStyle(image).opacity,
              })),
              paper: card.querySelectorAll("svg > rect").length,
              overflow: regions.some((region) => {
                const outer = region.firstElementChild,
                  inner = outer.firstElementChild;
                return (
                  inner.scrollWidth > outer.clientWidth + 1 ||
                  inner.scrollHeight > outer.clientHeight + 1
                );
              }),
            },
          ];
        }),
      ),
    );
    const match = (a, b, label) => {
      for (const key of ["x", "y", "width", "height"])
        assert.ok(
          Math.abs(a[key] - b[key]) <= 1,
          `${width}px ${label} ${key}: ${a[key]} vs ${b[key]}`,
        );
      assert.equal(a.color, b.color, label + " color");
      assert.equal(a.font, b.font, label + " font");
      assert.equal(a.text, b.text, label + " content");
      assert.equal(a.icons.length, b.icons.length, label + " icon count");
      a.icons.forEach((icon, index) =>
        match(icon, b.icons[index], label + " icon " + index),
      );
    };
    for (const role of ["minion", "tank", "artillery", "marksman"]) {
      match(
        samples[role].regions[1],
        samples[role + "-assembled"].regions[1],
        role + " title",
      );
      samples[role].rows.forEach((row, i) =>
        match(
          row[0],
          samples[role + "-assembled"].rows[i][0],
          role + " row " + i,
        ),
      );
    }
    for (const special of ["fast", "fiery", "charging", "armoured"]) {
      const standalone = samples[special],
        assembled = samples[special + "-assembled"];
      match(standalone.regions[0], assembled.regions[0], special + " title");
      match(standalone.regions[3], assembled.regions[3], special + " footer");
      standalone.rows.forEach((row, i) =>
        match(row[1], assembled.rows[i][1], special + " bonus " + i),
      );
      samples.minion.rows.forEach((row, i) =>
        match(row[0], assembled.rows[i][0], special + " Minion " + i),
      );
      match(standalone.art[0], assembled.art[1], special + " art");
      assert.ok(
        standalone.art[0].y + standalone.art[0].height <
          standalone.regions[0].y,
        special + " artwork must end above the adjective title",
      );
      assert.equal(standalone.paper, 0);
    }
    for (const modifier of ["base_empowered", "base_fast"]) {
      const standalone = samples[modifier],
        assembled = samples[modifier + "-assembled"];
      match(standalone.regions[0], assembled.regions[0], modifier + " title");
      match(standalone.regions[3], assembled.regions[3], modifier + " footer");
      match(standalone.art[0], assembled.art[1], modifier + " art");
      assert.equal(standalone.regions[0].color, "rgb(18, 27, 35)");
      assert.equal(standalone.paper, 0);
      assert.ok(assembled.paper > 0);
    }
    assert.ok(samples.tools.paper > 0);
    assert.equal(samples["stunt-marksman"].icons.length, 0);
    assert.ok(
      samples["stunt-marksman"].regions[2].text.includes(
        "You can shoot ranged weapons 1 zone further.",
      ),
    );
    for (const [id, sample] of Object.entries(samples)) {
      assert.equal(sample.overflow, false, id + " overflow");
      for (const icon of sample.icons)
        assert.ok(
          Math.abs(icon.width - (16 * width) / 204) < 1,
          id + " icon size",
        );
    }
    reports.push({ width, samples });
    for (const surface of ["checker", "light", "dark"]) {
      await page
        .locator("section")
        .evaluateAll(
          (sections, surface) =>
            sections.forEach(
              (section) =>
                (section.style.background =
                  surface === "checker"
                    ? "repeating-conic-gradient(#d7d7d7 0% 25%,white 0% 50%) 0/16px 16px"
                    : surface === "dark"
                      ? "#243038"
                      : "#faf4e7"),
            ),
          surface,
        );
      await page.screenshot({
        path: resolve(output, `${width}-${surface}.png`),
        fullPage: true,
      });
    }
  }
  // Preserve the original print/export geometry regression coverage.
  for (const [family, slug] of [
    ["actor-base", "animal_blue"],
    ["actor-role", "minion"],
    ["actor-role", "tank"],
    ["actor-role", "artillery"],
    ["actor-special", "armoured"],
    ["actor-special", "fiery"],
    ["actor-special", "fast"],
  ]) {
    await page.goto(
      `${address}?${new URLSearchParams({ family, slug, layout: "full", width: "629" })}`,
      { waitUntil: "networkidle" },
    );
    const result = await page.evaluate(async () => {
      await document.fonts.ready;
      const card = document.querySelector("[data-card-export] article"),
        box = card.getBoundingClientRect();
      const failedImages = [];
      await Promise.all(
        [...card.querySelectorAll("img, image")].map(async (element) => {
          const image = new window.Image();
          image.src =
            element.getAttribute("src") ?? element.getAttribute("href");
          try {
            await image.decode();
            if (image.naturalWidth === 0) failedImages.push(image.src);
          } catch {
            failedImages.push(image.src);
          }
        }),
      );
      const overflow = [...card.querySelectorAll("foreignObject")].some(
        (region) => {
          const outer = region.firstElementChild,
            inner = outer.firstElementChild;
          return (
            inner.getBoundingClientRect().width >
              region.getBoundingClientRect().width + 0.5 ||
            inner.getBoundingClientRect().height >
              region.getBoundingClientRect().height + 0.5
          );
        },
      );
      return { width: box.width, height: box.height, overflow, failedImages };
    });
    assert.ok(
      Math.abs(result.width - 629) <= 1 && Math.abs(result.height - 1024) <= 1,
      `${family}:${slug} export geometry`,
    );
    assert.equal(result.overflow, false, `${family}:${slug} export overflow`);
    assert.deepEqual(
      result.failedImages,
      [],
      `${family}:${slug} image decoding`,
    );
  }
  assert.deepEqual(errors, []);
  await writeFile(
    resolve(output, "measurements.json"),
    JSON.stringify(reports, null, 2),
  );
} finally {
  await browser.close();
  await server.close();
}
console.log(
  `Verified Actor layers, Stunt family isolation, and Asset modifiers at 204px/176px. Evidence: ${output}`,
);
