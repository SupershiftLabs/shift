/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.pixabay.com'],
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
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Remove React DevTools in production
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  // Modern JavaScript output - target ES2020 to eliminate polyfills
  transpilePackages: [],
  // Optimize CSS and packages
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', '@supabase/supabase-js', 'react-hook-form', 'zod'],
    turbo: {}, // Enable Turbopack for faster builds
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
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize CSS in production
    if (!dev && !isServer) {
      // Aggressive tree shaking and dead code elimination
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
        minimize: true,
        moduleIds: 'deterministic',
        runtimeChunk: 'single', // Single runtime chunk
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          maxInitialRequests: 30,
          minSize: 15000,
          maxSize: 250000, // Split large chunks
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            // Bundle all CSS into one file
            styles: {
              name: 'styles',
              type: 'css/mini-extract',
              chunks: 'all',
              enforce: true,
              priority: 30,
            },
            // Separate Supabase code (used only on some pages)
            supabase: {
              test: /[\\/]node_modules[\\/]@supabase[\\/]/,
              name: 'supabase',
              chunks: 'async',
              priority: 35,
            },
            // Separate vendor code
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
              priority: 20,
              reuseExistingChunk: true,
            },
            // Separate React/Next.js code
            framework: {
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              name: 'framework',
              chunks: 'all',
              priority: 40,
              reuseExistingChunk: true,
            },
          },
        },
      }
      
      // Add alias to reduce bundle size
      config.resolve.alias = {
        ...config.resolve.alias,
        'react/jsx-runtime.js': 'react/jsx-runtime',
        'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
      }
    }
    
    // Remove unused code (tree shaking)
    config.optimization.usedExports = true
    
    return config
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
