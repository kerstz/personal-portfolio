'use client'

import { useEffect, useState } from 'react'

export default function CyberEffects() {
  const [matrixColumns, setMatrixColumns] = useState<Array<{
    id: number
    left: number
    duration: number
    delay: number
    chars: string
  }>>([])

  useEffect(() => {
    // Generate matrix rain columns
    const columns = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      chars: generateMatrixChars()
    }))
    setMatrixColumns(columns)
  }, [])

  const generateMatrixChars = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return Array.from({ length: 20 }, () => 
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('')
  }

  return (
    <>
      {/* Scanlines */}
      <div className="scanlines" />
      
      {/* Noise */}
      <div className="noise" />
      
      {/* Cyber Grid */}
      <div className="cyber-grid" />
      
      {/* Matrix Rain */}
      <div className="matrix-rain">
        {matrixColumns.map((column) => (
          <div
            key={column.id}
            className="matrix-column"
            style={{
              left: `${column.left}%`,
              animationDuration: `${column.duration}s`,
              animationDelay: `${column.delay}s`
            }}
          >
            {column.chars.split('').map((char, i) => (
              <div key={i} style={{ opacity: 1 - (i * 0.1) }}>
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
