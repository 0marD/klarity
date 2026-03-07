export type {
  Database,
  DbProject,
  DbService,
  DbTestimonial,
  DbQuote,
  DbProfile,
  DbFaq,
  DbSiteConfig,
  QuoteStatus,
  UserRole,
  ProjectMetric,
  FeatureFlags,
} from './database.types'

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
