"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowRight, Clock, User } from "lucide-react"
import { motion } from "framer-motion"

const stories = [
  {
    id: 1,
    name: "anonymous",
    isAnonymous: true,
    initials: null,
    route: "Greece",
    years: 3,
    quote: "After 2 years in Greece with no future, I came to Belgium. Now I face the same wall — but at least here, people listen.",
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    id: 2,
    name: "Fatima A.",
    isAnonymous: false,
    initials: "FA",
    route: "Bulgaria",
    years: 1.5,
    quote: "In Sofia I had papers but no rights. Here in Antwerp I have people who fight with me. That is everything.",
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    id: 3,
    name: "anonymous",
    isAnonymous: true,
    initials: null,
    route: "Greece",
    years: 4,
    quote: "Five languages, zero rights on paper. The system sees a file number, not a human being who has been waiting 4 years.",
    color: "bg-muted text-muted-foreground",
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

export function LatestVoices() {
  const t = useTranslations('latestVoices')

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
          <Link
            href="/stories"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
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
          {stories.map((story) => (
            <motion.div
              key={story.id}
              variants={cardVariant}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px rgba(201, 241, 78, 0.08)",
                borderColor: "rgba(201, 241, 78, 0.3)",
              }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4 cursor-default"
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <motion.div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${story.color}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {story.isAnonymous
                    ? <User className="h-5 w-5" />
                    : <span className="text-sm font-medium">{story.initials}</span>
                  }
                </motion.div>
                <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border">
                  {story.route} → BE
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {story.isAnonymous ? t('anonymous') : story.name}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{story.quote}"
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {story.years} {t('yearsInBE')}
                </span>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={`/stories/${story.id}`}
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80"
                  >
                    {t('readStory')}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
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
          <Link href="/stories" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            {t('viewAll')} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}