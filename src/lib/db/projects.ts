import { createClient } from '@/lib/supabase/server'
import type { DbProject } from '@/types'

// Re-export localization helper for convenience (server-side consumers)
export { localizeProject } from './localize'

export async function fetchFeaturedProjects(): Promise<DbProject[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('order_index', { ascending: true })

    if (error || !data) return []
    return data as DbProject[]
  } catch {
    return []
  }
}

export async function fetchAllProjects(): Promise<DbProject[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true })

    if (error || !data) return []
    return data as DbProject[]
  } catch {
    return []
  }
}

export async function fetchProjectBySlug(slug: string): Promise<DbProject | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error || !data) return null
    return data as DbProject
  } catch {
    return null
  }
}

export async function fetchAllProjectSlugs(): Promise<string[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('slug')
      .eq('is_published', true)

    if (error || !data) return []
    return data.map((p) => p.slug as string)
  } catch {
    return []
  }
}
