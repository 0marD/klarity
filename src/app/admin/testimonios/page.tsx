import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Plus, Star } from 'lucide-react'
import type { DbTestimonial } from '@/types'

export const dynamic = 'force-dynamic'

export default async function TestimoniosAdminPage() {
  const supabase = await createClient()
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('order_index', { ascending: true })

  return (
    <div className="pt-14 md:pt-0">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-[var(--text)]">Testimonios</h1>
        <Button variant="gold" size="sm" asChild>
          <Link href="/admin/testimonios/nuevo">
            <Plus className="h-4 w-4" aria-hidden />
            Nuevo testimonio
          </Link>
        </Button>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
        {!testimonials || testimonials.length === 0 ? (
          <p className="p-8 text-center text-[var(--text-muted)]">
            No hay testimonios aún.{' '}
            <Link
              href="/admin/testimonios/nuevo"
              className="text-[var(--gold-text)] hover:underline"
            >
              Crear el primero
            </Link>
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Autor
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Calificación
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
              {(testimonials as DbTestimonial[]).map((t) => (
                <tr key={t.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-5 py-3">
                    <p className="font-medium text-[var(--text)]">{t.author}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {t.role} — {t.company}
                    </p>
                  </td>
                  <td className="px-5 py-3">
                    <div
                      className="flex gap-0.5"
                      aria-label={`${t.rating} de 5 estrellas`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < t.rating
                              ? 'fill-[var(--gold)] text-[var(--gold)]'
                              : 'text-[var(--border)]'
                          }`}
                          aria-hidden
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={t.is_active ? 'success' : 'outline'}>
                      {t.is_active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/testimonios/${t.id}`}>Editar</Link>
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
