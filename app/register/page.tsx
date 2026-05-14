"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const LANG_MAP: Record<string, { flag: string; name: string }> = {
  ar: { flag: '🇸🇦', name: 'العربية' },
  fr: { flag: '🇫🇷', name: 'Français' },
  en: { flag: '🇬🇧', name: 'English' },
  fa: { flag: '🇮🇷', name: 'فارسی' },
  ti: { flag: '🇹🇬', name: 'Tigrinya' },
}

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
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
          <p className="mt-1 text-sm text-[#D1D5DB]">Create your account</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#2A2A2A] bg-[#202020] p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[#D1D5DB] text-sm">Full name</Label>
              <Input
                type="text"
                placeholder="Your name"
                className="bg-[#161616] border-[#2A2A2A] text-[#F5F4F4] placeholder:text-[#D1D5DB]/40 focus-visible:ring-[#C9F14E]/40 focus-visible:border-[#C9F14E] h-11"
                required={!anonymous}
                disabled={anonymous}
              />
            </div>

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
                  placeholder="At least 8 characters"
                  className="bg-[#161616] border-[#2A2A2A] text-[#F5F4F4] placeholder:text-[#D1D5DB]/40 focus-visible:ring-[#C9F14E]/40 focus-visible:border-[#C9F14E] h-11 pr-10"
                  minLength={8}
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

            <div className="space-y-1.5">
              <Label className="text-[#D1D5DB] text-sm">Confirm password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-[#161616] border-[#2A2A2A] text-[#F5F4F4] placeholder:text-[#D1D5DB]/40 focus-visible:ring-[#C9F14E]/40 focus-visible:border-[#C9F14E] h-11"
                required
              />
            </div>

            {/* Anonymous toggle */}
            <button
              type="button"
              onClick={() => setAnonymous(!anonymous)}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all",
                anonymous
                  ? "border-[#C9F14E] bg-[#C9F14E]/10"
                  : "border-[#2A2A2A] bg-[#161616] hover:border-[#C9F14E]/40"
              )}
            >
              <ShieldCheck
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  anonymous ? "text-[#C9F14E]" : "text-[#D1D5DB]/50"
                )}
              />
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  anonymous ? "text-[#C9F14E]" : "text-[#D1D5DB]"
                )}>
                  Keep my identity private
                </p>
                <p className="text-xs text-[#D1D5DB]/50 mt-0.5">
                  Your name won&apos;t appear on stories or petitions
                </p>
              </div>
              <div
                className={cn(
                  "ml-auto h-5 w-5 rounded-full border-2 shrink-0 transition-all",
                  anonymous
                    ? "border-[#C9F14E] bg-[#C9F14E]"
                    : "border-[#2A2A2A] bg-transparent"
                )}
              />
            </button>

            <Button type="submit" className="w-full h-11">
              Create Account
            </Button>
          </form>

          <div className="text-center pt-1">
            <p className="text-sm text-[#D1D5DB]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#C9F14E] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
