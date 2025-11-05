import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const SITE_ID = 'site-singleton'

export async function GET() {
  try {
    const site = await prisma.siteContent.findUnique({ where: { id: SITE_ID } })
    if (!site) {
      return NextResponse.json({
        heroTitle: { fr: 'Your Name', en: 'Your Name' },
        heroSubtitle: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
        heroDescription: { fr: 'Passionné par l\'innovation technologique', en: 'Passionate about technological innovation' },
        aboutTitle: { fr: 'À propos', en: 'About' },
        aboutContent: { fr: 'Développeur passionné...', en: 'Passionate developer...' },
        manifestoTitle: { fr: 'Manifeste', en: 'Manifesto' },
        manifestoContent: { fr: 'La technologie doit servir l\'humanité...', en: 'Technology must serve humanity...' },
        contactEmail: 'contact@example.com'
      })
    }
    
    // Retourner le contenu public
    return NextResponse.json({
      heroTitle: site.heroTitle,
      heroSubtitle: site.heroSubtitle,
      heroDescription: site.heroDescription,
      aboutTitle: site.aboutTitle,
      aboutContent: site.aboutContent,
      manifestoTitle: site.manifestoTitle,
      manifestoContent: site.manifestoContent,
      contactEmail: site.contactEmail,
      theme: site.theme,
    })
  } catch (error) {
    console.error('Error fetching site content:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


