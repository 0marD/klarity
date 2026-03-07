export type ProjectStatus = 'draft' | 'published'
export type QuoteStatus = 'new' | 'reviewing' | 'proposal_sent' | 'closed_won' | 'closed_lost'
export type UserRole = 'admin' | 'editor' | 'viewer'

export type ProjectMetric = {
  label: string
  before: string
  after: string
}

export type FeatureFlags = {
  chatbot: boolean
  email_notifications: boolean
  crm_integration: boolean
  whatsapp_button: boolean
}

export type DbProfile = {
  id: string
  role: UserRole
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

export type DbProject = {
  id: string
  slug: string
  title_es: string
  title_en: string
  description_es: string | null
  description_en: string | null
  cover_url: string | null
  tags: string[] | null
  metrics: ProjectMetric[] | null
  technologies: string[] | null
  is_featured: boolean
  is_published: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export type DbService = {
  id: string
  slug: string
  title_es: string
  title_en: string
  description_es: string | null
  description_en: string | null
  features_es: string[] | null
  features_en: string[] | null
  icon: string | null
  base_price: number | null
  is_active: boolean
  order_index: number
}

export type DbTestimonial = {
  id: string
  author: string
  role: string
  company: string
  avatar_url: string | null
  content_es: string
  content_en: string | null
  rating: number
  is_active: boolean
  order_index: number
  created_at: string
}

export type DbQuote = {
  id: string
  client_name: string
  client_email: string
  client_company: string | null
  client_phone: string | null
  project_type: string
  modules: string[] | null
  deadline: string | null
  budget_range: string | null
  estimated_price: number | null
  locale: string
  status: QuoteStatus
  notes: string | null
  crm_lead_id: string | null
  created_at: string
  updated_at: string
}

export type DbFaq = {
  id: string
  question_es: string
  question_en: string
  answer_es: string
  answer_en: string
  category: string | null
  is_active: boolean
}

export type DbAnalyticsEvent = {
  id: string
  event_type: string
  payload: Record<string, unknown> | null
  session_id: string | null
  locale: string | null
  created_at: string
}

export type DbSiteConfig = {
  key: string
  value: unknown
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: DbProfile
        Insert: Omit<DbProfile, 'created_at'>
        Update: Partial<Omit<DbProfile, 'id'>>
        Relationships: []
      }
      projects: {
        Row: DbProject
        Insert: Omit<DbProject, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<DbProject, 'id' | 'created_at'>>
        Relationships: []
      }
      services: {
        Row: DbService
        Insert: Omit<DbService, 'id'>
        Update: Partial<Omit<DbService, 'id'>>
        Relationships: []
      }
      testimonials: {
        Row: DbTestimonial
        Insert: Omit<DbTestimonial, 'id' | 'created_at'>
        Update: Partial<Omit<DbTestimonial, 'id' | 'created_at'>>
        Relationships: []
      }
      quotes: {
        Row: DbQuote
        Insert: Omit<DbQuote, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<DbQuote, 'id' | 'created_at'>>
        Relationships: []
      }
      faqs: {
        Row: DbFaq
        Insert: Omit<DbFaq, 'id'>
        Update: Partial<Omit<DbFaq, 'id'>>
        Relationships: []
      }
      analytics_events: {
        Row: DbAnalyticsEvent
        Insert: Omit<DbAnalyticsEvent, 'id' | 'created_at'>
        Update: never
        Relationships: []
      }
      site_config: {
        Row: DbSiteConfig
        Insert: DbSiteConfig
        Update: Partial<DbSiteConfig>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
