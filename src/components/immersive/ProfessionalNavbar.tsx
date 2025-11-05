'use client'

import { useState, useEffect } from 'react'
import { useLocale } from '@/lib/locale'
import { motion } from 'framer-motion'

const navItems = [
  { id: 'apropos', label: 'À propos', enLabel: 'About' },
  { id: 'projets', label: 'Projets', enLabel: 'Projects' },
  { id: 'avis', label: 'Avis', enLabel: 'Testimonials' },
  { id: 'pgp', label: 'PGP', enLabel: 'PGP' },
  { id: 'contact', label: 'Contact', enLabel: 'Contact' }
]

export default function ProfessionalNavbar() {
  const [activeSection, setActiveSection] = useState('apropos')
  const [isScrolled, setIsScrolled] = useState(false)
  const locale = useLocale()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Intersection Observer for better section detection with scroll-snap
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Only trigger when section is in the middle 20% of viewport
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          if (sectionId === 'hero') {
            setActiveSection('apropos') // Hero maps to "À propos" in navbar
          } else if (navItems.some(item => item.id === sectionId)) {
            setActiveSection(sectionId)
          }
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = ['hero', ...navItems.map(item => item.id)]
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    // Initial scroll check for navbar background
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-slate-100 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            Portfolio
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-blue-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {locale === 'en' ? item.enLabel : item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-slate-400 hover:text-slate-200 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
