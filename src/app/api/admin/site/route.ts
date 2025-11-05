import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

const SITE_ID = 'site-singleton'

export async function GET() {
  try {
    const site = await prisma.siteContent.findUnique({ where: { id: SITE_ID } })
    return NextResponse.json(site || {
      heroTitle: { fr: '', en: '' },
      heroSubtitle: { fr: '', en: '' },
      heroDescription: { fr: '', en: '' },
      aboutTitle: { fr: '', en: '' },
      aboutContent: { fr: '', en: '' },
      manifestoTitle: { fr: '', en: '' },
      manifestoContent: { fr: '', en: '' },
      contactEmail: 'contact@example.com'
    })
  } catch (error) {
    console.error('Error fetching site content:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const guard = await requireAdmin(req)
  if (!guard.ok) return guard.response
  
  try {
    const data = await req.json()
    const site = await prisma.siteContent.upsert({
      where: { id: SITE_ID },
      update: {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroDescription: data.heroDescription,
        aboutTitle: data.aboutTitle,
        aboutContent: data.aboutContent,
        manifestoTitle: data.manifestoTitle,
        manifestoContent: data.manifestoContent,
        contactEmail: data.contactEmail,
      },
      create: { 
        id: SITE_ID,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroDescription: data.heroDescription,
        aboutTitle: data.aboutTitle,
        aboutContent: data.aboutContent,
        manifestoTitle: data.manifestoTitle,
        manifestoContent: data.manifestoContent,
        contactEmail: data.contactEmail,
      }
    })
    return NextResponse.json(site)
  } catch (error) {
    console.error('Error updating site content:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
