"use client"

import { useEffect } from "react"

export function RTLProvider() {
  useEffect(() => {
    const lang = localStorage.getItem('language') || 'en'
    const rtlLangs = ['ar', 'fa']
    document.documentElement.setAttribute('dir', rtlLangs.includes(lang) ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang)
  }, [])

  return null
}
