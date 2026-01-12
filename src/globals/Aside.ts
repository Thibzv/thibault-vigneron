import type { GlobalConfig } from 'payload'

export const Aside: GlobalConfig = {
  slug: 'aside',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
    },
    {
      name: 'href',
      type: 'text',
      label: 'Lien',
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
  ],
}
