import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const key = await prisma.pgpKey.findFirst({ orderBy: { createdAt: 'desc' } })
    if (!key) return NextResponse.json({})
    
    return NextResponse.json({
      fingerprint: key.fingerprint || '',
      keyId: key.keyId || '',
      algorithm: key.algorithm || '',
      expiresAt: key.expiresAt || null,
      publicKey: key.publicKey || '',
    })
  } catch (error) {
    console.error('Error fetching PGP key:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


