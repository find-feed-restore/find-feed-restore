import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = process.env.VISUAL_QA_LOCAL_URL ?? "http://localhost:3002/";
const canonicalUrl = new URL("/terms-conditions/", baseUrl).href;
const outputPath = path.resolve(".visual-qa/routes/terms-conditions/legal-interactions.json");
const chromeCandidates = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const expectedIntro = "Welcome to Find, Feed, Restore (“we,” “our,” or “us”). By accessing and using our website (the “Site”), you agree to comply with and be bound by these Terms and Conditions (“Terms”). If you do not agree with these Terms, please do not use our Site.";
const expectedHeadings = [
  "Use of the Site",
  "Intellectual Property",
  "Third-Party Links",
  "Privacy Policy",
  "Disclaimers and Limitation of Liability",
  "Changes to These Terms",
  "Contact Us",
];
const expectedItems = [
  "You must use this Site only for lawful purposes and in accordance with these Terms.",
  "You agree not to misuse or attempt to disrupt the Site’s functionality.",
  "Unauthorized use of this Site may result in legal action.",
  "All content on this Site, including text, images, logos, and designs, is owned by Find, Feed, Restore and protected by copyright and trademark laws.",
  "You may not copy, modify, or distribute any content from this Site without our prior written consent.",
  "Our Site may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of those sites.",
  "The inclusion of any link does not imply endorsement by Find, Feed, Restore.",
  "Your use of our Site is also governed by our Privacy Policy, which explains how we collect, use, and protect your information.",
  "The Site is provided on an “as-is” and “as-available” basis. We make no warranties regarding the Site’s functionality, accuracy, or reliability.",
  "To the fullest extent permitted by law, Find, Feed, Restore is not liable for any direct, indirect, incidental, or consequential damages arising from the use of this Site.",
  "We reserve the right to update or modify these Terms at any time. Continued use of the Site after changes constitutes acceptance of the updated Terms.",
  "If you have any questions about these Terms, please contact us at: info@findfeedrestore.com",
];

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

async function main() {
  const browser = await chromium.launch({ executablePath: await findChrome(), headless: true, args: ["--mute-audio"] });
  const checks = [];
  const check = (name, passed, details) => checks.push({ name, passed, details });

  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const response = await page.goto(canonicalUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
    check("canonical Terms route returns 200", response?.status() === 200, response?.status());

    const canonicalContract = await page.evaluate(() => ({
      canonicals: Array.from(document.querySelectorAll('link[rel="canonical"]')).map((link) => link.href),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? null,
    }));
    check(
      "one indexable production canonical",
      JSON.stringify(canonicalContract.canonicals) === JSON.stringify(["https://www.findfeedrestore.com/terms-conditions/"]) &&
        !canonicalContract.robots?.includes("noindex"),
      canonicalContract,
    );

    const headingContract = {
      h1: await page.locator("main h1").allTextContents(),
      h2: (await page.locator("main h2").allTextContents()).map((text) => text.trim()),
      deeper: await page.locator("main h3, main h4, main h5, main h6").count(),
    };
    check(
      "legal heading hierarchy",
      JSON.stringify(headingContract.h1) === JSON.stringify(["Terms & Conditions"]) &&
        JSON.stringify(headingContract.h2) === JSON.stringify(expectedHeadings) &&
        headingContract.deeper === 0,
      headingContract,
    );

    const copyContract = await page.evaluate(() => {
      const main = document.querySelector("main");
      const lists = Array.from(main?.querySelectorAll("section[aria-label='Terms and Conditions'] li p") ?? []);
      const intro = main?.querySelector("section[aria-label='Terms and Conditions'] > div > div")?.textContent?.trim() ?? "";
      return { intro, items: lists.map((item) => item.textContent.trim()) };
    });
    check(
      "legal copy matches production",
      copyContract.intro === expectedIntro && JSON.stringify(copyContract.items) === JSON.stringify(expectedItems),
      copyContract,
    );

    const linkContract = await page.evaluate(() => ({
      mainLinks: document.querySelectorAll("main a").length,
      canonicalFooterLinks: document.querySelectorAll('footer a[href="/terms-conditions"], footer a[href="/terms-conditions/"]').length,
      legacyInternalLinks: document.querySelectorAll('a[href="/terms"], a[href="/terms/"]').length,
    }));
    check(
      "production-supported legal and internal link contract",
      linkContract.mainLinks === 0 && linkContract.canonicalFooterLinks === 1 && linkContract.legacyInternalLinks === 0,
      linkContract,
    );

    const request = context.request;
    const terms = await request.get(new URL("/terms", baseUrl).href, { maxRedirects: 0 });
    const termsSlash = await request.get(new URL("/terms/", baseUrl).href, { maxRedirects: 0 });
    const canonicalNoSlash = await request.get(new URL("/terms-conditions", baseUrl).href, { maxRedirects: 0 });
    const aliasContract = {
      terms: { status: terms.status(), location: terms.headers().location },
      termsSlash: { status: termsSlash.status(), location: termsSlash.headers().location },
      canonicalNoSlash: { status: canonicalNoSlash.status(), location: canonicalNoSlash.headers().location },
    };
    check(
      "legacy alias redirects without a loop",
      aliasContract.terms.status === 308 &&
        aliasContract.terms.location === "/terms-conditions" &&
        aliasContract.termsSlash.status === 308 &&
        aliasContract.termsSlash.location === "/terms" &&
        aliasContract.canonicalNoSlash.status === 200,
      aliasContract,
    );

    await page.setViewportSize({ width: 390, height: 900 });
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    check("Terms has no mobile overflow", overflow.scrollWidth === overflow.clientWidth, overflow);
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
