'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const whoLabels: Record<string, string> = {
  professionnel: 'Un professionnel',
  particulier: 'Un particulier',
}

const whatLabels: Record<string, string> = {
  'landing-page': 'Landing page',
  'site-vitrine': 'Site vitrine',
  'boutique-en-ligne': 'Boutique en ligne',
  'application-web': 'Application web',
  wordpress: 'WordPress',
  autre: 'Autre',
}

const budgetLabels: Record<string, string> = {
  '-1000': '0€ - 1000€',
  '1000-2000': '1000€ - 2000€',
  '+2000': '+2000€',
}

const delaisLabels: Record<string, string> = {
  '1-2 semaine': '1-2 semaine',
  '1 mois': '1 mois',
  '+1 mois': '+1 mois',
}

interface SubmitFormOptions {
  type: 'contact' | 'estimate'
  subject: string
  title: string
  successMessage: string
}

interface SubmitFormResult {
  success: boolean
  message?: string
  error?: string
}

/**
 * Fonction générique pour soumettre un formulaire de contact ou de devis
 */
export async function submitForm(
  formData: FormData,
  options: SubmitFormOptions,
): Promise<SubmitFormResult> {
  const { type, subject, title, successMessage } = options

  try {
    // Récupération de toutes les données du formulaire
    const name = formData.get('name') as string | null
    const email = formData.get('email') as string | null
    const phone = (formData.get('phone') as string | null) || 'Non renseigné'
    const message = formData.get('message') as string | null
    const whoValue = formData.get('who') as string | null
    const whatValue = formData.get('what') as string | null
    const rgpd = formData.get('rgpd') === 'on' ? 'Oui' : 'Non'

    // Champs spécifiques au devis
    const budgetValue = formData.get('budget') as string | null
    const delaisValue = formData.get('delais') as string | null
    const file = formData.get('file') as File | null

    // Conversion des valeurs en labels lisibles
    const who = whoValue ? whoLabels[whoValue] || whoValue : 'Non renseigné'
    const what = whatValue ? whatLabels[whatValue] || whatValue : 'Non renseigné'

    const budget =
      budgetValue && type === 'estimate' ? budgetLabels[budgetValue] || budgetValue : null
    const delais =
      delaisValue && type === 'estimate' ? delaisLabels[delaisValue] || delaisValue : null

    const hasFile = type === 'estimate' && file && file instanceof File && file.size > 0
    const fileName = hasFile ? file.name : 'Aucun fichier joint'

    // Validation des champs requis
    const required: Record<string, string | null> = { name, email, message }

    // Ajout des champs requis supplémentaires pour le devis
    if (type === 'estimate') {
      required.budget = budgetValue
      required.delais = delaisValue
    }

    const missingFields = Object.entries(required)
      .filter(([_, value]) => !value)
      .map(([key]) => key)

    if (missingFields.length > 0) {
      return {
        success: false,
        error: 'Veuillez remplir tous les champs obligatoires.',
      }
    }

    // Construction du contenu HTML de l'email
    let htmlContent = `
      <h2>${title}</h2>
      <p><strong>Nom et prénom:</strong> ${name || 'Non renseigné'}</p>
      <p><strong>Email:</strong> ${email || 'Non renseigné'}</p>
      <p><strong>Téléphone:</strong> ${phone}</p>
      <p><strong>Type de client:</strong> ${who}</p>
      <p><strong>Type de projet:</strong> ${what}</p>
    `

    // Ajout des champs spécifiques au devis
    if (type === 'estimate') {
      htmlContent += `
      <p><strong>Budget:</strong> ${budget || 'Non renseigné'}</p>
      <p><strong>Délais:</strong> ${delais || 'Non renseigné'}</p>
      <p><strong>Fichier joint:</strong> ${fileName}</p>
    `
    }

    htmlContent += `
      <p><strong>Message:</strong></p>
      <p>${(message || '').replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>RGPD accepté: ${rgpd}</small></p>
    `

    // Préparation de l'email
    interface EmailData {
      from: string
      to: string[]
      subject: string
      html: string
      attachments?: Array<{
        filename: string
        content: Buffer
      }>
    }

    const emailData: EmailData = {
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['thibaultvigneron.dev@gmail.com'],
      subject,
      html: htmlContent,
    }

    // Ajout de la pièce jointe si un fichier est présent (devis uniquement)
    if (hasFile && file) {
      try {
        const fileBuffer = await file.arrayBuffer()
        emailData.attachments = [
          {
            filename: file.name,
            content: Buffer.from(fileBuffer),
          },
        ]
      } catch (fileError) {
        console.error('Erreur lors de la lecture du fichier:', fileError)
        // On continue sans le fichier si erreur
      }
    }

    // Envoi de l'email
    const { data, error } = await resend.emails.send(emailData)

    if (error) {
      return {
        success: false,
        error: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
      }
    }

    return {
      success: true,
      message: successMessage,
    }
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire:', error)
    return {
      success: false,
      error: 'Une erreur inattendue est survenue. Veuillez réessayer plus tard.',
    }
  }
}
