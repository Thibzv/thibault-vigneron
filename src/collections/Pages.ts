import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
        if (data?.pageType === 'home') {
          return `${baseUrl}`
        }
        return `${baseUrl}/${data?.slug || ''}`
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
                description: 'URL de la page (ex: accueil)',
              },
            },
            {
              name: 'pageType',
              type: 'select',
              required: true,
              label: 'Type de page',
              options: [
                {
                  label: "Page d'accueil",
                  value: 'home',
                },
                {
                  label: 'Page standard',
                  value: 'standard',
                },
                {
                  label: 'Page de contact',
                  value: 'contact',
                },
                {
                  label: 'Page de devis',
                  value: 'estimate',
                },
              ],
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
                  "URL canonique de la page (laissé vide pour utiliser l'URL automatique)",
              },
            },
          ],
        },
        {
          label: 'En-tête',
          admin: {
            condition: (data) => data?.pageType === 'home',
          },
          fields: [
            {
              name: 'header',
              type: 'group',
              label: 'En-tête',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Tag',
                },
                {
                  name: 'heading',
                  type: 'richText',
                  label: 'Titre principal',
                },
                {
                  name: 'description',
                  type: 'richText',
                  label: 'Description',
                },
              ],
            },
          ],
        },
        {
          label: 'Formulaire de contact',
          admin: {
            condition: (data) => data?.pageType === 'contact',
          },
          fields: [
            {
              name: 'contactPage',
              type: 'group',
              label: 'Page Contact',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Titre de la page',
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  label: "Texte d'introduction",
                },
                {
                  name: 'infos',
                  type: 'group',
                  label: 'Blocs informations',
                  fields: [
                    {
                      name: 'who',
                      type: 'group',
                      label: 'Bloc "Qui êtes-vous ?"',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          label: 'Titre',
                        },
                        {
                          name: 'options',
                          type: 'array',
                          label: 'Options',
                          labels: {
                            singular: 'Option',
                            plural: 'Options',
                          },
                          fields: [
                            {
                              name: 'label',
                              type: 'text',
                              label: 'Label affiché',
                            },
                            {
                              name: 'value',
                              type: 'text',
                              label: 'Valeur envoyée',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: 'what',
                      type: 'group',
                      label: 'Bloc \"Que puis-je faire pour vous ?\"',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          label: 'Titre',
                        },
                        {
                          name: 'options',
                          type: 'array',
                          label: 'Options',
                          labels: {
                            singular: 'Option',
                            plural: 'Options',
                          },
                          fields: [
                            {
                              name: 'label',
                              type: 'text',
                              label: 'Label affiché',
                            },
                            {
                              name: 'value',
                              type: 'text',
                              label: 'Valeur envoyée',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Formulaire de devis',
          admin: {
            condition: (data) => data?.pageType === 'estimate',
          },
          fields: [
            {
              name: 'estimatePage',
              type: 'group',
              label: 'Page Devis',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Titre de la page',
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  label: "Texte d'introduction",
                },
                {
                  name: 'infos',
                  type: 'group',
                  label: 'Blocs informations',
                  fields: [
                    {
                      name: 'who',
                      type: 'group',
                      label: 'Bloc "Qui êtes-vous ?"',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          label: 'Titre',
                        },
                        {
                          name: 'options',
                          type: 'array',
                          label: 'Options',
                          labels: {
                            singular: 'Option',
                            plural: 'Options',
                          },
                          fields: [
                            {
                              name: 'label',
                              type: 'text',
                              label: 'Label affiché',
                            },
                            {
                              name: 'value',
                              type: 'text',
                              label: 'Valeur envoyée',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: 'what',
                      type: 'group',
                      label: 'Bloc \"Que puis-je faire pour vous ?\"',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          label: 'Titre',
                        },
                        {
                          name: 'options',
                          type: 'array',
                          label: 'Options',
                          labels: {
                            singular: 'Option',
                            plural: 'Options',
                          },
                          fields: [
                            {
                              name: 'label',
                              type: 'text',
                              label: 'Label affiché',
                            },
                            {
                              name: 'value',
                              type: 'text',
                              label: 'Valeur envoyée',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Projets',
          admin: {
            condition: (data) => data?.pageType === 'home',
          },
          fields: [
            {
              name: 'projects',
              type: 'group',
              label: 'Section Projects',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Activer la section projects',
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Titre',
                },
                {
                  name: 'button',
                  type: 'group',
                  label: 'Bouton',
                  fields: [
                    {
                      name: 'href',
                      type: 'text',
                      label: 'Lien',
                    },
                    {
                      name: 'text',
                      type: 'text',
                      label: 'Texte',
                    },
                    {
                      name: 'icon',
                      type: 'select',
                      label: 'Icône',
                      options: [
                        { label: 'Flèche', value: 'arrow' },
                        { label: 'Calendrier', value: 'calendar' },
                        { label: 'Devis', value: 'estimate' },
                        { label: 'Lien', value: 'link' },
                      ],
                    },
                    {
                      name: 'border',
                      type: 'checkbox',
                      label: 'Afficher la bordure',
                      defaultValue: false,
                    },
                  ],
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                  label: 'Sous-titre',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
                {
                  name: 'projectsList',
                  type: 'array',
                  label: 'Liste des projets',
                  fields: [
                    {
                      name: 'project',
                      type: 'relationship',
                      label: 'Projet',
                      relationTo: 'projets',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          admin: {
            condition: (data) => data?.pageType === 'home',
          },
          fields: [
            {
              name: 'contact',
              type: 'group',
              label: 'Section Contact',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Activer la section contact',
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Titre',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image',
                },
                {
                  name: 'imageCredit',
                  type: 'text',
                  label: 'Crédit image',
                },
                {
                  name: 'ctaButtons',
                  type: 'group',
                  label: 'Bouton CTA',
                  fields: [
                    {
                      name: 'variant',
                      type: 'select',
                      label: 'Variante',
                      options: [
                        { label: 'Principal', value: 'primary' },
                        { label: 'Secondaire', value: 'secondary' },
                      ],
                    },
                    {
                      name: 'href',
                      type: 'text',
                      label: 'Lien',
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Texte du bouton',
                    },
                    {
                      name: 'icon',
                      type: 'select',
                      label: 'Icône',
                      options: [
                        { label: 'Flèche', value: 'arrow' },
                        { label: 'Calendrier', value: 'calendar' },
                        { label: 'Devis', value: 'estimate' },
                        { label: 'Lien', value: 'link' },
                      ],
                    },
                    {
                      name: 'border',
                      type: 'checkbox',
                      label: 'Afficher la bordure',
                      defaultValue: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Contenu',
          admin: {
            condition: (data) => data?.pageType === 'standard',
          },
          fields: [
            {
              name: 'content',
              type: 'richText',
              label: 'Contenu de la page',
            },
          ],
        },
        {
          label: 'Services',
          admin: {
            condition: (data) => data?.pageType === 'home',
          },
          fields: [
            {
              name: 'services',
              type: 'group',
              label: 'Section Services',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Activer la section services',
                },
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Tag',
                },
                {
                  name: 'title',
                  type: 'textarea',
                  label: 'Titre',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
                {
                  name: 'servicesList',
                  type: 'array',
                  label: 'Liste des services',
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      label: 'Icône',
                      options: [
                        { label: 'Personnalisé', value: 'custom' },
                        { label: 'Panier', value: 'cart' },
                        { label: 'Fusée', value: 'rocket' },
                        { label: 'Code', value: 'code' },
                        { label: 'Livraison', value: 'shipping' },
                      ],
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Titre',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Description',
                    },
                  ],
                },
                {
                  name: 'ctaLink',
                  type: 'text',
                  label: 'Lien CTA',
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  label: 'Texte CTA',
                },
              ],
            },
          ],
        },
        {
          label: 'Expertises',
          admin: {
            condition: (data) => data?.pageType === 'home',
          },
          fields: [
            {
              name: 'expertises',
              type: 'group',
              label: 'Section Expertises',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Activer la section expertises',
                },
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Tag',
                },
                {
                  name: 'title',
                  type: 'textarea',
                  label: 'Titre',
                },
                {
                  name: 'content',
                  type: 'richText',
                  label: 'Contenu',
                },
                {
                  name: 'button',
                  type: 'group',
                  label: 'Bouton',
                  fields: [
                    {
                      name: 'href',
                      type: 'text',
                      label: 'Lien',
                    },
                    {
                      name: 'text',
                      type: 'text',
                      label: 'Texte',
                    },
                    {
                      name: 'icon',
                      type: 'select',
                      label: 'Icône',
                      options: [
                        { label: 'Flèche', value: 'arrow' },
                        { label: 'Calendrier', value: 'calendar' },
                        { label: 'Devis', value: 'estimate' },
                        { label: 'Lien', value: 'link' },
                      ],
                    },
                    {
                      name: 'border',
                      type: 'checkbox',
                      label: 'Afficher la bordure',
                      defaultValue: false,
                    },
                  ],
                },
                {
                  name: 'expertisesList',
                  type: 'array',
                  label: 'Liste des expertises',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Label',
                    },
                    {
                      name: 'icon',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Icône',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Offres',
          admin: {
            condition: (data) => data?.pageType === 'home',
          },
          fields: [
            {
              name: 'offers',
              type: 'group',
              label: 'Section Offres',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Activer la section offres',
                },
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Tag',
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Titre',
                },
                {
                  name: 'offersList',
                  type: 'array',
                  label: 'Liste des offres',
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      label: 'Icône',
                      options: [
                        { label: 'Fusée', value: 'rocket' },
                        { label: 'Sac', value: 'bag' },
                        { label: 'Panier', value: 'cart' },
                      ],
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Titre',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Description',
                    },
                    {
                      name: 'price',
                      type: 'text',
                      label: 'Prix',
                    },
                    {
                      name: 'features',
                      type: 'array',
                      label: 'Fonctionnalités',
                      fields: [
                        {
                          name: 'feature',
                          type: 'text',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
