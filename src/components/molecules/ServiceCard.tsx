import Link from 'next/link'
import {
  Monitor,
  Smartphone,
  Zap,
  ShoppingCart,
  GitMerge,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import { localizeService } from '@/lib/db/localize'
import type { DbService } from '@/types'

const ICONS: Record<string, LucideIcon> = {
  Monitor,
  Smartphone,
  Zap,
  ShoppingCart,
  GitMerge,
  Lightbulb,
}

type ServiceCardProps = {
  service: DbService
  locale: string
  showPrice?: boolean
  href?: string
}

export function ServiceCard({ service, locale, showPrice = false, href }: ServiceCardProps) {
  const { title, description, features } = localizeService(service, locale)
  const Icon = ICONS[service.icon ?? 'Monitor'] ?? Monitor

  const content = (
    <div
      className={cn(
        'group relative flex h-full flex-col bg-[var(--surface)] rounded-xl p-6',
        'border border-[var(--border)]',
        'hover:border-[var(--gold)]/50 hover:shadow-md',
        'transition-all duration-300',
        href && 'cursor-pointer'
      )}
    >
      {/* Icon */}
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--gold)]/10 text-[var(--gold-text)]">
        <Icon className="h-6 w-6" aria-hidden />
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-semibold text-[var(--text)] mb-2">{title}</h3>
      <p className="flex-1 text-sm text-[var(--text-muted)] leading-relaxed mb-4">{description}</p>

      {/* Price */}
      {showPrice && service.base_price && (
        <p className="text-sm font-medium text-[var(--gold-text)] mb-4">
          Desde {formatPrice(service.base_price, locale)}
        </p>
      )}

      {/* Features */}
      {features.length > 0 && (
        <ul className="space-y-1.5" role="list">
          {features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span className="h-1 w-1 rounded-full bg-[var(--gold)] shrink-0" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Arrow */}
      {href && (
        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[var(--gold-text)] group-hover:gap-2.5 transition-all">
          Ver más
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-xl"
        aria-label={`Servicio: ${title}`}
      >
        {content}
      </Link>
    )
  }

  return content
}
