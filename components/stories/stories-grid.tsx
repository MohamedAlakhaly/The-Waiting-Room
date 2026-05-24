"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowRight, Clock, User } from "lucide-react"
import { motion } from "framer-motion"

const stories = [
  {
    id: 1,
    name: "Anonymous",
    isAnonymous: true,
    initials: null,
    country: "Bulgaria",
    yearsInBelgium: 4,
    role: "Verified Contributor",
    color: "bg-amber-500/10 text-amber-400",
    quote: "The journey didn't end when I crossed the border. In Sofia, I found safety but no path forward. After 2 years there, I came to Belgium seeking a real chance to rebuild...",
  },
  {
    id: 2,
    name: "Fatima A.",
    isAnonymous: false,
    initials: "FA",
    country: "Greece",
    yearsInBelgium: 1.5,
    role: "Antwerp Community",
    color: "bg-emerald-500/10 text-emerald-400",
    quote: "In Moria, we felt forgotten. Advocacy groups in Brussels were the first ones to truly listen to our specific legal hurdles regarding Dublin transfers...",
  },
  {
    id: 3,
    name: "Anonymous",
    isAnonymous: true,
    initials: null,
    country: "Greece",
    yearsInBelgium: 3,
    role: "Verified Contributor",
    color: "bg-blue-500/10 text-blue-400",
    quote: "The paperwork is a labyrinth. I speak five languages, but none of them helped me understand the circular logic of the previous protection laws...",
  },
  {
    id: 4,
    name: "Markos V.",
    isAnonymous: false,
    initials: "MV",
    country: "Bulgaria",
    yearsInBelgium: 5,
    role: "Brussels Sector",
    color: "bg-purple-500/10 text-purple-400",
    quote: "Five years ago, the laws were different. Now, we face retroactive checks that threaten the stability we've built here in Belgium. We need consistency.",
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function StoriesGrid() {
  const t = useTranslations('storiesPage')

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-2"
    >
      {stories.map((story) => (
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
                className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${story.color}`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {story.isAnonymous
                  ? <User className="h-5 w-5" />
                  : <span className="text-sm font-semibold">{story.initials}</span>
                }
              </motion.div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {story.isAnonymous ? t('filterAnon') : story.name}
                </p>
                <p className="text-xs text-muted-foreground">{story.role}</p>
              </div>
            </div>
            <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border shrink-0">
              {story.country} → BE
            </span>
          </div>

          {/* Quote */}
          <p className="text-sm text-muted-foreground leading-relaxed italic flex-1">
            "{story.quote}"
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {story.yearsInBelgium} {t('yearsInBE')}
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
      ))}
    </motion.div>
  )
}