'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Heading from '../components/Heading'
import Button from '../components/Button'
import Link from 'next/link'
import { submitContactForm } from '../mail/actionsContact'
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

interface ContactOption {
  label: string
  value: string
}

interface ContactInfosGroup {
  title?: string | null
  options?: ContactOption[] | null
}

interface CTAButton {
  id?: string
  variant?: 'primary' | 'secondary'
  href?: string
  title?: string
  icon?: string
  border?: boolean
}

export interface ContactInfosProps {
  title?: string | null
  intro?: string | null
  who?: ContactInfosGroup | null
  what?: ContactInfosGroup | null
  ctaButtons?: CTAButton[] | null
  linkedinUrl?: string | null
}

export default function Contact({
  title,
  intro,
  who,
  what,
  ctaButtons,
  linkedinUrl,
}: ContactInfosProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = React.useActionState<FormState | null, FormData>(
    submitContactForm,
    null,
  )
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    if (state) {
      if (state.success) {
        setToastMessage(state.message || 'Message envoyé avec succès')
        setToastType('success')
        formRef.current?.reset()
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
              ctaButtons.map((button) => (
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
                  htmlFor={`who-${option.value}`}
                  className="contact__radio"
                >
                  <input
                    type="radio"
                    id={`who-${option.value}`}
                    name="who"
                    value={option.value}
                    form="contact-form"
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
                  htmlFor={`what-${option.value}`}
                  className="contact__radio"
                >
                  <input
                    type="radio"
                    id={`what-${option.value}`}
                    name="what"
                    value={option.value}
                    form="contact-form"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <form id="contact-form" ref={formRef} className="contact__form" action={formAction}>
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
              <Link href="/politique-de-confidentialite" rel="noopener noreferrer" replace>
                {' '}
                politique de confidentialité
              </Link>
            </span>
          </label>

          <SubmitButton />
        </div>
      </form>
    </main>
  )
}
