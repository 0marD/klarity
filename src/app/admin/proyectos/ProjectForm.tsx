'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { createClient } from '@/lib/supabase/client'
import type { DbProject, ProjectMetric } from '@/types'

type ProjectFormProps = {
  project?: DbProject
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [form, setForm] = useState({
    slug: project?.slug ?? '',
    title_es: project?.title_es ?? '',
    title_en: project?.title_en ?? '',
    description_es: project?.description_es ?? '',
    description_en: project?.description_en ?? '',
    tags: project?.tags?.join(', ') ?? '',
    technologies: project?.technologies?.join(', ') ?? '',
    is_published: project?.is_published ?? false,
    is_featured: project?.is_featured ?? false,
    order_index: project?.order_index?.toString() ?? '0',
  })
  const [metrics, setMetrics] = useState<ProjectMetric[]>(project?.metrics ?? [])

  const update = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const addMetric = () =>
    setMetrics((prev) => [...prev, { label: '', before: '', after: '' }])

  const updateMetric = (index: number, field: keyof ProjectMetric, value: string) =>
    setMetrics((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    )

  const removeMetric = (index: number) =>
    setMetrics((prev) => prev.filter((_, i) => i !== index))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()

    const payload = {
      slug: form.slug,
      title_es: form.title_es,
      title_en: form.title_en,
      description_es: form.description_es || null,
      description_en: form.description_en || null,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      is_published: form.is_published,
      is_featured: form.is_featured,
      order_index: parseInt(form.order_index, 10) || 0,
      cover_url: project?.cover_url ?? null,
      metrics: metrics.filter((m) => m.label),
    }

    if (project) {
      await supabase.from('projects').update(payload).eq('id', project.id)
    } else {
      await supabase.from('projects').insert(payload)
    }

    setLoading(false)
    router.push('/admin/proyectos')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!project) return
    if (!confirm('¿Eliminar este proyecto? Esta acción no se puede deshacer.')) return
    setDeleting(true)
    const supabase = createClient()
    await supabase.from('projects').delete().eq('id', project.id)
    router.push('/admin/proyectos')
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Slug (URL)"
          id="proj-slug"
          value={form.slug}
          onChange={(e) => update('slug', e.target.value)}
          required
          placeholder="mi-proyecto"
        />
        <Input
          label="Orden"
          id="proj-order"
          type="number"
          value={form.order_index}
          onChange={(e) => update('order_index', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Título (ES)"
          id="proj-title-es"
          value={form.title_es}
          onChange={(e) => update('title_es', e.target.value)}
          required
        />
        <Input
          label="Título (EN)"
          id="proj-title-en"
          value={form.title_en}
          onChange={(e) => update('title_en', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="desc-es" className="text-sm font-medium text-[var(--text)]">
            Descripción (ES)
          </label>
          <textarea
            id="desc-es"
            rows={4}
            value={form.description_es}
            onChange={(e) => update('description_es', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="desc-en" className="text-sm font-medium text-[var(--text)]">
            Descripción (EN)
          </label>
          <textarea
            id="desc-en"
            rows={4}
            value={form.description_en}
            onChange={(e) => update('description_en', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          />
        </div>
      </div>

      <Input
        label="Tags (separados por coma)"
        id="proj-tags"
        value={form.tags}
        onChange={(e) => update('tags', e.target.value)}
        placeholder="React, Node.js, PostgreSQL"
      />

      <Input
        label="Tecnologías (separadas por coma)"
        id="proj-techs"
        value={form.technologies}
        onChange={(e) => update('technologies', e.target.value)}
        placeholder="React, TypeScript, Supabase"
      />

      {/* Metrics */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-[var(--text)]">Métricas (antes / después)</p>
          <button
            type="button"
            onClick={addMetric}
            className="flex items-center gap-1 text-xs text-[var(--gold-text)] hover:underline focus-visible:outline-none"
          >
            <Plus className="h-3 w-3" aria-hidden />
            Añadir métrica
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center">
              <input
                type="text"
                value={m.label}
                onChange={(e) => updateMetric(i, 'label', e.target.value)}
                placeholder="Ej: Tiempo de inventario"
                className="px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              />
              <input
                type="text"
                value={m.before}
                onChange={(e) => updateMetric(i, 'before', e.target.value)}
                placeholder="Antes (ej: 2 días)"
                className="px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              />
              <input
                type="text"
                value={m.after}
                onChange={(e) => updateMetric(i, 'after', e.target.value)}
                placeholder="Después (ej: 2 horas)"
                className="px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              />
              <button
                type="button"
                onClick={() => removeMetric(i)}
                className="text-[var(--color-error)] hover:opacity-70 focus-visible:outline-none"
                aria-label="Eliminar métrica"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => update('is_published', e.target.checked)}
            className="accent-[var(--gold)] h-4 w-4"
          />
          <span className="text-sm font-medium text-[var(--text)]">Publicado</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) => update('is_featured', e.target.checked)}
            className="accent-[var(--gold)] h-4 w-4"
          />
          <span className="text-sm font-medium text-[var(--text)]">Destacado</span>
        </label>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" variant="gold" disabled={loading}>
            {loading ? 'Guardando...' : project ? 'Actualizar' : 'Crear proyecto'}
          </Button>
        </div>
        {project && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleDelete}
            disabled={deleting}
            className="text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            {deleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        )}
      </div>
    </form>
  )
}
