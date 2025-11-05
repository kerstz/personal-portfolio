'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CyberHUD() {
  const [time, setTime] = useState('')
  const [cpuUsage, setCpuUsage] = useState(0)
  const [memUsage, setMemUsage] = useState(0)
  const [networkActivity, setNetworkActivity] = useState(0)
  const [securityLevel, setSecurityLevel] = useState('MAXIMUM')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }

    const updateStats = () => {
      // Simulate system metrics
      setCpuUsage(Math.random() * 100)
      setMemUsage(60 + Math.random() * 30)
      setNetworkActivity(Math.random() * 1024)
    }

    updateTime()
    updateStats()

    const timeInterval = setInterval(updateTime, 1000)
    const statsInterval = setInterval(updateStats, 2000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(statsInterval)
    }
  }, [])

  const getStatusColor = (value: number, threshold: number) => {
    if (value < threshold) return 'text-green-400'
    if (value < threshold * 1.5) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-40 space-y-2"
    >
      {/* Time Display */}
      <div className="bg-black/60 backdrop-blur border border-green-500/30 rounded px-3 py-1">
        <div className="text-green-400 font-mono text-sm">
          <span className="text-green-300/60">NEURAL_TIME:</span> {time}
        </div>
      </div>

      {/* System Stats */}
      <div className="bg-black/60 backdrop-blur border border-green-500/30 rounded px-3 py-2 space-y-1">
        <div className="text-xs font-mono">
          <div className="flex justify-between items-center">
            <span className="text-green-300/60">CPU:</span>
            <span className={`${getStatusColor(cpuUsage, 70)} ml-2`}>
              {cpuUsage.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-300/60">MEM:</span>
            <span className={`${getStatusColor(memUsage, 80)} ml-2`}>
              {memUsage.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-300/60">NET:</span>
            <span className="text-cyan-400 ml-2">
              {networkActivity.toFixed(0)} KB/s
            </span>
          </div>
        </div>
      </div>

      {/* Security Status */}
      <div className="bg-black/60 backdrop-blur border border-fuchsia-500/30 rounded px-3 py-1">
        <div className="text-fuchsia-400 font-mono text-xs">
          <span className="text-fuchsia-300/60">SEC:</span> {securityLevel}
        </div>
      </div>

      {/* Connection Status */}
      <div className="bg-black/60 backdrop-blur border border-cyan-500/30 rounded px-3 py-1">
        <div className="text-cyan-400 font-mono text-xs flex items-center">
          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" />
          NEURAL_LINK_ACTIVE
        </div>
      </div>
    </motion.div>
  )
}
