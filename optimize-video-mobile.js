import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const inputVideo = path.join(publicDir, 'hero-video.mp4');
const outputVideoMobile = path.join(publicDir, 'hero-video-mobile.mp4');

async function checkDependencies() {
  try {
    // Check if ffmpeg is available via npx @ffmpeg-installer/ffmpeg
    console.log('📦 Installing ffmpeg-static...');
    await execAsync('npm install --no-save ffmpeg-static');
    return true;
  } catch (error) {
    console.error('❌ Could not install ffmpeg-static');
    return false;
  }
}

async function optimizeForMobile() {
  console.log('🎥 Starting mobile video optimization...\n');

  // Check if input file exists
  if (!fs.existsSync(inputVideo)) {
    console.error(`❌ Input video not found: ${inputVideo}`);
    process.exit(1);
  }

  const inputStats = fs.statSync(inputVideo);
  console.log(`📊 Original video size: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB\n`);

  try {
    // Install ffmpeg-static
    const depsInstalled = await checkDependencies();
    if (!depsInstalled) {
      throw new Error('Failed to install dependencies');
    }

    const ffmpegPath = path.join(__dirname, 'node_modules', 'ffmpeg-static', 'ffmpeg');
    
    console.log('🔧 Optimizing video for mobile...');
    console.log('Settings:');
    console.log('  - Resolution: 720x1280 (portrait)');
    console.log('  - Video codec: H.264');
    console.log('  - Bitrate: 500k (aggressive compression)');
    console.log('  - Frame rate: 24fps');
    console.log('  - Audio: Removed (silent video)\n');

    // Optimize for mobile: smaller resolution, lower bitrate
    const command = `"${ffmpegPath}" -i "${inputVideo}" \
      -vf "scale=720:-2:flags=lanczos" \
      -c:v libx264 \
      -preset slow \
      -crf 28 \
      -b:v 500k \
      -maxrate 500k \
      -bufsize 1000k \
      -r 24 \
      -an \
      -movflags +faststart \
      -y "${outputVideoMobile}"`;

    await execAsync(command);

    const outputStats = fs.statSync(outputVideoMobile);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    console.log('\n✅ Mobile video optimization complete!');
    console.log(`📊 Mobile video size: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📉 Size reduction: ${reduction}%\n`);

    console.log('📱 Mobile-optimized video created:');
    console.log(`   ${outputVideoMobile}\n`);

    // Cleanup
    console.log('🧹 Cleaning up temporary dependencies...');
    await execAsync('npm uninstall ffmpeg-static');
    
    console.log('\n🎉 All done! You can now use hero-video-mobile.mp4 for mobile devices.');
    
  } catch (error) {
    console.error('\n❌ Error during optimization:', error.message);
    console.error('\n💡 Alternative: Use an online tool like:');
    console.error('   - https://www.freeconvert.com/video-compressor');
    console.error('   - https://www.videosmaller.com/');
    console.error('\n   Settings to use:');
    console.error('   - Resolution: 720x1280 or 640x360');
    console.error('   - Quality: Medium (500-800 kbps)');
    console.error('   - Format: MP4 (H.264)');
    process.exit(1);
  }
}

optimizeForMobile();
