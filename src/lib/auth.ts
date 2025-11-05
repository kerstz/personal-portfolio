import { getIronSession } from 'iron-session'
import { sessionOptions, type AdminSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function requireAdmin(req: NextRequest) {
  const res = NextResponse.next()
  const session = await getIronSession<AdminSession>(req, res, sessionOptions)
  if (!session.admin) {
    return { ok: false as const, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  return { ok: true as const, session, response: res }
}
