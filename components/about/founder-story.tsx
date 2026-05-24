// components/about/founder-story.tsx
"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { User } from "lucide-react"

export function FounderStory() {
  const t = useTranslations('about')

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 grid items-center gap-10 lg:grid-cols-2"
    >
      {/* Avatar بدل الصورة */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative flex justify-center"
      >
        <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl bg-primary/10" />
        <div className="relative rounded-2xl border border-border bg-secondary overflow-hidden w-full">
          <div className="aspect-[4/5] flex flex-col items-center justify-center gap-6 p-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="h-24 w-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
            >
              <User className="h-12 w-12 text-primary" />
            </motion.div>
            <div className="text-center">
              <p className="font-semibold text-foreground">Anonymous Founder</p>
              <p className="text-sm text-muted-foreground">Belgium · Since 2023</p>
            </div>
            <div className="flex gap-2">
              {["Greece", "Belgium"].map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-4 h-1 w-12 bg-primary origin-left"
        />
        <h2 className="font-serif text-2xl font-bold text-foreground">
          {t('founderSectionTitle')}
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          {[t('founderP1'), t('founderP2')].map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              {p}
            </motion.p>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-6 font-medium text-foreground italic"
        >
          {t('founderCredit')}
        </motion.p>
      </motion.div>
    </motion.section>
  )
}