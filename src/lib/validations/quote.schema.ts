import { z } from 'zod'

export const quoteSchema = z.object({
  clientName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  clientEmail: z.string().email('Correo electrónico inválido'),
  clientCompany: z.string().optional(),
  clientPhone: z.string().optional(),
  projectType: z.enum(['webapp', 'mobile', 'ecommerce', 'automation', 'api', 'other']),
  modules: z.array(z.string()).min(1, 'Selecciona al menos un módulo'),
  deadline: z.string().optional(),
  budgetRange: z.string().optional(),
  description: z.string().min(20, 'Describe tu proyecto en al menos 20 caracteres').optional(),
  locale: z.enum(['es', 'en']).optional().default('es'),
})

export type QuoteSchema = z.infer<typeof quoteSchema>
export type QuoteFormInput = z.input<typeof quoteSchema>
