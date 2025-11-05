"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Terminal from '@/components/Terminal'

export default function TerminalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="terminal" className="min-h-screen py-20 relative">
      {/* Arrière-plan en grille */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-6">
            &lt;/TERMINAL&gt;
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8">
            Interface en ligne de commande interactive avec vraies commandes système
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Documentation des commandes */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-black/80 border border-green-500/50 rounded-lg p-6">
              <h3 className="text-xl font-mono text-green-400 mb-4">📚 Manuel d'utilisation</h3>
              <div className="space-y-3 text-sm font-mono">
                <div>
                  <span className="text-green-400">help</span>
                  <span className="text-zinc-400 ml-4">Affiche toutes les commandes</span>
                </div>
                <div>
                  <span className="text-green-400">ls</span>
                  <span className="text-zinc-400 ml-4">Liste les sections disponibles</span>
                </div>
                <div>
                  <span className="text-green-400">projects</span>
                  <span className="text-zinc-400 ml-4">Affiche la liste des projets</span>
                </div>
                <div>
                  <span className="text-green-400">cat &lt;file&gt;</span>
                  <span className="text-zinc-400 ml-4">Lit le contenu d'un fichier</span>
                </div>
                <div className="text-zinc-500 text-xs mt-3">
                  Fichiers disponibles: about.md, manifesto.md, pgp.asc
                </div>
              </div>
            </div>

            <div className="bg-black/80 border border-fuchsia-500/50 rounded-lg p-6">
              <h3 className="text-xl font-mono text-fuchsia-400 mb-4">⚡ Commandes système</h3>
              <div className="space-y-3 text-sm font-mono">
                <div>
                  <span className="text-fuchsia-400">theme crt on/off</span>
                  <span className="text-zinc-400 ml-4">Active l'effet CRT</span>
                </div>
                <div>
                  <span className="text-fuchsia-400">admin login</span>
                  <span className="text-zinc-400 ml-4">Accès panneau admin</span>
                </div>
                <div>
                  <span className="text-fuchsia-400">admin whoami</span>
                  <span className="text-zinc-400 ml-4">Status connexion</span>
                </div>
                <div>
                  <span className="text-fuchsia-400">clear</span>
                  <span className="text-zinc-400 ml-4">Nettoie l'écran</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-lg p-6">
              <h3 className="text-xl font-mono text-cyan-400 mb-3">💡 Astuce</h3>
              <p className="text-zinc-300 text-sm">
                Tapez <code className="bg-zinc-800 px-2 py-1 rounded text-green-400">help</code> pour 
                découvrir toutes les commandes disponibles. Le terminal supporte l'autocomplétion 
                et l'historique des commandes.
              </p>
            </div>
          </motion.div>

          {/* Terminal interactif */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="lg:col-span-8"
          >
            <div className="bg-black/90 border border-green-500/50 rounded-lg p-2 shadow-2xl shadow-green-500/20">
              {/* Header du terminal */}
              <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-zinc-900 rounded-t">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-sm text-zinc-400 font-mono">
                  TLC Terminal v2.0 - Cypherpunk Edition
                </span>
              </div>
              
              {/* Terminal component */}
              <Terminal />
            </div>
          </motion.div>
        </div>

        {/* Stats du terminal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-black/50 border border-green-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-mono text-green-400">13+</div>
            <div className="text-sm text-zinc-400">Commandes</div>
          </div>
          <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-mono text-cyan-400">∞</div>
            <div className="text-sm text-zinc-400">Possibilités</div>
          </div>
          <div className="bg-black/50 border border-fuchsia-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-mono text-fuchsia-400">100%</div>
            <div className="text-sm text-zinc-400">Immersif</div>
          </div>
          <div className="bg-black/50 border border-yellow-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-mono text-yellow-400">0ms</div>
            <div className="text-sm text-zinc-400">Latence</div>
          </div>
        </motion.div>

        {/* Message de défi */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-green-400 font-mono text-lg mb-2">
              &gt; Prêt pour le défi ?
            </p>
            <p className="text-zinc-300">
              Essayez de découvrir l'easter egg caché... 
              <span className="text-fuchsia-400">Indices: ↑↑↓↓←→←→BA</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
