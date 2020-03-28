const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const PUBLIC_DIR = path.join('.', 'public');

let dirContent = fs.readdirSync(PUBLIC_DIR);
let pngImages = dirContent.filter(
  (name) => name.endsWith('.png') && !name.startsWith('compressed') && !name.startsWith('preview'),
);

pngImages.forEach(async (p) => {
  const INPUT_PATH = path.join(PUBLIC_DIR, p);
  const OUTPUT_PATH = path.join(PUBLIC_DIR, `compressed-${p}`);

  let file = fs.readFileSync(INPUT_PATH);

  await sharp(file)
    .jpeg({ quality: 85 })
    .resize(1080)
    .toFile(OUTPUT_PATH);
});

pngImages.forEach(async (p) => {
  const INPUT_PATH = path.join(PUBLIC_DIR, p);
  const OUTPUT_PATH = path.join(PUBLIC_DIR, `preview-${p}`);

  let file = fs.readFileSync(INPUT_PATH);

  await sharp(file)
    .resize(20)
    .toFile(OUTPUT_PATH);
});
