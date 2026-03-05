'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { ServiceCard } from '@/components/molecules/ServiceCard'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Button } from '@/components/atoms/Button'
import { staggerContainerVariants, fadeUpVariants } from '@/lib/animations'
import { getFeaturedServices } from '@/content/services'

export function ServicesSection() {
  const t = useTranslations('home.services')
  const locale = useLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const featuredServices = getFeaturedServices()

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
            {featuredServices.map((service) => (
              <motion.div key={service.id} variants={fadeUpVariants}>
                <ServiceCard
                  service={service}
                  href={`${prefix}/servicios#${service.slug}`}
                  locale={locale}
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
