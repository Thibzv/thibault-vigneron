import { getPayload } from 'payload'
import React from 'react'
import type { Metadata } from 'next'

import config from '@/payload.config'
import type { Page } from '@/payload-types'
import Contact from './components/Contact'
import Expertises from './components/Expertises'
import Header from './components/Header'
import Offers from './components/Offers'
import Projects from './components/Projects'
import Services from './components/Services'
import StructuredData from './components/StructuredData'
import { generatePageMetadata, generateStructuredData } from './lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const homePage = await payload.find({
    collection: 'pages',
    where: {
      pageType: {
        equals: 'home',
      },
    },
    depth: 2,
    limit: 1,
  })

  const page = homePage.docs[0] as Page | undefined

  if (!page) {
    return {
      title: 'Accueil',
      description: "Page d'accueil",
    }
  }

  // Récupérer la configuration SEO globale
  const seoConfig = await payload.findGlobal({
    slug: 'seo',
    depth: 2,
  })

  return generatePageMetadata(
    page,
    {
      siteName: seoConfig?.siteName || undefined,
      siteUrl: seoConfig?.siteUrl || undefined,
      defaultOgImage: seoConfig?.defaultOgImage || undefined,
      defaultDescription: seoConfig?.defaultDescription || undefined,
      authorName: seoConfig?.authorName || undefined,
    },
    '/',
  )
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const homePage = await payload.find({
    collection: 'pages',
    where: {
      pageType: {
        equals: 'home',
      },
    },
    depth: 3,
    limit: 1,
  })

  const page = homePage.docs[0] as Page | undefined

  // Récupérer la configuration SEO pour le Structured Data
  const seoConfig = await payload.findGlobal({
    slug: 'seo',
    depth: 2,
  })

  const siteUrl = seoConfig?.siteUrl || process.env.FRONTEND_URL || 'http://localhost:3000'

  // Générer le Structured Data pour la page d'accueil
  const structuredData = generateStructuredData('WebSite', {
    name: seoConfig?.siteName || 'Site',
    url: siteUrl,
    description: page?.metaDescription || seoConfig?.defaultDescription || '',
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
    <main className="main">
      <StructuredData data={structuredData} />
      <Header data={page?.header} />
      <Projects data={page?.projects} />
      <Contact data={page?.contact} />
      <Services data={page?.services} />
      <Expertises data={page?.expertises} />
      <Offers data={page?.offers} />
    </main>
  )
}
