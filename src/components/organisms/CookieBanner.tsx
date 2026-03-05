'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

type ConsentState = {
  analytics: boolean
  marketing: boolean
}

const CONSENT_KEY = 'klarity_cookie_consent'

function saveConsent(consent: ConsentState) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
    window.dispatchEvent(new CustomEvent('consent-updated', { detail: consent }))
  } catch {
    // localStorage may be unavailable in private mode
  }
}

export function CookieBanner() {
  const t = useTranslations('cookies')
  const [shown, setShown] = useState(false)
  const [managing, setManaging] = useState(false)
  const [pending, setPending] = useState<ConsentState>({ analytics: false, marketing: false })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (!stored) setShown(true)
    } catch {
      setShown(true)
    }
  }, [])

  function acceptAll() {
    saveConsent({ analytics: true, marketing: true })
    setShown(false)
  }

  function acceptEssentialsOnly() {
    saveConsent({ analytics: false, marketing: false })
    setShown(false)
  }

  function saveManaged() {
    saveConsent(pending)
    setShown(false)
  }

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label={t('message')}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--surface)] p-4 shadow-lg md:p-6"
        >
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-sm text-[var(--text-muted)]">{t('message')}</p>

            {managing && (
              <div className="mb-4 flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
                <label className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{t('essential')}</span>
                  <input type="checkbox" checked disabled aria-disabled="true" className="h-4 w-4 accent-[var(--gold)]" />
                </label>
                <label className="flex items-center justify-between gap-2 cursor-pointer">
                  <span className="text-sm font-medium">{t('analytics')}</span>
                  <input
                    type="checkbox"
                    checked={pending.analytics}
                    onChange={(e) => setPending((p) => ({ ...p, analytics: e.target.checked }))}
                    className="h-4 w-4 accent-[var(--gold)]"
                  />
                </label>
                <label className="flex items-center justify-between gap-2 cursor-pointer">
                  <span className="text-sm font-medium">{t('marketing')}</span>
                  <input
                    type="checkbox"
                    checked={pending.marketing}
                    onChange={(e) => setPending((p) => ({ ...p, marketing: e.target.checked }))}
                    className="h-4 w-4 accent-[var(--gold)]"
                  />
                </label>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {managing ? (
                <button
                  onClick={saveManaged}
                  className="rounded-md bg-[var(--text-primary)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80"
                >
                  {t('accept')}
                </button>
              ) : (
                <>
                  <button
                    onClick={acceptAll}
                    className="rounded-md bg-[var(--text-primary)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80"
                  >
                    {t('accept')}
                  </button>
                  <button
                    onClick={acceptEssentialsOnly}
                    className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background)]"
                  >
                    {t('decline')}
                  </button>
                  <button
                    onClick={() => setManaging(true)}
                    className="rounded-md px-4 py-2 text-sm font-medium text-[var(--text-muted)] underline-offset-2 hover:underline"
                  >
                    {t('manage')}
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
