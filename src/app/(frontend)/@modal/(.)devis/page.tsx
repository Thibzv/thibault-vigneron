import { Suspense } from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'

import Modal from '../Modal'
import ModalClose from '../ModalClose'
import Estimate from '../../devis/Estimate'

export default async function EstimateModalPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const page = await payload.find({
    collection: 'pages',
    where: {
      and: [
        {
          slug: {
            equals: 'devis',
          },
        },
        {
          pageType: {
            equals: 'estimate',
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
  const estimatePage = doc?.estimatePage
  const infos = estimatePage?.infos

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
    <Modal className="modal--estimate">
      <ModalClose />
      <Suspense fallback={<div>Chargement...</div>}>
        <Estimate
          title={estimatePage?.title}
          intro={estimatePage?.intro}
          who={infos?.who}
          what={infos?.what}
          ctaButtons={ctaButtons}
          linkedinUrl={links?.linkedinUrl as string | undefined}
        />
      </Suspense>
    </Modal>
  )
}
