"use client"

import { createContext, useContext, useRef, useEffect } from 'react'

type SoundContextType = {
  playClick: () => void
  playWindowOpen: () => void
  playWindowClose: () => void
  playNotification: () => void
  playTyping: () => void
  playError: () => void
  playSuccess: () => void
  toggleMute: () => void
  isMuted: boolean
}

const SoundContext = createContext<SoundContextType | null>(null)

export function useSounds() {
  const context = useContext(SoundContext)
  if (!context) throw new Error('useSounds must be used within SoundProvider')
  return context
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const isMutedRef = useRef(false)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current || isMutedRef.current) return

    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
    oscillator.type = type

    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  }

  const playClick = () => createTone(800, 0.1, 'square')
  const playWindowOpen = () => {
    createTone(600, 0.15, 'sawtooth')
    setTimeout(() => createTone(900, 0.1, 'sine'), 50)
  }
  const playWindowClose = () => {
    createTone(900, 0.1, 'sawtooth')
    setTimeout(() => createTone(600, 0.15, 'sine'), 50)
  }
  const playNotification = () => {
    createTone(1000, 0.1, 'sine')
    setTimeout(() => createTone(1200, 0.1, 'sine'), 100)
  }
  const playTyping = () => createTone(1500, 0.05, 'square')
  const playError = () => {
    createTone(200, 0.3, 'sawtooth')
    setTimeout(() => createTone(150, 0.2, 'square'), 100)
  }
  const playSuccess = () => {
    createTone(800, 0.1, 'sine')
    setTimeout(() => createTone(1000, 0.1, 'sine'), 80)
    setTimeout(() => createTone(1200, 0.15, 'sine'), 160)
  }

  const toggleMute = () => {
    isMutedRef.current = !isMutedRef.current
  }

  return (
    <SoundContext.Provider value={{
      playClick,
      playWindowOpen,
      playWindowClose,
      playNotification,
      playTyping,
      playError,
      playSuccess,
      toggleMute,
      isMuted: isMutedRef.current
    }}>
      {children}
    </SoundContext.Provider>
  )
}
