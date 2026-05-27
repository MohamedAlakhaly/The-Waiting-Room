"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { User, Menu, X, LogOut, Settings, BookOpen, Heart } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage, LANGUAGES } from "@/hooks/use-language"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import type { Session, AuthChangeEvent } from '@supabase/supabase-js'
const LANG_FLAGS: Record<string, string> = {
  ar: '🇸🇦', fr: '🇫🇷', en: '🇬🇧', fa: '🇮🇷', ti: '🇹🇬',
}

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('nav')
  const { changeLanguage } = useLanguage()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)

  // بيانات المستخدم — فقط من الـ session مش من قاعدة البيانات
  const [userInitials, setUserInitials] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const langRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  // جلب بيانات المستخدم من الـ session فقط
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setIsLoggedIn(true)

        // صورة من Google إذا موجودة
        const avatar = user.user_metadata?.avatar_url || ''
        setUserAvatar(avatar)

        // أول حرفين من الاسم
        const name = user.user_metadata?.name || user.email || ''
        const parts = name.trim().split(' ')
        if (parts.length >= 2) {
          setUserInitials((parts[0][0] + parts[1][0]).toUpperCase())
        } else {
          setUserInitials(name.substring(0, 2).toUpperCase())
        }
      } else {
        setIsLoggedIn(false)
        setUserInitials('')
        setUserAvatar('')
      }
    }

    getUser()

    // استمع لتغييرات الـ session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        setIsLoggedIn(true)
        const avatar = session.user.user_metadata?.avatar_url || ''
        setUserAvatar(avatar)
        const name = session.user.user_metadata?.name || session.user.email || ''
        const parts = name.trim().split(' ')
        if (parts.length >= 2) {
          setUserInitials((parts[0][0] + parts[1][0]).toUpperCase())
        } else {
          setUserInitials(name.substring(0, 2).toUpperCase())
        }
      } else {
        setIsLoggedIn(false)
        setUserInitials('')
        setUserAvatar('')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const code = localStorage.getItem('language') || 'en'
    setCurrentLang(code)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // إغلاق الـ dropdowns عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false)
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code)
    setLangDropdownOpen(false)
    changeLanguage(code as any)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUserMenuOpen(false)
    setIsLoggedIn(false)
    router.push('/login')
    router.refresh()
  }

  const navigation = [
    { name: t('home'), href: "/" },
    { name: t('stories'), href: "/stories" },
    { name: t('petitions'), href: "/petitions" },
    { name: t('news'), href: "/news" },
    { name: t('donate'), href: "/donate" },
    { name: t('about'), href: "/about" },
  ]

  const userMenuItems = [
    { icon: BookOpen, label: "My Stories", href: "/stories" },
    { icon: Heart, label: "My Donations", href: "/donate" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border backdrop-blur transition-all duration-300",
        scrolled
          ? "bg-background/98 shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
          : "bg-background/95"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <motion.span
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="font-serif text-xl font-bold text-primary sm:text-2xl"
          >
            The Waiting Room
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  isActive ? "text-primary" : "text-[#D1D5DB] hover:text-primary"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">

          {/* Language dropdown */}
          <div ref={langRef} className="relative">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-base"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-label="Change language"
              >
                {LANG_FLAGS[currentLang] || '🌐'}
              </Button>
            </motion.div>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-11 w-44 rounded-2xl border border-border bg-card shadow-xl overflow-hidden z-50"
                >
                  {LANGUAGES.map((lang, i) => (
                    <motion.button
                      key={lang.code}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted",
                        currentLang === lang.code ? "text-primary bg-primary/5" : "text-foreground"
                      )}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                      {currentLang === lang.code && (
                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User button */}
          <div ref={userRef} className="relative">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {isLoggedIn ? (
                // مسجل دخول — يظهر Avatar
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="h-9 w-9 rounded-full overflow-hidden border-2 border-border hover:border-primary transition-colors flex items-center justify-center bg-primary/10"
                >
                  {userAvatar ? (
                    <img src={userAvatar} alt="avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-primary">{userInitials}</span>
                  )}
                </button>
              ) : (
                // غير مسجل — يظهر أيقونة User
                <Link href="/login">
                  <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Account">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </motion.div>

            {/* User dropdown menu */}
            <AnimatePresence>
              {userMenuOpen && isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-11 w-52 rounded-2xl border border-border bg-card shadow-xl overflow-hidden z-50"
                >
                  {/* Header المستخدم */}
                  <div className="px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full overflow-hidden border border-border flex items-center justify-center bg-primary/10 shrink-0">
                        {userAvatar ? (
                          <img src={userAvatar} alt="avatar" className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-xs font-bold text-primary">{userInitials}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {userInitials}
                        </p>
                        <p className="text-xs text-muted-foreground">Member</p>
                      </div>
                    </div>
                  </div>

                  {/* قائمة الروابط */}
                  {userMenuItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* تسجيل خروج */}
                  <div className="border-t border-border">
                    <motion.button
                      whileHover={{ backgroundColor: "rgba(239,68,68,0.1)" }}
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navigation.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2.5 text-base font-medium rounded-xl transition-colors",
                      pathname === item.href ? "text-primary bg-primary/10" : "text-[#D1D5DB] hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* تسجيل خروج في الموبايل */}
              {isLoggedIn && (
                <div className="pt-2 border-t border-border mt-2">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 w-full rounded-xl hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}

              {/* Language options */}
              <div className="pt-2 border-t border-border mt-2">
                <p className="px-3 py-1 text-xs text-muted-foreground uppercase tracking-wider">Language</p>
                <div className="flex gap-2 px-3 py-2 flex-wrap">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { handleLanguageChange(lang.code); setMobileMenuOpen(false) }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors",
                        currentLang === lang.code ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary/40"
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}