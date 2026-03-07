'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { staggerContainerVariants, fadeUpVariants } from '@/lib/animations'
import { localizeTestimonial } from '@/lib/db/localize'
import type { DbTestimonial } from '@/types'

type TestimonialsSectionProps = {
  testimonials: DbTestimonial[]
  locale: string
}

export function TestimonialsSection({ testimonials, locale }: TestimonialsSectionProps) {
  const t = useTranslations('home.testimonials')

  if (testimonials.length === 0) return null

  return (
    <section className="py-20 px-4" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionHeader
              id="testimonials-heading"
              title={t('title')}
              subtitle={t('subtitle')}
              align="center"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => {
              const { content } = localizeTestimonial(testimonial, locale)
              return (
                <motion.blockquote
                  key={testimonial.id}
                  variants={fadeUpVariants}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-4"
                >
                  {/* Stars */}
                  <div className="flex gap-1" aria-label={`Calificación: ${testimonial.rating} de 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? 'fill-[var(--gold)] text-[var(--gold)]'
                            : 'text-[var(--border)]'
                        }`}
                        aria-hidden
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="flex-1 text-sm text-[var(--text-muted)] leading-relaxed italic">
                    &ldquo;{content}&rdquo;
                  </p>

                  {/* Author */}
                  <footer className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[var(--gold)]/20 flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-[var(--gold-text)]">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <cite className="not-italic font-semibold text-sm text-[var(--text)]">
                        {testimonial.author}
                      </cite>
                      <p className="text-xs text-[var(--text-muted)]">
                        {testimonial.role} — {testimonial.company}
                      </p>
                    </div>
                  </footer>
                </motion.blockquote>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
