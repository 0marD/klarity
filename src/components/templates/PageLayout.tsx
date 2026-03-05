import { Suspense } from 'react'
import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { WhatsAppButton } from '@/components/atoms/WhatsAppButton'
import { CookieBanner } from '@/components/organisms/CookieBanner'

type PageLayoutProps = {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
        {children}
      </main>
      <Suspense fallback={<div className="h-48 bg-[var(--surface)] border-t border-[var(--border)]" />}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
      <CookieBanner />
    </div>
  )
}
