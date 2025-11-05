'use client'

import { useEffect, useRef, useState } from 'react'

export default function CyberAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const gainNodeRef = useRef<GainNode | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    return () => {
      stopAmbient()
    }
  }, [])

  const generateAmbientSound = () => {
    if (!audioContextRef.current) return

    const context = audioContextRef.current
    
    // Main gain node for volume control
    gainNodeRef.current = context.createGain()
    gainNodeRef.current.gain.setValueAtTime(volume, context.currentTime)
    gainNodeRef.current.connect(context.destination)

    // Create multiple oscillators for ambient layers
    const frequencies = [40, 80, 120, 160, 220] // Low frequency ambient
    
    oscillatorsRef.current = frequencies.map((freq, index) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      
      // Different waveforms for variety
      oscillator.type = index % 2 === 0 ? 'sine' : 'triangle'
      oscillator.frequency.setValueAtTime(freq, context.currentTime)
      
      // Very low volume for each layer
      gain.gain.setValueAtTime(0.02 / frequencies.length, context.currentTime)
      
      // Add some slow modulation
      const lfo = context.createOscillator()
      const lfoGain = context.createGain()
      lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.3, context.currentTime)
      lfo.type = 'sine'
      lfoGain.gain.setValueAtTime(freq * 0.1, context.currentTime)
      
      lfo.connect(lfoGain)
      lfoGain.connect(oscillator.frequency)
      lfo.start()
      
      oscillator.connect(gain)
      gain.connect(gainNodeRef.current!)
      
      oscillator.start()
      return oscillator
    })
  }

  const startAmbient = () => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume()
    }
    generateAmbientSound()
    setIsPlaying(true)
  }

  const stopAmbient = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop()
      } catch (e) {
        // Oscillator might already be stopped
      }
    })
    oscillatorsRef.current = []
    setIsPlaying(false)
  }

  const toggleAmbient = () => {
    if (isPlaying) {
      stopAmbient()
    } else {
      startAmbient()
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVolume, audioContextRef.current!.currentTime)
    }
  }

  const playClickSound = () => {
    if (!audioContextRef.current) return

    const context = audioContextRef.current
    const oscillator = context.createOscillator()
    const gain = context.createGain()

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(800, context.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, context.currentTime + 0.1)

    gain.gain.setValueAtTime(0.1, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1)

    oscillator.connect(gain)
    gain.connect(context.destination)

    oscillator.start()
    oscillator.stop(context.currentTime + 0.1)
  }

  const playHoverSound = () => {
    if (!audioContextRef.current) return

    const context = audioContextRef.current
    const oscillator = context.createOscillator()
    const gain = context.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(600, context.currentTime)

    gain.gain.setValueAtTime(0.05, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.05)

    oscillator.connect(gain)
    gain.connect(context.destination)

    oscillator.start()
    oscillator.stop(context.currentTime + 0.05)
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/50 backdrop-blur border border-green-500/30 rounded p-3">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleAmbient}
          onMouseEnter={playHoverSound}
          onMouseDown={playClickSound}
          className="text-green-400 hover:text-green-300 transition-colors"
          title="Toggle ambient sound"
        >
          {isPlaying ? '🔊' : '🔇'}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-20 accent-green-500"
          title="Volume"
        />
        
        <span className="text-green-400 text-xs font-mono">
          AUDIO
        </span>
      </div>
    </div>
  )
}
