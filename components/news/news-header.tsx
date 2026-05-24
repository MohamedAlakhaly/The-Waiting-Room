// components/news/news-header.tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

export function NewsHeader() {
  const t = useTranslations('news')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        {t('description')}
      </p>
    </motion.div>
  )
}