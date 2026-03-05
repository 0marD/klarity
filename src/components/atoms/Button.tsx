import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--text)] text-[var(--bg)] hover:bg-[var(--text-muted)] shadow-sm',
        gold: 'bg-[var(--gold)] text-[var(--bg-dark,#1B2A3E)] hover:bg-[var(--gold-hover)] shadow-sm',
        outline:
          'border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--text)]/5',
        ghost: 'text-[var(--text)] hover:bg-[var(--text)]/5',
        link: 'text-[var(--gold-text)] underline-offset-4 hover:underline p-0 h-auto',
        destructive: 'bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-5 py-2',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
