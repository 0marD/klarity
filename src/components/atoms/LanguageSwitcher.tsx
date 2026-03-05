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

    const cookieOptions = 'max-age=31536000; path=/; SameSite=Lax'
    document.cookie = `klarity_locale=${newLocale}; ${cookieOptions}`
    document.cookie = `NEXT_LOCALE=${newLocale}; ${cookieOptions}`

    // All locales use a prefix (/es/... and /en/...)
    const parts = pathname.split('/').filter(Boolean)
    if (parts[0] === 'es' || parts[0] === 'en') {
      parts[0] = newLocale
    } else {
      parts.unshift(newLocale)
    }

    router.push('/' + parts.join('/'))
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
