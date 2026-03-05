export const dynamic = 'force-dynamic'

import { PageLayout } from '@/components/templates/PageLayout'
import { HeroSection } from '@/components/organisms/HeroSection'
import { ProjectCarousel } from '@/components/organisms/ProjectCarousel'
import { ServicesSection } from '@/components/organisms/ServicesSection'
import { ValueProposition } from '@/components/organisms/ValueProposition'
import { ProcessTimeline } from '@/components/organisms/ProcessTimeline'
import { CTAFinal } from '@/components/organisms/CTAFinal'
import { getFeaturedProjects } from '@/content/projects'

export default function HomePage() {
  const featuredProjects = getFeaturedProjects()

  return (
    <PageLayout>
      <HeroSection />
      <ProjectCarousel projects={featuredProjects} />
      <ValueProposition />
      <ServicesSection />
      <ProcessTimeline />
      <CTAFinal />
    </PageLayout>
  )
}
