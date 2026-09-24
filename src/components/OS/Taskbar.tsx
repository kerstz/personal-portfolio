"use client"

import { useState, useEffect } from 'react'
import { useWindows } from './WindowManager'
import { motion, AnimatePresence } from 'framer-motion'
import TlcLogo from '@/components/TlcLogo'

export default function Taskbar() {
  const { windows, focusWindow, minimizeWindow, openWindow } = useWindows()
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const visibleWindows = windows.filter(w => !w.minimized)

  // Fonctions d'ouverture d'applications
  const openTerminal = () => {
    const Terminal = require('@/components/Terminal').default
    openWindow({
      title: 'Terminal',
      component: Terminal,
      size: { width: 800, height: 500 }
    })
    setShowStartMenu(false)
  }

  const AboutApp = () => (
    <div className="p-6 text-zinc-100 space-y-4">
      <h2 className="text-2xl font-mono text-fuchsia-400">À propos</h2>
      <div className="space-y-3">
        <p>Bienvenue dans mon système cyberpunk !</p>
        <p>Développeur passionné par la sécurité et les technologies émergentes.</p>
        <p>Adepte du mouvement cypherpunk : liberté, vie privée et cryptographie.</p>
        <div className="mt-4 p-3 bg-zinc-800 rounded border border-fuchsia-500/30">
          <p className="text-sm font-mono text-green-400">
            "La cryptographie est l'art ultime d'une communication non-violente."
          </p>
        </div>
      </div>
    </div>
  )

  const ProjectsApp = () => (
    <div className="p-6 text-zinc-100">
      <h2 className="text-2xl font-mono text-fuchsia-400 mb-4">Projets</h2>
      <div className="grid gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-4 bg-zinc-800 border border-fuchsia-500/30 rounded">
            <h3 className="font-mono text-green-400">Projet {i}</h3>
            <p className="text-sm text-zinc-300 mt-2">Description du projet en cours...</p>
            <div className="flex gap-2 mt-3">
              <span className="px-2 py-1 bg-zinc-700 rounded text-xs">React</span>
              <span className="px-2 py-1 bg-zinc-700 rounded text-xs">TypeScript</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const SettingsApp = () => (
    <div className="p-6 text-zinc-100 space-y-4">
      <h2 className="text-2xl font-mono text-fuchsia-400">Paramètres</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-zinc-800 rounded">
          <span>Effet CRT</span>
          <button 
            onClick={() => document.documentElement.classList.toggle('crt')}
            className="px-3 py-1 bg-fuchsia-600 rounded hover:bg-fuchsia-700"
          >
            Toggle
          </button>
        </div>
        <div className="flex items-center justify-between p-3 bg-zinc-800 rounded">
          <span>Mode sombre</span>
          <span className="text-green-400">Activé</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-zinc-800 rounded">
          <span>Animations</span>
          <span className="text-green-400">Activées</span>
        </div>
      </div>
    </div>
  )

  const openAbout = () => {
    openWindow({
      title: 'À propos',
      component: AboutApp,
      size: { width: 600, height: 400 }
    })
    setShowStartMenu(false)
  }

  const openProjects = () => {
    openWindow({
      title: 'Projets',
      component: ProjectsApp,
      size: { width: 900, height: 600 }
    })
    setShowStartMenu(false)
  }

  const openTestimonials = () => {
    const TestimonialsCarousel = require('@/components/TestimonialsCarousel').default
    openWindow({
      title: 'Avis',
      component: TestimonialsCarousel,
      size: { width: 700, height: 500 }
    })
    setShowStartMenu(false)
  }

  const openContact = () => {
    const ContactForm = require('@/components/ContactForm').default
    openWindow({
      title: 'Contact',
      component: ContactForm,
      size: { width: 500, height: 600 }
    })
    setShowStartMenu(false)
  }

  const openPgp = () => {
    const PgpBlock = require('@/components/PgpBlock').default
    openWindow({
      title: 'PGP',
      component: PgpBlock,
      size: { width: 600, height: 400 }
    })
    setShowStartMenu(false)
  }

  const openSettings = () => {
    openWindow({
      title: 'Paramètres',
      component: SettingsApp,
      size: { width: 500, height: 400 }
    })
    setShowStartMenu(false)
  }

  return (
    <>
      {/* Start Menu */}
      <AnimatePresence>
        {showStartMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-0 w-80 bg-zinc-900 border border-fuchsia-500/50 rounded-tr-lg shadow-2xl shadow-fuchsia-500/20 z-50"
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-700">
                <div>
                  <div className="font-mono font-bold text-lg text-fuchsia-400">Portfolio</div>
                  <div className="text-xs text-zinc-400">Cypherpunk System</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <StartMenuItem icon="⚡" text="Terminal" onClick={() => openTerminal()} />
                <StartMenuItem icon="👤" text="À propos" onClick={() => openAbout()} />
                <StartMenuItem icon="🚀" text="Projets" onClick={() => openProjects()} />
                <StartMenuItem icon="💬" text="Avis" onClick={() => openTestimonials()} />
                <StartMenuItem icon="📧" text="Contact" onClick={() => openContact()} />
                <StartMenuItem icon="🔐" text="PGP" onClick={() => openPgp()} />
                <div className="border-t border-zinc-700 my-2" />
                <StartMenuItem icon="⚙️" text="Paramètres" onClick={() => openSettings()} />
                <StartMenuItem icon="🔒" text="Admin Panel" onClick={() => { window.location.href = '/login'; setShowStartMenu(false) }} />
                <StartMenuItem icon="🌐" text="GitHub" onClick={() => { window.open('https://github.com', '_blank', 'noopener,noreferrer'); setShowStartMenu(false) }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {showStartMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowStartMenu(false)}
        />
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-zinc-900/95 backdrop-blur border-t border-fuchsia-500/50 flex items-center px-2 z-30">
        {/* Start Button */}
        <button
          onClick={() => setShowStartMenu(!showStartMenu)}
          className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-fuchsia-500/20 transition-colors ${showStartMenu ? 'bg-fuchsia-500/30' : ''}`}
        >
          <TlcLogo size={20} />
          <span className="text-sm font-mono">START</span>
        </button>

        {/* Window buttons */}
        <div className="flex-1 flex items-center gap-1 px-2">
          {visibleWindows.map(window => (
            <button
              key={window.id}
              onClick={() => focusWindow(window.id)}
              onContextMenu={(e) => {
                e.preventDefault()
                minimizeWindow(window.id)
              }}
              className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded text-xs font-mono max-w-32 truncate"
            >
              {window.title}
            </button>
          ))}
        </div>

        {/* System tray */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>ONLINE</span>
          </div>
          <div className="w-px h-6 bg-zinc-600" />
          <div>{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>
    </>
  )
}

function StartMenuItem({ icon, text, onClick }: { icon: string; text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-fuchsia-500/20 rounded transition-colors text-left"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{text}</span>
    </button>
  )
}
