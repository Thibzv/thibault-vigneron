import Heading from './Heading'

type ServiceIcon = 'custom' | 'cart' | 'rocket' | 'code' | 'shipping' | string

interface CardServiceProps {
  icon?: ServiceIcon | null
  title?: string | null
  description?: string | null
}

export default function CardService({ icon, title, description }: CardServiceProps) {
  if (!title && !description) {
    return null
  }

  return (
    <article className="card-service">
      {icon && (
        <div className="card-service__icon">
          <span className={`icon-${icon}`}></span>
        </div>
      )}

      {title && (
        <Heading tag="h3" className="heading heading--medium heading--black">
          {title}
        </Heading>
      )}

      {description && <p>{description}</p>}
    </article>
  )
}
