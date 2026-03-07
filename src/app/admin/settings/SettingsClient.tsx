'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { createClient } from '@/lib/supabase/client'
import type { FeatureFlags } from '@/types'

type SettingsClientProps = {
  initialFlags: FeatureFlags
}

type FlagKey = keyof FeatureFlags

const FLAG_META: {
  key: FlagKey
  label: string
  description: string
  requiresSetup: string | null
}[] = [
  {
    key: 'chatbot',
    label: 'Chatbot IA',
    description: 'Asistente inteligente en el sitio público.',
    requiresSetup: 'Requiere API key de OpenAI configurada en variables de entorno.',
  },
  {
    key: 'email_notifications',
    label: 'Notificaciones por Email',
    description: 'Envía correos de confirmación a clientes al recibir una cotización.',
    requiresSetup: 'Requiere cuenta de Resend y RESEND_API_KEY configurada.',
  },
  {
    key: 'crm_integration',
    label: 'Integración CRM',
    description: 'Sincroniza leads automáticamente con HubSpot o Zoho CRM.',
    requiresSetup: 'Requiere tokens de HubSpot o Zoho configurados.',
  },
  {
    key: 'whatsapp_button',
    label: 'Botón de WhatsApp',
    description: 'Muestra el botón flotante de WhatsApp en el sitio público.',
    requiresSetup: null,
  },
]

export function SettingsClient({ initialFlags }: SettingsClientProps) {
  const [flags, setFlags] = useState<FeatureFlags>(initialFlags)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')

  const toggle = (key: FlagKey) =>
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }))

  const handleSave = async () => {
    setSaving(true)
    setStatus('idle')
    const supabase = createClient()
    const { error } = await supabase.from('site_config').upsert({
      key: 'feature_flags',
      value: flags,
      updated_at: new Date().toISOString(),
    })
    setSaving(false)
    setStatus(error ? 'error' : 'saved')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[var(--border)]">
          <h2 className="font-display text-xl font-semibold text-[var(--text)]">
            Funcionalidades del sitio
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Activa o desactiva características sin necesidad de redeploy.
          </p>
        </div>

        <ul className="divide-y divide-[var(--border)]">
          {FLAG_META.map(({ key, label, description, requiresSetup }) => (
            <li key={key} className="flex items-start gap-4 p-5">
              <div className="flex-1">
                <p className="font-medium text-[var(--text)] text-sm">{label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>
                {requiresSetup && (
                  <p className="text-xs text-[var(--color-warning)] mt-1 flex items-center gap-1">
                    <span aria-hidden>⚠️</span>
                    {requiresSetup}
                  </p>
                )}
              </div>
              <button
                role="switch"
                aria-checked={flags[key]}
                onClick={() => toggle(key)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                  flags[key] ? 'bg-[var(--gold)]' : 'bg-[var(--border)]'
                }`}
                aria-label={`${flags[key] ? 'Desactivar' : 'Activar'} ${label}`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    flags[key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Button variant="gold" onClick={handleSave} disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar configuración'}
        </Button>

        {status === 'saved' && (
          <span className="flex items-center gap-1.5 text-sm text-[var(--color-success)]">
            <CheckCircle className="h-4 w-4" aria-hidden />
            Configuración guardada
          </span>
        )}
        {status === 'error' && (
          <span className="flex items-center gap-1.5 text-sm text-[var(--color-error)]">
            <AlertCircle className="h-4 w-4" aria-hidden />
            Error al guardar
          </span>
        )}
      </div>
    </div>
  )
}
