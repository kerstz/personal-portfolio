"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import TlcLogo from '@/components/TlcLogo'

export default function HeroSection() {
  const matrixRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = matrixRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Matrix rain effect
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#22c55e'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Matrix rain background */}
      <canvas
        ref={matrixRef}
        className="absolute inset-0 opacity-20"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      {/* Contenu principal */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 mb-6"
        >
          Your Name
        </motion.h1>

        {/* Sous-titre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-4 mb-8"
        >
          <p className="text-xl md:text-2xl text-zinc-300">
            Développeur Cypherpunk & Architecte de Solutions
          </p>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Liberté numérique • Cryptographie • Sécurité • Technologies émergentes
          </p>
        </motion.div>

        {/* Terminal simulator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-black/80 border border-fuchsia-500/50 rounded-lg p-6 mb-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-sm text-zinc-400">guest@tlc:~$</span>
          </div>
          <div className="font-mono text-left space-y-2">
            <TypeWriter text="whoami" delay={1500} />
            <TypeWriter text="> Cypherpunk developer" delay={2000} />
            <TypeWriter text="> Security enthusiast" delay={2500} />
            <TypeWriter text="> Privacy advocate" delay={3000} />
            <TypeWriter text="cat manifesto.txt" delay={3500} />
            <TypeWriter 
              text="> 'Privacy is not secrecy. Privacy is the power to selectively reveal oneself.'" 
              delay={4000} 
              className="text-green-400"
            />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToAbout}
            className="px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-mono rounded-lg hover:from-fuchsia-700 hover:to-cyan-700 transition-all transform hover:scale-105"
          >
            EXPLORER LE SYSTÈME
          </button>
          <button
            onClick={() => document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border border-fuchsia-500 text-fuchsia-400 font-mono rounded-lg hover:bg-fuchsia-500/10 transition-all"
          >
            ACCÉDER AU TERMINAL
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-fuchsia-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-fuchsia-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

function TypeWriter({ text, delay, className = "text-zinc-100" }: { text: string; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
      className={className}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (delay / 1000) + (i * 0.05) }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}
