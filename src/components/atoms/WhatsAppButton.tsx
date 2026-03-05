'use client'

import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type WhatsAppButtonProps = {
  number?: string
  message?: string
  className?: string
}

export function WhatsAppButton({
  number,
  message = 'Hola, me gustaría obtener información sobre sus servicios.',
  className,
}: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false)
  const phoneNumber = number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5210000000000'

  useEffect(() => {
    // Mobile: always visible after mount
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      setVisible(true)
      return
    }

    // Desktop: visible after 30 seconds or 50% scroll
    const timer = setTimeout(() => setVisible(true), 30000)

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent >= 50) {
        setVisible(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex h-14 w-14 items-center justify-center',
        'rounded-full bg-[#25D366] text-white shadow-lg',
        'hover:bg-[#20BD5C] hover:scale-110',
        'transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none',
        className
      )}
    >
      <MessageCircle className="h-6 w-6 fill-current" aria-hidden />
    </a>
  )
}
