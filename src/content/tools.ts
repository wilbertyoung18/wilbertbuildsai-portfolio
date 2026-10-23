import type { ToolMark } from './schema'

const mark = (name: string, file: string, mono?: true, scale?: number): ToolMark => ({
  name,
  logo: `/images/brand/${file}`,
  mono,
  scale,
})

/**
 * Real tool logos used across the site. The marks reference files in
 * public/images/brand/ — replace with actual logos when available.
 * A black one-colour logo takes a third argument, `true`, so it is inverted on dark grounds.
 * The fourth argument `scale` adjusts the visual size within the tile (default 1).
 */
export const tools = {
  // AI Automation Specialist
  n8n: mark('n8n', 'n8n-icon.png', true, 1),
  zapier: mark('Zapier', 'zapier logo.png', true, 1),
  make: mark('Make', 'Make logo.png', true, 1),
  gohighlevel: mark('GoHighLevel', 'GHL logo.png', true, 1),

  // AI Agents & Voice AI
  relevanceAi: mark('Relevance AI', 'relevance ai.png', undefined, 1),
  grokbot: mark('Grokbot', 'grokbot.jpg', undefined, 1),
  supabase: mark('Supabase', 'Supabase logo.png', true, 1),
  vapi: mark('Vapi', 'vapi logo.png', true, 1),
  elevenlabs: mark('ElevenLabs', 'elevenlabs.png', true, 1),

  // Web Design & Development
  claudeCode: mark('Claude Code', 'claude logo.png', true, 1),
  github: mark('GitHub', 'github logo.png', true, 1),
  canva: mark('Canva', 'canva logo.png', undefined, 1),
  figma: mark('Figma', 'figma logo.png', undefined, 1),
  hostinger: mark('Hostinger', 'hostinger logo.png', undefined, 1),

  // Tech VA & Project Operations
  googleWorkspace: mark('Google Workspace', 'Google logo.png', undefined, 1.35),
  slack: mark('Slack', 'Slack logo.png', true, 1.2),
  hubspot: mark('HubSpot', 'Hubspot logo.png', undefined, 1),
  fireflies: mark('Fireflies.ai', 'fireflies logo.jpg', undefined, 1),
  loom: mark('Loom', 'Loom logo.png', undefined, 1),

  // Legacy tools used in home.ts and services.ts
  airtable: mark('Airtable', 'airtable.svg', true, 1),
  openrouter: mark('OpenRouter', 'openrouter.svg', true, 1),
  react: mark('React', 'react.svg', true, 1),
  vite: mark('Vite', 'vite.svg', true, 1),
} satisfies Record<string, ToolMark>

/** The daily drivers, in the order you want them shown. */
export const dailyTools: ToolMark[] = [
  tools.n8n,
  tools.make,
  tools.zapier,
  tools.gohighlevel,
  tools.relevanceAi,
  tools.grokbot,
  tools.supabase,
  tools.vapi,
  tools.elevenlabs,
  tools.claudeCode,
  tools.github,
  tools.canva,
  tools.figma,
  tools.hostinger,
  tools.googleWorkspace,
  tools.slack,
  tools.hubspot,
  tools.fireflies,
  tools.loom,
  tools.airtable,
  tools.openrouter,
  tools.react,
  tools.vite,
]