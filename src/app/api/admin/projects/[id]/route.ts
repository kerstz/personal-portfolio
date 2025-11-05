import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await prisma.project.findUnique({ where: { id } })
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response
  const formData = await req.json()
  const { id } = await params
  
  // Ne garder que les champs autorisés dans le schéma Prisma
  const data = {
    slug: formData.slug,
    title: formData.title,
    summary: formData.summary,
    description: formData.description,
    content: formData.content,
    stack: formData.stack,
    role: formData.role,
    links: formData.links,
    images: formData.images,
    status: formData.status
  }
  
  const updated = await prisma.project.update({ where: { id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response
  const { id } = await params
  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
