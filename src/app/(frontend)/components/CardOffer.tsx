import Heading from './Heading'
import Link from 'next/link'

type OfferIcon = 'rocket' | 'bag' | 'cart' | string

interface CardOfferProps {
  icon?: OfferIcon | null
  title?: string | null
  description?: string | null
  price?: string | null
  features?: (string | null | undefined)[]
}

export default function CardOffer({ icon, title, description, price, features }: CardOfferProps) {
  const filteredFeatures = (features || []).filter((feature): feature is string =>
    Boolean(feature && feature.trim()),
  )

  return (
    <article className="card-offer">
      <header className="card-offer__header">
        {icon && (
          <div className="card-offer__icon">
            <span className={`icon-${icon}`}></span>
          </div>
        )}

        {title && (
          <Heading tag="h3" className="heading heading--large heading--black">
            {title}
          </Heading>
        )}

        {description && <p>{description}</p>}
      </header>

      <div className="card-offer__content">
        {price && (
          <p className="card-offer__price">
            <em>À partir de</em>
            <strong>{price}</strong>
          </p>
        )}

        {filteredFeatures.length > 0 && (
          <ul className="card-offer__features">
            {filteredFeatures.map((feature, index) => (
              <li key={`${feature}-${index}`}>{feature}</li>
            ))}
          </ul>
        )}

        <Link
          className="card-offer__cta"
          href={`/devis?offer=${title?.toLowerCase().replace(/ /g, '-')}`}
          title={`Me contacter à propos d'offre ${title}`}
        >
          Commencer
        </Link>
      </div>
    </article>
  )
}
