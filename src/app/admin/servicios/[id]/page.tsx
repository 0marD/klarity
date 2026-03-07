import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ServiceForm } from '../ServiceForm'
import type { DbService } from '@/types'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditServicioPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: service } = await supabase.from('services').select('*').eq('id', id).single()

  if (!service) notFound()

  return (
    <div className="pt-14 md:pt-0 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-[var(--text)] mb-8">Editar Servicio</h1>
      <ServiceForm service={service as DbService} />
    </div>
  )
}
