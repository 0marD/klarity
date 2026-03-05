import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: '1',
    slug: 'aplicaciones-web',
    title: 'Aplicaciones Web',
    description:
      'Desarrollamos aplicaciones web a medida: desde dashboards internos hasta plataformas SaaS completas.',
    icon: 'Monitor',
    basePrice: 25000,
    features: [
      'Diseño UI/UX personalizado',
      'Arquitectura escalable',
      'Integración con APIs externas',
      'Panel de administración',
      'Despliegue en la nube',
    ],
  },
  {
    id: '2',
    slug: 'apps-moviles',
    title: 'Apps Móviles',
    description:
      'Aplicaciones iOS y Android con React Native: una sola base de código, experiencia nativa.',
    icon: 'Smartphone',
    basePrice: 35000,
    features: [
      'iOS y Android nativo',
      'Notificaciones push',
      'Funcionalidad offline',
      'Integración con hardware',
      'Publicación en tiendas',
    ],
  },
  {
    id: '3',
    slug: 'automatizacion',
    title: 'Automatización de Procesos',
    description:
      'Eliminamos tareas manuales y repetitivas. Integramos tus sistemas y automatizamos flujos de trabajo.',
    icon: 'Zap',
    basePrice: 15000,
    features: [
      'Análisis de procesos actuales',
      'Integración de sistemas existentes',
      'Flujos automatizados',
      'Reportes automáticos',
      'Alertas y notificaciones',
    ],
  },
  {
    id: '4',
    slug: 'ecommerce',
    title: 'E-commerce',
    description:
      'Tiendas en línea B2C y B2B con gestión de inventario, pagos integrados y experiencia de compra optimizada.',
    icon: 'ShoppingCart',
    basePrice: 30000,
    features: [
      'Catálogo de productos',
      'Carrito y checkout',
      'Pagos con Stripe / Conekta',
      'Gestión de inventario',
      'Panel de ventas',
    ],
  },
  {
    id: '5',
    slug: 'apis-integraciones',
    title: 'APIs e Integraciones',
    description: 'Conectamos tus sistemas entre sí y con terceros: ERP, CRM, SAT, bancos, y más.',
    icon: 'GitMerge',
    basePrice: 12000,
    features: [
      'APIs RESTful o GraphQL',
      'Integraciones con servicios externos',
      'Documentación técnica',
      'Autenticación y seguridad',
      'Rate limiting y monitoreo',
    ],
  },
  {
    id: '6',
    slug: 'consultoria',
    title: 'Consultoría Tecnológica',
    description:
      'Auditamos tu stack actual, identificamos cuellos de botella y trazamos la hoja de ruta tecnológica de tu empresa.',
    icon: 'Lightbulb',
    basePrice: 8000,
    features: [
      'Auditoría de sistemas',
      'Evaluación de deuda técnica',
      'Hoja de ruta tecnológica',
      'Selección de stack',
      'Informe ejecutivo',
    ],
  },
]

export const getFeaturedServices = () => services.slice(0, 3)
export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug)
