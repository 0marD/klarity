export const dynamic = 'force-dynamic'

import { getLocale } from 'next-intl/server'
import { PageLayout } from '@/components/templates/PageLayout'
import { Logo } from '@/components/atoms/Logo'
import { fetchAllProjects } from '@/lib/db/projects'
import { PortfolioGrid } from './PortfolioGrid'

export default async function PortfolioPage() {
  const locale = await getLocale()
  const projects = await fetchAllProjects()

  return (
    <PageLayout>
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <PortfolioGrid projects={projects} locale={locale} />
        </div>
      </div>
    </PageLayout>
  )
}
