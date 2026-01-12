import type { GlobalConfig } from 'payload'

export const Links: GlobalConfig = {
  slug: 'links',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'ctaButtons',
      type: 'array',
      label: 'Boutons CTA',
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
    {
      name: 'linkedinUrl',
      type: 'text',
      label: 'URL LinkedIn',
      admin: {
        description: 'URL du profil LinkedIn',
      },
    },
  ],
}
