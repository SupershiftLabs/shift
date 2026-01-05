/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'pjhrogdbzpqnxhfxxmsb.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'd64gsuwffb70l.cloudfront.net',
      },
    ],
    // Optimize images with longer cache
    minimumCacheTTL: 31536000, // 1 year
    formats: ['image/webp', 'image/avif'], // Use modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optimize quality for better compression
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize CSS
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', '@supabase/supabase-js'],
  },
  // Enable compression
  compress: true,
  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps to reduce bundle size
  // Reduce unused code
  modularizeImports: {
    '@supabase/supabase-js': {
      transform: '@supabase/supabase-js',
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
  // Add custom headers for caching
  async headers() {
    return [
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
}

export default nextConfig
