import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory store for rate limiting
const rateLimit = new Map<string, number[]>()

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 100 // Maximum requests per window

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect all non-root paths to the homepage, excluding API routes
  if (pathname !== '/' && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Rate limiting
  const ip = request.ip || '127.0.0.1'
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW

  const requestTimestamps = rateLimit.get(ip) || []
  const requestsInWindow = requestTimestamps.filter((timestamp: number) => timestamp > windowStart)

  if (requestsInWindow.length >= MAX_REQUESTS) {
    return new NextResponse(null, {
      status: 429,
      statusText: 'Too Many Requests',
      headers: {
        'Retry-After': '60',
        'Content-Type': 'text/plain',
      }
    })
  }

  requestsInWindow.push(now)
  rateLimit.set(ip, requestsInWindow)
  
  // Check for valid origin
  const origin = request.headers.get('origin')
  const allowedOrigins = [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000']
  
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 403,
      statusText: 'Forbidden',
      headers: {
        'Content-Type': 'text/plain',
      }
    })
  }

  // Add CSRF token validation for POST/PUT/DELETE requests
  if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
    const csrfToken = request.headers.get('x-csrf-token')
    const expectedToken = process.env.NEXT_PUBLIC_CSRF_TOKEN

    if (!csrfToken || csrfToken !== expectedToken) {
      return new NextResponse(null, {
        status: 403,
        statusText: 'Invalid CSRF token',
        headers: {
          'Content-Type': 'text/plain',
        }
      })
    }
  }

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
