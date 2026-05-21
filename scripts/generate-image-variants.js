import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('public/images');
const OUTPUT_DIR = path.join(IMAGES_DIR, 'optimized');
const WIDTHS = [480, 960, 1600];
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

async function getSourceImages() {
  const entries = await fs.readdir(IMAGES_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((file) => SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()));
}

async function generateVariant(file, width, extension) {
  const inputPath = path.join(IMAGES_DIR, file);
  const parsed = path.parse(file);
  const outputPath = path.join(OUTPUT_DIR, `${parsed.name}-${width}.${extension}`);

  let pipeline = sharp(inputPath).resize({
    width,
    fit: 'inside',
  });

  if (extension === 'webp') {
    pipeline = pipeline.webp({ quality: 78, effort: 5 });
  } else {
    pipeline = pipeline.jpeg({ quality: 78, progressive: true, mozjpeg: true });
  }

  await pipeline.toFile(outputPath);
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const files = await getSourceImages();

  for (const file of files) {
    for (const width of WIDTHS) {
      await generateVariant(file, width, 'webp');
      await generateVariant(file, width, 'jpg');
    }
  }

  console.log(`Generated ${files.length * WIDTHS.length * 2} responsive image variants in ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
