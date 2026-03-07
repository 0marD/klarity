import { TestimonialForm } from '../TestimonialForm'

export const dynamic = 'force-dynamic'

export default function NuevoTestimonioPage() {
  return (
    <div className="pt-14 md:pt-0 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-[var(--text)] mb-8">
        Nuevo Testimonio
      </h1>
      <TestimonialForm />
    </div>
  )
}
