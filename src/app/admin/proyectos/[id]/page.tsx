import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProjectForm } from '../ProjectForm'
import type { DbProject } from '@/types'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: project } = await supabase.from('projects').select('*').eq('id', id).single()

  if (!project) notFound()

  return (
    <div className="pt-14 md:pt-0 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-[var(--text)] mb-8">
        Editar Proyecto
      </h1>
      <ProjectForm project={project as DbProject} />
    </div>
  )
}
