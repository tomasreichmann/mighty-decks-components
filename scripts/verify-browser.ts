import { execFile, spawn } from "node:child_process";
import { cp, mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { promisify } from "node:util";
import { chromium } from "playwright";
import { x } from "tar";

const exec = promisify(execFile);
const packageRoot = resolve(import.meta.dirname, "..");
const fixture = resolve(packageRoot, "tests", "consumer");
const output = resolve(packageRoot, "output", "verification");
const args = process.argv.slice(2);
const tarballIndex = args.indexOf("--tarball");
const tarball = resolve(packageRoot, tarballIndex >= 0 ? args[tarballIndex + 1] : "output/runtime.tgz");
const runtimeAssetsIndex = args.indexOf("--runtime-assets");
const packageJson = JSON.parse(await readFile(resolve(packageRoot, "package.json"), "utf8")) as { version: string };
const runtimeAssets = resolve(
  packageRoot,
  runtimeAssetsIndex >= 0 && args[runtimeAssetsIndex + 1]
    ? args[runtimeAssetsIndex + 1]
    : `output/mighty-decks-components-${packageJson.version}-runtime-assets.tar.gz`,
);
const npmCli = resolve(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js");
const viteCli = (cwd: string) => resolve(cwd, "node_modules", "vite", "bin", "vite.js");

const temp = await mkdtemp(resolve(tmpdir(), "mighty-decks-browser-"));
const cache = resolve(temp, "npm-cache");
const npm = async (argumentsList: string[]) => exec(process.execPath, [npmCli, ...argumentsList], {
  cwd: temp,
  env: { ...process.env, npm_config_cache: cache, npm_config_userconfig: resolve(temp, ".npmrc") },
  maxBuffer: 1024 * 1024,
});
const waitForPreview = async (url: string): Promise<void> => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // The process has not started listening yet.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }
  throw new Error("Vite preview did not start.");
};

await cp(fixture, temp, { recursive: true });
await mkdir(cache, { recursive: true });
await writeFile(resolve(temp, ".npmrc"), "registry=https://registry.npmjs.org/\n");
await npm(["install", "--save-dev", "--registry=https://registry.npmjs.org/", tarball, "react@18.3.1", "react-dom@18.3.1"]);
await npm(["exec", "mighty-decks-components", "--", "copy-static", "--out", "public"]);
await x({ file: runtimeAssets, cwd: resolve(temp, "public"), gzip: true });
await cp(resolve(temp, "public", "mighty-decks", "assets"), resolve(temp, "public", "cards", "assets"), { recursive: true });
await npm(["run", "build"]);

const port = 4179;
const url = `http://127.0.0.1:${port}/`;
const preview = spawn(process.execPath, [viteCli(temp), "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
  cwd: temp,
  stdio: "ignore",
});
let browser;
try {
  await waitForPreview(url);
  await mkdir(output, { recursive: true });
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 900 }, deviceScaleFactor: 1 });
  const failures: string[] = [];
  const exceptions: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });
  page.on("pageerror", (error) => exceptions.push(error.message));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.screenshot({ path: resolve(output, "hostile-default.png"), fullPage: true });
  const articleCount = await page.locator("article").count();
  if (articleCount < 10) throw new Error(`Expected rendered fixture cards, found ${articleCount}.`);
  if (failures.length > 0) throw new Error(`Missing browser resources: ${failures.join("; ")}`);
  if (exceptions.length > 0) throw new Error(`Browser exceptions: ${exceptions.join("; ")}`);
  const result = await page.evaluate(() => ({
    fontReady: document.fonts.status === "loaded",
    noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
    hostColor: getComputedStyle(document.querySelector("#host-control")!).color,
    cardFont: getComputedStyle(document.querySelector("[data-card-fixture='default'] article")!).fontFamily,
  }));
  if (!result.fontReady || !result.noHorizontalOverflow || !result.hostColor.includes("255")) {
    throw new Error(`Browser fixture style check failed: ${JSON.stringify(result)}`);
  }
  if (!result.cardFont.includes("MightyDecks")) {
    throw new Error(`Package card typography was overridden by host CSS: ${result.cardFont}`);
  }
  console.log(`Browser fixture passed; screenshots saved in ${output}.`);
} finally {
  await browser?.close();
  preview.kill();
}
