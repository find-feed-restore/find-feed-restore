import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageDirectory = path.join(process.cwd(), "public", "images", "unique");
const filenames = (await fs.readdir(imageDirectory)).filter((filename) => filename.endsWith(".png"));

for (const filename of filenames) {
  const source = path.join(imageDirectory, filename);
  const destination = path.join(imageDirectory, filename.replace(/\.png$/, ".webp"));

  await sharp(source)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 86, smartSubsample: true })
    .toFile(destination);
}

console.log(`Optimized ${filenames.length} generated images.`);
