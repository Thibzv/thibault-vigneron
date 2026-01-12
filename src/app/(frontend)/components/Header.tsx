import React from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'
import type { Page } from '@/payload-types'

import Button from './Button'
import HeaderCardsAnimation from './clients/HeaderCardsAnimation'
import Heading from './Heading'
import Tag from './Tag'
import Content from './Content'

type HeaderData = Exclude<Page['header'], undefined>

function renderHeadingContent(content: HeaderData['heading']) {
  if (!content?.root?.children) {
    return null
  }

  const renderInlineNode = (node: any, index: number): React.ReactNode => {
    if (node.type === 'text') {
      let text: React.ReactNode = node.text || ''

      // Appliquer le formatage
      if (node.format !== undefined) {
        if (node.format & 1) {
          // Bold
          text = <strong>{text}</strong>
        }
        if (node.format & 2) {
          // Italic
          text = <em>{text}</em>
        }
        if (node.format & 4) {
          // Underline
          text = <u>{text}</u>
        }
        if (node.format & 8) {
          // Strikethrough
          text = <s>{text}</s>
        }
      }

      // Gérer les classes CSS personnalisées (comme main-header__words)
      if (node.style) {
        return (
          <span key={index} className={node.style}>
            {text}
          </span>
        )
      }

      return <React.Fragment key={index}>{text}</React.Fragment>
    }

    // Ignorer les paragraphes dans le heading, mais rendre leur contenu
    if (node.type === 'paragraph') {
      return (
        <React.Fragment key={index}>
          {node.children?.map((child: any, childIndex: number) =>
            renderInlineNode(child, childIndex),
          )}
        </React.Fragment>
      )
    }

    if (node.type === 'linebreak') {
      return <br key={index} />
    }

    if (node.type === 'link') {
      return (
        <a key={index} href={node.fields?.url || '#'}>
          {node.children?.map((child: any, childIndex: number) =>
            renderInlineNode(child, childIndex),
          )}
        </a>
      )
    }

    // Par défaut, rendre les enfants (uniquement inline)
    if (node.children) {
      return (
        <React.Fragment key={index}>
          {node.children.map((child: any, childIndex: number) =>
            renderInlineNode(child, childIndex),
          )}
        </React.Fragment>
      )
    }

    return null
  }

  return (
    <>{content.root.children.map((child: any, index: number) => renderInlineNode(child, index))}</>
  )
}

interface HeaderProps {
  data?: Page['header'] | null
}

export default async function Header({ data }: HeaderProps) {
  if (!data) {
    return null
  }

  const hasContent = Boolean(data.tag || data.heading || data.description)

  if (!hasContent) {
    return null
  }

  // Récupérer les boutons depuis le global Links
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const links = await payload.findGlobal({
    slug: 'links',
    depth: 2,
  })

  const hasButtons = Array.isArray(links?.ctaButtons) && links.ctaButtons.length > 0

  return (
    <>
      <header className="main-header">
        <div className="main-header__left">
          {data.tag && <Tag>{data.tag}</Tag>}

          {data.heading && (
            <Heading tag="h1" className="heading heading--extra">
              {renderHeadingContent(data.heading)}
            </Heading>
          )}

          {data.description && <Content>{data.description}</Content>}

          {hasButtons && (
            <nav className="main-header__nav">
              {links.ctaButtons?.map((button) => (
                <Button
                  key={button.id || button.href || button.title}
                  variant={button.variant || 'primary'}
                  href={button.href || '#'}
                  title={button.title || ''}
                  icon={button.icon || undefined}
                  border={Boolean(button.border)}
                />
              ))}
            </nav>
          )}
        </div>

        <div className="main-header__right"></div>
      </header>

      <HeaderCardsAnimation />
    </>
  )
}
