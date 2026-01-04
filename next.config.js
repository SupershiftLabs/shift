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
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'd64gsuwffb70l.cloudfront.net',
      },
    ],
    // Add quality configuration
    qualities: [75, 90],
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
      
      // Aggressive minification
      config.optimization.minimize = true
      config.optimization.concatenateModules = true
      config.optimization.providedExports = true
      config.optimization.usedExports = true
      config.optimization.sideEffects = true
      config.optimization.innerGraph = true
      config.optimization.mangleExports = true
    }
    
    // Remove unused code (tree shaking) - always enabled
    config.optimization.usedExports = true
    
    return config
  },
  // Add custom headers for caching and security
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
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
