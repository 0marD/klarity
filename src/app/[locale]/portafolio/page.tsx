'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { PageLayout } from '@/components/templates/PageLayout'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import { staggerContainerVariants, fadeUpVariants } from '@/lib/animations'
import { projects } from '@/content/projects'

export default function PortfolioPage() {
  const t = useTranslations('portfolio')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))

  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects

  return (
    <PageLayout>
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUpVariants}>
              <SectionHeader
                title={t('title')}
                subtitle={t('subtitle')}
                align="center"
                eyebrow="Klarity."
              />
            </motion.div>

            {/* Filter tags */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap gap-2 justify-center mb-10"
              role="group"
              aria-label="Filtrar por tecnología"
            >
              <button
                onClick={() => setActiveTag(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                  activeTag === null
                    ? 'bg-[var(--gold)] text-[var(--bg-dark,#1B2A3E)]'
                    : 'border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
                aria-pressed={activeTag === null}
              >
                {t('filterAll')}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                    activeTag === tag
                      ? 'bg-[var(--gold)] text-[var(--bg-dark,#1B2A3E)]'
                      : 'border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                  aria-pressed={activeTag === tag}
                >
                  {tag}
                </button>
              ))}
            </motion.div>

            {/* Grid */}
            <motion.div
              variants={staggerContainerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
              aria-label="Proyectos"
            >
              {filtered.map((project) => (
                <motion.div key={project.id} variants={fadeUpVariants} role="listitem">
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
