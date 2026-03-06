'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { PageLayout } from '@/components/templates/PageLayout'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { fadeUpVariants, staggerContainerVariants } from '@/lib/animations'
import { Logo } from '@/components/atoms/Logo'

export default function ContactPage() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: connect to API
    await new Promise((r) => setTimeout(r, 1000))
    setStatus('success')
  }

  const emailAddress = locale === 'en' ? 'hello@klarity.dev' : 'hola@klarity.dev'
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5210000000000'

  return (
    <PageLayout>
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUpVariants} className="flex justify-center mb-4">
              <Logo size="lg" />
            </motion.div>
            <motion.div variants={fadeUpVariants}>
              <SectionHeader
                title={t('title')}
                subtitle={t('subtitle')}
                align="center"
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
              {/* Form */}
              <motion.div variants={fadeUpVariants}>
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center mb-4 text-2xl">
                      ✓
                    </div>
                    <p className="text-lg text-[var(--text)]">{t('form.success')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    <Input
                      label={t('form.name')}
                      id="contact-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      autoComplete="name"
                    />
                    <Input
                      label={t('form.email')}
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      autoComplete="email"
                    />
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-message"
                        className="text-sm font-medium text-[var(--text)]"
                      >
                        {t('form.message')}
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-muted)] text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:border-transparent transition-colors"
                        aria-label={t('form.message')}
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? '...' : t('form.submit')}
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* Info */}
              <motion.div variants={fadeUpVariants} className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-[var(--gold-text)]" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text)] mb-1">Email</p>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#25D366] font-bold text-sm" aria-hidden>WA</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text)] mb-1">WhatsApp</p>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                    >
                      {t('info.whatsapp')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-[var(--gold-text)]" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text)] mb-1">Ubicación</p>
                    <p className="text-sm text-[var(--text-muted)]">{t('info.location')}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
