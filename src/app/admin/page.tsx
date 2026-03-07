import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [quotesResult, projectsResult] = await Promise.allSettled([
    supabase.from('quotes').select('id, status, created_at').order('created_at', { ascending: false }),
    supabase.from('projects').select('id, is_published').eq('is_published', true),
  ])

  const quotes = quotesResult.status === 'fulfilled' ? (quotesResult.value.data ?? []) : []
  const projects = projectsResult.status === 'fulfilled' ? (projectsResult.value.data ?? []) : []

  const thisMonth = new Date()
  thisMonth.setDate(1)
  thisMonth.setHours(0, 0, 0, 0)

  const quotesThisMonth = quotes.filter((q) => new Date(q.created_at) >= thisMonth)
  const closedWon = quotes.filter((q) => q.status === 'closed_won')
  const conversionRate =
    quotes.length > 0 ? Math.round((closedWon.length / quotes.length) * 100) : 0

  const kpis = [
    { label: 'Proyectos publicados', value: String(projects.length), icon: '📁' },
    { label: 'Cotizaciones este mes', value: String(quotesThisMonth.length), icon: '📋' },
    { label: 'Tasa de conversión', value: `${conversionRate}%`, icon: '📈' },
    { label: 'Total cotizaciones', value: String(quotes.length), icon: '💼' },
  ]

  const recentQuotes = quotes.slice(0, 5)

  const statusLabels: Record<string, string> = {
    new: 'Nuevo',
    reviewing: 'En revisión',
    proposal_sent: 'Propuesta enviada',
    closed_won: 'Ganado',
    closed_lost: 'Perdido',
  }

  const statusColors: Record<string, string> = {
    new: 'bg-[var(--color-info)]/20 text-[var(--color-info)]',
    reviewing: 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]',
    proposal_sent: 'bg-[var(--gold)]/20 text-[var(--gold-text)]',
    closed_won: 'bg-[var(--color-success)]/20 text-[var(--color-success)]',
    closed_lost: 'bg-[var(--color-error)]/20 text-[var(--color-error)]',
  }

  // Build status distribution for chart
  const statusOrder: string[] = ['new', 'reviewing', 'proposal_sent', 'closed_won', 'closed_lost']
  const statusCount = statusOrder.map((s) => ({
    status: s,
    label: statusLabels[s],
    count: quotes.filter((q) => q.status === s).length,
    color: statusColors[s],
  }))
  const maxCount = Math.max(...statusCount.map((s) => s.count), 1)

  return (
    <div className="pt-14 md:pt-0">
      <h1 className="font-display text-3xl font-bold text-[var(--text)] mb-8">Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5"
          >
            <p className="text-2xl mb-1" aria-hidden>
              {kpi.icon}
            </p>
            <p className="font-display text-3xl font-bold text-[var(--text)]">{kpi.value}</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Status chart */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-5">
            Cotizaciones por estado
          </h2>
          {quotes.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">Sin datos aún.</p>
          ) : (
            <div className="flex flex-col gap-3" role="list" aria-label="Distribución por estado">
              {statusCount.map(({ status, label, count, color }) => (
                <div key={status} role="listitem" className="flex items-center gap-3">
                  <span className="text-xs text-[var(--text-muted)] w-36 shrink-0 truncate">
                    {label}
                  </span>
                  <div className="flex-1 h-5 bg-[var(--bg)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${color.split(' ')[0]}`}
                      style={{ width: `${(count / maxCount) * 100}%` }}
                      role="progressbar"
                      aria-valuenow={count}
                      aria-valuemin={0}
                      aria-valuemax={maxCount}
                      aria-label={`${label}: ${count}`}
                    />
                  </div>
                  <span className="text-xs font-semibold text-[var(--text)] w-6 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent quotes */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[var(--text)]">
              Cotizaciones recientes
            </h2>
            <Link
              href="/admin/cotizaciones"
              className="text-xs text-[var(--gold-text)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
            >
              Ver todas
            </Link>
          </div>
          {recentQuotes.length === 0 ? (
            <p className="p-8 text-center text-[var(--text-muted)]">No hay cotizaciones aún.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      ID
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Fecha
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentQuotes.map((q) => (
                    <tr key={q.id} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/cotizaciones/${q.id}`}
                          className="text-[var(--text)] font-mono text-xs hover:text-[var(--gold-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
                        >
                          {q.id.slice(0, 8)}…
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-[var(--text-muted)]">
                        {new Date(q.created_at).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColors[q.status] ??
                            'bg-[var(--border)] text-[var(--text-muted)]'
                          }`}
                        >
                          {statusLabels[q.status] ?? q.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
