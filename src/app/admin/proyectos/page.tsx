import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Plus } from 'lucide-react'
import type { DbProject } from '@/types'

export const dynamic = 'force-dynamic'

export default async function ProyectosAdminPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })

  return (
    <div className="pt-14 md:pt-0">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-[var(--text)]">Proyectos</h1>
        <Button variant="gold" size="sm" asChild>
          <Link href="/admin/proyectos/nuevo">
            <Plus className="h-4 w-4" aria-hidden />
            Nuevo proyecto
          </Link>
        </Button>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
        {!projects || projects.length === 0 ? (
          <p className="p-8 text-center text-[var(--text-muted)]">No hay proyectos aún.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Título</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Estado</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Destacado</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {(projects as DbProject[]).map((p) => (
                <tr key={p.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-5 py-3">
                    <p className="font-medium text-[var(--text)]">{p.title_es}</p>
                    <p className="text-xs text-[var(--text-muted)]">{p.slug}</p>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={p.is_published ? 'success' : 'outline'}>
                      {p.is_published ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={p.is_featured ? 'gold' : 'outline'}>
                      {p.is_featured ? 'Sí' : 'No'}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/proyectos/${p.id}`}>Editar</Link>
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
