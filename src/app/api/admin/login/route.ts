import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, assertSessionSecret, type AdminSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { isSameOrigin } from '@/lib/auth'
import { rateLimit, resetRateLimit, clientIp } from '@/lib/rateLimit'
import { parseBody, loginSchema } from '@/lib/validation'
import bcrypt from 'bcrypt'

// Hash factice : évite de révéler l'existence d'un compte via le temps de réponse
const DUMMY_HASH = '$2b$12$QWJ9CqpJwNNGVSbp9uOQFuFw1BbFP8Bk/ADEUqPvmE0I0bQ7TR0Ji'

const WINDOW_MS = 15 * 60 * 1000

function tooMany(retryAfter: number) {
  return NextResponse.json(
    { error: 'Too many attempts' },
    { status: 429, headers: { 'Retry-After': String(retryAfter) } }
  )
}

export async function POST(req: NextRequest) {
  assertSessionSecret()
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const ip = clientIp(req)
  const ipWait = rateLimit(`login:ip:${ip}`, 10, WINDOW_MS)
  if (ipWait) return tooMany(ipWait)

  const parsed = await parseBody(req, loginSchema)
  if (!parsed.ok) return parsed.response
  const email = parsed.data.email.trim()
  const { password } = parsed.data

  const accountKey = `login:account:${email.toLowerCase()}`
  const accountWait = rateLimit(accountKey, 5, WINDOW_MS)
  if (accountWait) return tooMany(accountWait)

  const user = await prisma.adminUser.findUnique({ where: { email } })
  const ok = await bcrypt.compare(password, user?.password ?? DUMMY_HASH)
  if (!user || !ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  resetRateLimit(accountKey)
  const res = NextResponse.json({ ok: true })
  const session = await getIronSession<AdminSession>(req, res, sessionOptions)
  session.admin = { id: user.id, email: user.email }
  await session.save()
  return res
}
