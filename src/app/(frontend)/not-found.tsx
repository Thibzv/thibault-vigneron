import type { Metadata } from 'next'
import Tag from './components/Tag'
import Heading from './components/Heading'
import Button from './components/Button'

export const metadata: Metadata = {
  title: 'Page introuvable - 404',
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
}

export default function NotFound() {
  return (
    <main className="page page--404">
      <Tag>Erreur 404</Tag>

      <Heading tag="h1" className="heading heading--huge heading--black">
        Page introuvable
      </Heading>

      <Button variant="primary" href="/" title="Retourner à la page d'accueil" icon="arrow" />
    </main>
  )
}
