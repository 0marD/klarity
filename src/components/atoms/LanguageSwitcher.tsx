'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type LanguageSwitcherProps = {
  className?: string
}

const FLAGS = {
  es: '🇲🇽',
  en: '🇺🇸',
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('language')

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return

    // Save preference in cookie
    document.cookie = `klarity_locale=${newLocale}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`

    // Navigate to new locale path
    const segments = pathname.split('/')
    if (segments[1] === 'en' || segments[1] === 'es') {
      segments[1] = newLocale === 'es' ? '' : newLocale
    } else {
      if (newLocale !== 'es') {
        segments.splice(1, 0, newLocale)
      }
    }

    const newPath = segments.join('/').replace(/\/+/g, '/') || '/'
    router.push(newPath)
  }

  const nextLocale = locale === 'es' ? 'en' : 'es'

  return (
    <button
      onClick={() => switchLocale(nextLocale)}
      className={cn(
        'flex items-center gap-1.5 h-9 px-2 rounded-md text-sm font-medium',
        'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--text)]/5',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]',
        className
      )}
      aria-label={t('toggle')}
    >
      <span aria-hidden>{FLAGS[nextLocale as keyof typeof FLAGS]}</span>
      <span className="uppercase text-xs tracking-wider font-semibold">
        {nextLocale}
      </span>
    </button>
  )
}
