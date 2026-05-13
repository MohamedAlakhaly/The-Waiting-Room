"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const filters = [
  { id: "all", label: "All" },
  { id: "anonymous", label: "Anonymous" },
  { id: "named", label: "Named" },
  { id: "greece", label: "Greece" },
  { id: "bulgaria", label: "Bulgaria" },
]

export function StoriesFilter() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="mt-8 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
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
