import type { MethodStep } from './schema'

/** Your method: the three jobs your service does for a client, in order. It names the steps of the Home automation diagram. */
export const method = {
  eyebrow: 'MY APPROACH',
  title: 'Attract. Nurture. Convert.',
  summary: 'PLACEHOLDER - tell me what to put here: one line on the three jobs your work does for a client, in order.',
  steps: [
    { name: 'Attract', body: 'PLACEHOLDER - tell me what to put here: one short line on step one.', inputs: ['Input A', 'Input B', 'Input C', 'Input D'] },
    { name: 'Nurture', body: 'Every lead gets saved. No one slips through.\n\nThe system follows up for you, for as long as it takes.', inputs: ['Input A', 'Input B', 'Input C'] },
    { name: 'Convert', body: 'Every lead gets saved. No one slips through.\n\nThe system follows up for you, for as long as it takes.', inputs: ['Input A', 'Input B', 'Input C'] },
  ] satisfies MethodStep[],
}
