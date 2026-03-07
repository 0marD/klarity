import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { WhatsAppButton } from '@/components/atoms/WhatsAppButton'
import { CookieBanner } from '@/components/organisms/CookieBanner'
import { PWAInstallPrompt } from '@/components/organisms/PWAInstallPrompt'
import { getFeatureFlags } from '@/lib/feature-flags'

type PageLayoutProps = {
  children: React.ReactNode
}

export async function PageLayout({ children }: PageLayoutProps) {
  const flags = await getFeatureFlags()

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      {flags.whatsapp_button && <WhatsAppButton />}
      <CookieBanner />
      <PWAInstallPrompt />
    </div>
  )
}
