"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Notification = {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  duration?: number
}

type NotificationContextType = {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications must be used within NotificationProvider')
  return context
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notificationData: Omit<Notification, 'id'>) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const notification: Notification = {
      ...notificationData,
      id,
      duration: notificationData.duration || 5000
    }
    
    setNotifications(prev => [...prev, notification])

    // Auto remove
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Welcome notification
  useEffect(() => {
    setTimeout(() => {
      addNotification({
        title: 'Système initialisé',
        message: 'Bienvenue dans TLC OS. Double-clic sur les icônes pour ouvrir les applications.',
        type: 'success'
      })
    }, 1000)
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <NotificationDisplay />
    </NotificationContext.Provider>
  )
}

function NotificationDisplay() {
  const { notifications, removeNotification } = useNotifications()

  const getTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'border-green-500/50 bg-green-500/10'
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10'
      case 'error': return 'border-red-500/50 bg-red-500/10'
      default: return 'border-fuchsia-500/50 bg-fuchsia-500/10'
    }
  }

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'error': return '❌'
      default: return 'ℹ️'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className={`p-4 rounded-lg border backdrop-blur-sm ${getTypeStyles(notification.type)}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">{getIcon(notification.type)}</span>
              <div className="flex-1">
                <h4 className="font-mono text-sm font-semibold text-zinc-100">
                  {notification.title}
                </h4>
                <p className="text-xs text-zinc-300 mt-1">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-zinc-400 hover:text-zinc-100 text-lg leading-none"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
