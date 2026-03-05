'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PageLayout } from '@/components/templates/PageLayout'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { ServiceCard } from '@/components/molecules/ServiceCard'
import { Button } from '@/components/atoms/Button'
import { staggerContainerVariants, fadeUpVariants } from '@/lib/animations'
import { services } from '@/content/services'

export default function ServicesPage() {
  const t = useTranslations('services')
  const locale = useLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const [showPrices, setShowPrices] = useState(false)

  return (
    <PageLayout>
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div variants={fadeUpVariants} className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <SectionHeader
                title={t('title')}
                subtitle={t('subtitle')}
                className="mb-0"
              />
              <button
                onClick={() => setShowPrices((v) => !v)}
                className="text-sm font-medium text-[var(--gold-text)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm shrink-0"
                aria-pressed={showPrices}
              >
                {showPrices ? t('hidePrices') : t('togglePrices')}
              </button>
            </motion.div>

            {/* Services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <motion.div key={service.id} variants={fadeUpVariants} id={service.slug}>
                  <ServiceCard
                    service={service}
                    showPrice={showPrices}
                    href={`${prefix}/cotizacion?service=${service.slug}`}
                    locale={locale}
                  />
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={fadeUpVariants} className="mt-16 p-10 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-[var(--text)] mb-3">
                ¿No encuentras lo que buscas?
              </h2>
              <p className="text-[var(--text-muted)] mb-6 max-w-lg mx-auto">
                Contáctanos y diseñamos una solución a la medida de tus necesidades.
              </p>
              <Button variant="gold" size="lg" asChild>
                <Link href={`${prefix}/cotizacion`}>{t('cta')}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
