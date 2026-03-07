'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { createClient } from '@/lib/supabase/client'
import type { DbService } from '@/types'

type ServiceFormProps = {
  service?: DbService
}

export function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [form, setForm] = useState({
    slug: service?.slug ?? '',
    title_es: service?.title_es ?? '',
    title_en: service?.title_en ?? '',
    description_es: service?.description_es ?? '',
    description_en: service?.description_en ?? '',
    icon: service?.icon ?? 'Monitor',
    base_price: service?.base_price?.toString() ?? '',
    is_active: service?.is_active ?? true,
    order_index: service?.order_index?.toString() ?? '0',
    features_es: service?.features_es ?? [],
    features_en: service?.features_en ?? [],
  })

  const update = (key: string, value: string | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const addFeature = (lang: 'es' | 'en') => {
    const key = `features_${lang}` as const
    update(key, [...form[key], ''])
  }

  const updateFeature = (lang: 'es' | 'en', index: number, value: string) => {
    const key = `features_${lang}` as const
    const updated = [...form[key]]
    updated[index] = value
    update(key, updated)
  }

  const removeFeature = (lang: 'es' | 'en', index: number) => {
    const key = `features_${lang}` as const
    update(key, form[key].filter((_, i) => i !== index))
  }

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
      icon: form.icon || null,
      base_price: form.base_price ? parseFloat(form.base_price) : null,
      is_active: form.is_active,
      order_index: parseInt(form.order_index, 10) || 0,
      features_es: form.features_es.filter(Boolean),
      features_en: form.features_en.filter(Boolean),
    }

    if (service) {
      await supabase.from('services').update(payload).eq('id', service.id)
    } else {
      await supabase.from('services').insert(payload)
    }

    setLoading(false)
    router.push('/admin/servicios')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!service) return
    if (!confirm('¿Eliminar este servicio? Esta acción no se puede deshacer.')) return
    setDeleting(true)
    const supabase = createClient()
    await supabase.from('services').delete().eq('id', service.id)
    router.push('/admin/servicios')
    router.refresh()
  }

  const ICON_OPTIONS = ['Monitor', 'Smartphone', 'Zap', 'ShoppingCart', 'GitMerge', 'Lightbulb']

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Slug (URL)"
          id="svc-slug"
          value={form.slug}
          onChange={(e) => update('slug', e.target.value)}
          required
          placeholder="aplicaciones-web"
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="svc-icon" className="text-sm font-medium text-[var(--text)]">
            Ícono
          </label>
          <select
            id="svc-icon"
            value={form.icon}
            onChange={(e) => update('icon', e.target.value)}
            className="px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          >
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Título (ES)"
          id="svc-title-es"
          value={form.title_es}
          onChange={(e) => update('title_es', e.target.value)}
          required
        />
        <Input
          label="Título (EN)"
          id="svc-title-en"
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
            rows={3}
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
            rows={3}
            value={form.description_en}
            onChange={(e) => update('description_en', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          />
        </div>
      </div>

      {/* Features ES */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-[var(--text)]">Características (ES)</p>
          <button
            type="button"
            onClick={() => addFeature('es')}
            className="flex items-center gap-1 text-xs text-[var(--gold-text)] hover:underline focus-visible:outline-none"
          >
            <Plus className="h-3 w-3" aria-hidden />
            Añadir
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {form.features_es.map((feat, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={feat}
                onChange={(e) => updateFeature('es', i, e.target.value)}
                placeholder={`Característica ${i + 1}`}
                className="flex-1 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              />
              <button
                type="button"
                onClick={() => removeFeature('es', i)}
                className="text-[var(--color-error)] hover:opacity-70 focus-visible:outline-none"
                aria-label="Eliminar"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Features EN */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-[var(--text)]">Características (EN)</p>
          <button
            type="button"
            onClick={() => addFeature('en')}
            className="flex items-center gap-1 text-xs text-[var(--gold-text)] hover:underline focus-visible:outline-none"
          >
            <Plus className="h-3 w-3" aria-hidden />
            Add
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {form.features_en.map((feat, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={feat}
                onChange={(e) => updateFeature('en', i, e.target.value)}
                placeholder={`Feature ${i + 1}`}
                className="flex-1 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              />
              <button
                type="button"
                onClick={() => removeFeature('en', i)}
                className="text-[var(--color-error)] hover:opacity-70 focus-visible:outline-none"
                aria-label="Remove"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Precio base (MXN)"
          id="svc-price"
          type="number"
          value={form.base_price}
          onChange={(e) => update('base_price', e.target.value)}
          placeholder="25000"
        />
        <Input
          label="Orden"
          id="svc-order"
          type="number"
          value={form.order_index}
          onChange={(e) => update('order_index', e.target.value)}
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => update('is_active', e.target.checked)}
          className="accent-[var(--gold)] h-4 w-4"
        />
        <span className="text-sm font-medium text-[var(--text)]">Activo</span>
      </label>

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" variant="gold" disabled={loading}>
            {loading ? 'Guardando...' : service ? 'Actualizar' : 'Crear servicio'}
          </Button>
        </div>
        {service && (
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
