import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/templates/AdminLayout'

export const dynamic = 'force-dynamic'

type AdminLayoutProps = {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      <AdminSidebar />
      <main className="flex-1 ml-0 md:ml-64 p-6" id="admin-content">
        {children}
      </main>
    </div>
  )
}
