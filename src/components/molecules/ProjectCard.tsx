'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/atoms/Badge'
import { floatAnimation } from '@/lib/animations'
import { localizeProject } from '@/lib/db/localize'
import type { DbProject } from '@/types'

type ProjectCardProps = {
  project: DbProject
  locale: string
  floating?: boolean
}

export function ProjectCard({ project, locale, floating = false }: ProjectCardProps) {
  const { title, description } = localizeProject(project, locale)
  const prefix = locale === 'en' ? '/en' : ''

  const cardContent = (
    <div className="group relative bg-[var(--surface)] rounded-xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-300">
      {/* Cover image */}
      <div className="relative h-48 bg-gradient-to-br from-[var(--gold)]/10 to-[var(--color-info)]/10 overflow-hidden">
        {project.cover_url && !project.cover_url.includes('placeholder') ? (
          <Image
            src={project.cover_url}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl font-bold text-[var(--gold)]/40">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold text-[var(--text)] line-clamp-2 leading-tight">
            {title}
          </h3>
          <ArrowUpRight
            className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors shrink-0 mt-0.5"
            aria-hidden
          />
        </div>

        <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[var(--border)] flex gap-4">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-xs text-[var(--text-muted)] mb-1">{m.label}</p>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="line-through text-[var(--text-muted)]">{m.before}</span>
                  <span className="text-[var(--color-success)] font-semibold">{m.after}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const wrapper = floating ? (
    <motion.div animate={floatAnimation}>{cardContent}</motion.div>
  ) : (
    cardContent
  )

  return (
    <Link
      href={`${prefix}/portafolio/${project.slug}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-xl"
      aria-label={`Ver proyecto: ${title}`}
    >
      {wrapper}
    </Link>
  )
}
