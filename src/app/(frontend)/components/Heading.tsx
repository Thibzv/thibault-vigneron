import type { ReactNode } from 'react'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'

interface HeadingProps {
  tag?: HeadingTag
  className?: string
  children?: ReactNode
}

export default function Heading({ tag: Tag = 'h1', className, children }: HeadingProps) {
  return <Tag className={className}>{children}</Tag>
}
