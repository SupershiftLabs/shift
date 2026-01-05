import fs from 'fs';

// Simple HTML Canvas-like approach using SVG
const svgContent = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- Dark gradient background -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#grad)"/>
  
  <!-- Accent line -->
  <rect x="0" y="0" width="1200" height="8" fill="#22c55e"/>
  
  <!-- Company Name -->
  <text x="600" y="280" 
        font-family="Arial, Helvetica, sans-serif" 
        font-size="80" 
        font-weight="bold"
        fill="#22c55e" 
        text-anchor="middle">SuperShift Labs</text>
  
  <!-- Tagline -->
  <text x="600" y="360" 
        font-family="Arial, Helvetica, sans-serif" 
        font-size="40" 
        fill="#ffffff" 
        text-anchor="middle">Web &amp; Mobile Development</text>
  
  <!-- Location -->
  <text x="600" y="420" 
        font-family="Arial, Helvetica, sans-serif" 
        font-size="32" 
        fill="#94a3b8" 
        text-anchor="middle">Davenport, Iowa</text>
  
  <!-- Bottom accent -->
  <rect x="400" y="500" width="400" height="4" fill="#22c55e" opacity="0.5"/>
  
  <!-- Services text -->
  <text x="300" y="560" 
        font-family="Arial, Helvetica, sans-serif" 
        font-size="24" 
        fill="#cbd5e1" 
        text-anchor="middle">Mobile Apps</text>
  
  <text x="600" y="560" 
        font-family="Arial, Helvetica, sans-serif" 
        font-size="24" 
        fill="#cbd5e1" 
        text-anchor="middle">Web Development</text>
  
  <text x="900" y="560" 
        font-family="Arial, Helvetica, sans-serif" 
        font-size="24" 
        fill="#cbd5e1" 
        text-anchor="middle">Cloud Solutions</text>
</svg>
`;

fs.writeFileSync('og-image.svg', svgContent);
console.log('Created og-image.svg');
console.log('Now converting to PNG...');

// Note: To convert SVG to PNG, you would normally use a library like sharp
// For now, we'll just create the SVG
console.log('\nTo convert to PNG, run:');
console.log('npm install sharp');
console.log('Or use an online converter: https://cloudconvert.com/svg-to-png');
