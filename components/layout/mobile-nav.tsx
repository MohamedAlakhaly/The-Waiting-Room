// components/layout/mobile-nav.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { Home, BookOpen, FileText, Newspaper, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const AUTH_PATHS = ['/language', '/login', '/register']

export function MobileNav() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  const navItems = [
    { label: t('home'), href: "/", icon: Home },
    { label: t('stories'), href: "/stories", icon: BookOpen },
    { label: t('petitions'), href: "/petitions", icon: FileText },
    { label: t('news'), href: "/news", icon: Newspaper },
    { label: t('donate'), href: "/donate", icon: Heart },
  ]

  if (AUTH_PATHS.some(p => pathname.startsWith(p))) return null

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 md:hidden"
    >
      <div className="flex items-center justify-around px-1 py-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors min-w-0 relative"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={cn(
                  "flex flex-col items-center gap-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
                <span className="text-[10px] font-medium truncate">{label}</span>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}