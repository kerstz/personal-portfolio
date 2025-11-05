'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CyberBootProps {
  onLanguageSelect: (locale: 'fr' | 'en') => void
}

export default function CyberBoot({ onLanguageSelect }: CyberBootProps) {
  const [bootStage, setBootStage] = useState<'init' | 'loading' | 'language' | 'complete'>('init')
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('')

  const bootSequence = [
    'INITIALIZING QUANTUM NEURAL NETWORK...',
    'LOADING CYBERNETIC PROTOCOLS...',
    'ESTABLISHING ENCRYPTED CHANNELS...',
    'CALIBRATING HOLOGRAPHIC INTERFACE...',
    'SYNCING TEMPORAL MATRICES...',
    'ACTIVATING SECURITY PROTOCOLS...',
    'READY FOR NEURAL LINK...'
  ]

  useEffect(() => {
    // Initial delay
    setTimeout(() => setBootStage('loading'), 500)
  }, [])

  useEffect(() => {
    if (bootStage === 'loading') {
      let currentStep = 0
      const interval = setInterval(() => {
        if (currentStep < bootSequence.length) {
          setLoadingText(bootSequence[currentStep])
          setProgress((currentStep + 1) / bootSequence.length * 100)
          currentStep++
        } else {
          clearInterval(interval)
          setTimeout(() => setBootStage('language'), 800)
        }
      }, 800)

      return () => clearInterval(interval)
    }
  }, [bootStage])

  const handleLanguageSelect = (locale: 'fr' | 'en') => {
    setBootStage('complete')
    setTimeout(() => onLanguageSelect(locale), 1000)
  }

  if (bootStage === 'complete') return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
      >
        {/* Animated grid background */}
        <div className="absolute inset-0">
          <div className="cyber-grid opacity-20" />
          <div className="scanlines opacity-10" />
        </div>

        <div className="relative z-10 text-center space-y-8">
          {/* Logo/Title */}
          <motion.div
            initial={{ scale: 0, rotateX: 90 }}
            animate={{ scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl font-mono text-green-400 neon-title"
          >
            TLC
          </motion.div>

          {bootStage === 'init' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 font-mono"
            >
              NEURAL INTERFACE DETECTED...
            </motion.div>
          )}

          {bootStage === 'loading' && (
            <div className="space-y-6">
              <motion.div
                key={loadingText}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-green-400 font-mono text-sm"
              >
                {loadingText}
              </motion.div>

              {/* Progress bar */}
              <div className="w-80 h-2 bg-gray-800 border border-green-500/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-fuchsia-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="text-green-400 font-mono text-xs">
                {Math.round(progress)}% COMPLETE
              </div>
            </div>
          )}

          {bootStage === 'language' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-slate-300 font-medium text-xl mb-8">
                Choisissez votre langue / Select your language
              </div>
              
              <div className="flex gap-8 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLanguageSelect('fr')}
                  className="holo px-8 py-4 font-medium text-slate-200 hover:text-white transition-colors"
                >
                  Français
                  <div className="text-sm opacity-60 mt-1">FR</div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLanguageSelect('en')}
                  className="holo px-8 py-4 font-medium text-slate-200 hover:text-white transition-colors"
                >
                  English
                  <div className="text-sm opacity-60 mt-1">EN-US</div>
                </motion.button>
              </div>

              <div className="text-slate-400 text-sm mt-8">
                Cliquez pour continuer
              </div>
            </motion.div>
          )}
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-green-500" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-green-500" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-fuchsia-500" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-fuchsia-500" />
      </motion.div>
    </AnimatePresence>
  )
}
