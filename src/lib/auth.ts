import { getIronSession } from 'iron-session'
import { sessionOptions, assertSessionSecret, type AdminSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

// Défense CSRF en profondeur (en plus de SameSite=Strict) : les requêtes
// modifiantes doivent provenir de la même origine.
export function isSameOrigin(req: NextRequest) {
  if (SAFE_METHODS.has(req.method)) return true
  const origin = req.headers.get('origin')
  if (!origin) return req.headers.get('sec-fetch-site') === 'same-origin'
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host')
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export async function requireAdmin(req: NextRequest) {
  assertSessionSecret()
  if (!isSameOrigin(req)) {
    return { ok: false as const, response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }
  const res = NextResponse.next()
  const session = await getIronSession<AdminSession>(req, res, sessionOptions)
  if (!session.admin) {
    return { ok: false as const, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  return { ok: true as const, session, response: res }
}
