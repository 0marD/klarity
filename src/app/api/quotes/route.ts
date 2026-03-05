import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { quoteSchema } from '@/lib/validations/quote.schema'

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return true
  }

  if (entry.count >= 3) return false

  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta de nuevo en 1 hora.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request inválido' }, { status: 400 })
  }

  const parsed = quoteSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
  }

  const data = parsed.data
  const supabase = await createClient()

  const { error } = await supabase.from('quotes').insert({
    client_name: data.clientName,
    client_email: data.clientEmail,
    client_company: data.clientCompany ?? null,
    client_phone: data.clientPhone ?? null,
    project_type: data.projectType,
    modules: data.modules,
    deadline: data.deadline ?? null,
    budget_range: data.budgetRange ?? null,
    locale: data.locale ?? 'es',
    status: 'new',
    notes: data.description ?? null,
    estimated_price: null,
    crm_lead_id: null,
  })

  if (error) {
    console.error('Quote insert error:', error)
    return NextResponse.json({ error: 'Error al guardar la cotización' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
