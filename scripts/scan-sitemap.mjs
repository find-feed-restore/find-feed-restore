// Crawls the site from the homepage and rewrites src/data/sitemap-pages.json,
// which src/app/sitemap.xml/route.ts and the /sitemap/ page publish. Run against a production build:
//   npm run build && npm run start   # in another terminal
//   npm run sitemap:scan
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3000";
const productionOrigin = "https://www.findfeedrestore.com";
const outputFile = path.resolve("src/data/sitemap-pages.json");

const decode = (value) =>
  value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&#39;", "'");

function internalPath(href) {
  if (!href.startsWith("/") || href.startsWith("//")) return null;
  const pathname = new URL(href, baseUrl).pathname;
  if (/^\/(_next|images|fonts|api)\//.test(pathname) || /\.[a-z0-9]+$/i.test(pathname)) return null;
  return pathname;
}

function localImage(source) {
  const url = new URL(decode(source), baseUrl);
  const pathname =
    url.pathname.replace(/\/$/, "") === "/_next/image" ? new URL(url.searchParams.get("url") ?? "", baseUrl).pathname : url.pathname;
  // Phone-size hero files duplicate the desktop ones, so only the desktop file is listed.
  if (/^\/images\/backgrounds\/.+-mobile\.webp$/.test(pathname)) return null;
  return pathname.startsWith("/images/") && !pathname.endsWith(".svg") ? pathname : null;
}

function pageImages(html) {
  const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
  const sources = [
    ...[...html.matchAll(/<link[^>]+rel="preload"[^>]+as="image"[^>]*>/g)].map((m) => m[0].match(/href="([^"]+)"/)?.[1]),
    ...[...main.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]),
    ...[...main.matchAll(/url\((?:&quot;|")?([^"&)]+)(?:&quot;|")?\)/g)].map((m) => m[1]),
  ].filter(Boolean);
  return [...new Set(sources.map(localImage).filter(Boolean))];
}

function sourceFiles(route) {
  const pageFile = route === "/" ? "src/app/page.tsx" : `src/app${route}page.tsx`;
  const files = [route === "/" ? pageFile : path.dirname(pageFile)];
  for (const [, kind, name] of readFileSync(pageFile, "utf8").matchAll(/from "@\/(components|data)\/([\w-]+)"/g)) {
    for (const extension of kind === "components" ? [".tsx", ".module.css"] : [".ts"]) {
      const file = `src/${kind}/${name}${extension}`;
      if (existsSync(file)) files.push(file);
    }
  }
  return files;
}

function lastModified(route) {
  const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...sourceFiles(route)], {
    encoding: "utf8",
  }).trim();
  return date || new Date().toISOString().slice(0, 10);
}

const queue = ["/"];
const seen = new Set(queue);
const pages = [];
const skipped = [];
const broken = [];

while (queue.length) {
  const route = queue.shift();
  const response = await fetch(new URL(route, baseUrl), { redirect: "manual" });
  if (response.status !== 200) {
    (response.status >= 400 ? broken : skipped).push(`${route} (${response.status})`);
    continue;
  }

  const html = await response.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (noindex || canonical !== `${productionOrigin}${route}`) {
    skipped.push(`${route} (${noindex ? "noindex" : `canonical ${canonical ?? "missing"}`})`);
  } else {
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "").replace(/ - Find Feed Restore$/, "");
    const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
    pages.push({
      path: route,
      title: route === "/" ? "Home" : title,
      description,
      lastModified: lastModified(route),
      images: pageImages(html),
    });
  }

  for (const [, href] of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const next = internalPath(decode(href));
    if (next && !seen.has(next)) {
      seen.add(next);
      queue.push(next);
    }
  }
}

const previous = existsSync(outputFile) ? JSON.parse(readFileSync(outputFile, "utf8")).map((page) => page.path) : [];
writeFileSync(outputFile, `${JSON.stringify(pages, null, 2)}\n`);

console.log(`Indexed ${pages.length} pages (${pages.reduce((total, page) => total + page.images.length, 0)} images):`);
for (const page of pages) console.log(`  ${page.path.padEnd(28)} ${page.lastModified}  ${page.images.length} images`);
const added = pages.map((page) => page.path).filter((route) => !previous.includes(route));
const removed = previous.filter((route) => !pages.some((page) => page.path === route));
if (previous.length && added.length) console.log(`Added: ${added.join(", ")}`);
if (removed.length) console.log(`Removed: ${removed.join(", ")}`);
if (skipped.length) console.log(`Not indexed: ${skipped.join(", ")}`);
if (broken.length) {
  console.error(`Broken internal links: ${broken.join(", ")}`);
  process.exitCode = 1;
}
