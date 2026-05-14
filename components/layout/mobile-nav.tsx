"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, FileText, Newspaper, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const AUTH_PATHS = ['/language', '/login', '/register']

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Stories", href: "/stories", icon: BookOpen },
  { label: "Petition", href: "/petitions", icon: FileText },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Donate", href: "/donate", icon: Heart },
]

export function MobileNav() {
  const pathname = usePathname()

  if (AUTH_PATHS.some(p => pathname.startsWith(p))) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 md:hidden">
      <div className="flex items-center justify-around px-1 py-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors min-w-0",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-medium truncate">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
