import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'tour-bureau-system-mewnr1ug',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_O7hsDaVwXWzFg7eG-8GF4AmdgQMNoZjx',
  authRequired: false,
  auth: { mode: 'managed' },
})
