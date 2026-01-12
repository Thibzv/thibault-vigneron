import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            {
              name: 'email',
              type: 'email',
              required: true,
              label: 'Email',
              admin: {
                description: 'Adresse email affichée dans le footer',
              },
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navLinks',
              type: 'array',
              label: 'Liens de navigation',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label',
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  label: 'Lien',
                  admin: {
                    description: 'URL ou ancre (ex: #projets ou /page)',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Liens directs',
          fields: [
            {
              name: 'ctaButtons',
              type: 'array',
              label: 'Boutons CTA',
              fields: [
                {
                  name: 'variant',
                  type: 'select',
                  options: [
                    { label: 'Principal', value: 'primary' },
                    { label: 'Secondaire', value: 'secondary' },
                  ],
                  defaultValue: 'secondary',
                  label: 'Variante',
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  label: 'Lien',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Texte du bouton',
                },
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Icône',
                  options: [
                    { label: 'Calendrier', value: 'calendar' },
                    { label: 'Devis', value: 'estimate' },
                    { label: 'Flèche', value: 'arrow' },
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
        },
        {
          label: 'Mentions légales',
          fields: [
            {
              name: 'legalLinks',
              type: 'array',
              label: 'Liens légaux',
              fields: [
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  required: true,
                  label: 'Page',
                  admin: {
                    description: 'Sélectionner une page existante',
                  },
                },
              ],
            },
            {
              name: 'copyright',
              type: 'text',
              label: 'Copyright',
              defaultValue: '© 2025 Tout droits réservés - Thibault vigneron',
              admin: {
                description: 'Texte de copyright affiché dans le footer',
              },
            },
          ],
        },
      ],
    },
  ],
}
