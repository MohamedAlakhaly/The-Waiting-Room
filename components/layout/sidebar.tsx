// components/layout/sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { Home, BookOpen, FileText, Newspaper, Heart, Info, User } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const t = useTranslations('nav')

  const sidebarNavigation = [
    { name: t('home'), href: "/", icon: Home },
    { name: t('stories'), href: "/stories", icon: BookOpen },
    { name: t('petitions'), href: "/petitions", icon: FileText },
    { name: t('news'), href: "/news", icon: Newspaper },
    { name: t('donate'), href: "/donate", icon: Heart },
    { name: t('about'), href: "/about", icon: Info },
  ]

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn("flex w-52 flex-col border-r border-border bg-card", className)}
    >
      {/* User Profile */}
      <div className="flex items-center gap-3 border-b border-border p-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">Civic Advocate</span>
          <span className="text-xs text-muted-foreground">The Waiting Room</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {sidebarNavigation.map((item, i) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(201,241,78,0.2)]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Icon className="h-5 w-5" />
                </motion.div>
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground"
                  />
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>
    </motion.aside>
  )
}