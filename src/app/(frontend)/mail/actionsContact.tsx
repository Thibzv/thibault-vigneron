'use server'

import { submitForm } from './resend'

interface FormState {
  success: boolean
  message?: string
  error?: string
}

export async function submitContactForm(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  return submitForm(formData, {
    type: 'contact',
    subject: 'Nouvelle demande de contact',
    title: 'Nouvelle demande de contact',
    successMessage: 'Votre message a été envoyé avec succès !',
  })
}
