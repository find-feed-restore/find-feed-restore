import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";

const canonicalRoutes = [
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

const redirects = [
  { source: "/terms", destination: "/terms-conditions" },
  { source: "/trailer-ministry", destination: "/we-need-trailers" },
  { source: "/news", destination: "/news-media" },
  { source: "/about-us", destination: "/board-staff" },
];

const notFoundRoutes = [
  "/definitely-not-a-real-page-certification/",
  "/terms-and-conditions/",
  "/wp-admin/",
  "/wp-login.php",
];

const sharedBreakpointWidths = [1231, 1230, 1181, 1180, 1025, 1024, 901, 900, 768, 767];
const sourceMatchedBreakpointOverflow = {
  "/board-staff/": new Set([1231, 1230, 1181, 1180, 768, 767]),
};

const baseUrl = process.env.CERTIFICATION_LOCAL_URL ?? "http://localhost:3002/";
const productionOrigin = "https://www.findfeedrestore.com";
const outputPath = path.resolve(".visual-qa/certification/crawl.json");
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

function normalizePathname(pathname) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function expectedCanonical(route) {
  return `${productionOrigin}${route}`;
}

function isProviderMessage(entry) {
  return /juicer|youtube|googlevideo|doubleclick|instagram|facebook|gstatic|typeform|kindful/i.test(
    `${entry.text ?? ""} ${entry.url ?? ""}`,
  );
}

async function traceRedirect(request, source) {
  const hops = [];
  let current = new URL(source, baseUrl).href;

  for (let index = 0; index < 8; index += 1) {
    const response = await request.get(current, { maxRedirects: 0 });
    const status = response.status();
    const location = response.headers().location ?? null;
    hops.push({ url: current, status, location });
    if (status < 300 || status >= 400 || !location) break;
    current = new URL(location, current).href;
  }

  return {
    source,
    hops,
    finalStatus: hops.at(-1)?.status ?? null,
    finalPath: new URL(hops.at(-1)?.url ?? current).pathname,
  };
}

async function main() {
  const browser = await chromium.launch({
    executablePath: await findChrome(),
    headless: true,
    args: ["--mute-audio"],
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const request = context.request;
  const results = [];
  const allInternalPaths = new Set();
  const externalOrigins = new Set();

  try {
    for (const route of canonicalRoutes) {
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      const failedLocalResponses = [];
      const failedLocalRequests = [];

      page.on("console", (message) => {
        if (message.type() !== "error") return;
        const location = message.location();
        consoleErrors.push({ text: message.text(), url: location.url || null });
      });
      page.on("pageerror", (error) => pageErrors.push(error.message));
      page.on("response", (response) => {
        const url = new URL(response.url());
        if (url.origin === new URL(baseUrl).origin && response.status() >= 400) {
          failedLocalResponses.push({ url: url.pathname, status: response.status() });
        }
      });
      page.on("requestfailed", (requestItem) => {
        const url = new URL(requestItem.url());
        const error = requestItem.failure()?.errorText ?? null;
        if (url.origin === new URL(baseUrl).origin && error !== "net::ERR_ABORTED") {
          failedLocalRequests.push({ url: url.pathname, error });
        }
      });

      const response = await page.goto(new URL(route, baseUrl).href, {
        waitUntil: "domcontentloaded",
        timeout: 60_000,
      });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(route === "/hope-in-action/" ? 3_000 : 500);

      const desktop = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      const documentState = await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll("main h1, main h2, main h3, main h4, main h5, main h6"))
          .map((heading) => ({ level: Number(heading.tagName.slice(1)), text: heading.textContent?.trim() ?? "" }));
        const headingJumps = headings
          .slice(1)
          .filter((heading, index) => heading.level > headings[index].level + 1)
          .map((heading) => heading.text);
        const links = Array.from(document.querySelectorAll("a[href]")).map((link) => ({
          href: link.getAttribute("href"),
          absolute: link.href,
          text: link.textContent?.trim() ?? "",
          region: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "main",
        }));
        const missingAlt = Array.from(document.querySelectorAll("img:not([alt])")).map((image) => image.currentSrc);
        const decorativeImages = document.querySelectorAll('img[alt=""]').length;
        const unlabeledControls = Array.from(document.querySelectorAll("input:not([type='hidden']), select, textarea, button"))
          .filter((control) => {
            if (control.disabled || control.closest("[aria-hidden='true']")) return false;
            if (control.getAttribute("aria-label") || control.getAttribute("aria-labelledby")) return false;
            if (control.tagName === "BUTTON" && control.textContent?.trim()) return false;
            if (control.id && document.querySelector(`label[for="${CSS.escape(control.id)}"]`)) return false;
            return !control.closest("label");
          })
          .map((control) => `${control.tagName.toLowerCase()}#${control.id || "(none)"}`);
        const fragmentErrors = links
          .filter((link) => link.href?.startsWith("#") && link.href !== "#")
          .filter((link) => !document.getElementById(decodeURIComponent(link.href.slice(1))))
          .map((link) => link.href);
        return {
          title: document.title,
          descriptions: Array.from(document.querySelectorAll('meta[name="description"]')).map((meta) => meta.content),
          canonicals: Array.from(document.querySelectorAll('link[rel="canonical"]')).map((link) => link.href),
          robots: document.querySelector('meta[name="robots"]')?.content ?? null,
          openGraph: Object.fromEntries(
            Array.from(document.querySelectorAll('meta[property^="og:"]')).map((meta) => [meta.getAttribute("property"), meta.content]),
          ),
          structuredData: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((script) => script.textContent),
          headerCount: document.querySelectorAll("body > header, header[class*='siteHeader']").length,
          footerCount: document.querySelectorAll("footer").length,
          h1Count: headings.filter((heading) => heading.level === 1).length,
          headings,
          headingJumps,
          links,
          missingAlt,
          decorativeImages,
          unlabeledControls,
          fragmentErrors,
          focusableCount: document.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], iframe").length,
        };
      });

      for (const link of documentState.links) {
        if (!link.absolute || /^(mailto:|tel:|javascript:)/i.test(link.absolute)) continue;
        const target = new URL(link.absolute);
        if (target.origin === new URL(baseUrl).origin) {
          allInternalPaths.add(`${target.pathname}${target.search}`);
        } else {
          externalOrigins.add(target.origin);
        }
      }

      const sharedBreakpoints = [];
      for (const width of sharedBreakpointWidths) {
        await page.setViewportSize({ width, height: 900 });
        await page.waitForTimeout(75);
        sharedBreakpoints.push(await page.evaluate((viewportWidth) => {
          const visible = (selector) => {
            const element = document.querySelector(selector);
            return element ? getComputedStyle(element).display !== "none" : false;
          };
          const footerSections = Array.from(document.querySelectorAll("footer section")).map((section) => {
            const bounds = section.getBoundingClientRect();
            return { left: Math.round(bounds.left), right: Math.round(bounds.right), top: Math.round(bounds.top) };
          });
          return {
            width: viewportWidth,
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            headers: {
              desktop: visible('header[class*="siteHeader"] > div[class*="desktopHeader"]'),
              tablet: visible('header[class*="siteHeader"] > div[class*="tabletHeader"]'),
              mobile: visible('header[class*="siteHeader"] > div[class*="mobileHeader"]'),
            },
            footerSections,
          };
        }, width));
      }

      await page.setViewportSize({ width: 390, height: 900 });
      await page.waitForTimeout(250);
      const mobile = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      const siteConsoleErrors = consoleErrors.filter((entry) => !isProviderMessage(entry));
      results.push({
        route,
        status: response?.status() ?? null,
        finalUrl: page.url(),
        desktop,
        mobile,
        sharedBreakpoints,
        ...documentState,
        consoleErrors,
        siteConsoleErrors,
        pageErrors,
        failedLocalResponses,
        failedLocalRequests,
      });
      await page.close();
    }

    const linkResults = [];
    for (const internalPath of [...allInternalPaths].sort()) {
      const response = await request.get(new URL(internalPath, baseUrl).href, { maxRedirects: 0 });
      linkResults.push({
        path: internalPath,
        status: response.status(),
        location: response.headers().location ?? null,
      });
    }

    const redirectResults = [];
    for (const redirect of redirects) {
      const trace = await traceRedirect(request, redirect.source);
      redirectResults.push({ ...redirect, ...trace });
    }

    const notFoundResults = [];
    for (const route of notFoundRoutes) {
      const response = await request.get(new URL(route, baseUrl).href);
      notFoundResults.push({ route, status: response.status() });
    }

    const titles = results.map((result) => result.title);
    const duplicateTitles = titles.filter((title, index) => titles.indexOf(title) !== index);
    const summary = {
      canonicalRouteCount: canonicalRoutes.length,
      routeFailures: results.filter((result) =>
        result.status !== 200 ||
        result.headerCount !== 1 ||
        result.footerCount !== 1 ||
        result.h1Count !== 1 ||
        result.canonicals.length !== 1 ||
        result.canonicals[0] !== expectedCanonical(result.route) ||
        !result.title ||
        result.robots?.includes("noindex") ||
        result.desktop.scrollWidth !== result.desktop.clientWidth ||
        result.mobile.scrollWidth !== result.mobile.clientWidth ||
        result.sharedBreakpoints.some((breakpoint) => {
          const expectedHeader = breakpoint.width >= 1025
            ? "desktop"
            : breakpoint.width >= 768
              ? "tablet"
              : "mobile";
          const overflowIsSourceMatched = sourceMatchedBreakpointOverflow[result.route]?.has(breakpoint.width);
          return (breakpoint.scrollWidth !== breakpoint.clientWidth && !overflowIsSourceMatched) ||
            Object.entries(breakpoint.headers).some(([name, visible]) => visible !== (name === expectedHeader));
        }) ||
        result.siteConsoleErrors.length > 0 ||
        result.pageErrors.length > 0 ||
        result.failedLocalResponses.length > 0 ||
        result.failedLocalRequests.length > 0 ||
        result.missingAlt.length > 0 ||
        result.unlabeledControls.length > 0 ||
        result.fragmentErrors.length > 0
      ).map((result) => result.route),
      duplicateTitles,
      descriptionsMissing: results.filter((result) => result.descriptions.length === 0).map((result) => result.route),
      openGraphDescriptionsMissing: results.filter((result) => !result.openGraph["og:description"]).map((result) => result.route),
      internalLinkFailures: linkResults.filter((result) => result.status >= 400),
      internalRedirectLinks: linkResults.filter((result) => result.status >= 300 && result.status < 400),
      accidentalLocalhostLinks: linkResults.filter((result) => /localhost|127\.0\.0\.1/.test(result.path)),
      insecureExternalLinks: results.flatMap((result) => result.links
        .filter((link) => link.absolute?.startsWith("http://") && !link.absolute.startsWith(baseUrl))
        .map((link) => ({ route: result.route, href: link.href, text: link.text, region: link.region }))),
      redirectFailures: redirectResults.filter((result) =>
        result.finalStatus !== 200 ||
        normalizePathname(result.finalPath) !== normalizePathname(result.destination) ||
        result.hops.length !== 2 ||
        ![301, 308].includes(result.hops[0]?.status)
      ).map((result) => result.source),
      notFoundFailures: notFoundResults.filter((result) => result.status !== 404),
      breakpointWarnings: results.flatMap((result) => result.sharedBreakpoints
        .filter((breakpoint) => breakpoint.scrollWidth !== breakpoint.clientWidth)
        .map((breakpoint) => ({
          route: result.route,
          width: breakpoint.width,
          clientWidth: breakpoint.clientWidth,
          scrollWidth: breakpoint.scrollWidth,
          sourceMatched: Boolean(sourceMatchedBreakpointOverflow[result.route]?.has(breakpoint.width)),
        }))),
    };

    const report = {
      generatedAt: new Date().toISOString(),
      baseUrl,
      canonicalRoutes,
      summary,
      routes: results,
      links: linkResults,
      redirects: redirectResults,
      notFound: notFoundResults,
      externalOrigins: [...externalOrigins].sort(),
    };

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    console.table(results.map((result) => ({
      route: result.route,
      http: result.status,
      canonical: result.canonicals.length === 1 && result.canonicals[0] === expectedCanonical(result.route),
      title: Boolean(result.title),
      description: result.descriptions.length === 1,
      headerFooter: result.headerCount === 1 && result.footerCount === 1,
      h1: result.h1Count,
      overflow: result.desktop.scrollWidth !== result.desktop.clientWidth || result.mobile.scrollWidth !== result.mobile.clientWidth,
      siteErrors: result.siteConsoleErrors.length + result.pageErrors.length,
      assetErrors: result.failedLocalResponses.length + result.failedLocalRequests.length,
    })));
    console.log(JSON.stringify(summary, null, 2));
    if (
      summary.routeFailures.length ||
      summary.duplicateTitles.length ||
      summary.internalLinkFailures.length ||
      summary.accidentalLocalhostLinks.length ||
      summary.insecureExternalLinks.length ||
      summary.redirectFailures.length ||
      summary.notFoundFailures.length
    ) {
      process.exitCode = 1;
    }
  } finally {
    await context.close();
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
