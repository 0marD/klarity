import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    slug: 'sistema-gestion-inventarios',
    title: 'Sistema de Gestión de Inventarios',
    description:
      'Plataforma web para control de inventarios en tiempo real con alertas automáticas, reportes y gestión de proveedores.',
    coverUrl: '',
    tags: ['Web App', 'React', 'Node.js', 'PostgreSQL'],
    metrics: [
      { label: 'Tiempo de inventario', before: '2 días', after: '2 horas' },
      { label: 'Errores de stock', before: '15%', after: '0.2%' },
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    isFeatured: true,
  },
  {
    id: '2',
    slug: 'plataforma-facturacion-electronica',
    title: 'Plataforma de Facturación Electrónica',
    description:
      'Sistema integrado con el SAT para emisión masiva de facturas CFDI, con conciliación automática y portal para clientes.',
    coverUrl: '',
    tags: ['Integración', 'API', 'React', 'Python'],
    metrics: [
      { label: 'Tiempo por factura', before: '8 min', after: '30 seg' },
      { label: 'Facturas/mes', before: '200', after: '5,000+' },
    ],
    technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL'],
    isFeatured: true,
  },
  {
    id: '3',
    slug: 'app-delivery-restaurantes',
    title: 'App de Delivery para Cadena de Restaurantes',
    description:
      'Aplicación móvil iOS/Android con seguimiento en tiempo real, pagos integrados y panel de administración para operadores.',
    coverUrl: '',
    tags: ['Mobile', 'React Native', 'Firebase'],
    metrics: [
      { label: 'Tiempo de entrega', before: '65 min', after: '38 min' },
      { label: 'Satisfacción cliente', before: '3.2/5', after: '4.7/5' },
    ],
    technologies: ['React Native', 'Firebase', 'Node.js', 'Stripe'],
    isFeatured: true,
  },
  {
    id: '4',
    slug: 'automatizacion-rrhh',
    title: 'Automatización de RRHH',
    description:
      'Suite de automatización para onboarding, nómina, gestión de vacaciones y evaluaciones de desempeño.',
    coverUrl: '',
    tags: ['Automatización', 'React', 'Python', 'Zapier'],
    metrics: [
      { label: 'Horas admin/semana', before: '40h', after: '6h' },
      { label: 'Tiempo onboarding', before: '5 días', after: '4 horas' },
    ],
    technologies: ['React', 'Python', 'PostgreSQL', 'Zapier'],
    isFeatured: false,
  },
  {
    id: '5',
    slug: 'ecommerce-mayorista',
    title: 'E-commerce B2B Mayorista',
    description:
      'Plataforma de comercio electrónico para ventas mayoristas con precios diferenciados, pedidos mínimos y catálogo dinámico.',
    coverUrl: '',
    tags: ['E-commerce', 'Next.js', 'Stripe', 'PostgreSQL'],
    metrics: [
      { label: 'Conversión', before: '1.2%', after: '4.8%' },
      { label: 'Ventas mensuales', before: '$80k', after: '$340k' },
    ],
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis', 'Vercel'],
    isFeatured: true,
  },
]

export const getFeaturedProjects = () => projects.filter((p) => p.isFeatured)
export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
