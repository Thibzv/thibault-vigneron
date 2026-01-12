'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import Heading from '../components/Heading'
import Button from '../components/Button'
import Link from 'next/link'
import { submitEstimateForm } from '../mail/actionsEstimate'
import Toast from '../components/Toast'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      href={false}
      type="submit"
      variant="primary"
      title={pending ? 'Envoi en cours...' : 'Envoyer ma demande'}
      icon="arrow"
      disabled={pending}
    />
  )
}

interface FormState {
  success: boolean
  message?: string
  error?: string
}

interface EstimateOption {
  label: string
  value: string
}

interface EstimateInfosGroup {
  title?: string | null
  options?: EstimateOption[] | null
}

interface CTAButton {
  id?: string
  variant?: 'primary' | 'secondary'
  href?: string
  title?: string
  icon?: string
  border?: boolean
}

export interface EstimateInfosProps {
  title?: string | null
  intro?: string | null
  who?: EstimateInfosGroup | null
  what?: EstimateInfosGroup | null
  ctaButtons?: CTAButton[] | null
  linkedinUrl?: string | null
}

export default function Estimate({
  title,
  intro,
  who,
  what,
  ctaButtons,
  linkedinUrl,
}: EstimateInfosProps) {
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = React.useActionState<FormState | null, FormData>(
    submitEstimateForm,
    null,
  )
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file.name)
    }
  }

  const truncateFileName = (fileName: string, maxLength = 20): string => {
    if (fileName.length <= maxLength) return fileName
    const extension = fileName.split('.').pop() || ''
    const nameWithoutExt = fileName.slice(0, fileName.lastIndexOf('.'))
    const truncatedName = nameWithoutExt.slice(0, maxLength - extension.length - 4)
    return `${truncatedName}...${extension}`
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    const fileInput = document.getElementById('file') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  // Pré-sélection du champ "what" basé sur le paramètre URL "offer"
  useEffect(() => {
    const offerParam = searchParams.get('offer')
    if (offerParam) {
      const whatOptions =
        what?.options && what.options.length > 0
          ? what.options
          : [
              { label: 'Landing page', value: 'landing-page' },
              { label: 'Site vitrine', value: 'site-vitrine' },
              { label: 'Boutique en ligne', value: 'boutique-en-ligne' },
              { label: 'Application web', value: 'application-web' },
              { label: 'WordPress', value: 'wordpress' },
              { label: 'Autre', value: 'autre' },
            ]

      // Vérifier si la valeur du paramètre correspond à une option
      const matchingOption = whatOptions.find((option) => option.value === offerParam)

      if (matchingOption) {
        const radioInput = document.getElementById(
          `what-estimate-${matchingOption.value}`,
        ) as HTMLInputElement
        if (radioInput) {
          radioInput.checked = true
        }
      }
    }
  }, [searchParams, what])

  useEffect(() => {
    if (state) {
      if (state.success) {
        setToastMessage(state.message || 'Demande de devis envoyée avec succès')
        setToastType('success')
        formRef.current?.reset()
        setSelectedFile(null)
        const radios = formRef.current?.querySelectorAll('input[type="radio"]')
        radios?.forEach((radio) => ((radio as HTMLInputElement).checked = false))
      } else {
        setToastMessage(state.error || 'Une erreur est survenue')
        setToastType('error')
      }
    }
  }, [state])

  return (
    <main className="contact">
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
      <div className="contact__left">
        <header className="contact__header">
          {title && (
            <Heading tag="h1" className="heading heading--huge heading--black">
              {title}
            </Heading>
          )}

          {intro && <p>{intro}</p>}

          <nav className="contact__nav">
            {ctaButtons &&
              ctaButtons.length > 0 &&
              ctaButtons
                .filter((button) => {
                  const href = button.href || ''
                  return !href.startsWith('/devis')
                })
                .map((button) => (
                  <Button
                    key={button.id || button.href || button.title}
                    variant={button.variant || 'primary'}
                    href={button.href || '#'}
                    title={button.title || ''}
                    icon={button.icon || undefined}
                    border={Boolean(button.border)}
                  />
                ))}

            {linkedinUrl && (
              <Link
                href={linkedinUrl}
                className="contact__linkedin"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <span className="icon-linkedin"></span>
              </Link>
            )}
          </nav>
        </header>

        <div className="contact__content">
          <div className="contact__infos">
            {who && who.title && (
              <Heading tag="h2" className="heading heading--medium heading--black">
                {who?.title}
              </Heading>
            )}

            <div className="contact__radios">
              {(who?.options && who.options.length > 0
                ? who.options
                : [
                    { label: 'Un professionnel', value: 'professionnel' },
                    { label: 'Un particulier', value: 'particulier' },
                  ]
              ).map((option) => (
                <label
                  key={option.value}
                  htmlFor={`who-estimate-${option.value}`}
                  className="contact__radio"
                >
                  <input
                    type="radio"
                    id={`who-estimate-${option.value}`}
                    name="who"
                    value={option.value}
                    form="estimate-form"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="contact__infos">
            {what && what.title && (
              <Heading tag="h2" className="heading heading--medium heading--black">
                {what.title}
              </Heading>
            )}

            <div className="contact__radios">
              {(what?.options && what.options.length > 0
                ? what.options
                : [
                    { label: 'Landing page', value: 'landing-page' },
                    { label: 'Site vitrine', value: 'site-vitrine' },
                    { label: 'Boutique en ligne', value: 'boutique-en-ligne' },
                    { label: 'Application web', value: 'application-web' },
                    { label: 'WordPress', value: 'wordpress' },
                    { label: 'Autre', value: 'autre' },
                  ]
              ).map((option) => (
                <label
                  key={option.value}
                  htmlFor={`what-estimate-${option.value}`}
                  className="contact__radio"
                >
                  <input
                    type="radio"
                    id={`what-estimate-${option.value}`}
                    name="what"
                    value={option.value}
                    form="estimate-form"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <form id="estimate-form" ref={formRef} className="contact__form" action={formAction}>
        <input
          type="text"
          name="name"
          placeholder="Nom et prénom*"
          required
          pattern="[A-Za-zÀ-ÿ\s'-]{2,50}"
          title="Veuillez entrer un nom valide (2-50 caractères, lettres uniquement)"
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          required
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          title="Veuillez entrer une adresse email valide"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Téléphone"
          pattern="[0-9\s\+\-\(\)]{10,20}"
          title="Veuillez entrer un numéro de téléphone valide"
        />

        <div className="contact__cols">
          <select name="budget" required>
            <option value="">Budget</option>
            <option value="-1000">0€ - 1000€</option>
            <option value="1000-2000">1000€ - 2000€</option>
            <option value="+2000">+2000€</option>
          </select>
          <select name="delais" required>
            <option value="">Délais</option>
            <option value="1-2 semaine">1-2 semaine</option>
            <option value="1 mois">1 mois</option>
            <option value="+1 mois">+1 mois</option>
          </select>
        </div>

        <textarea
          name="message"
          placeholder="Message*"
          required
          minLength={10}
          title="Le message doit contenir au moins 10 caractères"
        />

        <div className="contact__actions">
          <label className="contact__rgpd">
            <input type="checkbox" name="rgpd" required />
            <span>
              En soumettant ce formulaire, j&apos;accepte la
              <Link href="/politique-de-confidentialite" rel="noopener noreferrer">
                {' '}
                politique de confidentialité
              </Link>
            </span>
          </label>

          <div className="contact__buttons">
            <div className="contact__file">
              <input type="file" name="file" id="file" onChange={handleFileChange} />
              <label
                htmlFor="file"
                className="button button--secondary button--border contact__file-label"
              >
                <span className="button__inner">
                  <span className="button__icon">
                    <span className="icon-upload"></span>
                    <span className="icon-upload"></span>
                  </span>
                </span>

                <span className="button__label">
                  {selectedFile ? truncateFileName(selectedFile) : 'Joindre un fichier'}
                </span>
              </label>
              {selectedFile && (
                <button
                  type="button"
                  className="contact__remove"
                  onClick={handleRemoveFile}
                  aria-label="Supprimer le fichier"
                >
                  <span className="icon-cross"></span>
                </button>
              )}
            </div>

            <SubmitButton />
          </div>
        </div>
      </form>
    </main>
  )
}
