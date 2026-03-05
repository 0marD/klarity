import type { MetadataRoute } from 'next'
import { projects } from '@/content/projects'

const BASE_URL = 'https://klarity.dev'

const staticRoutes = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/portafolio', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/servicios', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/cotizacion', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/nosotros', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/contacto', priority: 0.7, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const route of staticRoutes) {
    entries.push({
      url: `${BASE_URL}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          es: `${BASE_URL}${route.path}`,
          en: `${BASE_URL}/en${route.path}`,
        },
      },
    })
  }

  for (const project of projects) {
    entries.push({
      url: `${BASE_URL}/portafolio/${project.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${BASE_URL}/portafolio/${project.slug}`,
          en: `${BASE_URL}/en/portafolio/${project.slug}`,
        },
      },
    })
  }

  return entries
}
