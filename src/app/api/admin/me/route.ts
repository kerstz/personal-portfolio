import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, type AdminSession } from '@/lib/session'

export async function GET(req: NextRequest) {
  const res = NextResponse.json({})
  const session = await getIronSession<AdminSession>(req, res, sessionOptions)
  if (session.admin) {
    return NextResponse.json({ authenticated: true, admin: session.admin })
  }
  return NextResponse.json({ authenticated: false })
}


