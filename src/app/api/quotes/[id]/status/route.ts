import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const statusSchema = z.object({
  status: z.enum(['new', 'reviewing', 'proposal_sent', 'closed_won', 'closed_lost']),
})

type RouteParams = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  let body: unknown
  try {
    const formData = await request.formData()
    body = { status: formData.get('status') }
  } catch {
    return NextResponse.json({ error: 'Request inválido' }, { status: 400 })
  }

  const parsed = statusSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const { error } = await supabase
    .from('quotes')
    .update({ status: parsed.data.status, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'Error al actualizar el estado' }, { status: 500 })
  }

  return NextResponse.redirect(new URL(`/admin/cotizaciones/${id}`, request.url))
}
