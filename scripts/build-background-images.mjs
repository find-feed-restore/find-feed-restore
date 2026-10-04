// Re-encodes the photos used as CSS backgrounds (page heroes, call-to-action banners, footer) into
// compact WebP files in public/images/backgrounds/. Heroes also get a "-mobile" file for phones.
// Run from the project root after adding or replacing a source photo: npm run images:backgrounds
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.join(process.cwd(), "public", "images");
const outputDirectory = path.join(sourceDirectory, "backgrounds");

const desktopWidth = 1920;
const mobileWidth = 1280;

// Heroes are the first thing painted on each page, so they get a desktop file and a mobile file.
const heroes = [
  // The homepage hero fills a tall phone screen, so its mobile file is a full-height centre crop
  // instead of a scaled-down copy. It stays as sharp as the desktop file on portrait screens.
  { name: "home-hero", source: "hero-family.jpg", mobileCropAspect: 0.84, mobileQuality: 62 },
  { name: "affordable-housing-hero", source: "programs/affordable-housing/hero.jpg" },
  { name: "housing-first-hero", source: "housing-first.jpg" },
  { name: "homelessness-avoidance-hero", source: "unique/homelessness-hero.webp" },
  { name: "care-coach-hero", source: "programs/care-coach/care-coach.jpg" },
  { name: "miriams-hope-hero", source: "programs/miriams-hope/hero.webp" },
  { name: "hope-hero", source: "unique/hope-hero.webp" },
  { name: "sponsors-hero", source: "unique/sponsors-hero.webp" },
  { name: "people-hero", source: "unique/people-hero.webp" },
  { name: "legal-hero", source: "legal/terms-hero.jpg" },
  { name: "contact-hero", source: "unique/contact-hero.webp" },
  { name: "news-hero", source: "unique/news-hero.webp" },
  { name: "testimonials-hero", source: "unique/testimonials-hero.webp" },
];

// Banners sit further down the page under a dark overlay, so one modest file is enough.
const banners = [
  { name: "give-banner", source: "give-banner.jpg" },
  { name: "affordable-support", source: "unique/affordable-support.webp" },
  { name: "housing-support", source: "unique/housing-support.webp" },
  { name: "homelessness-support", source: "unique/homelessness-support.webp" },
  { name: "hope-cta", source: "unique/hope-cta.webp" },
  { name: "people-cta", source: "unique/people-cta.webp" },
  { name: "contact-cta", source: "unique/contact-cta.webp" },
  { name: "news-cta", source: "unique/news-cta.webp" },
  { name: "testimonials-cta", source: "unique/testimonials-cta.webp" },
  // The footer texture is shown at 1% opacity, so it only needs a small file.
  { name: "footer-hands", source: "footer-hands.png", width: 640, quality: 40 },
];

async function write(name, pipeline, quality) {
  const destination = path.join(outputDirectory, `${name}.webp`);
  const { size } = await pipeline.webp({ quality, effort: 6, smartSubsample: true }).toFile(destination);
  return size;
}

await fs.mkdir(outputDirectory, { recursive: true });

let sourceBytes = 0;
let desktopBytes = 0;

for (const { name, source, mobileCropAspect, mobileQuality = 70 } of heroes) {
  const sourcePath = path.join(sourceDirectory, source);
  const { width, height } = await sharp(sourcePath).metadata();
  const desktop = await write(name, sharp(sourcePath).resize({ width: desktopWidth, withoutEnlargement: true }), 72);

  const mobilePipeline = mobileCropAspect
    ? sharp(sourcePath).extract({
        left: Math.round((width - Math.round(height * mobileCropAspect)) / 2),
        top: 0,
        width: Math.round(height * mobileCropAspect),
        height,
      })
    : sharp(sourcePath).resize({ width: mobileWidth, withoutEnlargement: true });
  const mobile = await write(`${name}-mobile`, mobilePipeline, mobileQuality);

  const original = (await fs.stat(sourcePath)).size;
  sourceBytes += original;
  desktopBytes += desktop;
  console.log(`${name.padEnd(30)} ${kb(original)} -> ${kb(desktop)} desktop, ${kb(mobile)} mobile`);
}

for (const { name, source, width = 1600, quality = 68 } of banners) {
  const sourcePath = path.join(sourceDirectory, source);
  const size = await write(name, sharp(sourcePath).resize({ width, withoutEnlargement: true }), quality);

  const original = (await fs.stat(sourcePath)).size;
  sourceBytes += original;
  desktopBytes += size;
  console.log(`${name.padEnd(30)} ${kb(original)} -> ${kb(size)}`);
}

console.log(`Total: ${kb(sourceBytes)} -> ${kb(desktopBytes)} (desktop files)`);

function kb(bytes) {
  return `${Math.round(bytes / 1024)} KB`.padStart(7);
}
