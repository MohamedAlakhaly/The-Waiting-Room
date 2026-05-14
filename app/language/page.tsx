'use client'

import { LANGUAGES, useLanguage } from '@/hooks/use-language'
import type { Locale } from '@/hooks/use-language'

export default function LanguagePage() {
  const { setLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#C9F14E] sm:text-4xl">
          The Waiting Room
        </h1>
        <p className="mt-3 text-sm text-[#D1D5DB] leading-relaxed">
          Choose your language / Choisissez votre langue / اختر لغتك
        </p>
      </div>

      {/* Language cards */}
      <div className="w-full max-w-sm space-y-3">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as Locale)}
            className="w-full flex items-center gap-4 rounded-2xl border border-[#202020] bg-[#202020] px-6 py-5 text-left transition-all duration-200 hover:border-[#C9F14E] hover:shadow-[0_0_20px_rgba(201,241,78,0.15)] active:scale-[0.98]"
          >
            <span className="text-3xl">{lang.flag}</span>
            <div>
              <p className="text-lg font-semibold text-[#F5F4F4]">{lang.label}</p>
            </div>
            <span className="ml-auto text-[#C9F14E] text-xl">→</span>
          </button>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-10 text-center text-xs text-[#D1D5DB]/50 max-w-xs">
        You can change the language at any time from the menu
      </p>
    </div>
  )
}