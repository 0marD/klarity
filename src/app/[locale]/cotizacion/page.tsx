'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react'
import { PageLayout } from '@/components/templates/PageLayout'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { quoteSchema, type QuoteSchema, type QuoteFormInput } from '@/lib/validations/quote.schema'
import { fadeUpVariants } from '@/lib/animations'
import { Logo } from '@/components/atoms/Logo'

const PROJECT_TYPES = ['webapp', 'mobile', 'ecommerce', 'automation', 'api', 'other'] as const

const MODULES = [
  'Autenticación y usuarios',
  'Panel de administración',
  'Pasarela de pagos',
  'Notificaciones email',
  'Reportes y analytics',
  'API / Integraciones',
  'App móvil',
  'Chat / Mensajería',
  'Geolocalización',
  'Upload de archivos',
]

const DEADLINES = ['1-2 semanas', '1 mes', '2-3 meses', '3-6 meses', 'Más de 6 meses']
const BUDGETS = ['< $15,000 MXN', '$15k-$50k MXN', '$50k-$150k MXN', '> $150k MXN', 'Por definir']

export default function QuotePage() {
  const t = useTranslations('quote')
  const locale = useLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<QuoteFormInput, unknown, QuoteSchema>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      locale: locale as 'es' | 'en',
      modules: [],
    },
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form
  const modules = watch('modules') || []
  const projectType = watch('projectType')

  const toggleModule = (mod: string) => {
    const current = modules
    if (current.includes(mod)) {
      setValue('modules', current.filter((m) => m !== mod))
    } else {
      setValue('modules', [...current, mod])
    }
  }

  const onSubmit = async (data: QuoteSchema) => {
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      // handle error
    }
  }

  if (submitted) {
    return (
      <PageLayout>
        <div className="py-20 px-4 min-h-[70vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="h-20 w-20 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-[var(--color-success)]" aria-hidden />
            </div>
            <h1 className="font-display text-3xl font-bold text-[var(--text)] mb-3">
              {t('success.title')}
            </h1>
            <p className="text-[var(--text-muted)] mb-8">{t('success.message')}</p>
            <Button variant="gold" asChild>
              <Link href={`${prefix}/`}>{t('success.cta')}</Link>
            </Button>
          </motion.div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <h1 className="font-display text-4xl font-bold text-[var(--text)] mb-3">
              {t('title')}
            </h1>
            <p className="text-[var(--text-muted)]">{t('subtitle')}</p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between mb-10 gap-2" aria-label="Pasos del formulario">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all shrink-0 ${
                    s <= step
                      ? 'bg-[var(--gold)] text-[var(--bg-dark,#1B2A3E)]'
                      : 'border-2 border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                  aria-current={s === step ? 'step' : undefined}
                >
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-0.5 transition-all ${s < step ? 'bg-[var(--gold)]' : 'bg-[var(--border)]'}`}
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -16 }}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
                >
                  <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                    {t('step1.title')}
                  </h2>
                  <Input
                    label={t('step1.name')}
                    id="clientName"
                    autoComplete="name"
                    error={errors.clientName?.message}
                    {...register('clientName')}
                  />
                  <Input
                    label={t('step1.email')}
                    id="clientEmail"
                    type="email"
                    autoComplete="email"
                    error={errors.clientEmail?.message}
                    {...register('clientEmail')}
                  />
                  <Input
                    label={t('step1.company')}
                    id="clientCompany"
                    autoComplete="organization"
                    {...register('clientCompany')}
                  />
                  <Input
                    label={t('step1.phone')}
                    id="clientPhone"
                    type="tel"
                    autoComplete="tel"
                    {...register('clientPhone')}
                  />
                  <Button
                    type="button"
                    variant="gold"
                    size="lg"
                    className="mt-2"
                    onClick={async () => {
                      const valid = await form.trigger(['clientName', 'clientEmail'])
                      if (valid) setStep(2)
                    }}
                  >
                    {t('common' as never) || 'Siguiente'}
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -16 }}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
                >
                  <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                    {t('step2.title')}
                  </h2>

                  {/* Project type */}
                  <div>
                    <p className="text-sm font-medium text-[var(--text)] mb-3">{t('step2.projectType')}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PROJECT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setValue('projectType', type)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                            projectType === type
                              ? 'bg-[var(--gold)] border-[var(--gold)] text-[var(--bg-dark,#1B2A3E)]'
                              : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text)] hover:text-[var(--text)]'
                          }`}
                          aria-pressed={projectType === type}
                        >
                          {t(`types.${type}`)}
                        </button>
                      ))}
                    </div>
                    {errors.projectType && (
                      <p className="text-xs text-[var(--color-error)] mt-1.5" role="alert">
                        {errors.projectType.message}
                      </p>
                    )}
                  </div>

                  {/* Modules */}
                  <div>
                    <p className="text-sm font-medium text-[var(--text)] mb-3">{t('step2.modules')}</p>
                    <div className="flex flex-wrap gap-2">
                      {MODULES.map((mod) => (
                        <button
                          key={mod}
                          type="button"
                          onClick={() => toggleModule(mod)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                            modules.includes(mod)
                              ? 'bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold-text)]'
                              : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                          }`}
                          aria-pressed={modules.includes(mod)}
                        >
                          {mod}
                        </button>
                      ))}
                    </div>
                    {errors.modules && (
                      <p className="text-xs text-[var(--color-error)] mt-1.5" role="alert">
                        {errors.modules.message}
                      </p>
                    )}
                  </div>

                  {/* Deadline */}
                  <div>
                    <p className="text-sm font-medium text-[var(--text)] mb-3">{t('step2.deadline')}</p>
                    <div className="flex flex-wrap gap-2">
                      {DEADLINES.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setValue('deadline', d)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                            watch('deadline') === d
                              ? 'bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold-text)]'
                              : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                          }`}
                          aria-pressed={watch('deadline') === d}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <p className="text-sm font-medium text-[var(--text)] mb-3">{t('step2.budget')}</p>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setValue('budgetRange', b)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                            watch('budgetRange') === b
                              ? 'bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold-text)]'
                              : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                          }`}
                          aria-pressed={watch('budgetRange') === b}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                      Atrás
                    </Button>
                    <Button
                      type="button"
                      variant="gold"
                      className="flex-1"
                      onClick={async () => {
                        const valid = await form.trigger(['projectType', 'modules'])
                        if (valid) setStep(3)
                      }}
                    >
                      Siguiente
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -16 }}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
                >
                  <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                    {t('step3.title')}
                  </h2>

                  {/* Summary */}
                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-sm">
                    <p className="font-medium text-[var(--text)] mb-2">Resumen:</p>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="gold">{t(`types.${projectType}` as never) || projectType}</Badge>
                      {modules.map((m) => (
                        <Badge key={m} variant="outline">{m}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="description" className="text-sm font-medium text-[var(--text)]">
                      {t('step3.description')}
                    </label>
                    <textarea
                      id="description"
                      rows={6}
                      className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-muted)] text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:border-transparent transition-colors"
                      placeholder="Cuéntanos más sobre tu proyecto, contexto y objetivos..."
                      {...register('description')}
                    />
                  </div>

                  <div className="flex gap-3 mt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                      Atrás
                    </Button>
                    <Button type="submit" variant="gold" size="lg" className="flex-1">
                      {t('step3.submit')}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </PageLayout>
  )
}
