import Link from 'next/link'
import type { ReactNode } from 'react'

interface TagProps {
  href?: string | null
  className?: string
  children?: ReactNode
}

export default function Tag({ href, className, children }: TagProps) {
  const tagClassName = ['tag', className].filter(Boolean).join(' ')

  if (href) {
    return (
      <Link className={tagClassName} href={href}>
        {children}
      </Link>
    )
  }

  return <p className={tagClassName}>{children}</p>
}


