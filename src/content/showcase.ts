import type { Faq, Image, ProductFilm, ProductTab } from './schema'

/** The address shown in the browser-window bars around the film and the room screens. */
export const showcaseHost = 'wilbertbuildsai.com'

/** Build an image reference pointing to the Client Onboarding project folder. */
const onboardingImage = (file: string, alt: string, width = 1600, height = 900): Image => ({
  src: `/images/projects/zapier/Client Onboarding/${file}`,
  alt,
  width,
  height,
})

export const showcasePage = {
  eyebrow: 'Showcase',
  titleThin: 'FROM NEW LEAD TO',
  titleBold: 'ONBOARDED CLIENT. AUTOMATICALLY.',
  lede: 'Four connected Zapier workflows help businesses manage the client journey — from capturing inquiries and updating CRM records to payment notifications, workspace invitations, and onboarding tasks.',
  footnote: 'PERSONAL PROJECT · ZAPIER AUTOMATION',
  cta: { label: 'View Project Details', href: '/work#workflow-automation', external: false },
  roomsTitle: 'CLIENT ONBOARDING JOURNEY',
  previewImage: onboardingImage('Whole Client Onboarding Automations.png', 'Zapier folder containing all four Client Onboarding automations', 1600, 900),
}

/** The product film: a short muted loop, no audio. Keep it small (a couple of MB). */
export const showcaseFilm: ProductFilm = {
  src: '/media/showcase-film.mp4',
  poster: { src: '/images/showcase/film-poster.webp', alt: 'Automated Client Onboarding film', width: 1280, height: 720 },
  pagePosters: { phone: '/images/showcase/film-poster-640.webp', wide: '/images/showcase/film-poster-960.webp' },
  name: 'Automated Client Onboarding: a short tour',
  description: 'A walkthrough of the four connected Zapier workflows that automate the client onboarding journey from lead capture to task creation.',
  duration: '0:10',
  published: '2026-01-01',
}

/** Number + unit. Use only figures you can state as fact. */
export const showcaseStats: [string, string][] = [
  ['4', 'connected Zaps'],
  ['6', 'business tools'],
  ['100%', 'automated handoff'],
  ['5', 'steps, one journey'],
]

/** The five rooms of the product, each with a caption and a screen. */
export const productTabs: ProductTab[] = [
  {
    id: 'room-1',
    label: 'Capture the Lead',
    body: 'When a potential client submits an inquiry, their contact details are automatically added to HubSpot. No manual copying, and the information is ready for follow-up.',
    image: onboardingImage('1. Lead Form.png', 'Lead Form submission screen', 1600, 900),
    supportingImage: onboardingImage('1. Hubspot Create Contact.png', 'HubSpot contact created', 1600, 900),
    businessBenefit: 'Less data entry. Faster lead organization.',
    workflow: 'Youform → HubSpot',
  },
  {
    id: 'room-2',
    label: 'Confirm the Subscription',
    body: 'When a subscription payment succeeds, Zapier updates the customer\'s HubSpot record and notifies the team through Slack.',
    image: onboardingImage('2. Slack Message.png', 'Slack notification for new subscription', 1600, 900),
    supportingImage: onboardingImage('2. Update Hubspot.png', 'HubSpot record updated with payment', 1600, 900),
    businessBenefit: 'Updated customer records and better team visibility.',
    workflow: 'Stripe → HubSpot → Slack',
  },
  {
    id: 'room-3',
    label: 'Welcome the Client',
    body: 'A new-client notification starts the onboarding workflow, helping prepare the customer\'s Trello workspace and sending an invitation email so they know where to begin.',
    image: onboardingImage('3. Client Workspace in Trello.png', 'Client workspace in Trello', 1600, 900),
    supportingImage: onboardingImage('4. Client Onboarding Form.png', 'Client onboarding form', 1600, 900),
    businessBenefit: 'A smoother onboarding experience with fewer manual steps.',
    workflow: 'Slack → Trello → Gmail',
  },
  {
    id: 'room-4',
    label: 'Organize the Work',
    body: 'Once the client completes the onboarding form, Zapier checks for existing tasks, creates the appropriate Asana task, and updates the team in Slack.',
    image: onboardingImage('4. Asana Create Task.png', 'Asana task created for onboarding', 1600, 900),
    supportingImage: onboardingImage('4. Update Team to Slack.png', 'Team updated in Slack', 1600, 900),
    businessBenefit: 'Clear responsibilities and fewer duplicate tasks.',
    workflow: 'Youform → Asana → Slack',
  },
  {
    id: 'room-5',
    label: 'Behind the Automation',
    body: 'Four connected Zapier workflows bring together lead capture, subscription tracking, client invitations, and task management into one coordinated onboarding process.',
    image: onboardingImage('1. Lead Forms to CRM - Actual Workflow.png', 'Lead capture workflow diagram', 1600, 900),
    workflowDiagrams: [
      {
        id: 'workflow-1',
        label: 'Lead Capture',
        image: onboardingImage('1. Lead Forms to CRM - Actual Workflow.png', 'Lead Forms to CRM workflow', 1600, 900),
        description: 'The complete Zapier workflow connecting lead form submission to HubSpot contact creation.',
      },
      {
        id: 'workflow-2',
        label: 'Payment & CRM Update',
        image: onboardingImage('2. New Subscription to CRM - Actual Workflow.png', 'Payment & CRM update workflow', 1600, 900),
        description: 'The complete Zapier workflow for payment processing, CRM update, and Slack notification.',
      },
      {
        id: 'workflow-3',
        label: 'Onboarding Kickoff',
        image: onboardingImage('3. Automated New Client Onboarding - Actual Workflow.png', 'Onboarding kickoff workflow', 1600, 900),
        description: 'The complete Zapier workflow for sending onboarding email and creating Trello workspace.',
      },
      {
        id: 'workflow-4',
        label: 'Task & Team Update',
        image: onboardingImage('4. Onboarding Task Auto Update - Actual Workflow.png', 'Task & team update workflow', 1600, 900),
        description: 'The complete Zapier workflow connecting form submission to Asana task creation and team notification.',
      },
    ],
    businessBenefit: 'Multiple business tools working together with less manual coordination.',
  },
]

/** Three questions people ask about the product, answered the way the product itself answers them. */
export const showcaseFaq: Faq[] = [
  {
    question: 'Who is Automated Client Onboarding for?',
    answer: 'This automation is for service-based businesses, agencies, and consultants who onboard new clients regularly and want to eliminate manual handoffs between sales, billing, and delivery teams. It works best when you already use HubSpot, Stripe, Slack, Trello, Asana, and Gmail — or are willing to adopt them.',
  },
  {
    question: 'Is there anything to install?',
    answer: 'No installation required. The workflows run entirely in Zapier\'s cloud platform. You connect your existing accounts (HubSpot, Stripe, Slack, Trello, Asana, Gmail, Youform) once, and Zapier handles the rest. There\'s no code to deploy, no server to manage, and no browser extension to install.',
  },
  {
    question: 'What does Automated Client Onboarding cost?',
    answer: 'This is a personal automation project, not a paid product. The cost to run it depends on your Zapier plan and the volume of tasks — each new client triggers roughly 15–20 tasks across the four Zaps. On Zapier\'s Professional plan ($49/month for 2,000 tasks), you could onboard approximately 100–130 clients per month within the included task allowance.',
  },
]