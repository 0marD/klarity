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

  it('rejects short name (less than 2 chars)', () => {
    const result = quoteSchema.safeParse({ ...validQuote, clientName: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects empty modules array', () => {
    const result = quoteSchema.safeParse({ ...validQuote, modules: [] })
    expect(result.success).toBe(false)
  })

  it('rejects invalid project type', () => {
    const result = quoteSchema.safeParse({ ...validQuote, projectType: 'invalid' })
    expect(result.success).toBe(false)
  })

  it('accepts all valid project types', () => {
    const types = ['webapp', 'mobile', 'ecommerce', 'automation', 'api', 'other'] as const
    for (const type of types) {
      const result = quoteSchema.safeParse({ ...validQuote, projectType: type })
      expect(result.success).toBe(true)
    }
  })

  it('defaults locale to es when not provided', () => {
    const { locale: _, ...withoutLocale } = validQuote
    const result = quoteSchema.safeParse(withoutLocale)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.locale).toBe('es')
    }
  })

  it('accepts optional fields', () => {
    const result = quoteSchema.safeParse({
      ...validQuote,
      clientCompany: 'Empresa SA',
      clientPhone: '5512345678',
      deadline: '2-3 meses',
      budgetRange: '$15k-$50k MXN',
      description: 'Una descripción suficientemente larga del proyecto',
    })
    expect(result.success).toBe(true)
  })

  it('rejects description shorter than 20 chars when provided', () => {
    const result = quoteSchema.safeParse({
      ...validQuote,
      description: 'muy corta',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('description')
    }
  })

  it('rejects invalid locale', () => {
    const result = quoteSchema.safeParse({ ...validQuote, locale: 'fr' })
    expect(result.success).toBe(false)
  })
})
