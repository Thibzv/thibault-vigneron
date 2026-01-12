import type { Page } from '@/payload-types'
import CardOffer from './CardOffer'
import Heading from './Heading'
import Tag from './Tag'

interface OffersProps {
  data?: Page['offers'] | null
}

export default function Offers({ data }: OffersProps) {
  if (!data?.enabled) {
    return null
  }

  const offers = (data.offersList || []).filter(Boolean)
  if (offers.length === 0) {
    return null
  }

  return (
    <section className="main-offers">
      <header className="main-offers__header" id="offres">
        {data.tag && <Tag className="tag--center">{data.tag}</Tag>}

        {data.title && (
          <Heading tag="h2" className="heading heading--huge heading--center heading--black">
            {data.title}
          </Heading>
        )}
      </header>

      <ul className="main-offers__list">
        {offers.map((offer) => (
          <li className="main-offers__item" key={offer?.id || offer?.title}>
            <CardOffer
              icon={offer?.icon}
              title={offer?.title}
              description={offer?.description}
              price={offer?.price}
              features={offer?.features?.map((feature) => feature?.feature || null)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
