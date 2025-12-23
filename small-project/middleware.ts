import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit'

// Define which paths should be rate-limited
const RATE_LIMITED_PATHS = ['/api/chat']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only apply rate limiting to specific API paths
  if (RATE_LIMITED_PATHS.some((path) => pathname.startsWith(path))) {
    const clientId = getClientIdentifier(request)
    const result = checkRateLimit(clientId)

    if (!result.allowed) {
      return NextResponse.json(
        {
          error: 'Too Many Requests',
          message: `Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ${Math.ceil(
            result.resetIn / 1000
          )} giây.`,
          retryAfter: Math.ceil(result.resetIn / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(result.resetIn / 1000).toString(),
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': Math.ceil(
              (Date.now() + result.resetIn) / 1000
            ).toString(),
          },
        }
      )
    }

    // Add rate limit headers to successful responses
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', '10')
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
    response.headers.set(
      'X-RateLimit-Reset',
      Math.ceil((Date.now() + result.resetIn) / 1000).toString()
    )
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Apply to API routes
    '/api/:path*',
  ],
}
