import type { Media, Projet } from '@/payload-types'

import Button from './Button'
import Content from './Content'
import Heading from './Heading'
import Tag from './Tag'

function resolveMedia(media?: Media | number | null) {
  if (!media || typeof media === 'number') {
    return null
  }

  return {
    url: media.url || '',
    alt: media.alt || '',
  }
}

interface ProjectProps {
  project: Projet
}

export default function Project({ project }: ProjectProps) {
  const tagsList = project.tags?.map((tag) => tag?.tag).filter(Boolean) || []
  const images = project.images?.map((item) => item?.image).filter(Boolean) || []
  const sections = project.sections || []

  return (
    <>
      <main className="project">
        <article className="project__left">
          <header className="project__header">
            {tagsList.length > 0 && (
              <ul className="project__tags">
                {tagsList.map((tag, index) => (
                  <li key={index}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            )}

            {project.title && (
              <Heading tag="h1" className="heading heading--huge heading--black">
                {project.title}
              </Heading>
            )}
          </header>

          {sections.map((section, index) => {
            if (!section?.title) return null

            return (
              <div key={index} className="project__content">
                <Heading tag="h2" className="heading heading--medium heading--black">
                  {section.title}
                </Heading>

                {section.content && <Content>{section.content as any}</Content>}
              </div>
            )
          })}
        </article>

        <div className="project__right">
          <nav className="project__nav">
            {project.websiteUrl && (
              <Button
                variant="primary"
                href={project.websiteUrl}
                title={project.websiteButtonText || 'Voir le site'}
                icon="link"
              />
            )}
          </nav>

          {images.length > 0 && (
            <figure className="project__images">
              {images.map((image, index) => {
                const imageData = resolveMedia(image)
                if (!imageData) return null

                return (
                  <img
                    key={index}
                    src={imageData.url}
                    alt={imageData.alt || project.title || 'Projet'}
                  />
                )
              })}
            </figure>
          )}
        </div>
      </main>
    </>
  )
}
