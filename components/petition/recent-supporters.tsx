"use client"

import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { getRecentSupporters } from "@/lib/petition"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
}

const COLORS = [
  { bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-400" },
  { bg: "bg-blue-500/10 border-blue-500/20", text: "text-blue-400" },
  { bg: "bg-amber-500/10 border-amber-500/20", text: "text-amber-400" },
  { bg: "bg-purple-500/10 border-purple-500/20", text: "text-purple-400" },
  { bg: "bg-rose-500/10 border-rose-500/20", text: "text-rose-400" },
]

export function RecentSupporters() {
  const t = useTranslations('petition')
  const [supporters, setSupporters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSupporters = async () => {
      const data = await getRecentSupporters()
      setSupporters(data)
      setLoading(false)
    }
    fetchSupporters()
  }, [])

  const getTimeAgo = (createdAt: string) => {
    const diff = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000)
    if (diff < 1) return t('justNow')
    if (diff < 60) return `${diff} ${t('minutesAgo')}`
    if (diff < 1440) return `${Math.floor(diff / 60)} ${t('hoursAgo')}`
    return `${Math.floor(diff / 1440)} ${t('daysAgo')}`
  }

  const getInitials = (name: string) => {
    if (!name) return 'A'
    return name.trim().split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t('recentSupporters')}
        </p>
        {/* نبضة حية */}
        <div className="flex items-center gap-1.5">
          <motion.div
  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
  className="h-1.5 w-1.5 rounded-full bg-primary"
/>
<span className="text-xs text-primary font-medium">Live</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {loading ? (
          // Skeleton
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted animate-pulse shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-2.5 w-16 bg-muted rounded animate-pulse" />
                </div>
                <div className="h-2.5 w-12 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : supporters.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2 py-6 text-center"
          >
            <span className="text-3xl">✍️</span>
            <p className="text-sm text-muted-foreground">{t('beFirstToSign')}</p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-2"
          >
            <AnimatePresence>
              {supporters.map((supporter, index) => {
                const color = COLORS[index % COLORS.length]
                const isAnonymous = supporter.is_anonymous
                const name = supporter.display_name || ''
                const initials = isAnonymous ? 'A' : getInitials(name)

                return (
                  <motion.div
                    key={index}
                    variants={item}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-muted/30 transition-colors"
                  >
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`h-10 w-10 shrink-0 rounded-full border flex items-center justify-center text-xs font-bold ${color.bg} ${color.text}`}
                    >
                      {initials}
                    </motion.div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {isAnonymous ? t('anonymous') : name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t('signed')}
                      </p>
                    </div>

                    {/* Time */}
                    <span className="text-xs text-muted-foreground shrink-0 bg-muted px-2 py-1 rounded-full">
                      {getTimeAgo(supporter.created_at)}
                    </span>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}