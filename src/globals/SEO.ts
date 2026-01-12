import type { GlobalConfig } from 'payload'

export const SEO: GlobalConfig = {
  slug: 'seo',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations générales',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'Nom du site',
              required: true,
              admin: {
                description: 'Nom du site utilisé dans les métadonnées Open Graph',
              },
            },
            {
              name: 'siteUrl',
              type: 'text',
              label: 'URL du site',
              required: true,
              admin: {
                description: 'URL complète du site (ex: https://www.exemple.com)',
              },
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
              label: 'Description par défaut',
              admin: {
                description: 'Description utilisée par défaut si aucune description n\'est définie pour une page',
              },
            },
          ],
        },
        {
          label: 'Réseaux sociaux',
          fields: [
            {
              name: 'linkedinPage',
              type: 'text',
              label: 'Page LinkedIn',
              admin: {
                description: 'URL de la page LinkedIn (optionnel)',
              },
            },
          ],
        },
        {
          label: 'Images par défaut',
          fields: [
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Image Open Graph par défaut',
              admin: {
                description: 'Image utilisée par défaut pour le partage sur les réseaux sociaux (1200x630px recommandé)',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              label: 'Favicon',
              admin: {
                description: 'Favicon du site (format ICO ou PNG, 32x32px recommandé)',
              },
            },
          ],
        },
        {
          label: 'Auteur',
          fields: [
            {
              name: 'authorName',
              type: 'text',
              label: 'Nom de l\'auteur',
              admin: {
                description: 'Nom de l\'auteur par défaut du site',
              },
            },
            {
              name: 'authorEmail',
              type: 'email',
              label: 'Email de l\'auteur',
              admin: {
                description: 'Email de l\'auteur (optionnel)',
              },
            },
            {
              name: 'authorUrl',
              type: 'text',
              label: 'URL de l\'auteur',
              admin: {
                description: 'Site web ou profil de l\'auteur (optionnel)',
              },
            },
          ],
        },
        {
          label: 'Structured Data',
          fields: [
            {
              name: 'organizationName',
              type: 'text',
              label: 'Nom de l\'organisation',
              admin: {
                description: 'Nom de l\'organisation pour le Structured Data',
              },
            },
            {
              name: 'organizationLogo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo de l\'organisation',
              admin: {
                description: 'Logo de l\'organisation pour le Structured Data',
              },
            },
            {
              name: 'organizationUrl',
              type: 'text',
              label: 'URL de l\'organisation',
              admin: {
                description: 'URL du site web de l\'organisation',
              },
            },
          ],
        },
      ],
    },
  ],
}

