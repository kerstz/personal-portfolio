import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { unsealData } from 'iron-session'
import { sessionOptions, type AdminSession } from '@/lib/session'

// Vérifie cryptographiquement le cookie (et pas seulement sa présence)
async function isAuthenticated(req: NextRequest) {
  const seal = req.cookies.get(sessionOptions.cookieName)?.value
  if (!seal || !sessionOptions.password) return false
  try {
    const data = await unsealData<AdminSession>(seal, {
      password: sessionOptions.password,
      ttl: sessionOptions.ttl,
    })
    return Boolean(data.admin)
  } catch {
    return false
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')
  const isLoginPage = pathname === '/login'
  const authenticated = await isAuthenticated(req)

  if (isAdminRoute && !authenticated) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isLoginPage && authenticated) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  const response = NextResponse.next()
  // Les pages d'administration ne doivent jamais être mises en cache ni indexées
  response.headers.set('Cache-Control', 'no-store')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/login'],
}
