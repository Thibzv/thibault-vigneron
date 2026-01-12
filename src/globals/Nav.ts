import type { GlobalConfig } from 'payload'

export const Nav: GlobalConfig = {
  slug: 'nav',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom complet',
        },
        {
          name: 'job',
          type: 'text',
          label: 'Poste',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Lien',
        },
      ],
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Liens de navigation',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Lien',
        },
      ],
    },
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
          defaultValue: 'secondary',
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
}
