"use client"

import Navigation from './Navigation'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import ProjectsSection from './ProjectsSection'
import TerminalSection from './TerminalSection'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import ContactForm from '@/components/ContactForm'
import PgpBlock from '@/components/PgpBlock'
import KonamiEgg from '@/components/KonamiEgg'

function AnimatedSection({ 
  id, 
  title, 
  subtitle, 
  children, 
  gradient = "from-fuchsia-400 to-cyan-400" 
}: { 
  id: string
  title: string
  subtitle: string
  children: React.ReactNode
  gradient?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id={id} className="min-h-screen py-20 relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(192, 38, 211, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192, 38, 211, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-6`}>
            &lt;/{title}&gt;
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-fuchsia-500/30 bg-black/90 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div className="space-y-4">
            <h3 className="text-xl font-mono text-fuchsia-400">Portfolio</h3>
            <p className="text-zinc-400 text-sm">
              Développeur Cypherpunk • Architecte de Solutions Sécurisées
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" className="text-zinc-400 hover:text-fuchsia-400 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com" className="text-zinc-400 hover:text-fuchsia-400 transition-colors">
                LinkedIn
              </a>
              <a href="/login" className="text-zinc-400 hover:text-fuchsia-400 transition-colors">
                Admin
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-mono text-cyan-400">Navigation</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['À propos', 'Projets', 'Avis', 'Contact', 'PGP', 'Terminal'].map(item => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  className="text-zinc-400 hover:text-cyan-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Citation */}
          <div className="space-y-4">
            <h3 className="text-lg font-mono text-green-400">Manifeste</h3>
            <blockquote className="text-zinc-400 text-sm italic">
              "La cryptographie est l'art ultime d'une communication non-violente."
            </blockquote>
            <p className="text-xs text-zinc-500">— Philosophie Cypherpunk</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <div>
            © {new Date().getFullYear()}. Code libre, esprit libre.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Système opérationnel</span>
            </div>
            <div>
              Fait avec ❤️ et beaucoup de ☕
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function CyberSite() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-mono overflow-x-hidden">
      {/* Navigation fixe */}
      <Navigation />
      
      {/* Hero avec effet Matrix */}
      <HeroSection />
      
      {/* À propos immersif */}
      <AboutSection />
      
      {/* Projets avec animations */}
      <ProjectsSection />
      
      {/* Testimonials */}
      <AnimatedSection
        id="testimonials"
        title="AVIS"
        subtitle="Retours d'expérience de mes collaborateurs et mentors"
        gradient="from-orange-400 to-pink-400"
      >
        <div className="bg-black/80 border border-orange-500/50 rounded-lg p-8">
          <TestimonialsCarousel />
        </div>
      </AnimatedSection>
      
      {/* Contact */}
      <AnimatedSection
        id="contact"
        title="CONTACT"
        subtitle="Restons en contact pour vos projets sécurisés"
        gradient="from-blue-400 to-purple-400"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/80 border border-blue-500/50 rounded-lg p-8">
            <ContactForm />
          </div>
        </div>
      </AnimatedSection>
      
      {/* PGP */}
      <AnimatedSection
        id="pgp"
        title="PGP"
        subtitle="Clé publique pour communications chiffrées"
        gradient="from-red-400 to-orange-400"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/80 border border-red-500/50 rounded-lg p-8">
            <PgpBlock />
          </div>
        </div>
      </AnimatedSection>
      
      {/* Terminal interactif */}
      <TerminalSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Easter egg */}
      <KonamiEgg />
      
      {/* Overlay CRT global */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-gradient-to-b from-transparent via-transparent to-black/5" />
    </div>
  )
}
