import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the /api/secret endpoint
  if (request.nextUrl.pathname.startsWith('/api/secret')) {
    // Get the API key from the request header
    const apiKey = request.headers.get('x-api-key');
    const expectedKey = process.env.API_SECRET_KEY;

    // Validate the API key
    if (!apiKey || apiKey !== expectedKey) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Invalid or missing API key. Please provide a valid x-api-key header.',
          hint: `Expected header: x-api-key: ${expectedKey}`,
        },
        { status: 401 }
      );
    }

    // Add custom header to indicate authentication success
    const response = NextResponse.next();
    response.headers.set('x-authenticated', 'true');
    return response;
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: '/api/:path*',
};
