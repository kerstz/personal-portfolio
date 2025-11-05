'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 2000
  
  // Generate random particle positions
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    // Position
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    
    // Colors (green/violet cyberpunk palette)
    const colorChoice = Math.random()
    if (colorChoice < 0.5) {
      // Green
      colors[i * 3] = 0.13 // R
      colors[i * 3 + 1] = 0.77 // G
      colors[i * 3 + 2] = 0.37 // B
    } else {
      // Violet
      colors[i * 3] = 0.75 // R
      colors[i * 3 + 1] = 0.15 // G
      colors[i * 3 + 2] = 0.83 // B
    }
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  )
}
