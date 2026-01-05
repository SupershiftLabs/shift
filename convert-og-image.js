import sharp from 'sharp';
import fs from 'fs';

async function convertSvgToPng() {
  try {
    const svgBuffer = fs.readFileSync('og-image.svg');
    
    await sharp(svgBuffer)
      .resize(1200, 630)
      .png({ quality: 90, compressionLevel: 9 })
      .toFile('public/og-image.png');
    
    console.log('✅ Successfully created public/og-image.png');
    
    // Check file size
    const stats = fs.statSync('public/og-image.png');
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    console.log(`📦 File size: ${fileSizeKB} KB`);
    
    // Clean up SVG
    fs.unlinkSync('og-image.svg');
    console.log('🧹 Cleaned up temporary SVG file');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

convertSvgToPng();
