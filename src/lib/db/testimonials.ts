import { createClient } from '@/lib/supabase/server'
import type { DbTestimonial } from '@/types'

// Re-export localization helper for convenience (server-side consumers)
export { localizeTestimonial } from './localize'

export async function fetchTestimonials(): Promise<DbTestimonial[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error || !data) return []
    return data as DbTestimonial[]
  } catch {
    return []
  }
}
