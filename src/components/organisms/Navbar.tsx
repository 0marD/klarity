'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/atoms/Logo'
import { ThemeToggle } from '@/components/atoms/ThemeToggle'
import { LanguageSwitcher } from '@/components/atoms/LanguageSwitcher'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  const prefix = locale === 'en' ? '/en' : ''

  const links = [
    { href: `${prefix}/portafolio`, label: t('portfolio') },
    { href: `${prefix}/servicios`, label: t('services') },
    { href: `${prefix}/nosotros`, label: t('about') },
    { href: `${prefix}/blog`, label: t('blog') },
    { href: `${prefix}/contacto`, label: t('contact') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-[var(--bg)]/90 backdrop-blur-md shadow-sm border-b border-[var(--border)]'
          : 'bg-transparent'
      )}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Logo />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200',
                  'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--text)]/5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]',
                  pathname === href && 'text-[var(--text)] font-semibold'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button variant="gold" size="sm" asChild>
            <Link href={`${prefix}/cotizacion`}>{t('quote')}</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className={cn(
              'h-9 w-9 flex items-center justify-center rounded-md',
              'text-[var(--text)] hover:bg-[var(--text)]/5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]'
            )}
          >
            {isOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Menú móvil"
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          'bg-[var(--bg)] border-b border-[var(--border)]',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <ul className="px-4 py-4 flex flex-col gap-1" role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'block px-3 py-2.5 rounded-md text-sm font-medium',
                  'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--text)]/5',
                  'transition-colors duration-200',
                  pathname === href && 'text-[var(--text)] font-semibold bg-[var(--text)]/5'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Button variant="gold" size="sm" className="w-full" asChild>
              <Link href={`${prefix}/cotizacion`}>{t('quote')}</Link>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  )
}
