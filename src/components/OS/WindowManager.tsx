"use client"

import { createContext, useContext, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type WindowType = {
  id: string
  title: string
  component: React.ComponentType<any>
  props?: any
  position: { x: number; y: number }
  size: { width: number; height: number }
  minimized: boolean
  maximized: boolean
  zIndex: number
}

type WindowContextType = {
  windows: WindowType[]
  openWindow: (window: Omit<WindowType, 'id' | 'position' | 'minimized' | 'maximized' | 'zIndex'>) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  moveWindow: (id: string, position: { x: number; y: number }) => void
  resizeWindow: (id: string, size: { width: number; height: number }) => void
}

const WindowContext = createContext<WindowContextType | null>(null)

export function useWindows() {
  const context = useContext(WindowContext)
  if (!context) throw new Error('useWindows must be used within WindowManager')
  return context
}

export function WindowManager({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowType[]>([])
  const nextZIndex = useRef(100)

  const openWindow = (windowData: Omit<WindowType, 'id' | 'position' | 'minimized' | 'maximized' | 'zIndex'>) => {
    const id = `window-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const newWindow: WindowType = {
      ...windowData,
      id,
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      minimized: false,
      maximized: false,
      zIndex: nextZIndex.current++
    }
    setWindows(prev => [...prev, newWindow])
  }

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w))
  }

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: !w.maximized, minimized: false } : w))
  }

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex.current++, minimized: false } : w))
  }

  const moveWindow = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position } : w))
  }

  const resizeWindow = (id: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, size } : w))
  }

  return (
    <WindowContext.Provider value={{
      windows,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      moveWindow,
      resizeWindow
    }}>
      {children}
      <div className="fixed inset-0 pointer-events-none">
        <AnimatePresence>
          {windows.filter(w => !w.minimized).map(window => (
            <Window key={window.id} window={window} />
          ))}
        </AnimatePresence>
      </div>
    </WindowContext.Provider>
  )
}

function Window({ window }: { window: WindowType }) {
  const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, moveWindow, resizeWindow } = useWindows()
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => {
    focusWindow(window.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: window.maximized ? 0 : window.position.x,
        y: window.maximized ? 0 : window.position.y,
        width: window.maximized ? '100vw' : window.size.width,
        height: window.maximized ? 'calc(100vh - 48px)' : window.size.height
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute pointer-events-auto bg-zinc-900 border border-fuchsia-500/50 rounded-lg shadow-2xl shadow-fuchsia-500/20 overflow-hidden"
      style={{ zIndex: window.zIndex }}
      onMouseDown={handleMouseDown}
      drag={!window.maximized}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false)
        moveWindow(window.id, {
          x: window.position.x + info.offset.x,
          y: window.position.y + info.offset.y
        })
      }}
      dragConstraints={{ left: 0, top: 0, right: window.maximized ? 0 : window.size.width, bottom: window.maximized ? 0 : window.size.height }}
      dragElastic={0}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between p-2 bg-zinc-800 border-b border-zinc-700 cursor-move">
        <span className="text-sm font-mono text-zinc-100">{window.title}</span>
        <div className="flex gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id) }}
            className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-400"
          />
          <button
            onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id) }}
            className="w-4 h-4 bg-green-500 rounded-full hover:bg-green-400"
          />
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(window.id) }}
            className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-400"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="h-full overflow-auto">
        <window.component {...window.props} />
      </div>
    </motion.div>
  )
}
