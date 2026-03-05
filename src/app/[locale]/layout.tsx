import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: {
      default: t('title'),
      template: `%s | Klarity`,
    },
    description: t('description'),
    openGraph: {
      type: 'website' as const,
      locale: locale === 'en' ? 'en_US' : 'es_MX',
      siteName: 'Klarity',
    },
    alternates: {
      canonical: locale === 'es' ? 'https://klarity.dev' : `https://klarity.dev/${locale}`,
      languages: {
        es: 'https://klarity.dev',
        en: 'https://klarity.dev/en',
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  )
}
