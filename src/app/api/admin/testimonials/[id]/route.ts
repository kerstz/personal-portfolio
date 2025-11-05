import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response
  
  try {
    const { id } = await params
    await prisma.testimonial.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
