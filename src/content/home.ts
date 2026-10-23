import type { WorkChapter } from './schema'
import { method } from './method'
import { tools } from './tools'
import {
  workCount,
} from './work'

/**
 * Home page copy. The hero pairs a thin line with a bold one. The bold line is sized in `cqi` in
 * features/home/hero/hero.css so it fills the column: re-measure it when you change the words
 * (see the comment on `.hero__title` there).
 */
export const homeHero = {
  headlineThin: 'LESS BUSYWORK.',
  headlineBold: 'MORE BUSINESS.',
  subhead: 'I help businesses get their time back by building smart automations that simplify workflows, eliminate repetitive tasks, and make everyday operations easier.',
  cta: { label: 'Get in touch', to: '/#contact' },
}

/**
 * The statement under the hero: words light up as the page scrolls, each keyword lands bold and
 * moves the tracker. Replace the words, keep four keywords (the tracker shows them in order).
 * A string is plain words; `{ key }` is a keyword.
 */
export type ManifestoPart = string | { key: string }

export const homeManifesto = {
  eyebrow: method.eyebrow,
  parts: [
    'I UNDERSTAND THE',
    { key: 'WORK.' },
    'I BUILD THE',
    { key: 'SYSTEMS.' },
    'SO YOU CAN FOCUS ON WHAT',
    { key: 'MATTERS.' },
  ] satisfies ManifestoPart[],
}

export const homeSections = {
  work: {
    eyebrow: 'Selected work',
    title: 'Builds you can open right now.',
  },
  proof: {
    eyebrow: 'Proof',
    title: 'What I run for clients today.',
  },
  objections: {
    eyebrow: 'Before you write',
    title: 'The three questions everyone asks.',
  },
}

export const ctaBand = {
  title: 'Tell me what is eating your week.',
  body: 'PLACEHOLDER - tell me what to put here: one or two sentences on what the visitor gets when they write to you.',
  button: 'Email me your question',
}

/** The URL of a chapter's showcase sheet. Real, shareable and in the sitemap. */
export const chapterPath = (id: string) => `/work/${id}`

export const workSection = {
  ...homeSections.work,
  /** The title as one display line in the hero's thin + bold pairing. */
  titleThin: 'REAL BUILDS.',
  titleBold: 'SMARTER WORKFLOWS.',
  all: { label: `See all ${workCount} builds`, to: '/work' },
}

/**
 * The Work chapters, in bento order. Add, remove or reorder a chapter here; the bento, the sheets and
 * the sitemap follow (the bento's grid areas in work.css are keyed by chapter id). A chapter with a
 * `lead` is a single build; one with no landscape picture shows its `marks` as a logo face instead.
 */
export const workChapters: WorkChapter[] = [
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    line: 'End-to-end workflows that connect your tools and automate repetitive processes.',
    count: 1,
    unit: 'project',
    description: 'A Zapier workflow that streamlines the client onboarding journey from lead capture to task creation, automatically updating HubSpot, sending payment and onboarding steps, creating client workspaces, and keeping the internal team informed.',
    marks: [tools.zapier, tools.hubspot],
    tile: {
      src: '/images/projects/zapier/Client Onboarding/4. Client Onboarding Form.png',
      alt: 'Client Onboarding Automation form and task creation',
      width: 1600,
      height: 900,
    },
    items: [
      {
        id: 'client-onboarding',
        name: 'Client Onboarding Automation',
        kicker: 'Zapier',
        summary: 'A Zapier workflow that streamlines the client onboarding journey from lead capture to task creation. It automatically updates HubSpot, sends payment and onboarding steps, creates client workspaces, and keeps the internal team informed.',
        image: {
          src: '/images/projects/zapier/Client Onboarding/4. Client Onboarding Form.png',
          alt: 'Client Onboarding Automation form and task creation',
          width: 1600,
          height: 900,
        },
        screenshots: [
          // Automation 1 — Lead Capture
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/1. Lead Form.png',
              alt: 'Lead Form',
              width: 1600,
              height: 900,
            },
            label: 'AUTOMATION 1',
            title: 'Lead Form Submission',
            description: 'A lead submits the intake form, capturing their details and requirements.',
            group: 'Automation 1 — Lead Capture',
          },
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/1. Hubspot Create Contact.png',
              alt: 'HubSpot Create Contact',
              width: 1600,
              height: 900,
            },
            label: 'AUTOMATION 1',
            title: 'Contact Created in HubSpot',
            description: 'The new lead is instantly added to HubSpot as a contact with all form details.',
            group: 'Automation 1 — Lead Capture',
          },
          // Automation 2 — Payment & CRM Update
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/2. Stripe Payment Link.png',
              alt: 'Stripe Payment Link',
              width: 1600,
              height: 900,
            },
            label: 'AUTOMATION 2',
            title: 'Stripe Payment Link Sent',
            description: 'A secure payment link is generated and sent to the client for seamless payment collection.',
            group: 'Automation 2 — Payment & CRM Update',
          },
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/2. Update Hubspot.png',
              alt: 'Update HubSpot',
              width: 1600,
              height: 900,
            },
            label: 'AUTOMATION 2',
            title: 'HubSpot Updated with Payment Status',
            description: 'Upon successful payment, the CRM is automatically updated with payment status and transaction details.',
            group: 'Automation 2 — Payment & CRM Update',
          },
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/2. Slack Message.png',
              alt: 'Slack Notification',
              width: 1600,
              height: 900,
            },
            label: 'AUTOMATION 2',
            title: 'Team Notified in Slack',
            description: 'The internal team receives an instant Slack notification about the new payment and client.',
            group: 'Automation 2 — Payment & CRM Update',
          },
          // Automation 3 — Onboarding Kickoff
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/3. Email Inviting Client.png',
              alt: 'Onboarding Email',
              width: 1600,
              height: 900,
            },
            label: 'AUTOMATION 3',
            title: 'Onboarding Email Sent',
            description: 'Once the client is confirmed, an automated email is sent with onboarding instructions and next steps.',
            group: 'Automation 3 — Onboarding Kickoff',
          },
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/3. Client Workspace in Trello.png',
              alt: 'Client Workspace in Trello',
              width: 1600,
              height: 900,
            },
            label: 'AUTOMATION 3',
            title: 'Client Workspace Created in Trello',
            description: 'A dedicated Trello workspace is automatically created for the new client with boards and lists.',
            group: 'Automation 3 — Onboarding Kickoff',
          },
          // Automation 4 — Internal Tasking & Team Update
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/4. Client Onboarding Form.png',
              alt: 'Client Onboarding Form',
              width: 1600,
              height: 900,
            },
            label: 'AUTOMATION 4',
            title: 'Client Onboarding Form Submitted',
            description: 'The client fills out the detailed onboarding form with project scope, timeline, and requirements.',
            group: 'Automation 4 — Internal Tasking & Team Update',
          },
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/4. Asana Create Task.png',
              alt: 'Asana Create Task',
              width: 1600,
              height: 900,
            },
            label: 'AUTOMATION 4',
            title: 'Tasks Created in Asana',
            description: 'Based on the form submission, project tasks are automatically created in Asana with assignees and due dates.',
            group: 'Automation 4 — Internal Tasking & Team Update',
          },
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/4. Update Team to Slack.png',
              alt: 'Slack Team Update',
              width: 1600,
              height: 900,
            },
            label: 'AUTOMATION 4',
            title: 'Team Updated in Slack',
            description: 'The team receives a Slack update with the new tasks, client details, and project timeline.',
            group: 'Automation 4 — Internal Tasking & Team Update',
          },
          // Actual Workflows
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/1. Lead Forms to CRM - Actual Workflow.png',
              alt: 'Lead Forms to CRM Actual Workflow',
              width: 1600,
              height: 900,
            },
            label: 'ACTUAL WORKFLOWS',
            title: 'Lead Capture Workflow',
            description: 'The complete Zapier workflow connecting lead form submission to HubSpot contact creation.',
            group: 'Actual Workflows',
          },
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/2. New Subscription to CRM - Actual Workflow.png',
              alt: 'New Subscription to CRM Actual Workflow',
              width: 1600,
              height: 900,
            },
            label: 'ACTUAL WORKFLOWS',
            title: 'Payment & CRM Update Workflow',
            description: 'The complete Zapier workflow for payment processing, CRM update, and Slack notification.',
            group: 'Actual Workflows',
          },
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/3. Automated New Client Onboarding - Actual Workflow.png',
              alt: 'Automated New Client Onboarding Actual Workflow',
              width: 1600,
              height: 900,
            },
            label: 'ACTUAL WORKFLOWS',
            title: 'Onboarding Kickoff Workflow',
            description: 'The complete Zapier workflow for sending onboarding email and creating Trello workspace.',
            group: 'Actual Workflows',
          },
          {
            image: {
              src: '/images/projects/zapier/Client Onboarding/4. Onboarding Task Auto Update - Actual Workflow.png',
              alt: 'Onboarding Task Auto Update Actual Workflow',
              width: 1600,
              height: 900,
            },
            label: 'ACTUAL WORKFLOWS',
            title: 'Task & Team Update Workflow',
            description: 'The complete Zapier workflow connecting form submission to Asana task creation and team notification.',
            group: 'Actual Workflows',
          },
        ],
        stack: 'Zapier + HubSpot + Stripe + Slack + Trello + Asana',
        status: 'Live',
      },
    ],
  },
  {
    id: 'ai-agents',
    title: 'AI Agents & Orchestration',
    line: 'Intelligent agents that plan, execute, and coordinate complex tasks autonomously.',
    count: 2,
    unit: 'projects',
    description: 'Two AI agent workflows: a meeting scheduling agent on Relevance AI and an end-to-end HR recruitment assistant on n8n.',
    marks: [tools.n8n, tools.make],
    tile: {
      src: '/images/projects/relevance-ai/Meeting Setter Workflow.png',
      alt: 'AI Meeting Setter workflow overview',
      width: 1600,
      height: 900,
    },
    items: [
      {
        id: 'meeting-setter',
        name: 'AI Meeting Setter',
        kicker: 'Relevance AI',
        summary: 'An AI-powered meeting scheduling workflow built with Relevance AI to help organize scheduling tasks and reduce manual coordination.',
        image: {
          src: '/images/projects/relevance-ai/Meeting Setter Workflow.png',
          alt: 'AI Meeting Setter workflow overview',
          width: 1600,
          height: 900,
        },
        stack: 'Relevance AI',
        status: 'Live',
      },
      {
        id: 'hr-assistant',
        name: 'End-to-End AI HR Assistant',
        kicker: 'n8n',
        summary: 'An AI-powered recruitment workflow that helps manage job applications, evaluate resumes against job requirements, generate customized screening questions, and coordinate interviews with human oversight.',
        image: {
          src: '/images/projects/n8n/hr-assistant/01-Overview.png',
          alt: 'HR Assistant workflow overview',
          width: 1600,
          height: 900,
        },
        screenshots: [
          {
            image: {
              src: '/images/projects/n8n/hr-assistant/01-Overview.png',
              alt: 'HR Assistant workflow overview',
              width: 1600,
              height: 900,
            },
            label: 'WORKFLOW OVERVIEW',
            title: 'How the AI HR Assistant Works',
            description: 'An end-to-end recruitment process that captures applications, organizes resumes, assists with candidate evaluation, and prepares personalized screening questions.',
          },
          {
            image: {
              src: '/images/projects/n8n/hr-assistant/02-Actual Workflow.png',
              alt: 'HR Assistant actual workflow',
              width: 1600,
              height: 900,
            },
            label: 'ACTUAL N8N WORKFLOW',
            title: 'Behind the Automation',
            description: 'A look inside the n8n workflow connecting applicant intake, AI-assisted evaluation, interview preparation, and recruitment administration.',
          },
        ],
        stack: 'n8n',
        status: 'Live',
      },
    ],
  },
  {
    id: 'rag-knowledge',
    title: 'AI Knowledge & Customer Support',
    line: 'AI-powered customer support systems that answer inquiries using trusted business information and automatically keep their knowledge bases updated.',
    count: 1,
    unit: 'project',
    description: 'An n8n workflow that powers a Facebook Messenger AI support agent with RAG — answering customer inquiries from a business knowledge base, plus a second system that automatically syncs Google Drive documents to the knowledge base.',
    marks: [tools.n8n, tools.supabase],
    tile: {
      src: '/images/projects/n8n/Facebook-rag-agent/facebook-rag-agent - Thumbnail.png',
      alt: 'Facebook Messenger AI Support Agent with RAG workflow overview',
      width: 1600,
      height: 900,
    },
    items: [
      {
        id: 'facebook-messenger-rag-agent',
        name: 'Facebook Messenger AI Support Agent with RAG',
        kicker: 'n8n',
        summary: 'An AI-powered customer support assistant that automatically responds to Facebook Messenger inquiries using information from a business\'s own knowledge base. It also updates the knowledge base whenever documents are added, modified, or removed.',
        image: {
          src: '/images/projects/n8n/Facebook-rag-agent/facebook-rag-agent.png',
          alt: 'Facebook Messenger AI Support Agent with RAG workflow overview',
          width: 1600,
          height: 900,
        },
        screenshots: [
          {
            image: {
              src: '/images/projects/n8n/Facebook-rag-agent/AI Customer Support Workflow.png',
              alt: 'AI Customer Support Workflow — System 1 infographic',
              width: 1600,
              height: 900,
            },
            label: 'SYSTEM 1',
            title: 'AI Customer Support',
            description: 'Receives Facebook Messenger messages via webhook, searches the Supabase knowledge base for relevant business information, generates responses using an OpenRouter chat model with memory, and sends replies back through Messenger.',
            group: 'System 1 — AI Customer Support',
          },
          {
            image: {
              src: '/images/projects/n8n/Facebook-rag-agent/Automatic Knowledge Base Workflow.png',
              alt: 'Automatic Knowledge Base Workflow — System 2 infographic',
              width: 1600,
              height: 900,
            },
            label: 'SYSTEM 2',
            title: 'Automatic Knowledge Base Management',
            description: 'Monitors Google Drive for document changes — creates new embeddings for new documents, updates embeddings for modified documents, and removes embeddings for deleted documents — keeping the Supabase vector store current with zero manual effort.',
            group: 'System 2 — Knowledge Base Sync',
          },
        ],
        stack: 'n8n + Facebook Messenger + Google Drive + Supabase + OpenRouter + Google Vertex AI Embeddings + Webhooks',
        status: 'Live',
      },
    ],
  },
  {
    id: 'voice-ai',
    title: 'Voice AI & Scheduling',
    line: 'AI voice agents that handle calls, book appointments, and manage calendars.',
    count: 1,
    unit: 'project',
    description: 'AI Voice Automation workflow using Vapi, n8n, Airtable, and Calendar Integration to handle calls, book appointments, and manage scheduling automatically.',
    marks: [tools.vapi, tools.n8n],
    items: [
      {
        id: 'ai-receptionist',
        name: 'AI Receptionist with Vapi',
        kicker: 'WORKFLOW OVERVIEW',
        summary: 'An AI-powered receptionist that answers incoming calls, collects appointment details, checks calendar availability, and manages bookings, rescheduling, and cancellations through Vapi and n8n.',
        image: {
          src: '/images/projects/n8n/ai-receptionist/01-workflow-overview.png.png',
          alt: 'AI Receptionist workflow overview',
          width: 1600,
          height: 900,
        },
        gallery: [
          {
            src: '/images/projects/n8n/ai-receptionist/01-workflow-overview.png.png',
            alt: 'AI Receptionist workflow overview',
            width: 1600,
            height: 900,
          },
          {
            src: '/images/projects/n8n/ai-receptionist/02-actual-workflow.png.png',
            alt: 'AI Receptionist actual workflow',
            width: 1600,
            height: 900,
          },
          {
            src: '/images/projects/n8n/ai-receptionist/03-actual-workflow.png.png',
            alt: 'AI Receptionist actual workflow detail',
            width: 1600,
            height: 900,
          },
        ],
        screenshots: [
          {
            image: {
              src: '/images/projects/n8n/ai-receptionist/02-actual-workflow.png.png',
              alt: 'AI Receptionist actual workflow',
              width: 1600,
              height: 900,
            },
            label: 'ACTUAL N8N WORKFLOW 1',
            title: 'Appointment Management',
            description: 'A look inside the n8n automation used to coordinate appointment scheduling and related tasks.',
          },
          {
            image: {
              src: '/images/projects/n8n/ai-receptionist/03-actual-workflow.png.png',
              alt: 'AI Receptionist actual workflow detail',
              width: 1600,
              height: 900,
            },
            label: 'ACTUAL N8N WORKFLOW 2',
            title: 'Workflow Architecture',
            description: 'A closer look at the automation\'s connected nodes and workflow structure.',
          },
        ],
        stack: 'Vapi + n8n',
        status: 'Live',
      },
    ],
  },
  {
    id: 'chat-messaging',
    title: 'HR & Employee Automation',
    line: 'Simplify employee onboarding, internal coordination, and administrative processes to help teams work more efficiently.',
    count: 1,
    unit: 'project',
    description: 'A Zapier workflow that automates employee onboarding from a single click — scheduling sessions, sending welcome emails, notifying the team, and creating HR tracking workspaces.',
    marks: [tools.zapier, tools.googleWorkspace],
    tile: {
      src: '/images/projects/zapier/Employee Onboarding/Trello - New Hire Workspace.png',
      alt: 'Employee Onboarding Automation — New Hire Workspace in Trello',
      width: 1600,
      height: 900,
    },
    items: [
      {
        id: 'employee-onboarding',
        name: 'Employee Onboarding Automation',
        kicker: 'Zapier',
        summary: 'A one-click employee onboarding workflow that helps HR automatically schedule onboarding, invite new hires, send welcome details, and create a workspace for HR tracking.',
        image: {
          src: '/images/projects/zapier/Employee Onboarding/Employee Onboarding System.png',
          alt: 'Employee Onboarding System workflow overview',
          width: 1600,
          height: 900,
        },
        screenshots: [
          {
            image: {
              src: '/images/projects/zapier/Employee Onboarding/Employee Onboarding System.png',
              alt: 'Employee Onboarding System workflow overview',
              width: 1600,
              height: 900,
            },
            label: 'WORKFLOW OVERVIEW',
            title: 'Employee Onboarding System',
            description: 'A one-click onboarding workflow that schedules group onboarding, notifies the team, sends account access, and updates HR tracking automatically. HR only needs to click Start Onboarding.',
            group: 'Workflow Overview',
          },
          {
            image: {
              src: '/images/projects/zapier/Employee Onboarding/Trello - New Hire Workspace.png',
              alt: 'New Hire Workspace in Trello',
              width: 1600,
              height: 900,
            },
            label: 'OUTPUT 1',
            title: 'New Hire Workspace',
            description: 'A Trello workspace/card is automatically created so HR can track and manage the new employee\'s onboarding progress.',
            group: 'Outputs',
          },
          {
            image: {
              src: '/images/projects/zapier/Employee Onboarding/Email invitation.png',
              alt: 'Invitation Email sent to new hire',
              width: 1600,
              height: 900,
            },
            label: 'OUTPUT 2',
            title: 'Invitation Email',
            description: 'The new hire receives an onboarding email with account access and essential details for tools like Slack, Trello, and Asana.',
            group: 'Outputs',
          },
          {
            image: {
              src: '/images/projects/zapier/Employee Onboarding/HR - Onboarding Management Workspace.png',
              alt: 'HR Onboarding Management Workspace',
              width: 1600,
              height: 900,
            },
            label: 'OUTPUT 3',
            title: 'HR Management Workspace',
            description: 'HR gets an updated onboarding management view to keep new hire records organized in one place.',
            group: 'Outputs',
          },
        ],
        stack: 'Zapier + Google Calendar + Gmail + Trello + Slack + Asana',
        status: 'Live',
      },
    ],
  },
  {
    id: 'email-automation',
    title: 'Finance & Accounting Automation',
    line: 'Smart financial workflows that simplify transaction reporting, invoice follow-ups, and repetitive accounting tasks.',
    count: 2,
    unit: 'projects',
    description: 'Two financial automations: a Make workflow that reports Xero bank transactions to Asana via Google Sheets, and an n8n workflow that automates invoice follow-up reminders with escalation.',
    marks: [tools.make, tools.airtable],
    tile: {
      src: '/images/projects/make/Xero Bank Transaction/One Click Xero Transaction to Asana.png',
      alt: 'Xero Transaction Reporting Automation workflow overview',
      width: 1600,
      height: 900,
    },
    items: [
      {
        id: 'xero-transaction-reporting',
        name: 'Xero Transaction Reporting Automation',
        kicker: 'Make',
        summary: 'Automatically collects bank transactions from Xero, organizes them in Google Sheets, converts the data into a CSV file, and uploads the finished report to Asana when a designated task is completed.',
        image: {
          src: '/images/projects/make/Xero Bank Transaction/One Click Xero Transaction to Asana.png',
          alt: 'Xero Transaction Reporting Automation workflow overview',
          width: 1600,
          height: 900,
        },
        screenshots: [
          {
            image: {
              src: '/images/projects/make/Xero Bank Transaction/One Click Xero Transaction to Asana.png',
              alt: 'Xero Transaction Reporting Automation workflow overview',
              width: 1600,
              height: 900,
            },
            label: 'WORKFLOW OVERVIEW',
            title: 'Xero Transaction Reporting Automation',
            description: 'A Make workflow that triggers on Asana task completion, retrieves bank transactions from Xero, processes them in Google Sheets, exports a CSV report, and uploads it back to Asana.',
            group: 'Workflow Overview',
          },
        ],
        stack: 'Make + Xero + Google Sheets + Asana',
        status: 'Live',
      },
      {
        id: 'invoice-follow-up',
        name: 'Automated Invoice Follow-Up & Escalation',
        kicker: 'n8n',
        summary: 'An automated invoice follow-up system that sends payment reminders based on how long an invoice has been overdue, escalates long-overdue accounts to the appropriate team, and documents follow-up activity in Google Sheets.',
        image: {
          src: '/images/projects/n8n/Invoice Follow-Up System/Invoice Follow-Up System.png',
          alt: 'Invoice Follow-Up System workflow overview',
          width: 1600,
          height: 900,
        },
        screenshots: [
          {
            image: {
              src: '/images/projects/n8n/Invoice Follow-Up System/Invoice Follow-Up System.png',
              alt: 'Invoice Follow-Up System workflow overview',
              width: 1600,
              height: 900,
            },
            label: 'WORKFLOW OVERVIEW',
            title: 'Automated Invoice Follow-Up & Escalation',
            description: 'An n8n workflow that checks invoice due dates and sends escalating reminders at 7, 14, and 30+ days overdue, with JavaScript logic determining the reminder stage and all activity logged to Google Sheets.',
            group: 'Workflow Overview',
          },
        ],
        stack: 'n8n + JavaScript + Email + Google Sheets',
        status: 'Live',
      },
    ],
  },
  {
    id: 'document-data',
    title: 'Document & Email Automation',
    line: 'Automatically organize emails, prioritize important messages, manage attachments, and route documents to the right folders.',
    count: 3,
    unit: 'projects',
    description: 'Three AI-powered Make workflows: an attachment organizer that files email attachments to Google Drive, a PDF text extractor that summarizes documents, and an email prioritization system that sends Slack alerts for important messages.',
    marks: [tools.make, tools.googleWorkspace],
    tile: {
      src: '/images/projects/make/Auto Sort Gmail Attachment to GDrive.png',
      alt: 'Smart Gmail Attachment Organizer workflow overview',
      width: 1600,
      height: 900,
    },
    items: [
      {
        id: 'gmail-attachment-organizer',
        name: 'Smart Gmail Attachment Organizer',
        kicker: 'Make',
        summary: 'An AI-powered filing assistant that automatically processes incoming email attachments, gives files meaningful names, saves them to Google Drive, records their details, and sends a notification when the process is complete.',
        image: {
          src: '/images/projects/make/Auto Sort Gmail Attachment to GDrive.png',
          alt: 'Smart Gmail Attachment Organizer workflow overview',
          width: 1600,
          height: 900,
        },
        screenshots: [
          {
            image: {
              src: '/images/projects/make/Auto Sort Gmail Attachment to GDrive.png',
              alt: 'Smart Gmail Attachment Organizer workflow overview',
              width: 1600,
              height: 900,
            },
            label: 'WORKFLOW OVERVIEW',
            title: 'Smart Gmail Attachment Organizer',
            description: 'A Make workflow that monitors Gmail for incoming emails, identifies attachments, uses AI to analyze and rename each file, uploads to Google Drive, records details in Google Sheets, and sends an email notification.',
            group: 'Workflow Overview',
          },
        ],
        stack: 'Make + Gmail + AI + Google Drive + Google Sheets',
        status: 'Live',
      },
      {
        id: 'pdf-text-extractor',
        name: 'AI PDF Text Extraction & Summary',
        kicker: 'Make',
        summary: 'Automatically turns new PDF documents into easy-to-read summaries and emails the important information, helping teams review files without manually reading every page.',
        image: {
          src: '/images/projects/make/PDF Text Extractor with Summary.png',
          alt: 'AI PDF Text Extraction & Summary workflow overview',
          width: 1600,
          height: 900,
        },
        screenshots: [
          {
            image: {
              src: '/images/projects/make/PDF Text Extractor with Summary.png',
              alt: 'AI PDF Text Extraction & Summary workflow overview',
              width: 1600,
              height: 900,
            },
            label: 'WORKFLOW OVERVIEW',
            title: 'AI PDF Text Extraction & Summary',
            description: 'A Make workflow that monitors a Google Drive folder for new PDFs, extracts text content via Google Docs, generates an AI summary, and emails the summary for quick review.',
            group: 'Workflow Overview',
          },
        ],
        stack: 'Make + Google Drive + Google Docs + AI + Gmail',
        status: 'Live',
      },
      {
        id: 'email-prioritization',
        name: 'AI Email Prioritization & Slack Alerts',
        kicker: 'Make',
        summary: 'An AI-powered inbox assistant that automatically sorts emails by importance and sends Slack summaries for messages that need immediate attention.',
        image: {
          src: '/images/projects/make/Email labeling with summary in slack.png',
          alt: 'AI Email Prioritization & Slack Alerts workflow overview',
          width: 1600,
          height: 900,
        },
        screenshots: [
          {
            image: {
              src: '/images/projects/make/Email labeling with summary in slack.png',
              alt: 'AI Email Prioritization & Slack Alerts workflow overview',
              width: 1600,
              height: 900,
            },
            label: 'WORKFLOW OVERVIEW',
            title: 'AI Email Prioritization & Slack Alerts',
            description: 'A Make workflow that monitors Gmail, uses AI to assign priority (High/Medium/Not Priority), updates Gmail labels accordingly, summarizes High Priority emails with AI, and sends summaries to Slack for immediate attention.',
            group: 'Workflow Overview',
          },
        ],
        stack: 'Make + Gmail + AI + Slack',
        status: 'Live',
      },
    ],
  },
  {
    id: 'sales-marketing',
    title: 'Sales & CRM Automation',
    line: 'AI-powered sales workflows that enrich leads, automate follow-ups, organize CRM activities, and help teams focus on building customer relationships.',
    count: 2,
    unit: 'projects',
    description: 'Two sales automations: a Zapier workflow that manages lead engagement across five pipeline stages, and an AI-powered lead enrichment system that qualifies and routes incoming leads by priority.',
    marks: [tools.zapier, tools.hubspot],
    tile: {
      src: '/images/projects/zapier/Asana CRM Lead Engagement/Asana CRM Lead Engagement Workflow.png.png',
      alt: 'Smart CRM Lead Engagement workflow overview',
      width: 1600,
      height: 900,
    },
    items: [
      {
        id: 'smart-crm-lead-engagement',
        name: 'Smart CRM Lead Engagement',
        kicker: 'Zapier',
        summary: 'An automated lead engagement system that takes action when a lead\'s stage changes in Asana. It helps organize client files, manage follow-ups, prepare content tasks, and send personalized communications based on where each lead is in the sales process.',
        image: {
          src: '/images/projects/zapier/Asana CRM Lead Engagement/Asana CRM Lead Engagement Workflow.png.png',
          alt: 'Smart CRM Lead Engagement workflow overview',
          width: 1600,
          height: 900,
        },
        screenshots: [
          {
            image: {
              src: '/images/projects/zapier/Asana CRM Lead Engagement/Asana CRM Lead Engagement Workflow.png.png',
              alt: 'Smart CRM Lead Engagement workflow overview',
              width: 1600,
              height: 900,
            },
            label: 'WORKFLOW OVERVIEW',
            title: 'Smart CRM Lead Engagement',
            description: 'A Zapier workflow that triggers on Asana task updates and follows five distinct paths based on lead stage: Ready to Start, No Response, Quoted, Approved, and Paid and Closed. Each path automates file creation, follow-up emails, AI-generated content, and client communications.',
            group: 'Workflow Overview',
          },
        ],
        stack: 'Zapier + Asana + Google Drive + Gmail + AI by Zapier',
        status: 'Live',
      },
      {
        id: 'ai-lead-enrichment',
        name: 'AI-Powered Lead Enrichment & Qualification',
        kicker: 'Zapier',
        summary: 'An automated lead qualification system that collects incoming leads, adds company information using Apollo, and sorts them by priority so the sales team can focus on the most promising opportunities.',
        image: {
          src: '/images/projects/zapier/Lead Enrichment/Automated Lead Enrichment.png',
          alt: 'AI-Powered Lead Enrichment workflow overview',
          width: 1600,
          height: 900,
        },
        screenshots: [
          {
            image: {
              src: '/images/projects/zapier/Lead Enrichment/Automated Lead Enrichment.png',
              alt: 'AI-Powered Lead Enrichment workflow overview',
              width: 1600,
              height: 900,
            },
            label: 'WORKFLOW OVERVIEW',
            title: 'AI-Powered Lead Enrichment & Qualification',
            description: 'A Zapier workflow that captures leads from Youform, enriches them via Apollo, and routes them into High Priority (Google Sheets + Slack + AI-drafted email) or Low Priority (email notification) paths using Webhooks and conditional logic.',
            group: 'Workflow Overview',
          },
        ],
        stack: 'Zapier + Youform + Apollo + Webhooks + Google Sheets + Slack + AI by Zapier + Gmail',
        status: 'Live',
      },
    ],
  },
]

export const findChapter = (id: string | undefined) => workChapters.find((chapter) => chapter.id === id)

