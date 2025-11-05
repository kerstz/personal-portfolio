"use client"

import { useWindows } from './WindowManager'
import { motion } from 'framer-motion'

const desktopIcons = [
  {
    id: 'terminal',
    title: 'Terminal',
    icon: '⚡',
    action: 'terminal'
  },
  {
    id: 'about',
    title: 'À propos',
    icon: '👤',
    action: 'about'
  },
  {
    id: 'projects',
    title: 'Projets',
    icon: '🚀',
    action: 'projects'
  },
  {
    id: 'testimonials',
    title: 'Avis',
    icon: '💬',
    action: 'testimonials'
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: '📧',
    action: 'contact'
  },
  {
    id: 'pgp',
    title: 'PGP',
    icon: '🔐',
    action: 'pgp'
  },
  {
    id: 'settings',
    title: 'Paramètres',
    icon: '⚙️',
    action: 'settings'
  }
]

export default function Desktop() {
  const { openWindow } = useWindows()

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

  const handleIconDoubleClick = (icon: typeof desktopIcons[0]) => {
    switch (icon.action) {
      case 'terminal':
        const Terminal = require('@/components/Terminal').default
        openWindow({
          title: 'Terminal',
          component: Terminal,
          size: { width: 800, height: 500 }
        })
        break
      case 'about':
        openWindow({
          title: 'À propos',
          component: AboutApp,
          size: { width: 600, height: 400 }
        })
        break
      case 'projects':
        openWindow({
          title: 'Projets',
          component: ProjectsApp,
          size: { width: 900, height: 600 }
        })
        break
      case 'testimonials':
        const TestimonialsCarousel = require('@/components/TestimonialsCarousel').default
        openWindow({
          title: 'Avis',
          component: TestimonialsCarousel,
          size: { width: 700, height: 500 }
        })
        break
      case 'contact':
        const ContactForm = require('@/components/ContactForm').default
        openWindow({
          title: 'Contact',
          component: ContactForm,
          size: { width: 500, height: 600 }
        })
        break
      case 'pgp':
        const PgpBlock = require('@/components/PgpBlock').default
        openWindow({
          title: 'PGP',
          component: PgpBlock,
          size: { width: 600, height: 400 }
        })
        break
      case 'settings':
        openWindow({
          title: 'Paramètres',
          component: SettingsApp,
          size: { width: 500, height: 400 }
        })
        break
    }
  }

  return (
    <div className="absolute inset-0 p-4">
      {/* Desktop Grid */}
      <div className="grid grid-cols-6 gap-4 h-full">
        {desktopIcons.map((icon, index) => (
          <motion.div
            key={icon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center justify-start cursor-pointer group"
            onDoubleClick={() => handleIconDoubleClick(icon)}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 rounded-xl border border-fuchsia-500/30 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform group-hover:border-fuchsia-400">
              {icon.icon}
            </div>
            <span className="text-xs text-zinc-300 text-center font-mono group-hover:text-fuchsia-400">
              {icon.title}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Floating info */}
      <div className="absolute top-4 right-4 text-right text-sm font-mono text-zinc-400">
        <div>TLC OS v1.0</div>
        <div>{new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  )
}
