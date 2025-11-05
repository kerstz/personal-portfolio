"use client"

import { WindowManager } from './WindowManager'
import { NotificationProvider } from './NotificationSystem'
import Desktop from './Desktop'
import Taskbar from './Taskbar'
import CyberBackground from './CyberBackground'
import KonamiEgg from '@/components/KonamiEgg'

export default function CyberOS() {
  return (
    <NotificationProvider>
      <WindowManager>
        <div className="h-screen w-screen overflow-hidden bg-black text-zinc-100 font-mono">
          {/* Arrière-plan animé */}
          <CyberBackground />
          
          {/* Bureau avec icônes */}
          <Desktop />
          
          {/* Barre des tâches */}
          <Taskbar />
          
          {/* Easter egg */}
          <KonamiEgg />
          
          {/* Overlay CRT */}
          <div className="fixed inset-0 pointer-events-none z-10 bg-gradient-to-b from-transparent via-transparent to-black/10" />
        </div>
      </WindowManager>
    </NotificationProvider>
  )
}
