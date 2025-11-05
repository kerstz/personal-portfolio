"use client"

import { useState } from 'react'
import Terminal from '@/components/Terminal'

export default function DockTerminal() {
  const [open, setOpen] = useState(true)
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-5xl p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-zinc-400">Dock Terminal</span>
          <button onClick={()=>setOpen(!open)} className="text-xs font-mono text-fuchsia-400">{open ? 'Minimiser' : 'Ouvrir'}</button>
        </div>
        {open && <Terminal />}
      </div>
    </div>
  )
}


