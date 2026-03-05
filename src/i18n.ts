import { getRequestConfig } from 'next-intl/server'
import messagesEs from './messages/es.json'
import messagesEn from './messages/en.json'

export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'es'

const messageMap = { es: messagesEs, en: messagesEn }

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? defaultLocale
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale

  return {
    locale: validLocale,
    messages: messageMap[validLocale],
  }
})
