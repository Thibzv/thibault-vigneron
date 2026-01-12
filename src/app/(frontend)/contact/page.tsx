import { getPayload } from 'payload'

import config from '@/payload.config'

import Contact from './Contact'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const page = await payload.find({
    collection: 'pages',
    where: {
      and: [
        {
          slug: {
            equals: 'contact',
          },
        },
        {
          pageType: {
            equals: 'contact',
          },
        },
      ],
    },
    depth: 1,
    limit: 1,
  })

  const links = await payload.findGlobal({
    slug: 'links',
    depth: 2,
  })

  const doc = page.docs[0] as any
  const contactPage = doc?.contactPage
  const infos = doc?.contactPage?.infos

  // Convert null values to undefined for ctaButtons
  const ctaButtons = links?.ctaButtons?.map((button: any) => ({
    id: button.id ?? undefined,
    variant: button.variant ?? undefined,
    href: button.href ?? undefined,
    title: button.title ?? undefined,
    icon: button.icon ?? undefined,
    border: button.border ?? undefined,
  }))

  return (
    <section className="page">
      <Contact
        title={contactPage?.title}
        intro={contactPage?.intro}
        who={infos?.who}
        what={infos?.what}
        ctaButtons={ctaButtons}
        linkedinUrl={links?.linkedinUrl as string | undefined}
      />
    </section>
  )
}
