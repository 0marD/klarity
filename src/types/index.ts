export type { Database, DbProject, DbService, DbQuote, DbProfile, DbFaq, QuoteStatus, UserRole } from './database.types'

// UI / Static content types
export type Project = {
  id: string
  slug: string
  title: string
  description: string
  coverUrl: string
  tags: string[]
  metrics?: { before: string; after: string; label: string }[]
  technologies?: string[]
  isFeatured: boolean
}

export type Service = {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  basePrice?: number
  features?: string[]
}

export type Testimonial = {
  id: string
  author: string
  role: string
  company: string
  avatarUrl?: string
  content: string
  rating: number
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  readTime: number
  lang: 'es' | 'en'
  coverUrl?: string
}

export type QuoteFormData = {
  clientName: string
  clientEmail: string
  clientCompany?: string
  clientPhone?: string
  projectType: string
  modules: string[]
  deadline?: string
  budgetRange?: string
  description?: string
}
