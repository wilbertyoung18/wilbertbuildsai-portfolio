/**
 * Home "Featured" section copy and the two project cards. Each card is one link: the 3D Experience
 * opens the static /3d page in the SAME tab; Wilbert AI opens an external demo in a NEW tab. The
 * posters are lazy webp; the hover clips (preload="none") only load on a real pointer hover, so the
 * home background is never delayed. Add or reorder a card here and the section follows.
 */
export const featuredSection = {
  eyebrow: 'Featured',
  title: 'Two projects, ready to explore',
  sub: 'A quick look at each. Open one to see the full thing.',
}

export type FeaturedSource = { type: string; src: string }

export type FeaturedCard = {
  id: string
  tag: string
  name: string
  pitch: string
  href: string
  /** true = same-tab internal page; false = external, opens in a new tab with rel=noopener. */
  sameTab: boolean
  button: string
  note: string
  poster: string
  sources: FeaturedSource[]
  alt: string
}

export const featuredCards: FeaturedCard[] = [
  {
    id: '3d-experience',
    tag: 'Interactive',
    name: '3D Experience',
    pitch: 'Explore the portfolio as an interactive 3D scene. Orbit, scroll and look around.',
    href: '/3d/',
    sameTab: true,
    button: 'Explore in 3D',
    note: 'Opens in this tab',
    poster: '/featured/3d-poster.webp',
    sources: [
      { type: 'video/webm', src: '/featured/3d-preview.webm' },
      { type: 'video/mp4', src: '/featured/3d-preview.mp4' },
    ],
    alt: 'The 3D portfolio scene — an orbiting, interactive view of the work.',
  },
  {
    id: 'wilbert-ai',
    tag: 'Live demo',
    name: 'Wilbert AI',
    pitch: 'A custom-built AI automation assistant for n8n, Vapi, webhooks and data workflows.',
    href: 'https://wilbert-ai-studio.vercel.app/',
    sameTab: false,
    button: 'Try the live demo',
    note: 'Opens in a new tab',
    poster: '/featured/wilbert-ai-poster.webp',
    sources: [
      { type: 'video/webm', src: '/featured/wilbert-ai-preview.webm' },
      { type: 'video/mp4', src: '/featured/wilbert-ai-preview.mp4' },
    ],
    alt: 'The Wilbert AI assistant — a chat demo for n8n, Vapi, webhooks and data workflows.',
  },
]
