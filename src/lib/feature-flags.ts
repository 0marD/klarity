import { createClient } from '@/lib/supabase/server'
import type { FeatureFlags } from '@/types'

export const DEFAULT_FLAGS: FeatureFlags = {
  chatbot: false,
  email_notifications: false,
  crm_integration: false,
  whatsapp_button: true,
}

export async function getFeatureFlags(): Promise<FeatureFlags> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'feature_flags')
      .single()

    if (error || !data) return DEFAULT_FLAGS

    const value = data.value as Partial<FeatureFlags>
    return { ...DEFAULT_FLAGS, ...value }
  } catch {
    return DEFAULT_FLAGS
  }
}

export async function updateFeatureFlags(flags: Partial<FeatureFlags>): Promise<boolean> {
  try {
    const supabase = await createClient()
    const current = await getFeatureFlags()
    const merged = { ...current, ...flags }

    const { error } = await supabase
      .from('site_config')
      .upsert({ key: 'feature_flags', value: merged, updated_at: new Date().toISOString() })

    return !error
  } catch {
    return false
  }
}
