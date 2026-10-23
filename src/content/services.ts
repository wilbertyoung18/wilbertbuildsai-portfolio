import type { Service } from './schema'
import { tools } from './tools'

export const servicesPage = {
  eyebrow: 'Services',
  title: 'Everything you offer, in one line each.',
  lede: 'Start with one solution or connect a few to make your business work smarter.',
}

/**
 * The Home Services section: a stack of cards dealt onto a pile as the page scrolls.
 * The display line is the thin + bold pair below.
 */
export const servicesSection = {
  eyebrow: servicesPage.eyebrow,
  titleThin: 'PICK ONE',
  titleBold: 'OR STACK A FEW.',
  explore: 'Explore',
  /** The Work chapter each card opens, by service id (a chapter id from home.ts). */
  work: {
    'business-automation': 'workflow-automation',
    'ai-chatbots-assistants': 'ai-agents',
    'crm-setup': 'sales-marketing',
    'app-api-integrations': 'document-data',
    'website-development': 'workflow-automation',
  } as Record<string, string>,
}

export const services: Service[] = [
  {
    id: 'business-automation',
    title: 'Business Automation',
    summary: 'Spend less time on repetitive tasks. I automate your daily workflows so you can focus on growing your business.',
    outcome: 'Automated workflows',
    bullets: [
      'Business workflow automation',
      'Sales and follow-up automation',
      'Employee and client onboarding',
    ],
    tools: [tools.n8n, tools.make, tools.zapier, tools.gohighlevel, tools.googleWorkspace],
  },
  {
    id: 'ai-chatbots-assistants',
    title: 'AI Chatbots & Assistants',
    summary: 'Let AI answer customer questions and handle routine conversations. Give your customers faster support without adding more work to your team.',
    outcome: 'AI-powered support',
    bullets: [
      'AI customer support chatbots',
      'Facebook Messenger AI assistants',
      'Knowledge-base assistants using RAG',
    ],
    tools: [tools.n8n, tools.vapi, tools.openrouter, tools.supabase],
  },
  {
    id: 'crm-setup',
    title: 'CRM Setup',
    summary: 'Keep your leads, contacts, and sales pipeline organized. I set up a CRM that makes managing customer relationships easier.',
    outcome: 'Organized pipeline',
    bullets: [
      'CRM setup and customization',
      'Contact and lead management',
      'Sales pipeline setup',
    ],
    tools: [tools.hubspot, tools.airtable, tools.gohighlevel],
  },
  {
    id: 'app-api-integrations',
    title: 'App & API Integrations',
    summary: 'Make your business tools work together. I connect your apps so information flows smoothly between systems.',
    outcome: 'Connected systems',
    bullets: [
      'Connecting business applications',
      'API connections and configuration',
      'Webhook setup',
    ],
    tools: [tools.n8n, tools.make, tools.zapier, tools.react, tools.vite],
  },
  {
    id: 'website-development',
    title: 'Website Development',
    summary: 'Give your business a professional online presence. I build clean, modern websites that help customers discover and connect with you.',
    outcome: 'Professional web presence',
    bullets: [
      'Portfolio websites',
      'Business websites',
      'Landing pages',
    ],
    tools: [tools.react, tools.vite, tools.zapier, tools.make],
  },
]