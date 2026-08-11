import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = process.env.VISUAL_QA_LOCAL_URL ?? "http://localhost:3002/";
const routeUrl = new URL("/hope-in-action/", baseUrl).href;
const outputPath = path.resolve(".visual-qa/routes/hope-in-action/feed-interactions.json");
const chromeCandidates = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
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
  throw new Error("No supported Chrome/Chromium executable was found.");
}

async function loadFeed(page) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await page.goto(routeUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
    const loaded = await page.locator(".jcr-post").first().waitFor({ state: "attached", timeout: 20_000 })
      .then(() => true)
      .catch(() => false);
    if (loaded) return;
  }
  throw new Error("Juicer feed did not load after three attempts.");
}

async function main() {
  const browser = await chromium.launch({
    executablePath: await findChrome(),
    headless: true,
    args: ["--mute-audio"],
  });
  const checks = [];
  const check = (name, passed, details) => checks.push({ name, passed, details });

  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await loadFeed(page);

    const providerContract = await page.evaluate(() => {
      const feed = document.querySelector('.juicer-feed[data-feed-id="findfeedrestore"]');
      return {
        feedNodes: document.querySelectorAll('ul.juicer-feed[data-feed-id="findfeedrestore"]').length,
        loaderScripts: document.querySelectorAll('script[src="https://www.juicer.io/embed/findfeedrestore/embed-code.js"]').length,
        runtimeScripts: document.querySelectorAll('script[src*="www.juicer.io/embed_juicer20-"]').length,
        loaded: feed?.getAttribute("data-jcr-loaded"),
        claimed: feed?.getAttribute("data-juicer-claimed"),
        cards: feed?.querySelectorAll(".jcr-post").length,
        loadMore: feed?.querySelector(".jcr-load-more")?.textContent?.trim(),
      };
    });
    check(
      "Juicer feed loads once",
      providerContract.feedNodes === 1 &&
        providerContract.loaderScripts === 1 &&
        providerContract.runtimeScripts === 1 &&
        providerContract.loaded === "true" &&
        providerContract.claimed === "true" &&
        providerContract.cards >= 1,
      providerContract,
    );
    check("Juicer Load More control", providerContract.loadMore === "Load More", providerContract.loadMore);

    const readMore = page.locator(".j-read-more").first();
    const linkContract = await readMore.evaluate((link) => ({
      href: link.getAttribute("href"),
      target: link.getAttribute("target"),
      rel: link.getAttribute("rel"),
    }));
    await readMore.focus();
    check(
      "Juicer external post link and keyboard focus",
      linkContract.href?.startsWith("https://www.instagram.com/") &&
        linkContract.target === "_blank" &&
        linkContract.rel === "noopener noreferrer" &&
        (await readMore.evaluate((link) => document.activeElement === link)),
      linkContract,
    );

    const mediaContract = await page.locator(".jcr-post-media").evaluateAll((media) => media.slice(0, 16).map((element) => {
      const mediaRect = element.getBoundingClientRect();
      const cardRect = element.closest(".jcr-post")?.getBoundingClientRect();
      return {
        contained: Boolean(cardRect) && mediaRect.left >= cardRect.left - 1 && mediaRect.right <= cardRect.right + 1,
        width: Math.round(mediaRect.width),
        cardWidth: Math.round(cardRect?.width ?? 0),
      };
    }));
    check(
      "Juicer media remains contained",
      mediaContract.length >= 1 && mediaContract.every((media) => media.contained && media.width <= media.cardWidth + 2),
      mediaContract,
    );

    const breakpointExpectations = [
      [757, 1], [758, 2],
      [1017, 2], [1018, 3],
      [1217, 3], [1218, 4],
    ];
    const breakpointResults = [];
    for (const [width, expectedColumns] of breakpointExpectations) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(100);
      const result = await page.locator(".jcr-feed-grid").evaluate((grid) => ({
        columns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
        containerWidth: Math.round(grid.parentElement?.getBoundingClientRect().width ?? 0),
      }));
      breakpointResults.push({ width, expectedColumns, ...result });
    }
    check(
      "Juicer container-query breakpoints",
      breakpointResults.every((result) => result.columns === result.expectedColumns),
      breakpointResults,
    );

    await page.setViewportSize({ width: 390, height: 900 });
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    check("Hope In Action has no mobile overflow", overflow.scrollWidth === overflow.clientWidth, overflow);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole("link", { name: "Home", exact: true }).first().click();
    await page.waitForURL((url) => url.pathname === "/");
    await page.goBack({ waitUntil: "domcontentloaded" });
    await page.locator(".jcr-post").first().waitFor({ state: "attached", timeout: 20_000 });
    const remountContract = await page.evaluate(() => ({
      feeds: document.querySelectorAll('ul.juicer-feed[data-feed-id="findfeedrestore"]').length,
      loaders: document.querySelectorAll('script[src="https://www.juicer.io/embed/findfeedrestore/embed-code.js"]').length,
      runtimes: document.querySelectorAll('script[src*="www.juicer.io/embed_juicer20-"]').length,
      cards: document.querySelectorAll(".jcr-post").length,
    }));
    check(
      "Juicer remount does not duplicate initialization",
      remountContract.feeds === 1 && remountContract.loaders === 1 && remountContract.runtimes === 1 && remountContract.cards >= 1,
      remountContract,
    );
    await context.close();

    const failureContext = await browser.newContext({ viewport: { width: 390, height: 900 } });
    const failurePage = await failureContext.newPage();
    await failurePage.route("**/embed/findfeedrestore/embed-code.js", (route) => route.abort("failed"));
    await failurePage.goto(routeUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
    const fallback = failurePage.getByText("Social updates are temporarily unavailable.");
    await fallback.waitFor({ state: "visible", timeout: 10_000 });
    const failureContract = {
      fallbackVisible: await fallback.isVisible(),
      instagramHref: await failurePage.getByRole("link", { name: "Visit Find Feed Restore on Instagram" }).getAttribute("href"),
      mainVisible: await failurePage.locator("main").isVisible(),
      pageErrors: [],
    };
    check(
      "Blocked Juicer script fails gracefully",
      failureContract.fallbackVisible && failureContract.mainVisible && failureContract.instagramHref === "https://www.instagram.com/findfeedrestore",
      failureContract,
    );
    await failureContext.close();
  } finally {
    await browser.close();
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(checks, null, 2)}\n`);
  console.table(checks);
  if (checks.some((item) => !item.passed)) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
