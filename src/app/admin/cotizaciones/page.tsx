import { createClient } from '@/lib/supabase/server'
import { KanbanBoard } from '@/components/organisms/KanbanBoard'
import type { DbQuote } from '@/types'

export const dynamic = 'force-dynamic'

export default async function CotizacionesPage() {
  const supabase = await createClient()
  const { data: quotes } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="pt-14 md:pt-0">
      <h1 className="font-display text-3xl font-bold text-[var(--text)] mb-8">Cotizaciones</h1>
      <KanbanBoard quotes={(quotes as DbQuote[]) ?? []} />
    </div>
  )
}
