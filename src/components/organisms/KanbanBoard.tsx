'use client'

import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { createClient } from '@/lib/supabase/client'
import type { DbQuote, QuoteStatus } from '@/types'
import { Badge } from '@/components/atoms/Badge'

const COLUMNS: { id: QuoteStatus; label: string }[] = [
  { id: 'new', label: 'Nuevo' },
  { id: 'reviewing', label: 'En revisión' },
  { id: 'proposal_sent', label: 'Propuesta enviada' },
  { id: 'closed_won', label: 'Ganado' },
  { id: 'closed_lost', label: 'Perdido' },
]

type KanbanBoardProps = {
  quotes: DbQuote[]
}

function QuoteCard({ quote }: { quote: DbQuote }) {
  return (
    <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 shadow-sm cursor-grab active:cursor-grabbing hover:border-[var(--gold)]/30 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-medium text-[var(--text)] text-sm line-clamp-1">
          {quote.client_name}
        </p>
        <Badge variant="outline" className="shrink-0 text-[10px]">
          {quote.locale.toUpperCase()}
        </Badge>
      </div>
      <p className="text-xs text-[var(--text-muted)] mb-2">{quote.project_type}</p>
      <p className="text-[10px] text-[var(--text-muted)]">
        {new Date(quote.created_at).toLocaleDateString('es-MX')}
      </p>
    </div>
  )
}

export function KanbanBoard({ quotes: initialQuotes }: KanbanBoardProps) {
  const [quotes, setQuotes] = useState(initialQuotes)
  const [activeQuote, setActiveQuote] = useState<DbQuote | null>(null)
  const supabase = createClient()

  const handleDragStart = (event: DragStartEvent) => {
    const quote = quotes.find((q) => q.id === event.active.id)
    setActiveQuote(quote ?? null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveQuote(null)

    if (!over || active.id === over.id) return

    // Check if dropped on a column
    const targetColumn = COLUMNS.find((c) => c.id === over.id)
    if (!targetColumn) return

    const quoteId = String(active.id)
    const newStatus = targetColumn.id

    // Optimistic update
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q))
    )

    // Persist
    await supabase.from('quotes').update({ status: newStatus }).eq('id', quoteId)
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4" role="list" aria-label="Tablero Kanban">
        {COLUMNS.map((col) => {
          const colQuotes = quotes.filter((q) => q.status === col.id)
          return (
            <div
              key={col.id}
              className="shrink-0 w-64 bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden"
              role="listitem"
            >
              <div className="p-3 border-b border-[var(--border)] flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--text)]">{col.label}</h3>
                <span className="h-5 w-5 rounded-full bg-[var(--gold)]/20 text-[var(--gold-text)] text-xs flex items-center justify-center font-bold">
                  {colQuotes.length}
                </span>
              </div>

              <SortableContext
                id={col.id}
                items={colQuotes.map((q) => q.id)}
                strategy={verticalListSortingStrategy}
              >
                <div
                  className="p-3 flex flex-col gap-2 min-h-32"
                  aria-label={`Columna: ${col.label}`}
                  data-column-id={col.id}
                  id={col.id}
                >
                  {colQuotes.map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} />
                  ))}
                </div>
              </SortableContext>
            </div>
          )
        })}
      </div>

      <DragOverlay>
        {activeQuote && <QuoteCard quote={activeQuote} />}
      </DragOverlay>
    </DndContext>
  )
}
