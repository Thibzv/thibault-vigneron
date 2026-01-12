import Link from 'next/link'
import React from 'react'

import ModalLink from '../@modal/ModalLink'

interface ButtonProps {
  href?: string | false
  variant?: 'primary' | 'secondary'
  title: string
  icon?: string
  border?: boolean
  type?: 'link' | 'button' | 'submit'
  onClick?: (e: React.MouseEvent) => void
  disabled?: boolean
}

export default function Button({
  href,
  variant = 'primary',
  title,
  icon,
  border = false,
  type = 'link',
  onClick,
  disabled,
}: ButtonProps) {
  const className = `button button--${variant} ${border ? 'button--border' : ''}`

  if (type === 'button' || type === 'submit') {
    return (
      <button
        className={className}
        type={type === 'submit' ? 'submit' : 'button'}
        onClick={onClick}
        disabled={disabled}
        aria-label={title}
      >
        <span className="button__inner">
          <span className="button__icon">
            {icon && (
              <>
                <span className={`icon-${icon}`}></span>
                <span className={`icon-${icon}`}></span>
              </>
            )}
          </span>
        </span>
        <span className="button__label">{title}</span>
      </button>
    )
  }

  // Désactiver le scroll automatique pour les liens vers /contact et /devis (modales)
  const shouldScroll = href !== '/contact' && href !== '/devis'
  const isModalLink = href === '/contact' || href === '/devis'

  const buttonContent = (
    <>
      <span className="button__inner">
        <span className="button__icon">
          {icon && (
            <>
              <span className={`icon-${icon}`}></span>
              <span className={`icon-${icon}`}></span>
            </>
          )}
        </span>
      </span>
      <span className="button__label">{title}</span>
    </>
  )

  // Utiliser ModalLink pour les liens de modal, Link normal pour les autres
  if (isModalLink && href) {
    return (
      <ModalLink
        href={href}
        className={className}
        title={title}
        aria-label={title}
        scroll={shouldScroll}
      >
        {buttonContent}
      </ModalLink>
    )
  }

  return (
    <Link
      className={className}
      href={href || '#'}
      title={title}
      aria-label={title}
      scroll={shouldScroll}
      onClick={onClick}
    >
      {buttonContent}
    </Link>
  )
}
