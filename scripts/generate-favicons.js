// Gera todos os favicons/ícones a partir do logo_icon.svg
// Uso: node scripts/generate-favicons.js

import sharp from 'sharp';
import { readFileSync } from 'fs';

const svg = readFileSync('./public/logo_icon.svg');

const sizes = [
  { name: 'favicon-16x16.png',        size: 16  },
  { name: 'favicon-32x32.png',        size: 32  },
  { name: 'apple-touch-icon.png',     size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

for (const { name, size } of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(`./public/${name}`);
  console.log(`✓ public/${name} (${size}x${size})`);
}

console.log('\nPronto! Substitua o favicon.ico manualmente via realfavicongenerator.net');
