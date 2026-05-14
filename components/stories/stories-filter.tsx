"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

export function StoriesFilter() {
  const t = useTranslations('stories')
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", label: t('filterAll') },
    { id: "anonymous", label: t('filterAnon') },
    { id: "named", label: t('filterNamed') },
    { id: "greece", label: t('filterGreece') },
    { id: "bulgaria", label: t('filterBulgaria') },
  ]

  return (
    <div className="mt-8 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">{t('filterBy')}</span>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeFilter === filter.id
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
