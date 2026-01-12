'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface ModalProps {
  children: React.ReactNode
  className?: string
}

export default function Modal({ children, className }: ModalProps) {
  const router = useRouter()
  const pathname = usePathname()

  const isModalRoute = pathname.startsWith('/contact') || pathname.startsWith('/devis')

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    router.back()
  }

  useEffect(() => {
    if (isModalRoute) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'auto'
      }
    }
  }, [isModalRoute])

  if (!isModalRoute) {
    return null
  }

  return (
    <aside className={`modal ${className || ''}`}>
      <button
        className="modal__overlay"
        onClick={handleClose}
        aria-label="Fermer la modal"
      ></button>

      <div className="modal__content">{children}</div>
    </aside>
  )
}
