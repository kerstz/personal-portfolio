import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { parseBody, pgpSchema } from '@/lib/validation'

export async function GET(req: NextRequest) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response
  const key = await prisma.pgpKey.findFirst({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(key || null)
}

export async function PUT(req: NextRequest) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response

  const parsed = await parseBody(req, pgpSchema)
  if (!parsed.ok) return parsed.response
  const body = parsed.data

  try {
    const data = {
      publicKey: body.publicKey || null,
      fingerprint: body.fingerprint || null,
      keyId: body.keyId || null,
      algorithm: body.algorithm || null,
      expiresAt: body.expiresAt || null,
    }

    // Chercher s'il existe déjà une clé PGP
    const existingKey = await prisma.pgpKey.findFirst()
    const saved = existingKey
      ? await prisma.pgpKey.update({ where: { id: existingKey.id }, data })
      : await prisma.pgpKey.create({ data })
    return NextResponse.json(saved)
  } catch (error) {
    console.error('Error saving PGP key:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
