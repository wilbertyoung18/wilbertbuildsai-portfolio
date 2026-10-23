import type { Image, ToolMark } from './schema'
import { site } from './site'
import { tools } from './tools'

/**
 * The Home About section: the desk illustration stands on a hairline floor with the lead over its
 * space; roles with tool logos as raised keys, credentials below.
 */
export const aboutSection = {
  eyebrow: 'About',
  titleThin: "Hi, I'm",
  titleBold: 'WILBERT YOUNG.',
  lede: 'AI Automation Specialist | Building smarter workflows for real business problems.',
  lead: 'I spent 8+ years understanding how businesses work.',
  leadQuiet: 'Now, I build AI-powered solutions that make work easier.',
  note: {
    company: 'WilbertBuildsAI is my personal brand, where I share my journey, projects, and experiments in AI and automation.',
    product: { label: 'Follow WilbertBuildsAI on Facebook', href: 'https://www.facebook.com/WilbertBuildsAI' },
    rest: '',
  },
  picture: {
    src: '/images/profile/Wilbert%202D.png',
    srcSet: '/images/profile/Wilbert%202D.png 1200w',
    alt: `Illustration of ${site.name} at an anime-style workspace with a laptop and setup`,
    width: 1200,
    height: 889,
  } satisfies Image,
}

export const capabilities: { title: string; tools: ToolMark[] }[] = [
  { title: 'AI Automation Specialist', tools: [tools.n8n, tools.zapier, tools.make, tools.gohighlevel] },
  { title: 'AI Agents & Voice AI', tools: [tools.relevanceAi, tools.grokbot, tools.supabase, tools.vapi, tools.elevenlabs] },
  { title: 'Web Design & Development', tools: [tools.claudeCode, tools.github, tools.canva, tools.figma, tools.hostinger] },
  { title: 'Tech VA & Project Operations', tools: [tools.googleWorkspace, tools.slack, tools.hubspot, tools.fireflies, tools.loom] },
]

export type AboutCredential = {
  id: 'cert' | 'place' | 'community' | 'brand'
  title: string
  detail: string
  image?: Image
  /** A dark-theme version of the mark, when the light one would vanish on a dark ground (or the reverse). */
  imageDark?: Image
  href?: string
}

export const credentials: AboutCredential[] = [
  {
    id: 'cert',
    title: 'AI & Automation Training',
    detail: '6 COMPLETED COURSES',
    image: { src: '/images/badges/badge.webp', alt: '', width: 64, height: 64 },
  },
  {
    id: 'place',
    title: 'Based in the Philippines',
    detail: 'GMT+8 · US HOURS',
    image: { src: '/images/icons/map-pin.svg', alt: '', width: 24, height: 24 },
  },
  {
    id: 'community',
    title: 'Tara AI Community',
    detail: 'COMMUNITY LEARNER',
    image: { src: '/images/brand/Tara AI Community Logo.png', alt: '', width: 64, height: 64 },
  },
  {
    id: 'brand',
    title: 'WilbertBuildsAI',
    detail: 'FOUNDER & CREATOR',
    href: 'https://www.facebook.com/WilbertBuildsAI',
    // Original logos from public/images/brand/
    // Light mode: dark-text logo; Dark mode: white-text logo
    image: { src: '/images/brand/Wilbert Builds AI dark Logo.png', alt: '', width: 1536, height: 1024 },
    imageDark: { src: '/images/brand/Wilbert Builds AI white logo.png', alt: '', width: 1536, height: 1024 },
  },
]

/** Detailed certificate data for the certifications popup. */
export type Certificate = {
  id: string
  title: string
  issuer: string
  issuedDate: string
  verificationUrl: string
  imageSrc: string
  imageAlt: string
}

export const certificates: Certificate[] = [
  {
    id: 'n8n-full-training',
    title: 'AI Automation with n8n — Full Training',
    issuer: 'Tara AI Community',
    issuedDate: 'October 15, 2026',
    verificationUrl: 'https://my-certificates.com/certificates/6ad08d1d8156a38b0bdf208d',
    imageSrc: '/images/about/certifications/Wilbert_Dennis_Young_n8n.png',
    imageAlt: 'AI Automation with n8n — Full Training certificate',
  },
  {
    id: 'highlevel-crm',
    title: 'HighLevel CRM',
    issuer: 'Tara AI Community',
    issuedDate: 'October 8, 2026',
    verificationUrl: 'https://my-certificates.com/certificates/6ac76f36c7fba3667c3f635c',
    imageSrc: '/images/about/certifications/Wilbert_Dennis_Young_HighLevel.png',
    imageAlt: 'HighLevel CRM certificate',
  },
  {
    id: 'make-automation',
    title: 'No-Code Automation with Make',
    issuer: 'Tara AI Community',
    issuedDate: 'October 6, 2026',
    verificationUrl: 'https://my-certificates.com/certificates/6ac3e8422cd92d9ed73e1a6d',
    imageSrc: '/images/about/certifications/Make Certificate.png',
    imageAlt: 'No-Code Automation with Make certificate',
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    issuer: 'Tara AI Community',
    issuedDate: 'October 6, 2026',
    verificationUrl: 'https://my-certificates.com/certificates/6ac50bdbae3073d046a1a7f5',
    imageSrc: '/images/about/certifications/Wilbert_Dennis_Young_Prompt_Engineering.png',
    imageAlt: 'Prompt Engineering certificate',
  },
  {
    id: 'zapier-automation',
    title: 'No-Code Automation with Zapier',
    issuer: 'Tara AI Community',
    issuedDate: 'September 21, 2026',
    verificationUrl: 'https://my-certificates.com/certificates/6ab01a4e2e2cf7eef7240bc8',
    imageSrc: '/images/about/certifications/Zapier certificate.png',
    imageAlt: 'No-Code Automation with Zapier certificate',
  },
  {
    id: 'n8n-quickstart',
    title: 'n8n QS101 Quickstart',
    issuer: 'n8n Academy',
    issuedDate: 'June 25, 2026',
    verificationUrl: 'https://badges.n8n.io/98117408-513e-47a9-8e41-126553a0fe1c#acc.1HWX5eln',
    imageSrc: '/images/about/certifications/n8n quickstart.png',
    imageAlt: 'n8n QS101 Quickstart certificate',
  },
]