'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Logo } from '@/components/atoms/Logo'

export function Footer() {
  const t = useTranslations('footer')
  const navT = useTranslations('nav')
  const locale = useLocale()
  const prefix = locale === 'en' ? '/en' : ''

  const currentYear = new Date().getFullYear()

  const links = [
    { href: `${prefix}/portafolio`, label: navT('portfolio') },
    { href: `${prefix}/servicios`, label: navT('services') },
    { href: `${prefix}/nosotros`, label: navT('about') },
    { href: `${prefix}/blog`, label: navT('blog') },
    { href: `${prefix}/cotizacion`, label: navT('quote') },
    { href: `${prefix}/contacto`, label: navT('contact') },
  ]

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Logo size="lg" />
            <p className="text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text)] mb-4 uppercase tracking-wider">
              {t('links.title')}
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text)] mb-4 uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-[var(--text-muted)]" role="list">
              <li>
                <a
                  href="mailto:hola@klarity.dev"
                  className="hover:text-[var(--text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
                >
                  hola@klarity.dev
                </a>
              </li>
              <li>México</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>
            © {currentYear} Klarity. {t('rights')}
          </p>
          <nav aria-label="Legal" className="flex items-center gap-4">
            <Link href={`${prefix}/privacidad`} className="hover:text-[var(--text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm">
              {t('legal.privacy')}
            </Link>
            <Link href={`${prefix}/cookies`} className="hover:text-[var(--text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm">
              {t('legal.cookies')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
