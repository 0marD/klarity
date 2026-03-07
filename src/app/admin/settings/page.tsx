import { getFeatureFlags } from '@/lib/feature-flags'
import { SettingsClient } from './SettingsClient'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const flags = await getFeatureFlags()

  return (
    <div className="pt-14 md:pt-0">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[var(--text)]">Configuración</h1>
        <p className="text-[var(--text-muted)] mt-1">
          Gestiona las funcionalidades activas del sitio.
        </p>
      </div>
      <SettingsClient initialFlags={flags} />
    </div>
  )
}
