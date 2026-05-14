"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { User, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const LANG_FLAGS: Record<string, string> = {
  ar: '🇸🇦', fr: '🇫🇷', en: '🇬🇧', fa: '🇮🇷', ti: '🇹🇬',
}

export function Header() {
  const pathname = usePathname()
  const t = useTranslations('nav')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langFlag, setLangFlag] = useState('🌐')

  useEffect(() => {
    const code = localStorage.getItem('language') || 'en'
    setLangFlag(LANG_FLAGS[code] || '🌐')
  }, [])

  const navigation = [
    { name: t('home'), href: "/" },
    { name: t('stories'), href: "/stories" },
    { name: t('petitions'), href: "/petitions" },
    { name: t('news'), href: "/news" },
    { name: t('donate'), href: "/donate" },
    { name: t('about'), href: "/about" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-serif text-xl font-bold text-primary sm:text-2xl">
            The Waiting Room
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                pathname === item.href
                  ? "text-primary underline underline-offset-4"
                  : "text-[#D1D5DB] hover:text-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link href="/language">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-base" aria-label="Change language">
              {langFlag}
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-[#D1D5DB] hover:text-primary hover:bg-primary/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
