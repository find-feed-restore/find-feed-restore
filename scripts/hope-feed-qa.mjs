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
  await page.goto(routeUrl, { waitUntil: "networkidle", timeout: 60_000 });
  await page.locator('[data-provider="instagram"][data-provider-state="ready"]').waitFor({
    state: "visible",
    timeout: 20_000,
  });
  await page.locator('[data-media-type]').first().waitFor({ state: "visible", timeout: 10_000 });
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
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await loadFeed(page);

    const providerContract = await page.evaluate(() => ({
      providers: document.querySelectorAll('[data-provider="instagram"]').length,
      initialCards: document.querySelectorAll('[data-media-type]').length,
      loadMore: [...document.querySelectorAll("button")].find((button) => button.textContent?.trim() === "Load More")?.textContent?.trim(),
      juicerScripts: document.querySelectorAll('script[src*="juicer.io"]').length,
      juicerFeeds: document.querySelectorAll(".juicer-feed").length,
      states: [...document.querySelectorAll('[data-provider="instagram"]')].map((node) => node.getAttribute("data-provider-state")),
    }));
    check(
      "Native Instagram feed renders without Juicer",
      providerContract.providers === 1 &&
        providerContract.initialCards === 16 &&
        providerContract.loadMore === "Load More" &&
        providerContract.juicerScripts === 0 &&
        providerContract.juicerFeeds === 0 &&
        providerContract.states[0] === "ready",
      providerContract,
    );

    const linkContracts = await page.locator('[data-media-type] > a').evaluateAll((links) => links.map((link) => ({
      href: link.getAttribute("href"),
      target: link.getAttribute("target"),
      rel: link.getAttribute("rel"),
    })));
    const firstLink = page.locator('[data-media-type] > a').first();
    await firstLink.focus();
    check(
      "Post permalinks open safely and are keyboard focusable",
      linkContracts.length === 16 &&
        linkContracts.every((link) => link.href?.startsWith("https://www.instagram.com/") && link.target === "_blank" && link.rel === "noopener noreferrer") &&
        await firstLink.evaluate((link) => document.activeElement === link),
      { links: linkContracts.length, first: linkContracts[0] },
    );

    const mediaContract = await page.locator('[data-media-type] > a > div:first-child').evaluateAll((media) => media.map((element) => {
      const mediaRect = element.getBoundingClientRect();
      const cardRect = element.closest("li")?.getBoundingClientRect();
      return {
        contained: Boolean(cardRect) && mediaRect.left >= cardRect.left - 1 && mediaRect.right <= cardRect.right + 1,
        width: Math.round(mediaRect.width),
        height: Math.round(mediaRect.height),
      };
    }));
    check(
      "Instagram media remains square and contained",
      mediaContract.length === 16 && mediaContract.every((media) => media.contained && Math.abs(media.width - media.height) <= 1),
      mediaContract.slice(0, 4),
    );

    await page.getByRole("button", { name: "Load More" }).click();
    await page.locator('[data-media-type]').nth(23).waitFor({ state: "visible" });
    const loadMoreContract = {
      cards: await page.locator('[data-media-type]').count(),
      buttonRemaining: await page.getByRole("button", { name: "Load More" }).count(),
    };
    check("Load More reveals the bounded cached result", loadMoreContract.cards === 24 && loadMoreContract.buttonRemaining === 0, loadMoreContract);

    const breakpointExpectations = [
      [757, 1], [758, 2],
      [1017, 2], [1018, 3],
      [1217, 3], [1218, 4],
    ];
    const breakpointResults = [];
    for (const [width, expectedColumns] of breakpointExpectations) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(100);
      const result = await page.locator('ul[aria-label="Find Feed Restore Instagram posts"]').evaluate((grid) => ({
        columns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
        containerWidth: Math.round(grid.getBoundingClientRect().width),
      }));
      breakpointResults.push({ width, expectedColumns, ...result });
    }
    check(
      "Native feed preserves certified container-query breakpoints",
      breakpointResults.every((result) => result.columns === result.expectedColumns),
      breakpointResults,
    );

    const mobileWidths = [430, 390, 375, 360, 320];
    const mobileResults = [];
    for (const width of mobileWidths) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(80);
      mobileResults.push(await page.evaluate((viewportWidth) => ({
        width: viewportWidth,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        columns: getComputedStyle(document.querySelector('ul[aria-label="Find Feed Restore Instagram posts"]')).gridTemplateColumns.split(" ").length,
      }), width));
    }
    check(
      "Mobile feed is single-column without horizontal overflow",
      mobileResults.every((result) => result.scrollWidth === result.clientWidth && result.columns === 1),
      mobileResults,
    );

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole("link", { name: "Home", exact: true }).first().click();
    await page.waitForURL((url) => url.pathname === "/");
    await page.goBack({ waitUntil: "networkidle" });
    await page.locator('[data-provider="instagram"][data-provider-state="ready"]').waitFor({ state: "visible" });
    const remountContract = await page.evaluate(() => ({
      providers: document.querySelectorAll('[data-provider="instagram"]').length,
      cards: document.querySelectorAll('[data-media-type]').length,
      juicerScripts: document.querySelectorAll('script[src*="juicer.io"]').length,
    }));
    check("Client navigation remount remains singular", remountContract.providers === 1 && remountContract.cards === 16 && remountContract.juicerScripts === 0, remountContract);
    check("No client page errors", pageErrors.length === 0, pageErrors);
    await context.close();
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
