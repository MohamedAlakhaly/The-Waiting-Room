"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const filters = [
  { id: "all", label: "All News" },
  { id: "greece", label: "Greece" },
  { id: "bulgaria", label: "Bulgaria" },
  { id: "belgium", label: "Belgium" },
  { id: "mental-health", label: "Mental Health" },
  { id: "legal", label: "Legal" },
]

export function NewsFilter() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            activeFilter === filter.id
              ? "bg-primary/20 text-primary"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
