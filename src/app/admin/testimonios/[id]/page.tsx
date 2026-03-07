import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TestimonialForm } from '../TestimonialForm'
import type { DbTestimonial } from '@/types'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditTestimonioPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: testimonial } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single()

  if (!testimonial) notFound()

  return (
    <div className="pt-14 md:pt-0 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-[var(--text)] mb-8">
        Editar Testimonio
      </h1>
      <TestimonialForm testimonial={testimonial as DbTestimonial} />
    </div>
  )
}
