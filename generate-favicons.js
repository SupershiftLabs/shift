import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, 'public', 'logo.png');
const publicDir = path.join(__dirname, 'public');

// Favicon sizes to generate
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

async function generateFavicons() {
  console.log('🎨 Generating favicons from logo.png...\n');

  for (const { size, name } of sizes) {
    const outputPath = path.join(publicDir, name);
    
    try {
      await sharp(inputFile)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`✅ ${name} - ${size}x${size} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (error) {
      console.error(`❌ Failed to generate ${name}:`, error.message);
    }
  }

  // Generate favicon.ico from 32x32 version
  try {
    const faviconPath = path.join(publicDir, 'favicon.ico');
    await sharp(inputFile)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(faviconPath);
    
    const stats = fs.statSync(faviconPath);
    console.log(`✅ favicon.ico - 32x32 (${(stats.size / 1024).toFixed(1)} KB)`);
  } catch (error) {
    console.error('❌ Failed to generate favicon.ico:', error.message);
  }

  console.log('\n🎉 All favicons generated successfully!');
}

generateFavicons().catch(console.error);
