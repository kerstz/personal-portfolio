import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, slug: true, title: true, summary: true, status: true, createdAt: true }
  })
  return NextResponse.json(projects)
}


