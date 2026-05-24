// components/news/news-grid.tsx
"use client"

import { useTranslations } from "next-intl"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const articles = [
  {
    id: 1,
    source: "Human Rights Watch",
    sourceColor: "text-red-400",
    headerColor: "bg-red-500/10",
    date: "April 28, 2024",
    title: "Policy Shift: New Legal Frameworks in Bulgaria",
    excerpt: "Analyzing the implications of recent legislative changes on asylum processing times and transparency.",
    tags: ["filterBulgaria", "filterLegal"],
    url: "https://www.hrw.org",
  },
  {
    id: 2,
    source: "UNHCR",
    sourceColor: "text-blue-400",
    headerColor: "bg-blue-500/10",
    date: "April 22, 2024",
    title: "Education Access for Displaced Youth",
    excerpt: "A survey of secondary education enrollment across three European transit hubs.",
    tags: ["filterGreece", "filterLegal"],
    url: "https://www.unhcr.org",
  },
  {
    id: 3,
    source: "Amnesty International",
    sourceColor: "text-amber-400",
    headerColor: "bg-amber-500/10",
    date: "April 15, 2024",
    title: "Digital Surveillance and Privacy Rights",
    excerpt: "Examining the use of biometric tracking in modern border management systems.",
    tags: ["filterLegal", "filterBelgium"],
    url: "https://www.amnesty.org",
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export function NewsGrid() {
  const t = useTranslations('news')

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {articles.map((article) => (
        <motion.div
          key={article.id}
          variants={cardVariant}
          whileHover={{
            y: -5,
            boxShadow: "0 16px 32px rgba(201,241,78,0.07)",
            borderColor: "rgba(201,241,78,0.25)",
          }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className={`${article.headerColor} px-5 py-4 flex items-center justify-between`}>
            <span className={`text-xs font-semibold ${article.sourceColor}`}>
              {article.source}
            </span>
            <span className="text-xs text-muted-foreground">{article.date}</span>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="font-semibold text-foreground leading-snug">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground border border-border">
                  {t(tag as any)}
                </span>
              ))}
            </div>
            <motion.a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 mt-auto"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {t('readReport')}
              <ExternalLink className="h-3.5 w-3.5" />
            </motion.a>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}