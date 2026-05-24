// components/about/about-hero.tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

export function AboutHero() {
  const t = useTranslations('about')

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-8"
    >
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm font-semibold uppercase tracking-wider text-primary"
      >
        {t('purpose')}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl"
      >
        <span className="text-balance">{t('heroTitle')}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed"
      >
        {t('heroDescription')}
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mx-auto mt-8 h-px w-24 bg-primary/40"
      />
    </motion.section>
  )
}