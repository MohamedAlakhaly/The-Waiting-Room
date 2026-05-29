"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { getRecentSupporters } from "@/lib/petition"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

export function RecentSupporters() {
  const t = useTranslations('petition')
  const [supporters, setSupporters] = useState<any[]>([])

  useEffect(() => {
    const fetchSupporters = async () => {
      const data = await getRecentSupporters()
      setSupporters(data)
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
      className="rounded-2xl border border-border bg-card p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        {t('recentSupporters')}
      </p>

      {supporters.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          {t('beFirstToSign')}
        </p>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {supporters.map((supporter, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-8 w-8 shrink-0 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary"
              >
                {supporter.is_anonymous ? 'A' : getInitials(supporter.display_name || '')}
              </motion.div>
              <p className="text-sm text-foreground">
                <span className="font-medium">
                  {supporter.is_anonymous
                    ? t('anonymous')
                    : (supporter.display_name || t('anonymous'))
                  }
                </span>
                {" "}{t('signed')}{" "}
                <span className="text-muted-foreground">
                  {getTimeAgo(supporter.created_at)}
                </span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}