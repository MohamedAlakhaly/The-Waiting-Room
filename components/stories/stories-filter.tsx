// components/stories/stories-filter.tsx
"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function StoriesFilter() {
  const t = useTranslations('storiesPage')
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", label: t('filterAll') },
    { id: "anonymous", label: t('filterAnon') },
    { id: "named", label: t('filterNamed') },
    { id: "greece", label: t('filterGreece') },
    { id: "bulgaria", label: t('filterBulgaria') },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mt-8 rounded-2xl border border-border bg-card p-4"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {t('filterBy')}
        </span>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(201,241,78,0.3)]"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}