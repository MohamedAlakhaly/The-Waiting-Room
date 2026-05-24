// components/donate/donate-features.tsx
"use client"

import { useTranslations } from "next-intl"
import { Shield, Heart, Eye, LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export function DonateFeatures() {
  const t = useTranslations('donate')

  const features: { icon: LucideIcon; title: string; description: string; color: string; bg: string }[] = [
    {
      icon: Shield,
      title: t('securePayment'),
      description: t('secureDesc'),
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Heart,
      title: t('directImpact'),
      description: t('directDesc'),
      color: "text-primary",
      bg: "bg-primary/10",
    },
    
  ]

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mt-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-2"
    >
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <motion.div
            key={feature.title}
            variants={cardVariant}
            whileHover={{ y: -4, borderColor: "rgba(201,241,78,0.25)" }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`h-12 w-12 rounded-xl flex items-center justify-center ${feature.bg}`}
            >
              <Icon className={`h-6 w-6 ${feature.color}`} />
            </motion.div>
            <div>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </motion.section>
  )
}