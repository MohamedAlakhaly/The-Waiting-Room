"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowRight, Clock, User } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { getStories } from "@/lib/stories"

// ألوان عشوائية للبطاقات
const COLORS = [
  "bg-amber-500/10 text-amber-400",
  "bg-emerald-500/10 text-emerald-400",
  "bg-blue-500/10 text-blue-400",
  "bg-purple-500/10 text-purple-400",
  "bg-rose-500/10 text-rose-400",
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
}

interface StoriesGridProps {
  activeFilter?: string
}

export function StoriesGrid({ activeFilter = "all" }: StoriesGridProps) {
  const t = useTranslations('storiesPage')
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      const { data } = await getStories()
      setStories(data || [])
      setLoading(false)
    }
    fetchStories()
  }, [])

  const filteredStories = stories.filter((story) => {
    if (activeFilter === "all") return true
    if (activeFilter === "anonymous") return story.is_anonymous === true
    if (activeFilter === "named") return story.is_anonymous === false
    if (activeFilter === "greece") return story.previous_country === "greece"
    if (activeFilter === "bulgaria") return story.previous_country === "bulgaria"
    return true
  })

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 h-48 animate-pulse" />
        ))}
      </div>
    )
  }

  if (filteredStories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-12 text-center"
      >
        <p className="text-4xl mb-4">✍️</p>
        <h3 className="font-semibold text-foreground mb-2">No stories found</h3>
        <p className="text-sm text-muted-foreground">
          {activeFilter === "all" ? "Be the first to share your story." : "No stories match this filter yet."}
        </p>
      </motion.div>
    )
  }
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-2"
    >
      {filteredStories.map((story, index) => {
        const color = COLORS[index % COLORS.length]
        const isAnonymous = story.is_anonymous
        const name = story.display_name || ''
        const initials = name
          ? name.trim().split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
          : ''

        return (
          <motion.div
            key={story.id}
            variants={cardVariant}
            whileHover={{
              y: -5,
              boxShadow: "0 16px 32px rgba(201, 241, 78, 0.07)",
              borderColor: "rgba(201, 241, 78, 0.25)",
            }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4 cursor-default"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${color}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {isAnonymous
                    ? <User className="h-5 w-5" />
                    : <span className="text-sm font-semibold">{initials}</span>
                  }
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {isAnonymous ? t('filterAnon') : name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {story.previous_country ? `${story.previous_country} → BE` : 'Belgium'}
                  </p>
                </div>
              </div>
              {story.previous_country && (
                <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border shrink-0">
                  {story.previous_country} → BE
                </span>
              )}
            </div>

            {/* Quote */}
            <p className="text-sm text-muted-foreground leading-relaxed italic flex-1 line-clamp-4">
              "{story.content}"
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {story.years_in_belgium
                  ? `${story.years_in_belgium} ${t('yearsInBE')}`
                  : 'Belgium'
                }
              </span>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link
                  href={`/stories/${story.id}`}
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80"
                >
                  {t('readInsight')}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}