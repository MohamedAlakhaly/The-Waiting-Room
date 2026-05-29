'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export type Locale = 'en' | 'ar' | 'fr'

export const LANGUAGES = [
  { code: 'ar' as Locale, label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'fr' as Locale, label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'en' as Locale, label: 'English', flag: '🇬🇧', dir: 'ltr' },
]

function saveLocale(locale: Locale) {
  localStorage.setItem('language', locale)
  document.cookie = `language=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
  const rtl = ['ar', 'fa'].includes(locale)
  document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr')
  document.documentElement.setAttribute('lang', locale)
}

export function useLanguage() {
  const router = useRouter()

  const getLanguage = (): Locale => {
    if (typeof window === 'undefined') return 'en'
    return (localStorage.getItem('language') as Locale) || 'en'
  }

  // للصفحة الأولى — ينقل للـ login
  const setLanguage = useCallback((locale: Locale) => {
  localStorage.setItem('language', locale)
  document.cookie = `language=${locale}; path=/; max-age=31536000; SameSite=Lax`
  window.location.href = '/login'
}, [])


const changeLanguage = useCallback((locale: Locale) => {
  localStorage.setItem('language', locale)
  document.cookie = `language=${locale}; path=/; max-age=31536000; SameSite=Lax`
  window.location.reload()
}, [])

  return { getLanguage, setLanguage, changeLanguage }
}