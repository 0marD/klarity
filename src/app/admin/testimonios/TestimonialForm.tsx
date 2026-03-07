'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { createClient } from '@/lib/supabase/client'
import type { DbTestimonial } from '@/types'

type TestimonialFormProps = {
  testimonial?: DbTestimonial
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [form, setForm] = useState({
    author: testimonial?.author ?? '',
    role: testimonial?.role ?? '',
    company: testimonial?.company ?? '',
    content_es: testimonial?.content_es ?? '',
    content_en: testimonial?.content_en ?? '',
    rating: testimonial?.rating?.toString() ?? '5',
    is_active: testimonial?.is_active ?? true,
    order_index: testimonial?.order_index?.toString() ?? '0',
  })

  const update = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()

    const payload = {
      author: form.author,
      role: form.role,
      company: form.company,
      content_es: form.content_es,
      content_en: form.content_en || null,
      rating: parseInt(form.rating, 10) || 5,
      is_active: form.is_active,
      order_index: parseInt(form.order_index, 10) || 0,
      avatar_url: testimonial?.avatar_url ?? null,
    }

    if (testimonial) {
      await supabase.from('testimonials').update(payload).eq('id', testimonial.id)
    } else {
      await supabase.from('testimonials').insert(payload)
    }

    setLoading(false)
    router.push('/admin/testimonios')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!testimonial) return
    if (!confirm('¿Eliminar este testimonio? Esta acción no se puede deshacer.')) return
    setDeleting(true)
    const supabase = createClient()
    await supabase.from('testimonials').delete().eq('id', testimonial.id)
    router.push('/admin/testimonios')
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Autor"
          id="test-author"
          value={form.author}
          onChange={(e) => update('author', e.target.value)}
          required
          placeholder="Carlos Mendoza"
        />
        <Input
          label="Cargo"
          id="test-role"
          value={form.role}
          onChange={(e) => update('role', e.target.value)}
          required
          placeholder="Director de Operaciones"
        />
        <Input
          label="Empresa"
          id="test-company"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
          required
          placeholder="Distribuidora Norte"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="content-es" className="text-sm font-medium text-[var(--text)]">
            Testimonio (ES)
          </label>
          <textarea
            id="content-es"
            rows={4}
            value={form.content_es}
            onChange={(e) => update('content_es', e.target.value)}
            required
            placeholder="Klarity transformó nuestro proceso..."
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="content-en" className="text-sm font-medium text-[var(--text)]">
            Testimonio (EN) — opcional
          </label>
          <textarea
            id="content-en"
            rows={4}
            value={form.content_en}
            onChange={(e) => update('content_en', e.target.value)}
            placeholder="Klarity transformed our process..."
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="test-rating" className="text-sm font-medium text-[var(--text)]">
            Calificación (1–5)
          </label>
          <select
            id="test-rating"
            value={form.rating}
            onChange={(e) => update('rating', e.target.value)}
            className="px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {'⭐'.repeat(n)} ({n})
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Orden"
          id="test-order"
          type="number"
          value={form.order_index}
          onChange={(e) => update('order_index', e.target.value)}
        />
        <div className="flex items-end pb-0.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => update('is_active', e.target.checked)}
              className="accent-[var(--gold)] h-4 w-4"
            />
            <span className="text-sm font-medium text-[var(--text)]">Activo</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" variant="gold" disabled={loading}>
            {loading ? 'Guardando...' : testimonial ? 'Actualizar' : 'Crear testimonio'}
          </Button>
        </div>
        {testimonial && (
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
