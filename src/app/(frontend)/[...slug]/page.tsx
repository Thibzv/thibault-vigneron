import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import type { Metadata } from 'next'

import config from '@/payload.config'
import type { Media, Page } from '@/payload-types'

import Heading from '../components/Heading'
import Content from '../components/Content'
import StructuredData from '../components/StructuredData'
import { generatePageMetadata, generateStructuredData } from '../lib/seo'

type Props = {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pageSlug = slug.join('/')

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const page = await payload.find({
    collection: 'pages',
    where: {
      and: [
        {
          slug: {
            equals: pageSlug,
          },
        },
        {
          pageType: {
            equals: 'standard',
          },
        },
      ],
    },
    depth: 2,
    limit: 1,
  })

  if (!page.docs[0]) {
    return {
      title: 'Page introuvable - 404',
      description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    }
  }

  const pageData = page.docs[0] as Page

  // Récupérer la configuration SEO globale
  const seoConfig = await payload.findGlobal({
    slug: 'seo',
    depth: 2,
  })

  return generatePageMetadata(pageData, {
    siteName: seoConfig?.siteName || undefined,
    siteUrl: seoConfig?.siteUrl || undefined,
    defaultOgImage: seoConfig?.defaultOgImage || undefined,
    defaultDescription: seoConfig?.defaultDescription || undefined,
    authorName: seoConfig?.authorName || undefined,
  }, `/${pageSlug}`)
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const pageSlug = slug.join('/')

  const reservedRoutes = ['contact', 'devis', 'admin', 'api']
  if (reservedRoutes.includes(pageSlug)) {
    notFound()
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const page = await payload.find({
    collection: 'pages',
    where: {
      and: [
        {
          slug: {
            equals: pageSlug,
          },
        },
        {
          pageType: {
            equals: 'standard',
          },
        },
      ],
    },
    depth: 3,
    limit: 1,
  })

  if (!page.docs[0]) {
    notFound()
  }

  const pageData = page.docs[0] as Page

  // Récupérer la configuration SEO pour le Structured Data
  const seoConfig = await payload.findGlobal({
    slug: 'seo',
    depth: 2,
  })

  const siteUrl = seoConfig?.siteUrl || process.env.FRONTEND_URL || 'http://localhost:3000'
  const pageUrl = `${siteUrl}/${pageSlug}`

  // Résoudre l'image pour le Structured Data
  const pageWithSEO = pageData as Page & {
    ogImage?: Media | number | null
  }

  let pageImage: string | undefined
  if (pageWithSEO.ogImage && typeof pageWithSEO.ogImage !== 'number') {
    pageImage = pageWithSEO.ogImage.url || undefined
  }
  if (pageImage && !pageImage.startsWith('http')) {
    pageImage = `${siteUrl}${pageImage}`
  }

  // Générer le Structured Data
  const structuredData = generateStructuredData('WebPage', {
    title: pageData.metaTitle || pageData.title || 'Page',
    description: pageData.metaDescription || '',
    url: pageUrl,
    image: pageImage,
    author: seoConfig?.authorName || undefined,
    datePublished: pageData.createdAt,
    dateModified: pageData.updatedAt,
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
    <main className="page">
      <StructuredData data={structuredData} />
      <div className="page__header">
        <Heading tag="h1" className="heading heading--huge heading--black">
          {pageData.title}
        </Heading>
      </div>

      {pageData.content && <Content>{pageData.content as any}</Content>}
    </main>
  )
}
