import { describe, it, expect } from 'vitest'
import { localizeProject, localizeService, localizeTestimonial } from '@/lib/db/localize'
import type { DbProject, DbService, DbTestimonial } from '@/types'

const mockProject: DbProject = {
  id: '1',
  slug: 'test-project',
  title_es: 'Proyecto de Prueba',
  title_en: 'Test Project',
  description_es: 'Descripción en español',
  description_en: 'Description in English',
  cover_url: null,
  tags: ['React', 'Node.js'],
  technologies: ['React', 'TypeScript'],
  metrics: [{ label: 'Tiempo', before: '2 días', after: '2 horas' }],
  is_featured: true,
  is_published: true,
  order_index: 0,
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
}

const mockService: DbService = {
  id: '1',
  slug: 'web-apps',
  title_es: 'Aplicaciones Web',
  title_en: 'Web Applications',
  description_es: 'Descripción ES',
  description_en: 'Description EN',
  features_es: ['Característica 1', 'Característica 2'],
  features_en: ['Feature 1', 'Feature 2'],
  icon: 'Monitor',
  base_price: 25000,
  is_active: true,
  order_index: 0,
}

const mockTestimonial: DbTestimonial = {
  id: '1',
  author: 'Carlos Mendoza',
  role: 'Director',
  company: 'Empresa SA',
  avatar_url: null,
  content_es: 'Excelente servicio en español',
  content_en: 'Excellent service in English',
  rating: 5,
  is_active: true,
  order_index: 0,
  created_at: '2026-01-01T00:00:00Z',
}

describe('localizeProject', () => {
  it('returns ES title/description when locale is es', () => {
    const result = localizeProject(mockProject, 'es')
    expect(result.title).toBe('Proyecto de Prueba')
    expect(result.description).toBe('Descripción en español')
  })

  it('returns EN title/description when locale is en', () => {
    const result = localizeProject(mockProject, 'en')
    expect(result.title).toBe('Test Project')
    expect(result.description).toBe('Description in English')
  })

  it('falls back to ES when EN title is missing', () => {
    const noEn = { ...mockProject, title_en: '', description_en: null }
    const result = localizeProject(noEn, 'en')
    expect(result.title).toBe('Proyecto de Prueba')
    expect(result.description).toBe('Descripción en español')
  })

  it('preserves original project fields', () => {
    const result = localizeProject(mockProject, 'es')
    expect(result.id).toBe('1')
    expect(result.slug).toBe('test-project')
    expect(result.metrics).toHaveLength(1)
  })
})

describe('localizeService', () => {
  it('returns ES values when locale is es', () => {
    const result = localizeService(mockService, 'es')
    expect(result.title).toBe('Aplicaciones Web')
    expect(result.description).toBe('Descripción ES')
    expect(result.features).toEqual(['Característica 1', 'Característica 2'])
  })

  it('returns EN values when locale is en', () => {
    const result = localizeService(mockService, 'en')
    expect(result.title).toBe('Web Applications')
    expect(result.description).toBe('Description EN')
    expect(result.features).toEqual(['Feature 1', 'Feature 2'])
  })

  it('falls back to ES features when EN features are empty', () => {
    const noEnFeatures = { ...mockService, features_en: [] }
    const result = localizeService(noEnFeatures, 'en')
    expect(result.features).toEqual(['Característica 1', 'Característica 2'])
  })

  it('returns empty features array when both are null', () => {
    const noFeatures = { ...mockService, features_es: null, features_en: null }
    const result = localizeService(noFeatures, 'es')
    expect(result.features).toEqual([])
  })
})

describe('localizeTestimonial', () => {
  it('returns ES content when locale is es', () => {
    const result = localizeTestimonial(mockTestimonial, 'es')
    expect(result.content).toBe('Excelente servicio en español')
  })

  it('returns EN content when locale is en', () => {
    const result = localizeTestimonial(mockTestimonial, 'en')
    expect(result.content).toBe('Excellent service in English')
  })

  it('falls back to ES when EN content is null', () => {
    const noEn = { ...mockTestimonial, content_en: null }
    const result = localizeTestimonial(noEn, 'en')
    expect(result.content).toBe('Excelente servicio en español')
  })

  it('preserves original testimonial fields', () => {
    const result = localizeTestimonial(mockTestimonial, 'es')
    expect(result.author).toBe('Carlos Mendoza')
    expect(result.rating).toBe(5)
  })
})
