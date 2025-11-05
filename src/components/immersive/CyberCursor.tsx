'use client'

import { useEffect, useState } from 'react'

export default function CyberCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('button, a, .holo, input, select, textarea, [role="button"]')
      setIsHovering(!!isInteractive)
    }

    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', () => setIsHovering(false))

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', () => setIsHovering(false))
    }
  }, [])

  return (
    <div
      className={`cyber-cursor ${isHovering ? 'hover' : ''}`}
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
    />
  )
}
