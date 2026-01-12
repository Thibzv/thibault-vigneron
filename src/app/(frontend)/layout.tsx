import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'

import config from '@/payload.config'
import './scss/app.scss'
import Footer from './components/Footer'
import Links from './components/Links'
import Nav from './components/Nav'
import Aside from './components/Aside'
import SmoothScroll from './components/clients/SmoothScroll'
import Cursor from './components/clients/Cursor'

export const metadata = {
  description:
    'Développeur full-stack, je conçois des sites rapides, intuitifs et optimisés pour le référencement.',
  title: 'Thibault Vigneron - Développeur full-stack',
}

export default async function RootLayout(props: {
  children: React.ReactNode
  modal?: React.ReactNode
}) {
  const { children, modal } = props

  return (
    <html lang="fr">
      <body>
        <SmoothScroll />
        <Nav />
        {children}
        {modal ?? null}
        <Links />
        <Footer />
        <Aside />
        <Cursor />
      </body>
    </html>
  )
}
