import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const items = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, author: true, role: true, company: true, quote: true, photoUrl: true, links: true }
  })
  return NextResponse.json(items)
}
