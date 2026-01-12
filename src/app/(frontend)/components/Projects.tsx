import Link from 'next/link'
import React from 'react'

import type { Page, Projet } from '@/payload-types'

import Button from './Button'
import CardProject from './CardProject'
import Heading from './Heading'

interface ProjectsProps {
  data?: Page['projects'] | null
}

export default function Projects({ data }: ProjectsProps) {
  if (!data?.enabled) {
    return null
  }

  const projectsList = (data.projectsList || [])
    .map((item) => {
      const project = item?.project
      if (!project || typeof project === 'number') {
        return null
      }
      return project as Projet
    })
    .filter((project): project is Projet => project !== null && project.published === true)

  const hasHeaderContent = Boolean(data.title || data.subtitle || data.description)
  const hasButton = Boolean(data.button?.href && data.button?.text)
  const hasProjects = projectsList.length > 0

  if (!hasHeaderContent && !hasProjects && !hasButton) {
    return null
  }

  return (
    <section className="main-projects" id="projets">
      <header className="main-projects__header">
        <div className="main-projects__top">
          {data.title && (
            <Heading tag="h2" className="heading heading--black heading--huge">
              {data.title}
            </Heading>
          )}

          {hasButton && (
            <Button
              variant="primary"
              href={data.button?.href || '#'}
              title={data.button?.text || ''}
              icon={data.button?.icon || undefined}
              border={Boolean(data.button?.border)}
            />
          )}
        </div>

        <div className="main-projects__content">
          {data.subtitle && (
            <Heading tag="h3" className="heading heading--black heading--extra">
              {data.subtitle.split('\n').map((line, index, array) => (
                <React.Fragment key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </Heading>
          )}

          {data.description && <p>{data.description}</p>}
        </div>
      </header>

      {hasProjects && (
        <nav className="main-projects__list">
          <ul className="main-projects__grid">
            {projectsList.map((project) => (
              <li className="main-projects__item" key={project.id}>
                <Link href={project.websiteUrl || '#'} title={project.title} scroll={false}>
                  <CardProject
                    tags={project.tags}
                    title={project.title}
                    image={project.image}
                    slug={project.slug}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  )
}
