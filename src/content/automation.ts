import { method } from './method'

/**
 * The live automation diagram on Home: a client's
 * journey through a booking pipeline, drawn stage by stage as the page scrolls (enquiry -> booking ->
 * reminders -> intro call -> outcomes). Replace the stage names and lines with your own journey.
 *
 * Coordinates are in the diagram's own 1200 x 600 units: the main path is the top row, the call's
 * outcomes the bottom row. `plane` is who moves it: `lead` = the lead / you, `auto` = the system sends
 * it. `step` is the method step (0, 1 or 2: the three steps in method.ts). Nodes are listed in build order.
 */
export type FlowPlane = 'lead' | 'auto'
export type FlowIcon = 'form' | 'email' | 'booked' | 'reminder' | 'alarm' | 'call' | 'proposal' | 'won' | 'later' | 'nurture' | 'lost'

export type FlowNode = {
  id: string
  title: string
  tag: string
  plane: FlowPlane
  icon: FlowIcon
  x: number
  y: number
  w: number
  h: number
  step: number
  /** One line for the inspector. */
  about: string
}

/** `solid` links are the lead path (arrows a packet runs); `dashed` links reroute it: a reschedule loops back, the call branches out. */
export type FlowLink = { from: string; to: string; style: 'solid' | 'dashed'; label?: string }

const ROWS = [64, 376]
const box = (col: number, row: number) => ({ x: 24 + col * 200, y: ROWS[row]!, w: 156, h: 136 })


export const liveAutomation = {
  eyebrow: 'Live automation',
  titleThin: 'Lead to',
  titleBold: 'Closed Deal',
  steps: method.steps.map((step) => ({ name: step.name, body: step.body })),
  panel: { lead: 'Lead to', rest: 'Closed Deal' },
  legend: { auto: 'Automation', lead: 'Lead path' },
  zones: { booking: 'n8n', pipeline: 'Pipeline' },
  connected: 'System live',
  hint: { hover: 'Hover a stage to inspect', tap: 'Tap a stage to inspect' },
  nodes: [
    { id: 'form', title: 'Submit Form', tag: 'NEW LEAD TRIGGER', plane: 'lead', icon: 'form', ...box(0, 0), step: 0, about: 'A potential client submits an inquiry form, starting the workflow.' },
    { id: 'email', title: 'Booking Email', tag: 'SEND BOOKING LINK', plane: 'auto', icon: 'email', ...box(1, 0), step: 1, about: 'n8n automatically sends the lead an email with a link to book a call.' },
    { id: 'booked', title: 'Client Booked', tag: 'SLOT CONFIRMED', plane: 'lead', icon: 'booked', ...box(2, 0), step: 1, about: 'The client selects an available time, and the appointment is confirmed.' },
    { id: 'day', title: '24hr Reminder', tag: 'PRE-APPT EMAIL', plane: 'auto', icon: 'reminder', ...box(3, 0), step: 1, about: 'An automated reminder is sent 24 hours before the scheduled call.' },
    { id: 'hour', title: '1hr Reminder', tag: 'PRE-APPT EMAIL', plane: 'auto', icon: 'alarm', ...box(4, 0), step: 1, about: 'A final reminder is sent one hour before the appointment.' },
    { id: 'call', title: 'Discovery Call', tag: 'QUALIFY THE LEAD', plane: 'lead', icon: 'call', ...box(5, 0), step: 2, about: "Discuss the client's needs and determine whether the opportunity is a good fit." },
    { id: 'proposal', title: 'Proposal Sent', tag: 'SCOPE + PRICE', plane: 'lead', icon: 'proposal', ...box(0, 1), step: 2, about: 'Send a proposal outlining the recommended solution, scope, and pricing.' },
    { id: 'won', title: 'Won', tag: 'DEAL CLOSED', plane: 'lead', icon: 'won', ...box(1, 1), step: 2, about: 'Mark the opportunity as won after the client accepts the proposal.' },
    { id: 'later', title: 'Maybe / Later', tag: 'NOT READY YET', plane: 'lead', icon: 'later', ...box(3, 1), step: 2, about: 'Keep leads who need more time in the pipeline for future follow-up.' },
    { id: 'nurture', title: 'Nurture', tag: 'LONG-TERM FOLLOW-UP', plane: 'auto', icon: 'nurture', ...box(4, 1), step: 2, about: 'Send relevant follow-up messages to maintain engagement.' },
    { id: 'lost', title: 'Lost', tag: 'CLOSED OUT', plane: 'lead', icon: 'lost', ...box(5, 1), step: 2, about: "Record opportunities that didn't proceed for tracking and future analysis." },
  ] satisfies FlowNode[],
  links: [
    { from: 'form', to: 'email', style: 'solid' },
    { from: 'email', to: 'booked', style: 'solid' },
    { from: 'booked', to: 'day', style: 'solid' },
    { from: 'day', to: 'hour', style: 'solid' },
    { from: 'hour', to: 'call', style: 'solid' },
    { from: 'hour', to: 'booked', style: 'dashed', label: 'Booking rescheduled' },
    { from: 'call', to: 'proposal', style: 'dashed' },
    { from: 'call', to: 'later', style: 'dashed' },
    { from: 'call', to: 'lost', style: 'dashed' },
    { from: 'proposal', to: 'won', style: 'solid' },
    { from: 'later', to: 'nurture', style: 'solid' },
  ] satisfies FlowLink[],
}
