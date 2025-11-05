"use client"

import { useEffect, useState } from 'react'

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
]

export default function KonamiEgg() {
  const [sequence, setSequence] = useState<string[]>([])
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      setSequence(prev => {
        const newSeq = [...prev, e.code].slice(-KONAMI_CODE.length)
        const match = KONAMI_CODE.slice(0, newSeq.length).every((k, i) => k === newSeq[i])
        
        if (newSeq.length === KONAMI_CODE.length && match) {
          setShow(true)
          setProgress(100)
          return []
        }
        
        if (match) {
          setProgress((newSeq.length / KONAMI_CODE.length) * 100)
        } else {
          setProgress(0)
          return []
        }
        
        return newSeq
      })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const timer = setTimeout(() => setProgress(0), 2000)
      return () => clearTimeout(timer)
    }
  }, [progress])

  return (
    <>
      {/* Progress indicator */}
      {progress > 0 && progress < 100 && (
        <div className="fixed top-4 right-4 z-50 bg-black/80 border border-fuchsia-500/50 rounded p-2">
          <div className="text-xs text-fuchsia-400">Konami: {Math.round(progress)}%</div>
          <div className="w-16 h-1 bg-zinc-700 rounded overflow-hidden">
            <div 
              className="h-full bg-fuchsia-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Easter egg modal */}
      {show && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-black border border-fuchsia-500 rounded p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="text-2xl font-mono text-fuchsia-400 mb-4">ACCESS GRANTED</div>
              <div className="space-y-2 text-sm font-mono">
                <div>[DECRYPT] Initialisation...</div>
                <div>[DECRYPT] Analyse des patterns...</div>
                <div>[DECRYPT] Clé trouvée: CYPHERPUNK_2025</div>
                <div className="text-green-400">[SUCCESS] Message déchiffré:</div>
              </div>
              <div className="mt-4 p-3 bg-zinc-900 border border-zinc-700 rounded">
                <p className="text-green-400 font-mono text-sm">
                  "La liberté est le droit de dire aux gens ce qu'ils ne veulent pas entendre."
                  <br />
                  <span className="text-zinc-400">— George Orwell</span>
                </p>
              </div>
              <button
                onClick={() => setShow(false)}
                className="mt-4 px-4 py-2 border border-fuchsia-500 rounded hover:bg-fuchsia-500/20"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
