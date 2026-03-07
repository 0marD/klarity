export const dynamic = 'force-dynamic'

import { getLocale } from 'next-intl/server'
import { PageLayout } from '@/components/templates/PageLayout'
import { Logo } from '@/components/atoms/Logo'
import { fetchAllServices } from '@/lib/db/services'
import { ServicesGrid } from './ServicesGrid'

export default async function ServicesPage() {
  const locale = await getLocale()
  const services = await fetchAllServices()

  return (
    <PageLayout>
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <ServicesGrid services={services} locale={locale} />
        </div>
      </div>
    </PageLayout>
  )
}
