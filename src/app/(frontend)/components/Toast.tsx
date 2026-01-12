'use client'

import { useEffect } from 'react'

interface ToastProps {
  message: string | null
  type?: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose()
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  if (!message) return null

  return (
    <div className={`toast toast--${type}`} role="alert">
      <div className="toast__icon">
        <span className={`icon-${type === 'success' ? 'check' : 'cross'}`}></span>
      </div>
      <p className="toast__message">{message}</p>
    </div>
  )
}
