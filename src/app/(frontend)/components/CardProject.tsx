import type { Media, Projet } from '@/payload-types'

import Heading from './Heading'

type ProjectImage = Projet['image']
type ProjectTags = Projet['tags']

function resolveMedia(media?: ProjectImage | null) {
  if (!media || typeof media === 'number') {
    return null
  }

  return {
    url: media.url || '',
    alt: media.alt || '',
  }
}

interface CardProjectProps {
  tags?: ProjectTags | null
  title?: string | null
  image?: ProjectImage | null
  slug?: string | null
}

export default function CardProject({ tags, title, image, slug }: CardProjectProps) {
  const imageData = resolveMedia(image)
  const tagsList = tags?.map((tag) => tag?.tag).filter(Boolean) || []

  if (!title) {
    return null
  }

  return (
    <figure className="card-project card-project--min">
      <div className="card-project__window">
        <div className="card-project__topbar">
          {tagsList.length > 0 && <p>{tagsList.join(' / ')}</p>}
        </div>

        {imageData && (
          <div className="card-project__thumb">
            <img src={imageData.url} alt={imageData.alt || title || 'Projet'} loading="lazy" />
          </div>
        )}
      </div>

      <figcaption className="card-project__caption">
        <Heading tag="h3" className="heading heading--medium heading--black">
          {title}
        </Heading>

        <p className="card-project__discover">
          Découvrir le projet
          <span className="icon-arrow"></span>
        </p>
      </figcaption>
    </figure>
  )
}
