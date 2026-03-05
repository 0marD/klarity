'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Target, Code2, Zap, HeartHandshake } from 'lucide-react'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { staggerContainerVariants, fadeUpVariants } from '@/lib/animations'

const ICONS = [Target, Code2, Zap, HeartHandshake]

export function ValueProposition() {
  const t = useTranslations('home.value')

  const items = ['results', 'quality', 'speed', 'support'] as const

  return (
    <section className="py-20 px-4" aria-labelledby="value-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionHeader
              id="value-heading"
              title={t('title')}
              subtitle={t('subtitle')}
              align="center"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((key, i) => {
              const Icon = ICONS[i]
              return (
                <motion.div
                  key={key}
                  variants={fadeUpVariants}
                  className="text-center p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--gold)]/30 transition-colors"
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)]/10">
                    <Icon className="h-7 w-7 text-[var(--gold-text)]" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[var(--text)] mb-2">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {t(`items.${key}.description`)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
