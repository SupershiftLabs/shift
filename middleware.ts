import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiter
// For production, consider using Redis or a dedicated rate limiting service
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Rate limit configuration
const RATE_LIMIT_CONFIG = {
  // API endpoints
  '/api/': { requests: 10, windowMs: 60000 }, // 10 requests per minute
  '/api/seo-check': { requests: 5, windowMs: 60000 }, // 5 requests per minute
  
  // Contact form
  '/api/contact': { requests: 3, windowMs: 300000 }, // 3 requests per 5 minutes
  
  // Admin endpoints
  '/api/admin': { requests: 20, windowMs: 60000 }, // 20 requests per minute
}

// Cache control headers for static assets
const CACHE_HEADERS = {
  // Immutable assets (with hash in filename)
  immutable: 'public, max-age=31536000, immutable',
  // Static assets (images, fonts)
  static: 'public, max-age=86400, stale-while-revalidate=604800',
  // Dynamic pages
  dynamic: 'public, max-age=0, must-revalidate',
  // No cache
  none: 'no-store, no-cache, must-revalidate',
}

function getRateLimitConfig(pathname: string) {
  // Find the most specific matching config
  for (const [path, config] of Object.entries(RATE_LIMIT_CONFIG)) {
    if (pathname.startsWith(path)) {
      return config
    }
  }
  // Default rate limit for all other API routes
  return { requests: 30, windowMs: 60000 } // 30 requests per minute
}

function getClientIdentifier(request: NextRequest): string {
  // Use multiple identifiers for better accuracy
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0].trim() || realIp || 'unknown'
  
  // Also include user agent to prevent IP spoofing
  const userAgent = request.headers.get('user-agent') || ''
  
  return `${ip}-${userAgent.substring(0, 50)}`
}

function checkRateLimit(clientId: string, config: { requests: number; windowMs: number }): boolean {
  const now = Date.now()
  const clientData = rateLimitMap.get(clientId)

  if (!clientData || now > clientData.resetTime) {
    // First request or window expired - create new entry
    rateLimitMap.set(clientId, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return true
  }

  if (clientData.count >= config.requests) {
    // Rate limit exceeded
    return false
  }

  // Increment count
  clientData.count++
  return true
}

// Clean up old entries periodically (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    const entries = Array.from(rateLimitMap.entries())
    for (const [clientId, data] of entries) {
      if (now > data.resetTime) {
        rateLimitMap.delete(clientId)
      }
    }
  }, 300000)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Create response
  const response = NextResponse.next()

  // Add cache control headers based on path
  if (pathname.startsWith('/_next/static/')) {
    // Next.js static assets (JS, CSS) - immutable with hash
    response.headers.set('Cache-Control', CACHE_HEADERS.immutable)
  } else if (pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|woff|woff2|ttf|eot)$/)) {
    // Static assets without hash
    response.headers.set('Cache-Control', CACHE_HEADERS.static)
  } else if (!pathname.startsWith('/api/')) {
    // HTML pages - revalidate
    response.headers.set('Cache-Control', CACHE_HEADERS.dynamic)
  }

  // Apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    const clientId = getClientIdentifier(request)
    const config = getRateLimitConfig(pathname)
    
    if (!checkRateLimit(clientId, config)) {
      // Rate limit exceeded
      return new NextResponse(
        JSON.stringify({
          error: 'Too Many Requests',
          message: 'You have exceeded the rate limit. Please try again later.',
          retryAfter: Math.ceil(config.windowMs / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(config.windowMs / 1000).toString(),
            'X-RateLimit-Limit': config.requests.toString(),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }

    // Add rate limit headers to successful responses
    const clientData = rateLimitMap.get(clientId)
    if (clientData) {
      response.headers.set('X-RateLimit-Limit', config.requests.toString())
      response.headers.set('X-RateLimit-Remaining', (config.requests - clientData.count).toString())
      response.headers.set('X-RateLimit-Reset', clientData.resetTime.toString())
    }
  }

  // Security headers for all routes (additional to vercel.json)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  return response
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
