import { describe, it, expect } from 'vitest'
import { quoteSchema } from '@/lib/validations/quote.schema'

describe('quoteSchema', () => {
  const validQuote = {
    clientName: 'Juan Pérez',
    clientEmail: 'juan@example.com',
    projectType: 'webapp' as const,
    modules: ['Panel de administración'],
    locale: 'es' as const,
  }

  it('validates a valid quote', () => {
    const result = quoteSchema.safeParse(validQuote)
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = quoteSchema.safeParse({ ...validQuote, clientEmail: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('clientEmail')
    }
  })

  it('rejects short name', () => {
    const result = quoteSchema.safeParse({ ...validQuote, clientName: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects empty modules', () => {
    const result = quoteSchema.safeParse({ ...validQuote, modules: [] })
    expect(result.success).toBe(false)
  })

  it('rejects invalid project type', () => {
    const result = quoteSchema.safeParse({ ...validQuote, projectType: 'invalid' })
    expect(result.success).toBe(false)
  })
})
