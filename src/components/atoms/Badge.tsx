import { cn } from '@/lib/utils'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'gold' | 'success' | 'warning' | 'error' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-[var(--text)]/10 text-[var(--text)]': variant === 'default',
          'bg-[var(--gold)]/20 text-[var(--gold-text)]': variant === 'gold',
          'bg-[var(--color-success)]/20 text-[var(--color-success)]': variant === 'success',
          'bg-[var(--color-warning)]/20 text-[var(--color-warning)]': variant === 'warning',
          'bg-[var(--color-error)]/20 text-[var(--color-error)]': variant === 'error',
          'border border-[var(--border)] text-[var(--text-muted)]': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
