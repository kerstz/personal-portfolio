"use client"

import { useState, useEffect } from 'react'
import ProfessionalNavbar from './ProfessionalNavbar'
import ProfessionalHero from './ProfessionalHero'
import PgpBlock from '@/components/PgpBlock'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import ContactForm from '@/components/ContactForm'
import HoloCard from './HoloCard'
import ProjectsSection from './ProjectsSection'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLocale, getMessages } from '@/lib/locale'

interface SiteContent {
  aboutTitle?: { fr?: string; en?: string }
  aboutContent?: { fr?: string; en?: string }
  manifestoTitle?: { fr?: string; en?: string }
  manifestoContent?: { fr?: string; en?: string }
}

export default function ImmersivePage() {
  const locale = useLocale()
  const t = getMessages(locale)
  const [content, setContent] = useState<SiteContent | null>(null)
  const [showBoot, setShowBoot] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/site')
      if (response.ok) {
        const data = await response.json()
        setContent(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement du contenu:', error)
    }
  }

  const handleLanguageSelect = (selectedLocale: 'fr' | 'en') => {
    document.cookie = `tlc_locale=${selectedLocale}; path=/; max-age=${60*60*24*365}`
    sessionStorage.setItem('boot_done', '1')
    setShowBoot(false)
    window.location.reload()
  }

  return (
    <>
      {/* Boot overlay supprimé (URL-driven locale) */}
      
      <div className="neon-bg text-slate-100 snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Subtle background grid */}
      <div className="cyber-grid" />
      
      {/* Professional Navigation */}
      <ProfessionalNavbar />
      
      {/* Main Content */}
      <main className="snap-y snap-mandatory">
        <ProfessionalHero />
        <LanguageSwitcher />
        
        <section id="apropos" className="min-h-screen flex items-center snap-start snap-always">
          <div className="max-w-4xl mx-auto px-6">
            <HoloCard title={content?.aboutTitle?.[locale] || content?.aboutTitle?.fr || (locale === 'en' ? 'About' : 'À propos')}>
              <div className="text-lg space-y-4">
                {content?.aboutContent?.[locale] || content?.aboutContent?.fr ? (
                  <div className="whitespace-pre-line">
                    {content?.aboutContent?.[locale] || content?.aboutContent?.fr}
                  </div>
                ) : (
                  <>
                    {locale === 'en' ? (
                      <>
                        <p>
                          Passionate developer with over 5 years of experience in modern web application development. 
                          I specialize in React, Next.js, and Node.js technologies, with a strong interest in cybersecurity 
                          and privacy protection.
                        </p>
                        <p>
                          As a cypherpunk movement advocate, I firmly believe in the importance of cryptography and 
                          privacy tools to preserve our digital freedoms.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Développeur passionné avec plus de 5 ans d'expérience dans le développement d'applications web modernes. 
                          Je me spécialise dans les technologies React, Next.js et Node.js, avec un fort intérêt pour la cybersécurité 
                          et la protection de la vie privée.
                        </p>
                        <p>
                          Adepte du mouvement cypherpunk, je crois fermement en l'importance de la cryptographie et des outils 
                          de protection de la vie privée pour préserver nos libertés numériques.
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
            </HoloCard>
          </div>
        </section>

        <ProjectsSection />

        <section id="avis" className="min-h-screen flex items-center snap-start snap-always">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-semibold neon-title text-center mb-16">{locale === 'en' ? 'Testimonials' : 'Témoignages'}</h2>
            <TestimonialsCarousel />
          </div>
        </section>

        <section id="pgp" className="min-h-screen flex items-center snap-start snap-always bg-slate-900/30">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-semibold neon-title text-center mb-16">{locale === 'en' ? 'PGP Key' : 'Clé PGP'}</h2>
            <PgpBlock />
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center snap-start snap-always">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-semibold neon-title text-center mb-16">{locale === 'en' ? 'Contact' : 'Contact'}</h2>
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
    </>
  )
}


