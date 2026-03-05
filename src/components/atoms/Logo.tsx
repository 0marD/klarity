import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
}

export function Logo({ className, href = '/', size = 'md' }: LogoProps) {
  const content = (
    <span
      className={cn(
        'font-display font-bold tracking-tight text-[var(--text)] transition-colors',
        sizeMap[size],
        className
      )}
      aria-label="Klarity"
    >
      Kl
      <span className="text-[var(--gold)]">.</span>
    </span>
  )

  if (href) {
    return (
      <Link href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm">
        {content}
      </Link>
    )
  }

  return content
}
