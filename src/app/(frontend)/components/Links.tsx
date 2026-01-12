import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Button from './Button'
import LinksVisibility from './clients/LinksVisibility'

export default async function Links() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const links = await payload.findGlobal({
    slug: 'links',
    depth: 2,
  })

  if (!links) {
    return null
  }

  const hasButtons = Array.isArray(links.ctaButtons) && links.ctaButtons.length > 0
  const hasLinkedin = Boolean(links.linkedinUrl)

  if (!hasButtons && !hasLinkedin) {
    return null
  }

  return (
    <LinksVisibility>
      {hasButtons && (
        <div className="links__btns">
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
        </div>
      )}

      {hasLinkedin && (
        <Link
          className="links__linkedin"
          href={links.linkedinUrl as string}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <span className="icon-linkedin"></span>
          <span className="icon-linkedin"></span>
        </Link>
      )}
    </LinksVisibility>
  )
}
