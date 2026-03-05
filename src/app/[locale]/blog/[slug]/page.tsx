export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { ArrowLeft } from 'lucide-react'
import { PageLayout } from '@/components/templates/PageLayout'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const t = await getTranslations('blog')
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''

  // Blog content not yet implemented — 404 all slugs until MDX is wired up
  if (slug) notFound()

  return (
    <PageLayout>
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`${prefix}/blog`}
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Blog
          </Link>
          <p className="text-[var(--text-muted)]">{t('notFound')}</p>
        </div>
      </div>
    </PageLayout>
  )
}
