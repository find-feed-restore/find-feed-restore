import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";
import sharp from "sharp";

const routeArgument = process.argv[2] ?? "/";
const route = `/${routeArgument.replace(/^\/+|\/+$/g, "")}${routeArgument === "/" ? "" : "/"}`;
const productionRouteArgument = process.env.VISUAL_QA_PRODUCTION_ROUTE ?? route;
const productionRoute = `/${productionRouteArgument.replace(/^\/+|\/+$/g, "")}${productionRouteArgument === "/" ? "" : "/"}`;
const productionBaseUrl = process.env.VISUAL_QA_PRODUCTION_URL ?? "https://www.findfeedrestore.com/";
const localBaseUrl = process.env.VISUAL_QA_LOCAL_URL ?? "http://localhost:3002/";
const productionUrl = new URL(productionRoute, productionBaseUrl).href;
const localUrl = new URL(route, localBaseUrl).href;
const routeKey = route === "/" ? null : route.replaceAll("/", "");
const outputDirectory = path.resolve(
  process.cwd(),
  routeKey ? path.join(".visual-qa", "routes", routeKey) : ".visual-qa",
);
const viewportHeight = 900;
const widths = (process.env.VISUAL_QA_WIDTHS ?? "1440,1024,768,390")
  .split(",")
  .map((width) => Number.parseInt(width.trim(), 10))
  .filter((width) => Number.isFinite(width) && width >= 320);
const canonicalWidths = "1440,1024,768,390";
const resultFilename =
  widths.join(",") === canonicalWidths ? "results.json" : `results-${widths.join("-")}.json`;

const chromeCandidates = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

async function findChrome() {
  for (const candidate of chromeCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next conventional installation path.
    }
  }

  throw new Error(
    "No supported Chrome/Chromium executable was found. Set PLAYWRIGHT_CHROME_PATH to its absolute path.",
  );
}

async function waitForStableLayout(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;

    const step = Math.max(500, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);

    const imageWait = Promise.all(
      Array.from(document.images).map(async (image) => {
        if (!image.complete) {
          await new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          });
        }
        if (typeof image.decode === "function") await image.decode().catch(() => undefined);
      }),
    );
    await Promise.race([imageWait, new Promise((resolve) => setTimeout(resolve, 10_000))]);
  });

  // Let lazy assets settle and source counters reach their final values.
  await page.waitForTimeout(2400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  let previousHeight = 0;
  let stableSamples = 0;
  for (let sample = 0; sample < 12 && stableSamples < 3; sample += 1) {
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    stableSamples = height === previousHeight ? stableSamples + 1 : 0;
    previousHeight = height;
    await page.waitForTimeout(200);
  }
}

async function collectMetrics(page) {
  return page.evaluate(() => {
    const rect = (element) => {
      if (!element) return null;
      const bounds = element.getBoundingClientRect();
      return {
        x: Math.round(bounds.x),
        y: Math.round(bounds.y + window.scrollY),
        width: Math.round(bounds.width),
        height: Math.round(bounds.height),
      };
    };
    const compactText = (value) => value.replace(/\s+/g, "").trim();
    const heading = (text) =>
      Array.from(document.querySelectorAll("h1, h2")).find(
        (element) => compactText(element.textContent) === compactText(text),
      );
    const visible = (selector) =>
      Array.from(document.querySelectorAll(selector)).find((element) => element.getBoundingClientRect().width > 0);
    const textElement = (selector, text) =>
      Array.from(document.querySelectorAll(selector)).find(
        (element) => compactText(element.textContent) === compactText(text),
      );
    const section = (text) => heading(text)?.closest("section");
    const style = (element) => {
      if (!element) return null;
      const computed = getComputedStyle(element);
      return {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        lineHeight: computed.lineHeight,
        letterSpacing: computed.letterSpacing,
      };
    };
    const lineCount = (element) => {
      if (!element) return null;
      const range = document.createRange();
      range.selectNodeContents(element);
      const lineTops = Array.from(range.getClientRects())
        .filter((bounds) => bounds.width > 0 && bounds.height > 0)
        .map((bounds) => Math.round(bounds.top));
      return new Set(lineTops).size;
    };

    const heroHeading = heading("Housing For Homeless Families With Children");
    const impactHeading = heading("Housing Families. Restoring Hope.");
    const causesHeading = heading("What We Do");
    const givingHeading = heading("How You Can Give");
    const firstCauseCard = causesHeading?.closest("section")?.querySelector("article");

    return {
      pathname: window.location.pathname,
      pageHeight: document.documentElement.scrollHeight,
      header: rect(document.querySelector("header")),
      logo: rect(visible("header img")),
      menuToggle: rect(visible("header button")),
      hero: rect(heroHeading?.closest("section")),
      heroHeading: rect(heroHeading),
      heroHeadingStyle: style(heroHeading),
      heroSubtitle: rect(heading("Our Vision")),
      heroText: rect(textElement("p", "Find, Feed & Restore is a Central Florida non-profit organization working to end homelessness for families with children through housing, financial literacy, and mental health counseling.")),
      heroDonationButton: rect(textElement("a", "Support Our Mission")),
      heroVideoButton: rect(textElement("a", "Watch Video")),
      impact: rect(section("Housing Families. Restoring Hope.")),
      impactHeading: rect(impactHeading),
      causes: rect(section("What We Do")),
      causesHeading: rect(causesHeading),
      firstCauseCard: rect(firstCauseCard),
      giving: rect(section("How You Can Give")),
      givingHeading: rect(givingHeading),
      footer: rect(document.querySelector("footer")),
      footerQuickHeading: rect(textElement("footer h2", "Quick Links")),
      footerProgramsHeading: rect(textElement("footer h2", "Our Programs")),
      footerContactHeading: rect(textElement("footer h2", "Contact Info")),
      footerSupportHeading: rect(textElement("footer h2", "Support Our Mission")),
      footerSeal: rect(visible('footer img[alt*="Candid"], footer img[alt*="Platinum"]')),
      footerLogo: rect(visible('footer img[alt="Find Feed Restore"]')),
      footerCopyright: rect(
        textElement(
          "footer p, footer div",
          `Copyright © ${new Date().getFullYear()}. Find Feed & Restore. Terms & Conditions`,
        ),
      ),
      floatingDonate: rect(document.querySelector('a[aria-label="Donate now"], .givewp-donation-widget-button')),
      headings: Array.from(document.querySelectorAll("h1, h2, h3")).map((element) => ({
        text: element.textContent?.replace(/\s+/g, " ").trim(),
        rect: rect(element),
        style: style(element),
        lineCount: lineCount(element),
      })),
      media: Array.from(
        document.querySelectorAll(
          "main iframe, main video, [data-elementor-type='wp-page'] iframe, [data-elementor-type='wp-page'] video",
        ),
      ).map((element) => ({
        tagName: element.tagName.toLowerCase(),
        rect: rect(element),
        src: element.getAttribute("src"),
        title: element.getAttribute("title"),
        loading: element.getAttribute("loading"),
        allow: element.getAttribute("allow"),
        allowFullscreen: element.hasAttribute("allowfullscreen"),
        controls: element.hasAttribute("controls"),
        autoplay: element.hasAttribute("autoplay"),
        muted: element.hasAttribute("muted"),
        loop: element.hasAttribute("loop"),
        playsInline: element.hasAttribute("playsinline"),
      })),
      articles: Array.from(
        document.querySelectorAll("main article, [data-elementor-type='wp-page'] article"),
      ).map((element) => ({
        rect: rect(element),
        paragraph: rect(element.querySelector("p")),
        paragraphStyle: style(element.querySelector("p")),
        link: rect(element.querySelector("a")),
      })),
      mainSections: Array.from(
        document.querySelectorAll("main > section, [data-elementor-type='wp-page'] .elementor-widget-html > .elementor-widget-container > section"),
      ).map((element) => rect(element)),
    };
  });
}

async function capture(page, url, filename) {
  const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
  if (!response?.ok()) throw new Error(`${url} returned HTTP ${response?.status() ?? "unknown"}`);

  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => undefined);
  await waitForStableLayout(page);
  await page.screenshot({ path: filename, fullPage: true, animations: "disabled" });
  return collectMetrics(page);
}

async function normalizeImage(filename, width, height) {
  const flattened = await sharp(filename)
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width,
      height,
      channels: 4,
      background: "#ffffff",
    },
  })
    .composite([{ input: flattened, top: 0, left: 0 }])
    .ensureAlpha()
    .raw()
    .toBuffer();
}

async function createComparison(width, productionPath, localPath) {
  const productionMeta = await sharp(productionPath).metadata();
  const localMeta = await sharp(localPath).metadata();
  const canvasWidth = Math.max(productionMeta.width, localMeta.width);
  const canvasHeight = Math.max(productionMeta.height, localMeta.height);
  const [production, local] = await Promise.all([
    normalizeImage(productionPath, canvasWidth, canvasHeight),
    normalizeImage(localPath, canvasWidth, canvasHeight),
  ]);

  const overlay = Buffer.alloc(production.length);
  const difference = Buffer.alloc(production.length);
  let absoluteDifference = 0;
  let changedPixels = 0;

  for (let index = 0; index < production.length; index += 4) {
    let pixelChanged = false;
    for (let channel = 0; channel < 3; channel += 1) {
      const delta = Math.abs(production[index + channel] - local[index + channel]);
      overlay[index + channel] = Math.round((production[index + channel] + local[index + channel]) / 2);
      difference[index + channel] = Math.min(255, delta * 3);
      absoluteDifference += delta;
      if (delta > 16) pixelChanged = true;
    }
    overlay[index + 3] = 255;
    difference[index + 3] = 255;
    if (pixelChanged) changedPixels += 1;
  }

  await Promise.all([
    sharp(overlay, { raw: { width: canvasWidth, height: canvasHeight, channels: 4 } })
      .png()
      .toFile(path.join(outputDirectory, `overlay-${width}.png`)),
    sharp(difference, { raw: { width: canvasWidth, height: canvasHeight, channels: 4 } })
      .png()
      .toFile(path.join(outputDirectory, `difference-${width}.png`)),
    sharp({
      create: {
        width: canvasWidth * 2,
        height: canvasHeight,
        channels: 4,
        background: "#ffffff",
      },
    })
      .composite([
        { input: productionPath, left: 0, top: 0 },
        { input: localPath, left: canvasWidth, top: 0 },
      ])
      .png()
      .toFile(path.join(outputDirectory, `side-by-side-${width}.png`)),
  ]);

  const totalPixels = canvasWidth * canvasHeight;
  return {
    width,
    productionHeight: productionMeta.height,
    localHeight: localMeta.height,
    meanAbsoluteChannelDifference: Number((absoluteDifference / (totalPixels * 3)).toFixed(3)),
    changedPixelPercentage: Number(((changedPixels / totalPixels) * 100).toFixed(3)),
  };
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  const executablePath = await findChrome();
  const browser = await chromium.launch({ executablePath, headless: true });
  const results = [];

  try {
    for (const width of widths) {
      const context = await browser.newContext({
        viewport: { width, height: viewportHeight },
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
        colorScheme: "light",
      });
      const page = await context.newPage();
      const productionPath = path.join(outputDirectory, `production-${width}.png`);
      const localPath = path.join(outputDirectory, `local-${width}.png`);

      console.log(`Capturing ${width}px production ${route}…`);
      const productionMetrics = await capture(page, productionUrl, productionPath);
      console.log(`Capturing ${width}px local ${route}…`);
      const localMetrics = await capture(page, localUrl, localPath);
      results.push({
        ...(await createComparison(width, productionPath, localPath)),
        productionMetrics,
        localMetrics,
      });
      await context.close();
    }
  } finally {
    await browser.close();
  }

  await writeFile(path.join(outputDirectory, resultFilename), `${JSON.stringify(results, null, 2)}\n`);
  console.table(results);
  console.log(`Visual QA artifacts written to ${outputDirectory}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
