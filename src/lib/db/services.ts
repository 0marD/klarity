import { createClient } from '@/lib/supabase/server'
import type { DbService } from '@/types'

// Re-export localization helper for convenience (server-side consumers)
export { localizeService } from './localize'

export async function fetchFeaturedServices(): Promise<DbService[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })
      .limit(3)

    if (error || !data) return []
    return data as DbService[]
  } catch {
    return []
  }
}

export async function fetchAllServices(): Promise<DbService[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error || !data) return []
    return data as DbService[]
  } catch {
    return []
  }
}
