import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Button from './Button'
import NavVisibility from './clients/NavVisibility'

export default async function Nav() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const nav = await payload.findGlobal({
    slug: 'nav',
    depth: 2,
  })

  if (!nav) {
    return null
  }

  return (
    <NavVisibility>
      <div className="nav__container">
        <Link className="nav__heading" href={nav.href || '/'}>
          {nav.name || 'Thibault Vigneron'}
          {nav.job && <em>{nav.job}</em>}
        </Link>

        {nav.navLinks && nav.navLinks.length > 0 && (
          <ul className="nav__menu">
            {nav.navLinks.map((link) => (
              <li className="nav__item" key={link.id || link.href}>
                <Link href={link.href || '#'} title={link.label || ''}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {nav.ctaButtons && nav.ctaButtons.length > 0 && (
          <>
            {nav.ctaButtons.map((button) => (
              <Button
                key={button.id}
                variant={button.variant || 'primary'}
                href={button.href || '#'}
                title={button.title || ''}
                icon={button.icon || undefined}
                border={Boolean(button.border)}
              />
            ))}
          </>
        )}
      </div>
    </NavVisibility>
  )
}
