"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function NeonGrid() {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const lines = []
  const size = 20
  const step = 2

  // Grille horizontale
  for (let i = -size; i <= size; i += step) {
    const points = [new THREE.Vector3(-size, 0, i), new THREE.Vector3(size, 0, i)]
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: "#22c55e", opacity: 0.6, transparent: true })
    const line = new THREE.Line(geometry, material)
    lines.push(
      <primitive key={`h${i}`} object={line} />
    )
  }

  // Grille verticale
  for (let i = -size; i <= size; i += step) {
    const points = [new THREE.Vector3(i, 0, -size), new THREE.Vector3(i, 0, size)]
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: "#c026d3", opacity: 0.4, transparent: true })
    const line = new THREE.Line(geometry, material)
    lines.push(
      <primitive key={`v${i}`} object={line} />
    )
  }

  return (
    <group ref={groupRef} position={[0, -5, 0]}>
      {lines}
    </group>
  )
}

export default function HeaderShader() {
  return (
    <div className="h-40 border border-fuchsia-500/30 rounded overflow-hidden bg-black/50">
      <Canvas camera={{ position: [0, 8, 15], fov: 50 }}>
        <ambientLight intensity={0.1} />
        <NeonGrid />
      </Canvas>
    </div>
  )
}


