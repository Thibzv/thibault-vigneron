import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import type { Metadata } from 'next'

import config from '@/payload.config'
import type { Projet } from '@/payload-types'

import Project from '../../components/Project'
import StructuredData from '../../components/StructuredData'
import { generateProjectMetadata, generateStructuredData } from '../../lib/seo'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const project = await payload.find({
    collection: 'projets',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  })

  if (!project.docs[0]) {
    return {
      title: 'Projet introuvable - 404',
      description: "Le projet que vous recherchez n'existe pas ou a été déplacé.",
    }
  }

  const projectData = project.docs[0] as Projet

  // Récupérer la configuration SEO globale
  const seoConfig = await payload.findGlobal({
    slug: 'seo',
    depth: 2,
  })

  return generateProjectMetadata(projectData, {
    siteName: seoConfig?.siteName || undefined,
    siteUrl: seoConfig?.siteUrl || undefined,
    defaultOgImage: seoConfig?.defaultOgImage || undefined,
    defaultDescription: seoConfig?.defaultDescription || undefined,
    authorName: seoConfig?.authorName || undefined,
  })
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const project = await payload.find({
    collection: 'projets',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          published: {
            equals: true,
          },
        },
      ],
    },
    depth: 3,
    limit: 1,
  })

  if (!project.docs[0]) {
    notFound()
  }

  const projectData = project.docs[0] as Projet

  // Récupérer la configuration SEO pour le Structured Data
  const seoConfig = await payload.findGlobal({
    slug: 'seo',
    depth: 2,
  })

  const siteUrl = seoConfig?.siteUrl || process.env.FRONTEND_URL || 'http://localhost:3000'
  const projectUrl = `${siteUrl}/projet/${projectData.slug}`

  // Résoudre l'image pour le Structured Data
  const projectWithSEO = projectData as Projet & {
    ogImage?: { url?: string | null } | number | null
  }

  let projectImage: string | undefined
  if (projectWithSEO.ogImage && typeof projectWithSEO.ogImage !== 'number') {
    projectImage = projectWithSEO.ogImage.url || undefined
  } else if (projectData.image && typeof projectData.image !== 'number') {
    projectImage = projectData.image.url || undefined
  }
  if (projectImage && !projectImage.startsWith('http')) {
    projectImage = `${siteUrl}${projectImage}`
  }

  // Générer le Structured Data
  const structuredData = generateStructuredData('WebPage', {
    title: projectData.metaTitle || projectData.title || 'Projet',
    description: projectData.metaDescription || '',
    url: projectUrl,
    image: projectImage,
    author: seoConfig?.authorName || undefined,
    datePublished: projectData.createdAt,
    dateModified: projectData.updatedAt,
    organization: seoConfig?.organizationName
      ? {
          name: seoConfig.organizationName,
          url: seoConfig.organizationUrl || siteUrl,
          logo:
            seoConfig.organizationLogo && typeof seoConfig.organizationLogo !== 'number'
              ? seoConfig.organizationLogo.url || undefined
              : undefined,
        }
      : undefined,
  })

  return (
    <div className="page">
      <StructuredData data={structuredData} />
      <Project project={projectData} />
    </div>
  )
}
