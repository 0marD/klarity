'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ServiceCard } from '@/components/molecules/ServiceCard'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Button } from '@/components/atoms/Button'
import { staggerContainerVariants, fadeUpVariants } from '@/lib/animations'
import type { DbService } from '@/types'

type ServicesSectionProps = {
  services: DbService[]
  locale: string
}

export function ServicesSection({ services, locale }: ServicesSectionProps) {
  const t = useTranslations('home.services')
  const prefix = locale === 'en' ? '/en' : ''

  if (services.length === 0) {
    return (
      <section className="py-20 px-4 bg-[var(--surface)]" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            id="services-heading"
            title={t('title')}
            subtitle={t('subtitle')}
            align="center"
          />
          <p className="text-center text-[var(--text-muted)] mt-8">{t('empty')}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-[var(--surface)]" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionHeader
              id="services-heading"
              title={t('title')}
              subtitle={t('subtitle')}
              align="center"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div key={service.id} variants={fadeUpVariants} className="h-full">
                <ServiceCard
                  service={service}
                  locale={locale}
                  href={`${prefix}/servicios#${service.slug}`}
                />
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUpVariants} className="mt-10 flex justify-center">
            <Button variant="outline" asChild>
              <Link href={`${prefix}/servicios`}>{t('cta')}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
