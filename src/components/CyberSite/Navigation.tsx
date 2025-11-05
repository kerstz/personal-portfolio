"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TlcLogo from '@/components/TlcLogo'

const navItems = [
  { id: 'home', label: 'HOME', icon: '🏠' },
  { id: 'about', label: 'ABOUT', icon: '👤' },
  { id: 'projects', label: 'PROJECTS', icon: '🚀' },
  { id: 'testimonials', label: 'TESTIMONIALS', icon: '💬' },
  { id: 'contact', label: 'CONTACT', icon: '📧' },
  { id: 'pgp', label: 'PGP', icon: '🔐' },
  { id: 'terminal', label: 'TERMINAL', icon: '⚡' }
]

export default function Navigation() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeSection, setActiveSection] = useState('home')
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id)
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setShowMenu(false)
  }

  return (
    <>
      {/* Header fixe */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-b border-fuchsia-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo + titre */}
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-mono font-bold text-fuchsia-400">Portfolio</h1>
              <div className="text-xs text-zinc-400">Cypherpunk Portfolio</div>
            </div>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                  activeSection === item.id
                    ? 'bg-fuchsia-600 text-white'
                    : 'text-zinc-300 hover:text-fuchsia-400 hover:bg-fuchsia-500/10'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Info système */}
          <div className="hidden md:flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>ONLINE</span>
            </div>
            <div>{currentTime.toLocaleTimeString()}</div>
            <button
              onClick={() => window.location.href = '/login'}
              className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded border border-zinc-600"
            >
              ADMIN
            </button>
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="lg:hidden p-2 rounded border border-fuchsia-500/50"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <div className="w-full h-0.5 bg-fuchsia-400"></div>
              <div className="w-full h-0.5 bg-fuchsia-400"></div>
              <div className="w-full h-0.5 bg-fuchsia-400"></div>
            </div>
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur border-b border-fuchsia-500/30 lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded font-mono text-left transition-all ${
                    activeSection === item.id
                      ? 'bg-fuchsia-600 text-white'
                      : 'text-zinc-300 hover:text-fuchsia-400 hover:bg-fuchsia-500/10'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-zinc-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>ONLINE</span>
                </div>
                <button
                  onClick={() => window.location.href = '/login'}
                  className="px-3 py-1 bg-zinc-800 rounded border border-zinc-600"
                >
                  ADMIN
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay pour fermer menu mobile */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-30 lg:hidden" 
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  )
}
