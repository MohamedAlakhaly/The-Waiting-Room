"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const countries = [
  {
    flag: "🇵🇸",
    code: "palestine",
    stat: "45,000+",
    source: "https://www.ochaopt.org",
    org: "OCHA",
    color: "bg-green-500/10 border-green-500/20 text-green-400",
    statColor: "text-green-400",
  },
  {
    flag: "🇾🇪",
    code: "yemen",
    stat: "21M",
    source: "https://www.unhcr.org/countries/yemen",
    org: "UNHCR",
    color: "bg-red-500/10 border-red-500/20 text-red-400",
    statColor: "text-red-400",
  },
  {
    flag: "🇦🇫",
    code: "afghanistan",
    stat: "6M+",
    source: "https://www.unhcr.org/countries/afghanistan",
    org: "UNHCR",
    color: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    statColor: "text-blue-400",
  },
  {
    flag: "🇸🇩",
    code: "sudan",
    stat: "11M+",
    source: "https://www.unhcr.org/countries/sudan",
    org: "UNHCR",
    color: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    statColor: "text-amber-400",
  },
  {
    flag: "🇸🇾",
    code: "syria",
    stat: "13M+",
    source: "https://www.unhcr.org/countries/syria",
    org: "UNHCR",
    color: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    statColor: "text-purple-400",
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export function WhyTheyLeft() {
  const t = useTranslations('whyTheyLeft')

  return (
    <section className="py-4">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            {t('label')}
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {countries.map((country) => (
            <motion.div
              key={country.code}
              variants={cardVariant}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl border bg-card p-5 flex flex-col gap-4 ${country.color}`}
            >
              {/* Flag + Country */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{country.flag}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {t(`countries.${country.code}.name`)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t(`countries.${country.code}.region`)}
                  </p>
                </div>
              </div>

              {/* Stat */}
              <div>
                <p className={`font-serif text-3xl font-bold ${country.statColor}`}>
                  {country.stat}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t(`countries.${country.code}.statLabel`)}
                </p>
              </div>

              {/* Why they left */}
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {t(`countries.${country.code}.reason`)}
              </p>

              {/* Source */}
              <a
                href={country.source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
              >
                {country.org}
                <ExternalLink className="h-3 w-3" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
        >
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('bottomNote')}
          </p>
        </motion.div>

      </div>
    </section>
  )
}