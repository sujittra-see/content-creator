import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('public/images');

async function optimizeImages() {
  console.log(`Scanning directory: ${IMAGES_DIR}`);
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('Images directory does not exist!');
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      console.log(`Skipping non-image file: ${file}`);
      continue;
    }

    const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    console.log(`Processing: ${file} (Size: ${sizeMB} MB)`);

    try {
      const buffer = fs.readFileSync(filePath);
      const image = sharp(buffer);

      let pipeline = image.resize({
        width: 1600,
        height: 1600,
        fit: 'inside',
        withoutEnlargement: true
      });

      if (ext === '.png') {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
      } else {
        pipeline = pipeline.jpeg({ quality: 80, progressive: true });
      }

      const tempPath = filePath + '.tmp';
      await pipeline.toFile(tempPath);
      fs.renameSync(tempPath, filePath);

      const newStat = fs.statSync(filePath);
      const newSizeKB = (newStat.size / 1024).toFixed(2);
      console.log(`Optimized ${file} successfully! New size: ${newSizeKB} KB`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

optimizeImages();
