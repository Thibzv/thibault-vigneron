'use server'

import { submitForm } from './resend'

interface FormState {
  success: boolean
  message?: string
  error?: string
}

export async function submitEstimateForm(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  return submitForm(formData, {
    type: 'estimate',
    subject: 'Nouvelle demande de devis',
    title: 'Nouvelle demande de devis',
    successMessage: 'Votre demande de devis a été envoyée avec succès !',
  })
}
