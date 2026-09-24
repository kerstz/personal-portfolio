import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, type AdminSession } from '@/lib/session'
import { isSameOrigin } from '@/lib/auth'

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const res = NextResponse.json({ ok: true })
  const session = await getIronSession<AdminSession>(req, res, sessionOptions)
  session.destroy()
  return res
}
