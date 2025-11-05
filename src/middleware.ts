import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const session = req.cookies.get('tlc_session')
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = req.nextUrl.pathname === '/login'

  if (isAdminRoute && !session?.value) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isLoginPage && session?.value) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  const response = NextResponse.next()

  // Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')

  // CSP (Content Security Policy)
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
  response.headers.set('Content-Security-Policy', csp.replace(/\s{2,}/g, ' ').trim())

  return response
}

export const config = {
  matcher: ['/admin/:path*']
}
