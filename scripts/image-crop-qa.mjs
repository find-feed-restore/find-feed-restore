import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const outputDirectory = path.join(process.cwd(), ".visual-qa", "image-crops");
const routes = [
  "/",
  "/affordable-housing/",
  "/housing-first/",
  "/homelessness-avoidance/",
  "/news-media/",
  "/testimonials/",
  "/contact-us/",
  "/board-staff/",
  "/sponsors/",
  "/hope-in-action/",
  "/volunteer/",
];
const widths = [1440, 390, 320];
const chromeCandidates = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
].filter(Boolean);

async function findChrome() {
  for (const candidate of chromeCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {}
  }
  throw new Error("Chrome was not found.");
}

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ executablePath: await findChrome(), headless: true });

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  for (const route of routes) {
    const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: "networkidle" });
    if (!response?.ok()) throw new Error(`${route} returned ${response?.status() ?? "no response"}`);
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 120));
      }
      await Promise.all(
        [...document.images].map((image) =>
          image.complete
            ? image.decode?.().catch(() => undefined)
            : new Promise((resolve) => {
                image.addEventListener("load", resolve, { once: true });
                image.addEventListener("error", resolve, { once: true });
              }),
        ),
      );
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);
    const routeName = route === "/" ? "home" : route.replaceAll("/", "");
    await page.screenshot({
      path: path.join(outputDirectory, `${routeName}-${width}.png`),
      fullPage: true,
      animations: "disabled",
    });
  }
  await page.close();
}

await browser.close();
console.log(`Captured ${routes.length * widths.length} crop-review screenshots.`);
