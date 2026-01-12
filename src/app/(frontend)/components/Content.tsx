import React, { type ReactNode } from 'react'

// Type pour le richText Lexical
type LexicalContent = {
  root: {
    type: string
    children: {
      type: any
      version: number
      [k: string]: unknown
    }[]
    direction: ('ltr' | 'rtl') | null
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
    indent: number
    version: number
  }
  [k: string]: unknown
} | null

interface ContentProps {
  children?: ReactNode | LexicalContent
}

// Fonction pour extraire les blocs (paragraphes, titres, etc.) du richText Lexical
function extractBlocks(content: LexicalContent): ReactNode[] {
  if (!content?.root?.children) {
    return []
  }

  const blocks: ReactNode[] = []

  const renderNode = (node: any): ReactNode => {
    // Texte simple avec styles
    if (node.type === 'text') {
      const text = node.text || ''
      if (node.format !== undefined) {
        let element: ReactNode = text

        if (node.format & 1) {
          // Bold
          element = <strong>{element}</strong>
        }
        if (node.format & 2) {
          // Italic
          element = <em>{element}</em>
        }
        if (node.format & 4) {
          // Underline
          element = <u>{element}</u>
        }
        if (node.format & 8) {
          // Strikethrough
          element = <s>{element}</s>
        }

        return element
      }
      return text
    }

    // Saut de ligne
    if (node.type === 'linebreak') {
      return <br />
    }

    // Liens (link, autolink, etc.)
    if (node.type === 'link' || node.type === 'autolink') {
      const url = node.fields?.url || node.url || '#'
      const rel = node.fields?.rel || 'noreferrer'
      const target = node.fields?.newTab || node.newTab ? '_blank' : undefined

      return (
        <a href={url} rel={rel} target={target}>
          {node.children?.map((child: any, index: number) => (
            <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
          ))}
        </a>
      )
    }

    if (node.children) {
      return (
        <>
          {node.children.map((child: any, index: number) => (
            <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
          ))}
        </>
      )
    }

    return null
  }

  content.root.children.forEach((child: any, childIndex: number) => {
    if (!child?.children) return

    // Paragraphes
    if (child.type === 'paragraph') {
      const paragraphContent = (
        <p key={childIndex}>
          {child.children.map((node: any, index: number) => (
            <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
          ))}
        </p>
      )
      blocks.push(paragraphContent)
      return
    }

    // Titres h1-h6
    if (child.type === 'heading') {
      const tag =
        typeof child.tag === 'string' && /^h[1-6]$/.test(child.tag) ? child.tag : ('h2' as const)
      const headingContent = React.createElement(
        tag,
        { key: childIndex },
        child.children.map((node: any, index: number) => (
          <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
        )),
      )
      blocks.push(headingContent)
      return
    }

    // Listes (ul / ol)
    if (child.type === 'list') {
      const Tag = (child.tag as 'ul' | 'ol') || 'ul'

      const listContent = (
        <Tag key={childIndex}>
          {child.children.map((item: any, itemIndex: number) => {
            // Chaque item de liste
            if (item.type === 'listitem' && item.children) {
              return (
                <li key={itemIndex}>
                  {item.children.map((node: any, index: number) => (
                    <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
                  ))}
                </li>
              )
            }

            // Fallback si la structure n'est pas exactement comme prévu
            return (
              <li key={itemIndex}>
                <React.Fragment>{renderNode(item)}</React.Fragment>
              </li>
            )
          })}
        </Tag>
      )

      blocks.push(listContent)
      return
    }
  })

  return blocks
}

export default function Content({ children }: ContentProps) {
  if (!children) {
    return null
  }

  // Vérifier si c'est un objet richText Lexical
  const isLexicalContent =
    typeof children === 'object' &&
    children !== null &&
    'root' in children &&
    typeof (children as any).root === 'object' &&
    'children' in (children as any).root

  if (isLexicalContent) {
    const blocks = extractBlocks(children as LexicalContent)
    if (blocks.length === 0) {
      return null
    }
    return <div className="content">{blocks}</div>
  }

  // Sinon, rendre les children normalement
  return <div className="content">{children as ReactNode}</div>
}
