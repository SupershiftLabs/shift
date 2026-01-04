# Mobile Video Optimization Guide

## Current Status
- **Desktop Video**: `hero-video.mp4` (1.1MB) - Working ✅
- **Mobile Video**: Not yet optimized ⚠️

## Option 1: Online Optimization (Recommended - No Installation Required)

### Step 1: Download Current Video
The video is in: `public/hero-video.mp4` (1.1MB)

### Step 2: Use Online Compression Tool

**Recommended: CloudConvert** (https://cloudconvert.com/mp4-to-mp4)
Settings:
- Resolution: 720x1280 (or 640x360 for smaller size)
- Video Codec: H.264
- Quality: Medium (CRF 28)
- Audio: Remove audio track
- Bitrate: 500-700 kbps

**Alternative: FreeConvert** (https://www.freeconvert.com/video-compressor)
Settings:
- Target size: 300-500KB
- Resolution: 720p or 480p
- Remove audio: Yes

**Alternative: Clideo** (https://clideo.com/compress-video)
Settings:
- Compression level: High
- Output format: MP4

### Step 3: Save Optimized File
Save the optimized video as: `public/hero-video-mobile.mp4`

Target size: **300-500KB** (down from 1.1MB)

---

## Option 2: Manual Settings for Any Tool

If you're using any video compression tool, use these settings:

```
Input:  hero-video.mp4 (1.1MB)
Output: hero-video-mobile.mp4

Video Settings:
- Container: MP4
- Codec: H.264 (libx264)
- Resolution: 720x1280 (portrait) or 640x360 (landscape)
- Frame Rate: 24fps (reduce from 30fps if needed)
- Bitrate: 500-700 kbps
- CRF: 28-32 (higher = smaller file)

Audio Settings:
- Remove audio track (video is muted anyway)

Optimization:
- Fast start: Enabled (movflags +faststart)
- Preset: Slow (better compression)
```

---

## Option 3: Use Current Video with Optimized Loading

If you can't compress the video right now, I can update the Hero component to:
- ✅ Lazy load video on mobile (only when user scrolls)
- ✅ Use poster image while loading
- ✅ Add preload="none" to prevent auto-download
- ✅ Load video only on user interaction
- ✅ Reduce quality with CSS filters

This won't reduce file size but will improve perceived performance.

---

## After Optimization

Once you have `hero-video-mobile.mp4`, I'll update the Hero component to:

1. **Detect mobile devices** and serve appropriate video
2. **Lazy load** the video below the fold
3. **Show poster image** while loading
4. **Add loading state** with skeleton
5. **Fallback to static image** if video fails

---

## Expected Results

| Metric | Before | After |
|--------|--------|-------|
| Desktop Video | 1.1MB | 1.1MB (unchanged) |
| Mobile Video | N/A | 300-500KB |
| Mobile Load Time | Instant (no video) | 2-3s |
| Mobile Data Usage | 0MB (image only) | ~0.5MB |
| User Experience | Static image | Animated video |

---

## Quick Start

1. Go to: https://cloudconvert.com/mp4-to-mp4
2. Upload: `public/hero-video.mp4`
3. Settings: Resolution 720p, Quality Medium, Remove Audio
4. Download as: `hero-video-mobile.mp4`
5. Place in: `public/` folder
6. Let me know when ready, and I'll update the code! 🚀
