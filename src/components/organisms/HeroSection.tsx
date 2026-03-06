'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Logo } from '@/components/atoms/Logo'
import { fadeUpVariants, staggerContainerVariants } from '@/lib/animations'

export function HeroSection() {
  const t = useTranslations('home.hero')
  const locale = useLocale()
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      aria-labelledby="hero-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--gold)]/5 blur-3xl" aria-hidden />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--color-info)]/5 blur-3xl" aria-hidden />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeUpVariants} className="mb-6 flex justify-center">
          <Badge variant="gold">{t('badge')}</Badge>
        </motion.div>

        {/* Logo */}
        <motion.div variants={fadeUpVariants} className="mb-4 flex justify-center">
          <Logo size="xl" />
        </motion.div>

        {/* Tagline */}
        <motion.h1
          id="hero-heading"
          variants={fadeUpVariants}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text)] leading-tight mb-6"
        >
          {t('tagline')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpVariants}
          className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
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
            <Link href={`${prefix}/portafolio`}>{t('ctaSecondary')}</Link>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUpVariants}
          className="mt-16 flex justify-center"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6 text-[var(--text-muted)]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
