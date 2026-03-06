export const dynamic = 'force-dynamic'

import { getTranslations } from 'next-intl/server'
import { PageLayout } from '@/components/templates/PageLayout'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Logo } from '@/components/atoms/Logo'

export default async function AboutPage() {
  const t = await getTranslations('about')

  const values = [
    {
      title: 'Claridad',
      description: 'Comunicación transparente en cada etapa del proyecto. Sin sorpresas.',
    },
    {
      title: 'Compromiso',
      description: 'Nos involucramos en el éxito del negocio, no solo en la entrega del código.',
    },
    {
      title: 'Calidad',
      description: 'Código limpio, documentado y mantenible. Sin deuda técnica innecesaria.',
    },
    {
      title: 'Resultados',
      description: 'Medimos el éxito en impacto de negocio: tiempo ahorrado, errores eliminados, conversiones mejoradas.',
    },
  ]

  return (
    <PageLayout>
      <div className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold-text)] mb-3">
              {t('title')}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-[var(--text)] mb-6">
              {t('subtitle')}
            </h1>
          </div>

          {/* Philosophy */}
          <div className="mb-16 p-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
            <h2 className="font-display text-2xl font-bold text-[var(--text)] mb-4">
              {t('philosophy.title')}
            </h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed italic font-display">
              &ldquo;{t('philosophy.text')}&rdquo;
            </p>
          </div>

          {/* Values */}
          <div>
            <SectionHeader title={t('values.title')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-[var(--gold)]/30 transition-colors"
                >
                  <h3 className="font-display text-xl font-semibold text-[var(--text)] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
