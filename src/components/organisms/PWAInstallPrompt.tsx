'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Persists across client-side navigations within the same page load
let cachedPrompt: BeforeInstallPromptEvent | null = null

const STORAGE_KEY = 'klarity_pwa_install'

type ModalState = 'idle' | 'modal' | 'icon' | 'hidden'

export function PWAInstallPrompt() {
  const t = useTranslations('pwa')
  const [state, setState] = useState<ModalState>('idle')
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(cachedPrompt)

  useEffect(() => {
    // Already installed or running as standalone
    if (
      localStorage.getItem(STORAGE_KEY) === 'installed' ||
      window.matchMedia('(display-mode: standalone)').matches
    ) {
      setState('hidden')
      return
    }

    function resolveInitialState(p: BeforeInstallPromptEvent) {
      const persisted = localStorage.getItem(STORAGE_KEY)
      const session = sessionStorage.getItem(STORAGE_KEY)

      if (persisted === 'never' || session === 'later') {
        setState('icon')
      } else {
        setTimeout(() => setState('modal'), 3500)
      }

      cachedPrompt = p
      setPrompt(p)
    }

    // If the event already fired before this component mounted
    if (cachedPrompt) {
      resolveInitialState(cachedPrompt)
      return
    }

    function handler(e: Event) {
      e.preventDefault()
      resolveInitialState(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function install() {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') {
      localStorage.setItem(STORAGE_KEY, 'installed')
      setState('hidden')
    } else {
      setState('icon')
    }
    cachedPrompt = null
    setPrompt(null)
  }

  function later() {
    sessionStorage.setItem(STORAGE_KEY, 'later')
    setState('icon')
  }

  function never() {
    localStorage.setItem(STORAGE_KEY, 'never')
    setState('icon')
  }

  if (state === 'hidden' || state === 'idle') return null

  return (
    <>
      {/* Install modal */}
      <AnimatePresence>
        {state === 'modal' && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 48, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--text-primary)]">
                  <span className="font-display text-lg font-bold text-[var(--background)]">Kl</span>
                </div>
                <div>
                  <h2 id="pwa-title" className="font-display text-lg font-bold text-[var(--text)]">
                    {t('title')}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">{t('subtitle')}</p>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-[var(--text-muted)]">
                {t('description')}
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={install}
                  className="w-full rounded-lg bg-[var(--text-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--background)] transition-opacity hover:opacity-80"
                >
                  {t('install')}
                </button>
                <button
                  onClick={later}
                  className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--background)]"
                >
                  {t('later')}
                </button>
                <button
                  onClick={never}
                  className="w-full rounded-lg px-4 py-2.5 text-sm text-[var(--text-muted)] underline-offset-2 hover:underline"
                >
                  {t('never')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discrete install icon — shown after dismissal */}
      <AnimatePresence>
        {state === 'icon' && prompt && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={install}
            aria-label={t('iconLabel')}
            title={t('iconLabel')}
            className="fixed bottom-6 left-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]/50 bg-[var(--surface)]/60 text-[var(--text-muted)] shadow-sm backdrop-blur-sm transition-colors hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          >
            <Download className="h-4 w-4" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
