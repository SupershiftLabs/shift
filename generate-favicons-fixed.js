import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicons() {
  const logoPath = path.join(__dirname, 'public', 'logo.png');
  const publicDir = path.join(__dirname, 'public');

  if (!fs.existsSync(logoPath)) {
    console.error('❌ Error: logo.png not found in public folder');
    process.exit(1);
  }

  console.log('🎨 Generating favicons from logo.png...\n');

  try {
    const logoBuffer = await sharp(logoPath)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    await sharp(logoBuffer).resize(32, 32).toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✅ Generated favicon.ico (32x32)');

    await sharp(logoBuffer).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('✅ Generated favicon-16x16.png');

    await sharp(logoBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('✅ Generated favicon-32x32.png');

    await sharp(logoBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ Generated apple-touch-icon.png (180x180)');

    await sharp(logoBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'android-chrome-192x192.png'));
    console.log('✅ Generated android-chrome-192x192.png');

    await sharp(logoBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'android-chrome-512x512.png'));
    console.log('✅ Generated android-chrome-512x512.png');

    console.log('\n🎉 All favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
