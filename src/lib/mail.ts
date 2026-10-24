import { site } from '@/content/site'

export type ContactMessage = { firstName: string; lastName: string; email: string; message: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** The fields still empty, or the email when it is not shaped like one, in form order. */
export function missingFields(m: ContactMessage): (keyof ContactMessage)[] {
  return (['firstName', 'lastName', 'email', 'message'] as const).filter((k) => (k === 'email' ? !EMAIL.test(m.email.trim()) : !m[k].trim()))
}

/** Every field filled and the email shaped like one. The mail app does the real check. */
export function isCompleteMessage(m: ContactMessage): boolean {
  return missingFields(m).length === 0
}

/** The message as plain text: name and reply address on top, then what they wrote. */
export function contactText(m: ContactMessage): string {
  return `${m.firstName.trim()} ${m.lastName.trim()}\n${m.email.trim()}\n\n${m.message.trim()}`
}

/**
 * Builds a mailto: link for direct email fallback. The form itself submits via Formspree.
 * Kept for potential future use or direct email links elsewhere on the site.
 */
export function contactMailto(m: ContactMessage): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}&body=${encodeURIComponent(contactText(m))}`
}
