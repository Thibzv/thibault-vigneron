'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface NavVisibilityProps {
  children: ReactNode
}

export default function NavVisibility({ children }: NavVisibilityProps) {
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollTop = useRef(0)
  const pathname = usePathname()

  // Réinitialiser l'état de la navbar lors de la navigation
  useEffect(() => {
    setIsHidden(false)
    lastScrollTop.current = 0
  }, [pathname])

  useEffect(() => {
    const toggleOnScroll = () => {
      const currentScrollTop = window.pageYOffset

      if (currentScrollTop >= 200) {
        const scrollDifference = Math.abs(currentScrollTop - lastScrollTop.current)

        if (scrollDifference > 5) {
          if (currentScrollTop > lastScrollTop.current) {
            setIsHidden(true)
          } else if (currentScrollTop < lastScrollTop.current) {
            setIsHidden(false)
          }
        }
      }

      lastScrollTop.current = currentScrollTop
    }

    window.addEventListener('scroll', toggleOnScroll)

    return () => {
      window.removeEventListener('scroll', toggleOnScroll)
    }
  }, [pathname])

  return (
    <nav className="nav" aria-hidden={isHidden}>
      {children}
    </nav>
  )
}
