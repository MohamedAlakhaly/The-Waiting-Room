import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = cookieStore.get('language')?.value || 'en'

  const validLocales = ['en', 'ar', 'fr']
  const safeLocale = validLocales.includes(locale) ? locale : 'en'

  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default,
  }
})