export const dynamic = 'force-dynamic'

import { getTranslations } from 'next-intl/server'
import { PageLayout } from '@/components/templates/PageLayout'
import { SectionHeader } from '@/components/molecules/SectionHeader'

export default async function BlogPage() {
  const t = await getTranslations('blog')

  return (
    <PageLayout>
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t('title')}
            subtitle={t('subtitle')}
            align="center"
          />
          <div className="text-center py-16 text-[var(--text-muted)]">
            <p className="text-lg">{t('comingSoon')}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
