import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Heading from './Heading'

export default async function Aside() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const aside = await payload.findGlobal({
    slug: 'aside',
    depth: 2,
  })

  if (!aside) {
    return null
  }

  return (
    <aside className="aside">
      <Link
        href={aside.href || '/contact'}
        title={aside.title || 'Contactez-moi'}
        className="aside__cta"
      >
        <span className="icon-arrow"></span>
        <span className="icon-arrow"></span>
      </Link>

      <Heading tag="p" className="heading heading--huge heading--black heading--center">
        {aside.title}
      </Heading>
    </aside>
  )
}
