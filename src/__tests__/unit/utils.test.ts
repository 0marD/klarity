import { describe, it, expect } from 'vitest'
import { cn, formatPrice, formatDate, slugify } from '@/lib/utils'

describe('cn', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn('foo', undefined, 'bar')).toBe('foo bar')
  })

  it('resolves tailwind conflicts', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('handles falsy values', () => {
    expect(cn('foo', false && 'bar', null, undefined, '')).toBe('foo')
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

  it('defaults to es locale', () => {
    const result = formatPrice(5000)
    expect(result).toContain('5')
    expect(result).toContain('000')
  })
})

describe('formatDate', () => {
  it('formats date for es locale', () => {
    const result = formatDate('2026-01-15', 'es')
    expect(result).toContain('2026')
  })

  it('formats date for en locale', () => {
    const result = formatDate('2026-01-15', 'en')
    expect(result).toContain('2026')
  })
})

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Hola Mundo')).toBe('hola-mundo')
    expect(slugify('Aplicación Web')).toBe('aplicacion-web')
    expect(slugify('  spaces  ')).toBe('spaces')
  })

  it('handles special characters', () => {
    expect(slugify('React & Node.js!')).toBe('react-nodejs')
    expect(slugify('E-commerce B2B')).toBe('e-commerce-b2b')
  })

  it('handles multiple hyphens', () => {
    expect(slugify('a---b')).toBe('a-b')
  })

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('')
    expect(slugify('   ')).toBe('')
  })
})
