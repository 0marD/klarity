import { describe, it, expect } from 'vitest'
import { cn, formatPrice, slugify } from '@/lib/utils'

describe('cn', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn('foo', undefined, 'bar')).toBe('foo bar')
  })

  it('resolves tailwind conflicts', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})

describe('formatPrice', () => {
  it('formats price in MXN for es locale', () => {
    const result = formatPrice(15000, 'es')
    expect(result).toContain('15')
    expect(result).toContain('000')
  })

  it('formats price in MXN for en locale', () => {
    const result = formatPrice(15000, 'en')
    expect(result).toContain('15')
  })
})

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Hola Mundo')).toBe('hola-mundo')
    expect(slugify('Aplicación Web')).toBe('aplicacion-web')
    expect(slugify('  spaces  ')).toBe('spaces')
  })
})
