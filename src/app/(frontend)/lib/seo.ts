import type { Metadata } from 'next'
import type { Media, Page, Projet } from '@/payload-types'

interface SEOConfig {
  siteName?: string
  siteUrl?: string
  defaultOgImage?: Media | number | null
  defaultDescription?: string | null
  authorName?: string | null
}

function resolveMediaUrl(media?: Media | number | null): string | null {
  if (!media || typeof media === 'number') {
    return null
  }
  return media.url || null
}

function getAbsoluteUrl(url: string | null | undefined, siteUrl: string): string | null {
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`
}

export async function generatePageMetadata(
  page: Page,
  seoConfig: SEOConfig,
  pathname: string = '',
): Promise<Metadata> {
  const siteUrl = seoConfig.siteUrl || process.env.FRONTEND_URL || 'http://localhost:3000'
  const siteName = seoConfig.siteName || 'Site'
  const title = page.metaTitle || page.title || 'Page'
  const description = page.metaDescription || seoConfig.defaultDescription || ''

  // Résoudre l'image Open Graph
  const pageWithSEO = page as Page & {
    ogImage?: Media | number | null
    twitterImage?: Media | number | null
    noindex?: boolean | null
    nofollow?: boolean | null
  }

  let ogImageUrl: string | null = null
  if (pageWithSEO.ogImage) {
    ogImageUrl = resolveMediaUrl(pageWithSEO.ogImage)
  }
  if (!ogImageUrl && seoConfig.defaultOgImage) {
    ogImageUrl = resolveMediaUrl(seoConfig.defaultOgImage)
  }
  ogImageUrl = getAbsoluteUrl(ogImageUrl, siteUrl)

  // URL canonique
  const canonicalUrl = page.canonicalUrl
    ? getAbsoluteUrl(page.canonicalUrl, siteUrl)
    : `${siteUrl}${pathname}`

  // Robots
  const robots = []
  if (pageWithSEO.noindex) robots.push('noindex')
  if (pageWithSEO.nofollow) robots.push('nofollow')
  if (robots.length === 0) robots.push('index', 'follow')

  const metadata: Metadata = {
    title,
    description,
    keywords: page.keywords || undefined,
    robots: robots.join(', ') || undefined,
    alternates: {
      canonical: canonicalUrl || undefined,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl || undefined,
      siteName,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  }

  return metadata
}

export async function generateProjectMetadata(
  project: Projet,
  seoConfig: SEOConfig,
): Promise<Metadata> {
  const siteUrl = seoConfig.siteUrl || process.env.FRONTEND_URL || 'http://localhost:3000'
  const siteName = seoConfig.siteName || 'Site'
  const title = project.metaTitle || project.title || 'Projet'
  const description = project.metaDescription || seoConfig.defaultDescription || ''

  // Résoudre l'image Open Graph (utilise ogImage, sinon image principale, sinon défaut)
  const projectWithSEO = project as Projet & {
    ogImage?: Media | number | null
    twitterImage?: Media | number | null
    noindex?: boolean | null
    nofollow?: boolean | null
  }

  let ogImageUrl: string | null = null
  if (projectWithSEO.ogImage) {
    ogImageUrl = resolveMediaUrl(projectWithSEO.ogImage)
  } else if (project.image) {
    ogImageUrl = resolveMediaUrl(project.image)
  }
  if (!ogImageUrl && seoConfig.defaultOgImage) {
    ogImageUrl = resolveMediaUrl(seoConfig.defaultOgImage)
  }
  ogImageUrl = getAbsoluteUrl(ogImageUrl, siteUrl)

  // URL canonique
  const canonicalUrl = project.canonicalUrl
    ? getAbsoluteUrl(project.canonicalUrl, siteUrl)
    : `${siteUrl}/projet/${project.slug}`

  // Robots
  const robots = []
  if (projectWithSEO.noindex) robots.push('noindex')
  if (projectWithSEO.nofollow) robots.push('nofollow')
  if (robots.length === 0) robots.push('index', 'follow')

  const metadata: Metadata = {
    title,
    description,
    keywords: project.keywords || undefined,
    robots: robots.join(', ') || undefined,
    alternates: {
      canonical: canonicalUrl || undefined,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl || undefined,
      siteName,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  }

  // Image Twitter spécifique si définie
  if (projectWithSEO.twitterImage) {
    const twitterImageUrl = getAbsoluteUrl(resolveMediaUrl(projectWithSEO.twitterImage), siteUrl)
    if (twitterImageUrl) {
      metadata.twitter = {
        ...metadata.twitter,
        images: [twitterImageUrl],
      }
    }
  }

  return metadata
}

export function generateStructuredData(
  type: 'WebPage' | 'WebSite' | 'Article' | 'Person',
  data: {
    name?: string
    title?: string
    description?: string
    url?: string
    image?: string
    author?: string
    datePublished?: string
    dateModified?: string
    organization?: {
      name?: string
      url?: string
      logo?: string
    }
  },
) {
  const baseStructuredData: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  if (type === 'WebSite') {
    return {
      ...baseStructuredData,
      name: data.name,
      url: data.url,
      description: data.description,
      ...(data.organization && {
        publisher: {
          '@type': 'Organization',
          name: data.organization.name,
          url: data.organization.url,
          ...(data.organization.logo && {
            logo: {
              '@type': 'ImageObject',
              url: data.organization.logo,
            },
          }),
        },
      }),
    }
  }

  if (type === 'WebPage') {
    return {
      ...baseStructuredData,
      name: data.title || data.name,
      description: data.description,
      url: data.url,
      ...(data.image && {
        image: {
          '@type': 'ImageObject',
          url: data.image,
        },
      }),
      ...(data.author && {
        author: {
          '@type': 'Person',
          name: data.author,
        },
      }),
      ...(data.datePublished && {
        datePublished: data.datePublished,
      }),
      ...(data.dateModified && {
        dateModified: data.dateModified,
      }),
    }
  }

  if (type === 'Article') {
    return {
      ...baseStructuredData,
      headline: data.title,
      description: data.description,
      url: data.url,
      ...(data.image && {
        image: {
          '@type': 'ImageObject',
          url: data.image,
        },
      }),
      ...(data.author && {
        author: {
          '@type': 'Person',
          name: data.author,
        },
      }),
      ...(data.datePublished && {
        datePublished: data.datePublished,
      }),
      ...(data.dateModified && {
        dateModified: data.dateModified,
      }),
      ...(data.organization && {
        publisher: {
          '@type': 'Organization',
          name: data.organization.name,
          url: data.organization.url,
          ...(data.organization.logo && {
            logo: {
              '@type': 'ImageObject',
              url: data.organization.logo,
            },
          }),
        },
      }),
    }
  }

  if (type === 'Person') {
    return {
      ...baseStructuredData,
      name: data.name,
      ...(data.url && {
        url: data.url,
      }),
      ...(data.image && {
        image: {
          '@type': 'ImageObject',
          url: data.image,
        },
      }),
    }
  }

  return baseStructuredData
}
