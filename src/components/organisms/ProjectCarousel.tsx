'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { Button } from '@/components/atoms/Button'
import { staggerContainerVariants, fadeUpVariants } from '@/lib/animations'
import type { DbProject } from '@/types'

type ProjectCarouselProps = {
  projects: DbProject[]
  locale: string
}

export function ProjectCarousel({ projects, locale }: ProjectCarouselProps) {
  const t = useTranslations('home.projects')
  const prefix = locale === 'en' ? '/en' : ''
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth',
    })
  }

  if (projects.length === 0) {
    return (
      <section className="py-20 px-4" aria-labelledby="projects-heading">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            id="projects-heading"
            title={t('title')}
            subtitle={t('subtitle')}
            align="center"
          />
          <p className="text-center text-[var(--text-muted)] mt-8">{t('empty')}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeUpVariants} className="flex items-end justify-between mb-8">
            <SectionHeader
              id="projects-heading"
              title={t('title')}
              subtitle={t('subtitle')}
              className="mb-0"
            />
            <div className="hidden sm:flex items-center gap-2 ml-4 shrink-0">
              <button
                onClick={() => scroll('left')}
                aria-label="Anterior"
                className="h-9 w-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Siguiente"
                className="h-9 w-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              role="list"
              aria-label="Proyectos destacados"
            >
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className="shrink-0 w-[280px] sm:w-[300px] snap-start"
                  role="listitem"
                >
                  <ProjectCard project={project} locale={locale} floating={i % 2 === 0} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="mt-8 flex justify-center">
            <Button variant="outline" asChild>
              <Link href={`${prefix}/portafolio`}>{t('cta')}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
