'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export type Locale = 'en' | 'ar' | 'fr'

export const LANGUAGES = [
  { code: 'ar' as Locale, label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'fr' as Locale, label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'en' as Locale, label: 'English', flag: '🇬🇧', dir: 'ltr' },
]

export function useLanguage() {
  const router = useRouter()

  const getLanguage = (): Locale => {
    if (typeof window === 'undefined') return 'en'
    return (localStorage.getItem('language') as Locale) || 'en'
  }

  const setLanguage = useCallback(
    (locale: Locale) => {
      localStorage.setItem('language', locale)
      // Set cookie for middleware
      document.cookie = `language=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`
      // Set dir on html
      const rtl = ['ar', 'fa'].includes(locale)
      document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr')
      document.documentElement.setAttribute('lang', locale)
      router.push('/login')
    },
    [router]
  )

  return { getLanguage, setLanguage }
}
