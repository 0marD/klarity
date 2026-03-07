import { describe, it, expect } from 'vitest'
import { DEFAULT_FLAGS } from '@/lib/feature-flags'

describe('DEFAULT_FLAGS', () => {
  it('has chatbot disabled by default', () => {
    expect(DEFAULT_FLAGS.chatbot).toBe(false)
  })

  it('has email_notifications disabled by default', () => {
    expect(DEFAULT_FLAGS.email_notifications).toBe(false)
  })

  it('has crm_integration disabled by default', () => {
    expect(DEFAULT_FLAGS.crm_integration).toBe(false)
  })

  it('has whatsapp_button enabled by default', () => {
    expect(DEFAULT_FLAGS.whatsapp_button).toBe(true)
  })

  it('has all expected keys', () => {
    const keys = Object.keys(DEFAULT_FLAGS)
    expect(keys).toContain('chatbot')
    expect(keys).toContain('email_notifications')
    expect(keys).toContain('crm_integration')
    expect(keys).toContain('whatsapp_button')
  })
})
