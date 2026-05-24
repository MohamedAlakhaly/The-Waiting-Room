// components/stories/words-of-impact.tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

export function WordsOfImpact() {
  const t = useTranslations('addStoryPage')

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl bg-secondary p-6 text-secondary-foreground"
    >
      <div className="flex flex-col gap-1 mb-3">
        <span className="font-serif text-5xl font-bold text-primary">500</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t('wordsTitle')}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-secondary-foreground/80">
        {t('wordsDescription')}
      </p>
      <div className="mt-4 font-serif text-7xl text-secondary-foreground/10 leading-none">
        &ldquo;&rdquo;
      </div>
    </motion.div>
  )
}