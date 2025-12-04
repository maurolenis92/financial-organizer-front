import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');
const svgPath = join(projectRoot, 'src/assets/icons/icon.svg');
const outputDir = join(projectRoot, 'src/assets/icons');

// Leer el SVG
const svgBuffer = readFileSync(svgPath);

// Tamaños a generar
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 192, name: 'logo.png', output: outputDir },
  { size: 32, name: 'favicon.ico', output: join(projectRoot, 'src') },
];

console.log('🎨 Generando iconos desde SVG...\n');

// Generar PNGs
for (const { size, name, output } of sizes) {
  const targetDir = output || outputDir;
  await sharp(svgBuffer).resize(size, size).png().toFile(join(targetDir, name));

  console.log(`✅ Generado: ${name} (${size}x${size})`);
}

console.log('\n✨ ¡Todos los iconos generados exitosamente!');
