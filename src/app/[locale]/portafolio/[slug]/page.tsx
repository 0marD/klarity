export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PageLayout } from '@/components/templates/PageLayout'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { fetchProjectBySlug, localizeProject } from '@/lib/db/projects'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const project = await fetchProjectBySlug(slug)
  const t = await getTranslations('portfolio')
  const prefix = locale === 'en' ? '/en' : ''

  if (!project) notFound()

  const { title, description } = localizeProject(project, locale)

  return (
    <PageLayout>
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Link
            href={`${prefix}/portafolio`}
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t('backLink')}
          </Link>

          {/* Header */}
          <div className="mb-8">
            {project.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--text)] mb-4">
              {title}
            </h1>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">{description}</p>
          </div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 mb-8">
              <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-4">
                {t('caseStudy.results')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between p-4 rounded-lg bg-[var(--bg)]"
                  >
                    <span className="text-sm text-[var(--text-muted)]">{m.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm line-through text-[var(--text-muted)]">
                        {m.before}
                      </span>
                      <ArrowRight className="h-3 w-3 text-[var(--text-muted)]" aria-hidden />
                      <span className="text-sm font-bold text-[var(--color-success)]">
                        {m.after}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-3">
                {t('caseStudy.technologies')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="gold">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-8 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--text)] mb-3">
              {t('caseStudy.cta')}
            </h2>
            <Button variant="gold" size="lg" asChild>
              <Link href={`${prefix}/cotizacion`}>
                {t('caseStudy.ctaButton')}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
