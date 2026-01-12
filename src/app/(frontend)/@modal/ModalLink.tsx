'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface ModalLinkProps {
  href: string
  className?: string
  title?: string
  'aria-label'?: string
  scroll?: boolean
  children: React.ReactNode
}

export default function ModalLink({
  href,
  className,
  title,
  'aria-label': ariaLabel,
  scroll,
  children,
}: ModalLinkProps) {
  const pathname = usePathname()

  const isOnModalPage =
    (href === '/contact' && pathname === '/contact') || (href === '/devis' && pathname === '/devis')

  const handleClick = (e: React.MouseEvent) => {
    if (isOnModalPage) {
      e.preventDefault()
      return false
    }
  }

  return (
    <Link
      className={className}
      href={href}
      title={title}
      aria-label={ariaLabel}
      scroll={scroll}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}
