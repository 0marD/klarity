/**
 * Pure localization helpers — safe to import in both Server and Client Components.
 * No Supabase / next/headers imports here.
 */
import type { DbProject, DbService, DbTestimonial } from '@/types'

export function localizeProject(project: DbProject, locale: string) {
  return {
    ...project,
    title:
      (locale === 'en' && project.title_en ? project.title_en : project.title_es) ?? '',
    description:
      (locale === 'en' && project.description_en
        ? project.description_en
        : project.description_es) ?? '',
  }
}

export function localizeService(service: DbService, locale: string) {
  return {
    ...service,
    title:
      (locale === 'en' && service.title_en ? service.title_en : service.title_es) ?? '',
    description:
      (locale === 'en' && service.description_en
        ? service.description_en
        : service.description_es) ?? '',
    features:
      (locale === 'en' && service.features_en?.length
        ? service.features_en
        : service.features_es) ?? [],
  }
}

export function localizeTestimonial(testimonial: DbTestimonial, locale: string) {
  return {
    ...testimonial,
    content:
      (locale === 'en' && testimonial.content_en
        ? testimonial.content_en
        : testimonial.content_es) ?? '',
  }
}
