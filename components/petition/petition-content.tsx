// components/petition/petition-content.tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export function PetitionContent() {
  const t = useTranslations('petition')

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-5"
    >
      {[t('p1'), t('p2'), t('p3')].map((paragraph, i) => (
        <motion.div
          key={i}
          variants={item}
          className="flex gap-4"
        >
          <div className="shrink-0 mt-1.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <p className="text-foreground leading-relaxed">{paragraph}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}