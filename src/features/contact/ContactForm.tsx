import { useRef, useEffect, useState, type FormEvent } from 'react'
import { CheckCircle, PaperPlaneTilt, WarningCircle } from '@phosphor-icons/react'
import { useForm } from '@formspree/react'
import { contactForm as f } from '@/content/contact'

type Status = 'idle' | 'submitting' | 'error' | 'success'

const FIELDS = ['firstName', 'lastName', 'email', 'message'] as const

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function missingFields(m: { firstName: string; lastName: string; email: string; message: string }): string[] {
  return (['firstName', 'lastName', 'email', 'message'] as const).filter(
    (k) => (k === 'email' ? !EMAIL.test(m[k].trim()) : !m[k].trim())
  )
}

function isCompleteMessage(m: { firstName: string; lastName: string; email: string; message: string }): boolean {
  return missingFields(m).length === 0
}

/**
 * Contact form using Formspree.
 * - Client-side validation for required fields and email format.
 * - Submits via Formspree (POST to https://formspree.io/f/xoeeqevo).
 * - Shows loading, success, and error states.
 */
export function ContactForm({ nested = false }: { nested?: boolean }) {
  const Done = nested ? 'h4' : 'h3'
  const [status, setStatus] = useState<Status>('idle')
  const [invalid, setInvalid] = useState<string[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const sendRef = useRef<HTMLButtonElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)
  const refocus = useRef<'done' | 'form' | null>(null)

  const [formState, handleSubmit] = useForm('xoeeqevo')

  // Focus follows the panel that just appeared
  useEffect(() => {
    if (refocus.current === 'done') doneRef.current?.focus()
    if (refocus.current === 'form') formRef.current?.querySelector('input')?.focus()
    refocus.current = null
  }, [status])

  // Sync Formspree's succeeded state to our status
  useEffect(() => {
    if (formState.succeeded && status === 'submitting') {
      setInvalid([])
      setErrorMsg(null)
      refocus.current = 'done'
      setStatus('success')
    }
  }, [formState.succeeded, status])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = Object.fromEntries(
      FIELDS.map((k) => [k, String(data.get(k) ?? '')])
    ) as { firstName: string; lastName: string; email: string; message: string }

    if (!isCompleteMessage(message)) {
      const missing = missingFields(message)
      setInvalid(missing)
      setStatus('error')
      setErrorMsg('Add your name, a real email, and a short note.')
      formRef.current?.querySelector<HTMLElement>(`[name="${missing[0]}"]`)?.focus()
      const send = sendRef.current
      if (send) {
        send.classList.remove('is-shaking')
        void send.offsetWidth
        send.classList.add('is-shaking')
      }
      return
    }

    setStatus('submitting')
    handleSubmit(event)
  }

  if (status === 'success') {
    return (
      <div className="ct-done" role="status">
        <CheckCircle size={30} weight="fill" aria-hidden />
        <Done ref={doneRef} tabIndex={-1}>
          {f.sentTitle}
        </Done>
        <p>Message sent! Thanks for reaching out. I'll get back to you within 24–48 hours.</p>
        <div className="ct-done__actions">
          <button
            type="button"
            className="pg-btn"
            onClick={() => {
              refocus.current = 'form'
              setStatus('idle')
            }}
          >
            {f.again}
          </button>
        </div>
      </div>
    )
  }

  const field = (name: (typeof FIELDS)[number]) => ({
    name,
    'aria-invalid': invalid.includes(name) || undefined,
    'aria-describedby': invalid.includes(name) ? 'ct-err' : undefined,
  })

  return (
    <form ref={formRef} className="ct-form" noValidate onSubmit={onSubmit}>
      <div className="ct-row2">
        <label className="ct-field">
          <span>{f.first}</span>
          <input
            type="text"
            {...field('firstName')}
            autoComplete="given-name"
            required
            maxLength={80}
            placeholder={f.phFirst}
            disabled={status === 'submitting'}
          />
        </label>
        <label className="ct-field">
          <span>{f.last}</span>
          <input
            type="text"
            {...field('lastName')}
            autoComplete="family-name"
            required
            maxLength={80}
            placeholder={f.phLast}
            disabled={status === 'submitting'}
          />
        </label>
      </div>
      <label className="ct-field">
        <span>{f.email}</span>
        <input
          type="email"
          {...field('email')}
          autoComplete="email"
          required
          maxLength={254}
          placeholder={f.phEmail}
          disabled={status === 'submitting'}
        />
      </label>
      <label className="ct-field">
        <span>{f.message}</span>
        <textarea
          {...field('message')}
          required
          maxLength={1500}
          placeholder={f.phMessage}
          disabled={status === 'submitting'}
        />
      </label>
      <div className="ct-actions">
        <button
          ref={sendRef}
          type="submit"
          className="ct-send"
          disabled={status === 'submitting'}
          onAnimationEnd={(e) => e.currentTarget.classList.remove('is-shaking')}
        >
          <PaperPlaneTilt size={16} weight="fill" aria-hidden />
          {status === 'submitting' ? 'Sending...' : f.send}
        </button>
        {(status === 'error' || invalid.length > 0) ? (
          <span id="ct-err" className="ct-err" role="alert">
            <WarningCircle size={16} weight="fill" aria-hidden />
            {errorMsg ?? f.error}
          </span>
        ) : (
          <span className="ct-hint">{f.hint}</span>
        )}
      </div>
    </form>
  )
}