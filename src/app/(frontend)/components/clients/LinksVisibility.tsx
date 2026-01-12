'use client'

import type { ReactNode, CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface LinksVisibilityProps {
  children: ReactNode
}

export default function LinksVisibility({ children }: LinksVisibilityProps) {
  const pathname = usePathname()
  const [isHidden, setIsHidden] = useState(true)

  const isContactOrDevisPage = pathname === '/contact' || pathname === '/devis'

  useEffect(() => {
    if (isContactOrDevisPage) {
      setIsHidden(true)
      return
    }

    const mainHeader = document.querySelector<HTMLElement>('.main-header')
    const footer = document.querySelector<HTMLElement>('.footer')
    const isHomePage = Boolean(mainHeader)

    let shouldShowLinks = !isHomePage
    let isFooterVisible = false

    const updateLinksVisibility = () => {
      if (shouldShowLinks && !isFooterVisible) {
        setIsHidden(false)
      } else {
        setIsHidden(true)
      }
    }

    let headerObserver: IntersectionObserver | null = null
    if (mainHeader) {
      headerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            shouldShowLinks = entry.intersectionRatio < 0.5
            updateLinksVisibility()
          })
        },
        {
          threshold: [0, 0.5, 1],
          rootMargin: '0px',
        },
      )

      headerObserver.observe(mainHeader)
    }

    let footerObserver: IntersectionObserver | null = null
    if (footer) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isFooterVisible = entry.isIntersecting
            updateLinksVisibility()
          })
        },
        {
          threshold: 0,
          rootMargin: '0px',
        },
      )

      footerObserver.observe(footer)
    }

    updateLinksVisibility()

    return () => {
      headerObserver?.disconnect()
      footerObserver?.disconnect()
    }
  }, [isContactOrDevisPage])

  const hiddenStyle: CSSProperties | undefined = isContactOrDevisPage
    ? { display: 'none' }
    : undefined

  return (
    <nav id="links" className="links" aria-hidden={isHidden} style={hiddenStyle}>
      {children}
    </nav>
  )
}
