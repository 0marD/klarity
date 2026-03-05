import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  id?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  label?: string
  className?: string
}

export function SectionHeader({
  id,
  title,
  subtitle,
  align = 'left',
  label,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {label && (
        <p
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold-text)] mb-3',
            align === 'center' && 'mx-auto'
          )}
        >
          {label}
        </p>
      )}
      <h2 id={id} className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-[var(--text-muted)] text-lg leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
