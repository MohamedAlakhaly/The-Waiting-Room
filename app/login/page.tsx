"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const LANG_MAP: Record<string, { flag: string; name: string }> = {
  ar: { flag: '🇸🇦', name: 'العربية' },
  fr: { flag: '🇫🇷', name: 'Français' },
  en: { flag: '🇬🇧', name: 'English' },
  fa: { flag: '🇮🇷', name: 'فارسی' },
  ti: { flag: '🇹🇬', name: 'Tigrinya' },
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [lang, setLang] = useState(LANG_MAP.en)

  useEffect(() => {
    const code = localStorage.getItem('language') || 'en'
    setLang(LANG_MAP[code] || LANG_MAP.en)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 py-12">
      {/* Language indicator */}
      <Link
        href="/language"
        className="fixed top-4 right-4 flex items-center gap-1.5 rounded-full bg-[#202020] border border-[#2A2A2A] px-3 py-1.5 text-sm text-[#F5F4F4] hover:border-[#C9F14E] transition-colors"
      >
        <span>{lang.flag}</span>
        <span className="text-xs text-[#D1D5DB]">{lang.name}</span>
      </Link>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#202020] border border-[#2A2A2A]">
            <span className="text-2xl">🕊️</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#C9F14E]">The Waiting Room</h1>
          <p className="mt-1 text-sm text-[#D1D5DB]">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#2A2A2A] bg-[#202020] p-6 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[#D1D5DB] text-sm">Email address</Label>
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-[#161616] border-[#2A2A2A] text-[#F5F4F4] placeholder:text-[#D1D5DB]/40 focus-visible:ring-[#C9F14E]/40 focus-visible:border-[#C9F14E] h-11"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[#D1D5DB] text-sm">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-[#161616] border-[#2A2A2A] text-[#F5F4F4] placeholder:text-[#D1D5DB]/40 focus-visible:ring-[#C9F14E]/40 focus-visible:border-[#C9F14E] h-11 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D1D5DB]/50 hover:text-[#D1D5DB] transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11">
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#2A2A2A]" />
            <span className="text-xs text-[#D1D5DB]/50">or</span>
            <div className="flex-1 h-px bg-[#2A2A2A]" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full h-11 flex items-center justify-center gap-2 rounded-full border border-[#2A2A2A] bg-[#161616] text-[#F5F4F4] text-sm font-medium hover:border-[#C9F14E]/50 transition-colors"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Footer links */}
          <div className="text-center space-y-2 pt-1">
            <p className="text-sm text-[#D1D5DB]">
              No account?{" "}
              <Link href="/register" className="text-[#C9F14E] hover:underline font-medium">
                Create one
              </Link>
            </p>
            <Link
              href="/"
              className="block text-xs text-[#D1D5DB]/50 hover:text-[#D1D5DB] transition-colors"
            >
              Continue without account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
