export const dynamic = 'force-dynamic'

import { getLocale } from 'next-intl/server'
import { PageLayout } from '@/components/templates/PageLayout'
import { HeroSection } from '@/components/organisms/HeroSection'
import { ProjectCarousel } from '@/components/organisms/ProjectCarousel'
import { ServicesSection } from '@/components/organisms/ServicesSection'
import { TestimonialsSection } from '@/components/organisms/TestimonialsSection'
import { ValueProposition } from '@/components/organisms/ValueProposition'
import { ProcessTimeline } from '@/components/organisms/ProcessTimeline'
import { CTAFinal } from '@/components/organisms/CTAFinal'
import { fetchFeaturedProjects } from '@/lib/db/projects'
import { fetchFeaturedServices } from '@/lib/db/services'
import { fetchTestimonials } from '@/lib/db/testimonials'

export default async function HomePage() {
  const locale = await getLocale()

  const [featuredProjects, featuredServices, testimonials] = await Promise.all([
    fetchFeaturedProjects(),
    fetchFeaturedServices(),
    fetchTestimonials(),
  ])

  return (
    <PageLayout>
      <HeroSection />
      <ProjectCarousel projects={featuredProjects} locale={locale} />
      <ServicesSection services={featuredServices} locale={locale} />
      <TestimonialsSection testimonials={testimonials} locale={locale} />
      <ValueProposition />
      <ProcessTimeline />
      <CTAFinal />
    </PageLayout>
  )
}
