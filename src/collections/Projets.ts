import type { CollectionConfig } from 'payload'

export const Projets: CollectionConfig = {
  slug: 'projets',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3001'
        return `${baseUrl}/projet/${data?.slug || ''}`
      },
    },
  },
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
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titre',
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              label: 'Slug',
              admin: {
                description: 'URL du projet (ex: beaurecit)',
              },
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Tags',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image principale',
              required: true,
            },
            {
              name: 'published',
              type: 'checkbox',
              label: 'Publié',
              defaultValue: false,
            },
          ],
        },
        {
          label: 'Contenu',
          fields: [
            {
              name: 'sections',
              type: 'array',
              label: 'Sections de contenu',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Titre de la section',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'richText',
                  label: 'Contenu',
                },
              ],
            },
            {
              name: 'images',
              type: 'array',
              label: 'Images du projet',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Lien externe',
          fields: [
            {
              name: 'websiteUrl',
              type: 'text',
              label: 'URL du site',
            },
            {
              name: 'websiteButtonText',
              type: 'text',
              label: 'Texte du bouton site',
              defaultValue: 'Voir le site',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Titre meta',
              admin: {
                description:
                  'Titre affiché dans les résultats de recherche (50-60 caractères recommandés)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Description meta',
              admin: {
                description:
                  'Description affichée dans les résultats de recherche (150-160 caractères recommandés)',
              },
            },
            {
              name: 'keywords',
              type: 'text',
              label: 'Mots-clés',
              admin: {
                description: 'Mots-clés séparés par des virgules (ex: web, design, développement)',
              },
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              label: 'URL canonique',
              admin: {
                description:
                  "URL canonique du projet (laissé vide pour utiliser l'URL automatique)",
              },
            },
          ],
        },
      ],
    },
  ],
}
