"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, FileText, Newspaper, Heart, Info, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sidebarNavigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Stories", href: "/stories", icon: BookOpen },
  { name: "Petitions", href: "/petitions", icon: FileText },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Donate", href: "/donate", icon: Heart },
  { name: "About", href: "/about", icon: Info },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn("flex w-52 flex-col border-r border-border bg-card", className)}>
      {/* User Profile */}
      <div className="flex items-center gap-3 border-b border-border p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">Civic Advocate</span>
          <span className="text-xs text-muted-foreground">Empowering Voices</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {sidebarNavigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
