import Link from 'next/link'

import type { Page } from '@/payload-types'

import CardService from './CardService'
import Heading from './Heading'
import Tag from './Tag'

interface ServicesProps {
  data?: Page['services'] | null
}

export default function Services({ data }: ServicesProps) {
  if (!data?.enabled) {
    return null
  }

  const servicesList = (data.servicesList || []).filter(Boolean)
  const hasHeaderContent = Boolean(data.tag || data.title || data.description)
  const hasCta = Boolean(data.ctaLink && data.ctaText)

  if (!hasHeaderContent && servicesList.length === 0 && !hasCta) {
    return null
  }

  return (
    <section className="main-services" id="services">
      <header className="main-services__header">
        {data.tag && <Tag>{data.tag}</Tag>}

        {data.title && (
          <Heading tag="h2" className="heading heading--extra heading--black">
            {data.title}
          </Heading>
        )}

        {data.description && <p>{data.description}</p>}
      </header>

      {servicesList.map((service) => (
        <CardService
          key={service?.id || service?.title}
          icon={service?.icon}
          title={service?.title}
          description={service?.description}
        />
      ))}

      {hasCta && (
        <Link href={data.ctaLink as string} className="main-services__link" title={data.ctaText as string}>
          <Heading tag="h3" className="heading heading--large heading--white">
            {data.ctaText}
          </Heading>

          <div className="main-services__arrow">
            <span className="icon-arrow"></span>
            <span className="icon-arrow"></span>
          </div>
        </Link>
      )}
    </section>
  )
}


