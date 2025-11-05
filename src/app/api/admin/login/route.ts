import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, assertSessionSecret, type AdminSession } from '@/lib/session'
import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  assertSessionSecret()
  const { email, password } = await req.json()
  if (typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
  const user = await prisma.adminUser.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  const session = await getIronSession<AdminSession>(req, res, sessionOptions)
  session.admin = { id: user.id, email: user.email }
  await session.save()
  return res
}
