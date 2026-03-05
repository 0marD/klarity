'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Search, Palette, Code2, Rocket, LifeBuoy } from 'lucide-react'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { staggerContainerVariants, fadeUpVariants } from '@/lib/animations'

const ICONS = [Search, Palette, Code2, Rocket, LifeBuoy]

export function ProcessTimeline() {
  const t = useTranslations('home.process')
  const steps = ['discovery', 'design', 'development', 'delivery', 'support'] as const

  return (
    <section className="py-20 px-4 bg-[var(--surface)]" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionHeader
              id="process-heading"
              title={t('title')}
              subtitle={t('subtitle')}
              align="center"
            />
          </motion.div>

          {/* Desktop timeline */}
          <div className="hidden lg:grid grid-cols-5 gap-6 relative" aria-label="Pasos del proceso">
            {steps.map((step, i) => {
              const Icon = ICONS[i]
              return (
                <motion.div key={step} variants={fadeUpVariants} className="relative text-center">
                  {/* Connector */}
                  {i < steps.length - 1 && (
                    <div
                      className="absolute top-7 left-[calc(50%+1.5rem)] w-[calc(100%-1.5rem)] h-px bg-[var(--border)]"
                      aria-hidden
                    />
                  )}

                  {/* Step number + icon */}
                  <div className="relative z-10 inline-flex flex-col items-center mb-4">
                    <div className="h-14 w-14 rounded-full bg-[var(--gold)] flex items-center justify-center shadow-sm">
                      <Icon className="h-6 w-6 text-[var(--bg-dark,#1B2A3E)]" aria-hidden />
                    </div>
                    <span className="mt-2 text-xs font-bold text-[var(--gold-text)] uppercase tracking-wider">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-[var(--text)] mb-2">
                    {t(`steps.${step}.title`)}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {t(`steps.${step}.description`)}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile list */}
          <div className="lg:hidden flex flex-col gap-6">
            {steps.map((step, i) => {
              const Icon = ICONS[i]
              return (
                <motion.div key={step} variants={fadeUpVariants} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-[var(--gold)] flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-[var(--bg-dark,#1B2A3E)]" aria-hidden />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="flex-1 w-px bg-[var(--border)] mt-2" aria-hidden />
                    )}
                  </div>
                  <div className="pt-1 pb-6">
                    <p className="text-xs font-bold text-[var(--gold-text)] uppercase tracking-wider mb-1">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-display text-lg font-semibold text-[var(--text)] mb-1">
                      {t(`steps.${step}.title`)}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {t(`steps.${step}.description`)}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
