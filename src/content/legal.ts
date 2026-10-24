import { site } from './site'

export type LegalSection = { heading: string; paragraphs: string[] }

export type LegalDoc = {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

/** What this site actually stores and loads. Keep in sync with src/lib/storage.ts and src/lib/analytics.ts. */
export const privacyPolicy: LegalDoc = {
  title: 'Privacy Policy',
  updated: 'January 1, 2026',
  intro: `This policy covers ${site.url.replace('https://', '')}, the portfolio of ${site.name} trading as ${site.brand}. This site is a personal portfolio and does not collect personal data beyond what you voluntarily provide.`,
  sections: [
    {
      heading: 'What this site collects',
      paragraphs: [
        'This site has no backend and does not store any data you enter. The contact form opens your own email client with a pre-filled message — nothing is sent to or stored on this server.',
        'If you email me directly, I retain your message only as long as needed to respond or as required by law. You may ask me to delete it at any time by writing to ' + site.email + '.',
      ],
    },
    {
      heading: 'What your browser stores',
      paragraphs: [
        'This site stores your theme preference (light/dark) and sidebar collapsed state in localStorage. No other data is stored in your browser unless you enable analytics (see below).',
      ],
    },
    {
      heading: 'Analytics',
      paragraphs: [
        'This site uses no analytics by default. If analytics are added in the future, they will only load after you give explicit consent via the built-in consent notice.',
      ],
    },
    {
      heading: 'Hosting',
      paragraphs: [
        'This site is hosted on a static hosting platform (Vercel/Netlify or similar). The host may log standard access data: IP address, page requested, timestamp, and user agent. I do not access these logs personally.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        `You may request access to or deletion of any personal data I hold by contacting ${site.email}. I will respond within a reasonable timeframe.`,
      ],
    },
    {
      heading: 'Changes',
      paragraphs: ['Any changes to this policy will be reflected by the updated date at the top of this page.'],
    },
  ],
}

export const termsOfService: LegalDoc = {
  title: 'Terms of Service',
  updated: 'January 1, 2026',
  intro: `These terms cover your use of this portfolio site, run by ${site.name} trading as ${site.brand}. This site is a personal portfolio and not a binding offer of services.`,
  sections: [
    {
      heading: 'Using this site',
      paragraphs: [
        'You may browse this site freely. The sample projects, demos, and case studies use made-up or anonymized names and details unless otherwise stated.',
      ],
    },
    {
      heading: 'Working together',
      paragraphs: [
        'Nothing on this site constitutes a binding offer or contract. Client work begins only after a discovery call, a written proposal, and a signed agreement.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        'I own the design, copy, and code of this portfolio unless otherwise noted. Third-party logos and trademarks belong to their respective owners and are used for identification only. Client work shown is shared with permission and does not transfer ownership.',
      ],
    },
    {
      heading: 'No warranties',
      paragraphs: [
        'This site is provided "as is" without warranties of any kind. I do not guarantee uninterrupted access, accuracy of content, or fitness for a particular purpose.',
      ],
    },
    {
      heading: 'External links',
      paragraphs: ['Links to other sites are provided for convenience. I am not responsible for the content, privacy practices, or availability of external sites.'],
    },
    {
      heading: 'Governing law',
      paragraphs: ['These terms are governed by the laws of the Philippines, where I operate.'],
    },
    {
      heading: 'Contact',
      paragraphs: [`Questions about these terms: ${site.email}.`],
    },
  ],
}