import React from 'react'

import type { Media, Page } from '@/payload-types'

import Button from './Button'
import Content from './Content'
import ExpertisesAnimation from './clients/ExpertisesAnimation'
import Heading from './Heading'
import Tag from './Tag'

type ExpertisesData = Exclude<Page['expertises'], undefined>

function resolveMedia(media?: number | Media | null) {
  if (!media || typeof media === 'number') {
    return null
  }

  return {
    url: media.url,
    alt: media.alt || '',
  }
}

interface ExpertisesProps {
  data?: Page['expertises'] | null
}

export default function Expertises({ data }: ExpertisesProps) {
  if (!data?.enabled) {
    return null
  }

  const expertisesList = (data.expertisesList || []).filter(Boolean)
  const hasHeaderContent = Boolean(data.tag || data.title || data.content)
  const hasButton = Boolean(data.button?.href && data.button?.text)
  const hasExpertises = expertisesList.length > 0

  if (!hasHeaderContent && !hasExpertises && !hasButton) {
    return null
  }

  // Diviser les expertises en deux listes pour l'animation
  const midpoint = Math.ceil(expertisesList.length / 2)
  const firstExpertises = expertisesList.slice(0, midpoint)
  const secondExpertises = expertisesList.slice(midpoint)

  return (
    <section className="main-expertises" id="expertises">
      <article className="main-expertises__container">
        <header className="main-expertises__left">
          {data.tag && <Tag>{data.tag}</Tag>}

          {data.title && (
            <Heading tag="h2" className="heading heading--extra heading--black">
              {data.title.split('\n').map((line, index, array) => (
                <React.Fragment key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </Heading>
          )}

          {data.content && <Content>{data.content}</Content>}

          {hasButton && (
            <Button
              variant="primary"
              href={data.button?.href || '#'}
              title={data.button?.text || ''}
              icon={data.button?.icon || undefined}
              border={Boolean(data.button?.border)}
            />
          )}
        </header>

        {hasExpertises && (
          <div className="main-expertises__right">
            <ul className="main-expertises__logos">
              {firstExpertises.map((expertise) => {
                const icon = resolveMedia(expertise?.icon)
                const label = expertise?.label || ''
                const iconClass = label.toLowerCase().replace(/\s+/g, '-')

                return (
                  <li key={expertise?.id || label} className="main-expertises__icon">
                    {icon ? (
                      <img src={icon.url || ''} alt={icon.alt || label} loading="lazy" />
                    ) : (
                      label && <span className={`icon-${iconClass}`}></span>
                    )}
                  </li>
                )
              })}
            </ul>

            <ul className="main-expertises__logos main-expertises__logos--reversed">
              {secondExpertises.map((expertise) => {
                const icon = resolveMedia(expertise?.icon)
                const label = expertise?.label || ''
                const iconClass = label.toLowerCase().replace(/\s+/g, '-')

                return (
                  <li key={expertise?.id || label} className="main-expertises__icon">
                    {icon ? (
                      <img src={icon.url || ''} alt={icon.alt || label} loading="lazy" />
                    ) : (
                      label && <span className={`icon-${iconClass}`}></span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </article>
      <ExpertisesAnimation />
    </section>
  )
}
