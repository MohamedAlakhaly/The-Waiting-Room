"use client"

import { useRouter } from "next/navigation"

const LANGUAGES = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' as const },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' as const },
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' as const },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷', dir: 'rtl' as const },
  { code: 'ti', name: 'Tigrinya', flag: '🇹🇬', dir: 'ltr' as const },
]

function setLanguageCookie(code: string) {
  document.cookie = `language=${code};path=/;max-age=31536000;SameSite=Lax`
}

export default function LanguagePage() {
  const router = useRouter()

  const handleSelect = (lang: typeof LANGUAGES[number]) => {
    localStorage.setItem('language', lang.code)
    setLanguageCookie(lang.code)
    document.documentElement.setAttribute('dir', lang.dir)
    document.documentElement.setAttribute('lang', lang.code)
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#202020] border border-[#2A2A2A]">
          <span className="text-3xl">🕊️</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#C9F14E] tracking-tight">
          The Waiting Room
        </h1>
        <p className="mt-3 text-sm text-[#D1D5DB] leading-relaxed max-w-xs mx-auto">
          Choose your language<br />
          Choisissez votre langue<br />
          <span dir="rtl" className="inline-block">اختر لغتك</span>
        </p>
      </div>

      {/* Language Cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs sm:max-w-sm">
        {LANGUAGES.map((lang, i) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang)}
            className={[
              "group flex items-center gap-3 rounded-2xl border border-[#2A2A2A] bg-[#202020]",
              "px-5 py-4 transition-all duration-200",
              "hover:border-[#C9F14E] hover:shadow-[0_0_20px_rgba(201,241,78,0.12)]",
              "active:scale-95",
              i === LANGUAGES.length - 1 && LANGUAGES.length % 2 !== 0
                ? "col-span-2 justify-center"
                : "",
            ].join(" ")}
          >
            <span className="text-3xl shrink-0">{lang.flag}</span>
            <span
              className="text-lg font-semibold text-[#F5F4F4] group-hover:text-[#C9F14E] transition-colors leading-tight"
              dir={lang.dir}
            >
              {lang.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
