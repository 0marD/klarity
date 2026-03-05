import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { ArrowLeft } from 'lucide-react'
import type { DbQuote, QuoteStatus } from '@/types'

export const dynamic = 'force-dynamic'

const STATUS_OPTIONS: { value: QuoteStatus; label: string }[] = [
  { value: 'new', label: 'Nuevo' },
  { value: 'reviewing', label: 'En revisión' },
  { value: 'proposal_sent', label: 'Propuesta enviada' },
  { value: 'closed_won', label: 'Cerrado ganado' },
  { value: 'closed_lost', label: 'Cerrado perdido' },
]

type Props = {
  params: Promise<{ id: string }>
}

export default async function CotizacionDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: quote } = await supabase.from('quotes').select('*').eq('id', id).single()

  if (!quote) notFound()

  const q = quote as DbQuote

  return (
    <div className="pt-14 md:pt-0 max-w-3xl">
      <Link
        href="/admin/cotizaciones"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Volver al Kanban
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl font-bold text-[var(--text)]">
          {q.client_name}
        </h1>
        <Badge variant="outline">{q.locale.toUpperCase()}</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="font-semibold text-[var(--text)] mb-3 text-sm uppercase tracking-wider">
            Datos del cliente
          </h2>
          <dl className="flex flex-col gap-2 text-sm">
            <div>
              <dt className="text-[var(--text-muted)]">Email</dt>
              <dd><a href={`mailto:${q.client_email}`} className="text-[var(--gold-text)] hover:underline">{q.client_email}</a></dd>
            </div>
            {q.client_company && (
              <div>
                <dt className="text-[var(--text-muted)]">Empresa</dt>
                <dd>{q.client_company}</dd>
              </div>
            )}
            {q.client_phone && (
              <div>
                <dt className="text-[var(--text-muted)]">Teléfono</dt>
                <dd>{q.client_phone}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="font-semibold text-[var(--text)] mb-3 text-sm uppercase tracking-wider">
            Proyecto
          </h2>
          <dl className="flex flex-col gap-2 text-sm">
            <div>
              <dt className="text-[var(--text-muted)]">Tipo</dt>
              <dd className="font-medium">{q.project_type}</dd>
            </div>
            {q.deadline && (
              <div>
                <dt className="text-[var(--text-muted)]">Plazo</dt>
                <dd>{q.deadline}</dd>
              </div>
            )}
            {q.budget_range && (
              <div>
                <dt className="text-[var(--text-muted)]">Presupuesto</dt>
                <dd>{q.budget_range}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {q.modules && q.modules.length > 0 && (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 mb-4">
          <h2 className="font-semibold text-[var(--text)] mb-3 text-sm uppercase tracking-wider">
            Módulos
          </h2>
          <div className="flex flex-wrap gap-2">
            {q.modules.map((mod) => (
              <Badge key={mod} variant="gold">{mod}</Badge>
            ))}
          </div>
        </div>
      )}

      {q.notes && (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 mb-8">
          <h2 className="font-semibold text-[var(--text)] mb-3 text-sm uppercase tracking-wider">
            Descripción
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{q.notes}</p>
        </div>
      )}

      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <p className="text-sm text-[var(--text-muted)]">Estado actual:</p>
        {STATUS_OPTIONS.map((s) => (
          <form key={s.value} action={`/api/quotes/${q.id}/status`} method="POST">
            <input type="hidden" name="status" value={s.value} />
            <button
              type="submit"
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                q.status === s.value
                  ? 'bg-[var(--gold)] border-[var(--gold)] text-[var(--bg-dark,#1B2A3E)]'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
              aria-pressed={q.status === s.value}
            >
              {s.label}
            </button>
          </form>
        ))}
      </div>
    </div>
  )
}
