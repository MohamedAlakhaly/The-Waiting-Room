"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowRight, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const reports = [
  {
    id: 1,
    org: "UNHCR",
    headerColor: "bg-blue-500/20",
    icon: "🇺🇳",
    title: "Greece: Asylum seekers face deteriorating conditions",
    summary: "Thousands remain in legal limbo with no clear pathway to protection in other EU states.",
    date: "2024",
    url: "https://www.unhcr.org",
    tag: "Greece",
    tagColor: "bg-blue-500/10 text-blue-400",
  },
  {
    id: 2,
    org: "Amnesty International",
    headerColor: "bg-amber-500/20",
    icon: "✊",
    title: "Bulgaria pushbacks violate international law",
    summary: "Systematic violations at Bulgarian borders continue despite EU pressure.",
    date: "2024",
    url: "https://www.amnesty.org",
    tag: "Bulgaria",
    tagColor: "bg-amber-500/10 text-amber-400",
  },
  {
    id: 3,
    org: "Human Rights Watch",
    headerColor: "bg-red-500/20",
    icon: "👁",
    title: "Belgium: Long asylum delays cause mental health crisis",
    summary: "Years of waiting without status lead to severe psychological harm among migrants.",
    date: "2024",
    url: "https://www.hrw.org",
    tag: "Belgium",
    tagColor: "bg-red-500/10 text-red-400",
  },
]

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const},
  },
}

export function AdvocacyReport() {
  const t = useTranslations('reports')

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              {t('label')}
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              {t('title')}
            </h2>
          </div>
          <Link href="/news" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
            {t('viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reports.map((report) => (
            <motion.div
              key={report.id}
              variants={cardVariant}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px rgba(201, 241, 78, 0.08)",
                borderColor: "rgba(201, 241, 78, 0.3)",
              }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col cursor-default"
            >
              {/* Colored header */}
              <div className={`${report.headerColor} px-5 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <motion.span
                    className="text-2xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {report.icon}
                  </motion.span>
                  <span className="text-sm font-semibold text-foreground">
                    {report.org}
                  </span>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${report.tagColor}`}>
                  {report.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <p className="text-sm font-medium text-foreground leading-snug">
                  {report.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {report.summary}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">{report.date}</span>
                  <motion.a
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t('readReport')}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </motion.a>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Mobile link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 text-center sm:hidden"
        >
          <Link href="/news" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            {t('viewAll')} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}