// components/news/news-filter.tsx
"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function NewsFilter() {
  const t = useTranslations('news')
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", label: t('filterAll') },
    { id: "greece", label: t('filterGreece') },
    { id: "bulgaria", label: t('filterBulgaria') },
    { id: "belgium", label: t('filterBelgium') },
    { id: "mental-health", label: t('filterMentalHealth') },
    { id: "legal", label: t('filterLegal') },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mt-6 flex flex-wrap gap-2"
    >
      {filters.map((filter, i) => (
        <motion.button
          key={filter.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveFilter(filter.id)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
            activeFilter === filter.id
              ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(201,241,78,0.3)]"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
          )}
        >
          {filter.label}
        </motion.button>
      ))}
    </motion.div>
  )
}