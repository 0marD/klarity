'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Logo } from '@/components/atoms/Logo'
import { quoteSchema, type QuoteSchema, type QuoteFormInput } from '@/lib/validations/quote.schema'
import { fadeUpVariants } from '@/lib/animations'

const PROJECT_TYPE_KEYS = ['webapp', 'mobile', 'ecommerce', 'automation', 'api', 'other'] as const

const MODULE_KEYS = [
  'auth', 'admin', 'payments', 'email', 'analytics',
  'api', 'mobile', 'chat', 'geo', 'upload',
] as const

const DEADLINE_KEYS = ['1-2w', '1m', '2-3m', '3-6m', '6m+'] as const

const BUDGET_KEYS = ['lt15k', '15k-50k', '50k-150k', 'gt150k', 'tbd'] as const

export function CotizacionWizard() {
  const t = useTranslations('quote')
  const locale = useLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const form = useForm<QuoteFormInput, unknown, QuoteSchema>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      locale: locale as 'es' | 'en',
      modules: [],
    },
  })

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = form
  const modules = watch('modules') || []
  const projectType = watch('projectType')

  const toggleModule = (mod: string) => {
    if (modules.includes(mod)) {
      setValue('modules', modules.filter((m) => m !== mod))
    } else {
      setValue('modules', [...modules, mod])
    }
  }

  const onSubmit = async (data: QuoteSchema) => {
    setSubmitError(false)
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
    }
  }

  if (submitted) {
    return (
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
    )
  }

  return (
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
        <div
          className="flex items-center justify-between mb-10 gap-2"
          aria-label="Pasos del formulario"
        >
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

        {/* Global submit error */}
        {submitError && (
          <div
            role="alert"
            className="mb-6 flex items-center gap-3 rounded-lg border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-4 text-sm text-[var(--color-error)]"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
            {t('error')}
          </div>
        )}

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
                  {t('next')}
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
                  <p className="text-sm font-medium text-[var(--text)] mb-3">
                    {t('step2.projectType')}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PROJECT_TYPE_KEYS.map((type) => (
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
                  <p className="text-sm font-medium text-[var(--text)] mb-3">
                    {t('step2.modules')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {MODULE_KEYS.map((key) => {
                      const label = t(`modules.${key}`)
                      const isSelected = modules.includes(label)
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleModule(label)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                            isSelected
                              ? 'bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold-text)]'
                              : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                          }`}
                          aria-pressed={isSelected}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                  {errors.modules && (
                    <p className="text-xs text-[var(--color-error)] mt-1.5" role="alert">
                      {errors.modules.message}
                    </p>
                  )}
                </div>

                {/* Deadline */}
                <div>
                  <p className="text-sm font-medium text-[var(--text)] mb-3">
                    {t('step2.deadline')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {DEADLINE_KEYS.map((key) => {
                      const label = t(`deadlines.${key}`)
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setValue('deadline', label)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                            watch('deadline') === label
                              ? 'bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold-text)]'
                              : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                          }`}
                          aria-pressed={watch('deadline') === label}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <p className="text-sm font-medium text-[var(--text)] mb-3">
                    {t('step2.budget')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_KEYS.map((key) => {
                      const label = t(`budgets.${key}`)
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setValue('budgetRange', label)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                            watch('budgetRange') === label
                              ? 'bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold-text)]'
                              : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                          }`}
                          aria-pressed={watch('budgetRange') === label}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex gap-3 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                    {t('back')}
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
                    {t('next')}
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
                    {projectType && (
                      <Badge variant="gold">{t(`types.${projectType}`)}</Badge>
                    )}
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
                    placeholder={t('step3.descriptionPlaceholder')}
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="text-xs text-[var(--color-error)]" role="alert">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                    {t('back')}
                  </Button>
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '...' : t('step3.submit')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}
