import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  const items = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response
  const data = await req.json()
  const created = await prisma.testimonial.create({ data })
  return NextResponse.json(created, { status: 201 })
}
