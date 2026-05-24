// components/petition/recent-supporters.tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

const supporters = [
  { initials: "MK", name: "M. K.", time: "4" },
  { initials: "A", name: "Anonymous", time: "12" },
  { initials: "SR", name: "S. R.", time: "23" },
]

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
              {supporter.initials}
            </motion.div>
            <p className="text-sm text-foreground">
              <span className="font-medium">{supporter.name}</span>
              {" "}{t('signed')}{" "}
              <span className="text-muted-foreground">{supporter.time} {t('minutesAgo')}</span>
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}