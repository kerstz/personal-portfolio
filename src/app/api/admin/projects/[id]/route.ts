import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { parseBody, projectSchema, idSchema } from '@/lib/validation'

type Params = { params: Promise<{ id: string }> }

async function getId(params: Params['params']) {
  const { id } = await params
  return idSchema.safeParse(id).success ? id : null
}

export async function GET(req: NextRequest, { params }: Params) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response
  const id = await getId(params)
  if (!id) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const item = await prisma.project.findUnique({ where: { id } })
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: NextRequest, { params }: Params) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response
  const id = await getId(params)
  if (!id) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const parsed = await parseBody(req, projectSchema)
  if (!parsed.ok) return parsed.response

  try {
    const updated = await prisma.project.update({ where: { id }, data: parsed.data })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response
  const id = await getId(params)
  if (!id) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  try {
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
