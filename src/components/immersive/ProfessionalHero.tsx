'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocale } from '@/lib/locale'

interface SiteContent {
  heroTitle?: { fr?: string; en?: string }
  heroSubtitle?: { fr?: string; en?: string }
  heroDescription?: { fr?: string; en?: string }
}

export default function ProfessionalHero() {
  const [mounted, setMounted] = useState(false)
  const [content, setContent] = useState<SiteContent | null>(null)
  const locale = useLocale()

  useEffect(() => {
    setMounted(true)
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

  if (!mounted) return null

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden snap-start snap-always">

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-slate-100 mb-6">
            {content?.heroTitle?.[locale] || content?.heroTitle?.fr || 'Your Name'}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl text-slate-300 font-light">
            {content?.heroSubtitle?.[locale] || content?.heroSubtitle?.fr || 'Développeur Full-Stack & Expert en Cybersécurité'}
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {content?.heroDescription?.[locale] || content?.heroDescription?.fr || 'Passionné par l\'innovation technologique et la protection des données. Je crée des solutions robustes et sécurisées qui respectent la vie privée des utilisateurs.'}
          </p>
        </motion.div>


      </div>
    </section>
  )
}
