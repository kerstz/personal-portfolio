import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  const key = await prisma.pgpKey.findFirst({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(key || null)
}

export async function PUT(req: NextRequest) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response
  
  try {
    const body = await req.json()
    
    // Chercher s'il existe déjà une clé PGP
    const existingKey = await prisma.pgpKey.findFirst()
    
    if (existingKey) {
      // Mettre à jour la clé existante
      const updated = await prisma.pgpKey.update({
        where: { id: existingKey.id },
        data: {
          publicKey: body.publicKey || null,
          fingerprint: body.fingerprint || null,
          keyId: body.keyId || null,
          algorithm: body.algorithm || null,
          expiresAt: body.expiresAt || null,
        }
      })
      return NextResponse.json(updated)
    } else {
      // Créer une nouvelle clé
      const created = await prisma.pgpKey.create({
        data: {
          publicKey: body.publicKey || null,
          fingerprint: body.fingerprint || null,
          keyId: body.keyId || null,
          algorithm: body.algorithm || null,
          expiresAt: body.expiresAt || null,
        }
      })
      return NextResponse.json(created)
    }
  } catch (error) {
    console.error('Error saving PGP key:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


