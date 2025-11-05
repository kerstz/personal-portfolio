import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response
  
  try {
    const formData = await req.json()
    console.log('Creating project with form data:', formData)
    
    // Transformer les données du formulaire pour correspondre au schéma Prisma
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
    
    console.log('Transformed data for Prisma:', data)
    const created = await prisma.project.create({ data })
    console.log('Project created successfully:', created)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project', details: error.message }, { status: 500 })
  }
}
