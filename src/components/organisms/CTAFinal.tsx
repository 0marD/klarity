'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { fadeUpVariants, staggerContainerVariants } from '@/lib/animations'

export function CTAFinal() {
  const t = useTranslations('home.cta')
  const locale = useLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5210000000000'

  return (
    <section className="relative py-24 px-4 overflow-hidden" aria-labelledby="cta-heading">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 via-transparent to-[var(--color-info)]/5" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            id="cta-heading"
            variants={fadeUpVariants}
            className="font-display text-4xl sm:text-5xl font-bold text-[var(--text)] mb-4"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-lg text-[var(--text-muted)] mb-10"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="gold" size="lg" asChild>
              <Link href={`${prefix}/cotizacion`}>
                {t('cta')}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {t('ctaSecondary')}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
