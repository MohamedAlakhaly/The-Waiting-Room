// components/about/mission-bento.tsx
"use client"

import { useTranslations } from "next-intl"
import { Scale, Users } from "lucide-react"
import { motion } from "framer-motion"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export function MissionBento() {
  const t = useTranslations('about')

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {/* Legal Advocacy */}
      <motion.div
        variants={cardVariant}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl bg-secondary border border-border p-6 sm:col-span-2 lg:col-span-2 flex flex-col gap-4"
      >
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center"
        >
          <Scale className="h-6 w-6 text-primary" />
        </motion.div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-foreground">
            {t('legalAdvocacy')}
          </h3>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            {t('legalDesc')}
          </p>
        </div>
      </motion.div>

      {/* Inclusion */}
      <motion.div
        variants={cardVariant}
        whileHover={{ y: -4, borderColor: "rgba(201,241,78,0.4)" }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col gap-4"
      >
        <motion.div
          whileHover={{ rotate: -10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center"
        >
          <Users className="h-6 w-6 text-primary" />
        </motion.div>
        <div>
          <h3 className="font-semibold text-primary">{t('inclusion')}</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {t('inclusionDesc')}
          </p>
        </div>
      </motion.div>

      {/* Impact stats */}
      <motion.div
        variants={cardVariant}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <h3 className="font-serif text-xl font-bold text-foreground mb-4">
          {t('ourImpact')}
        </h3>
        <div className="space-y-3">
          {[
            { label: t('petitionsWon'), value: "8,432+" },
            { label: t('voicesActive'), value: "1,248+" },
            { label: t('citiesReached'), value: "12" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex justify-between items-center"
            >
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="font-semibold text-primary">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* United banner */}
      <motion.div
        variants={cardVariant}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:col-span-2 flex items-center justify-center"
      >
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring" }}
          className="font-serif text-xl font-bold text-primary text-center"
        >
          {t('united')}
        </motion.h3>
      </motion.div>
    </motion.section>
  )
}