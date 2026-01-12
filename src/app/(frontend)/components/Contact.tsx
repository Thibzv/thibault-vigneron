import type { Page } from '@/payload-types'
import Button from './Button'
import Heading from './Heading'
import Tag from './Tag'

type ContactData = Exclude<Page['contact'], undefined>
type MediaType = ContactData extends { image?: infer T } ? T : never

function resolveMedia(media?: MediaType | null) {
  if (!media || typeof media === 'number') {
    return null
  }

  return {
    url: media.url,
    alt: media.alt || '',
  }
}

interface ContactProps {
  data?: Page['contact'] | null
}

export default function Contact({ data }: ContactProps) {
  if (!data?.enabled) {
    return null
  }

  const image = resolveMedia(data.image)
  const cta = data.ctaButtons
  const hasButton = Boolean(cta && (cta.title || cta.href))
  const hasContent = Boolean(data.title || data.description || hasButton || image)

  if (!hasContent) {
    return null
  }

  return (
    <figure className="main-contact" id="contact">
      <figcaption className="main-contact__left">
        {data.title && (
          <Heading tag="h2" className="heading heading--huge heading--white">
            {data.title}
          </Heading>
        )}

        {data.description && <p>{data.description}</p>}

        {hasButton && (
          <Button
            variant={cta?.variant || 'secondary'}
            href={cta?.href || '#contact'}
            title={cta?.title || 'Contactez-moi'}
            icon={cta?.icon || undefined}
            border={Boolean(cta?.border)}
          />
        )}
      </figcaption>

      {image && (
        <div className="main-contact__image">
          <img src={image.url ?? ''} alt={image.alt || 'Contact'} loading="lazy" />

          {data.imageCredit && <Tag className="tag--white">{data.imageCredit}</Tag>}
        </div>
      )}
    </figure>
  )
}
