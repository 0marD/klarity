import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Plus } from 'lucide-react'
import type { DbService } from '@/types'

export const dynamic = 'force-dynamic'

export default async function ServiciosAdminPage() {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true })

  return (
    <div className="pt-14 md:pt-0">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-[var(--text)]">Servicios</h1>
        <Button variant="gold" size="sm" asChild>
          <Link href="/admin/servicios/nuevo">
            <Plus className="h-4 w-4" aria-hidden />
            Nuevo servicio
          </Link>
        </Button>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
        {!services || services.length === 0 ? (
          <p className="p-8 text-center text-[var(--text-muted)]">
            No hay servicios aún.{' '}
            <Link href="/admin/servicios/nuevo" className="text-[var(--gold-text)] hover:underline">
              Crear el primero
            </Link>
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Título
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Precio base
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Estado
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {(services as DbService[]).map((s) => (
                <tr key={s.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-5 py-3">
                    <p className="font-medium text-[var(--text)]">{s.title_es}</p>
                    <p className="text-xs text-[var(--text-muted)]">{s.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-[var(--text-muted)]">
                    {s.base_price
                      ? new Intl.NumberFormat('es-MX', {
                          style: 'currency',
                          currency: 'MXN',
                          minimumFractionDigits: 0,
                        }).format(s.base_price)
                      : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={s.is_active ? 'success' : 'outline'}>
                      {s.is_active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/servicios/${s.id}`}>Editar</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
