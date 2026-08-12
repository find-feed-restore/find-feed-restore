import { access } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  "/affordable-housing/",
  "/housing-first/",
  "/homelessness-avoidance/",
  "/care-coach-mobile-unit/",
  "/news-media/",
  "/testimonials/",
  "/contact-us/",
  "/board-staff/",
  "/sponsors/",
  "/live-here-love-here-lake/",
  "/we-need-trailers/",
  "/hope-in-action/",
  "/terms-conditions/",
];
const preservedRouteSpecificImages = new Set([
  "/images/housing-first.jpg",
  "/images/homelessness-avoidance.jpg",
  "/images/care-coach.jpg",
  "/images/programs/care-coach/care-coach.jpg",
  "/images/give-banner.jpg",
]);
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

function normalizeSource(source) {
  const url = new URL(source, baseUrl);
  if (url.pathname === "/_next/image" || url.pathname === "/_next/image/") {
    const optimizedSource = url.searchParams.get("url");
    return optimizedSource ? decodeURIComponent(optimizedSource) : url.pathname;
  }
  return url.origin === new URL(baseUrl).origin ? url.pathname : null;
}

const browser = await chromium.launch({ executablePath: await findChrome(), headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const usage = new Map();

for (const route of routes) {
  const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`${route} returned ${response?.status() ?? "no response"}`);

  const sources = await page.evaluate(() => {
    const values = [];
    for (const image of document.querySelectorAll("main img")) values.push(image.currentSrc || image.src);
    for (const element of document.querySelectorAll("main *")) {
      const background = getComputedStyle(element).backgroundImage;
      for (const match of background.matchAll(/url\(["']?([^"')]+)["']?\)/g)) values.push(match[1]);
    }
    return values;
  });

  const normalizedSources = sources.map(normalizeSource).filter(Boolean);
  for (const normalized of normalizedSources) {
    const placements = usage.get(normalized) ?? [];
    placements.push(route);
    usage.set(normalized, placements);
  }
}

await browser.close();

const duplicates = [...usage.entries()]
  .filter(([source, placements]) => placements.length > 1 && !preservedRouteSpecificImages.has(source))
  .sort(([left], [right]) => left.localeCompare(right));

if (duplicates.length) {
  for (const [source, placements] of duplicates) console.error(`${source}: ${placements.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${usage.size} local content images are unique across ${routes.length} routes.`);
  console.log("Homepage, Care Coach, and We Need Trailers factual imagery remains intentionally preserved.");
}
