import type { Credential, SocialLink } from './schema'

/**
 * Who the site is about. START HERE: every page, the sidebar, the SEO tags and the legal pages read
 * these values, so changing them here changes them everywhere.
 */
export const site = {
  name: 'Wilbert Young',
  brand: 'WilbertBuildsAI',
  /** The brand name as the sidebar logo shows it: the second part takes the accent color. */
  brandParts: ['Wilbert', 'BuildsAI'],
  /** Your logo mark, one file per theme (`light` = for light backgrounds). The 96px copies are the
   *  sidebar header (shown at 32-36px); the full ones are the Work logo faces. */
  logo: {
    light: '/images/brand/mark.webp',
    dark: '/images/brand/mark-light.webp',
    headerLight: '/images/brand/mark-96.webp',
    headerDark: '/images/brand/mark-light-96.webp',
  },
  /** The live address, no trailing slash. Canonical URLs, the sitemap and the JSON-LD use it. */
  url: 'https://wilbertbuildsai.vercel.app',
  role: 'AI Automation Specialist',
  email: 'wilbertyoung18@gmail.com',
  emailSubject: 'Project inquiry',
  replyPromise: 'I\'ll get back to you within 24–48 hours.',
  location: 'Manila, Philippines',
  /** Two-letter country code (ISO 3166) for the Person JSON-LD address. */
  countryCode: 'PH',
  /** Your clock, shown live at the top of the sidebar. Any IANA zone, e.g. 'America/New_York'. */
  timeZone: 'Asia/Manila',
  timePlace: 'in Manila',
  avatar: { src: '/images/profile/Wilbert Young Profile.png', alt: 'Wilbert Young', width: 400, height: 400 },
  /** The sidebar picture (112px, 44px on the rail). */
  avatarSmall: '/images/profile/Wilbert Young Profile.png',
} as const

/** A credential shown in About and the sidebar check. Delete the `image` to show it without a badge. */
export const certification: Credential = {
  title: 'AI & Automation Training',
  detail: '6 completed courses · n8n, Make, Zapier, CRM & AI',
  issuer: 'Tara AI Community / n8n Academy',
  href: '#certifications',
  image: { src: '/images/badges/badge.webp', alt: 'Training certificates', width: 96, height: 96 },
}

/** Up to five fit the sidebar header. `icon` picks the glyph in components/brand/SocialIcon.tsx. */
export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/youngwilbert', external: true, icon: 'linkedin' },
  { label: 'Facebook', href: 'https://www.facebook.com/WilbertBuildsAI', external: true, icon: 'facebook' },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~017a7267a71b9c1cce?mp_source=share', external: true, icon: 'upwork' },
  { label: 'OnlineJobsPH', href: 'https://www.onlinejobs.ph/jobseekers/info/5307729', external: true, icon: 'onlinejobsph' },
]

/** Off-site links the pages point at. Replace each `#` with a real URL. */
export const externalLinks = {
  resource: '#',
  showcase: '#',
  company: '#',
} as const

export function mailtoHref(): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}`
}
