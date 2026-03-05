'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Briefcase,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import { Logo } from '@/components/atoms/Logo'
import { ThemeToggle } from '@/components/atoms/ThemeToggle'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/cotizaciones', label: 'Cotizaciones', icon: MessageSquare },
  { href: '/admin/proyectos', label: 'Proyectos', icon: FolderKanban },
  { href: '/admin/servicios', label: 'Servicios', icon: Briefcase },
  { href: '/admin/settings', label: 'Configuración', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
        <Logo />
        <ThemeToggle />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 flex flex-col gap-1" aria-label="Admin navigation">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]',
              pathname === href
                ? 'bg-[var(--gold)]/10 text-[var(--gold-text)] font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--text)]/5'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[var(--border)]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-[var(--surface)] border-r border-[var(--border)] z-30">
        {sidebarContent}
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between px-4 h-14">
        <Logo />
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="h-9 w-9 flex items-center justify-center rounded-md text-[var(--text)] hover:bg-[var(--text)]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          'md:hidden fixed left-0 top-14 bottom-0 w-64 bg-[var(--surface)] border-r border-[var(--border)] z-40 transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
