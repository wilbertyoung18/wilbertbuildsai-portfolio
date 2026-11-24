import type { Faq } from './schema'

/** The questions people ask before they write. Pages pick the ones that answer their own objection. */
export const faqs = {
  whatYouBuild: {
    question: 'What kind of automations can you build?',
    answer: 'I build AI agents, automated workflows, and custom integrations that help businesses save time and reduce repetitive work. This includes lead management, CRM updates, email automation, appointment scheduling, and connecting different business tools using n8n, Make, Zapier, APIs, and more.',
  },
  startSpeed: {
    question: 'How long does an automation project take?',
    answer: 'It depends on the complexity of your project. A simple workflow may take less time than an AI agent with multiple integrations. After reviewing your requirements, I\'ll provide a realistic timeline.',
  },
  needStack: {
    question: 'Do I need to use a specific platform?',
    answer: 'Not at all! I work with n8n, Make, Zapier, and other AI and automation tools. I\'ll recommend the platform that makes the most sense for your business, existing systems, and budget.',
  },
  pricing: {
    question: 'How much does automation cost?',
    answer: 'Every project is different. Pricing depends on the complexity, number of integrations, and features you need. Share your requirements, and I\'ll provide a custom quote.',
  },
  afterWrite: {
    question: 'What happens after I send an inquiry?',
    answer: 'I\'ll review your message and aim to respond within 24–48 hours. We can discuss your current process, identify opportunities for automation, and explore a practical solution.',
  },
  onboardingFor: {
    question: 'Who is Automated Client Onboarding for?',
    answer: 'This automation is for service-based businesses, agencies, and consultants who onboard new clients regularly and want to eliminate manual handoffs between sales, billing, and delivery teams. It works best when you already use HubSpot, Stripe, Slack, Trello, Asana, and Gmail — or are willing to adopt them.',
  },
  onboardingInstall: {
    question: 'Is there anything to install?',
    answer: 'No installation required. The workflows run entirely in Zapier\'s cloud platform. You connect your existing accounts (HubSpot, Stripe, Slack, Trello, Asana, Gmail, Youform) once, and Zapier handles the rest. There\'s no code to deploy, no server to manage, and no browser extension to install.',
  },
  onboardingCost: {
    question: 'What does Automated Client Onboarding cost?',
    answer: 'This is a personal automation project, not a paid product. The cost to run it depends on your Zapier plan and the volume of tasks — each new client triggers roughly 15–20 tasks across the four Zaps. On Zapier\'s Professional plan ($49/month for 2,000 tasks), you could onboard approximately 100–130 clients per month within the included task allowance.',
  },
} satisfies Record<string, Faq>

export const allFaqs: Faq[] = Object.values(faqs)