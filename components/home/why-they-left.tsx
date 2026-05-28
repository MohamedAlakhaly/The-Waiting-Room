"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { X, ExternalLink, ChevronDown } from "lucide-react"

const countryKeys = [
  { code: "palestine", flag: "🇵🇸", color: "bg-green-500/10 border-green-500/20", statColor: "text-green-400", glowColor: "rgba(34,197,94,0.15)", accentColor: "#22c55e" },
  { code: "yemen", flag: "🇾🇪", color: "bg-red-500/10 border-red-500/20", statColor: "text-red-400", glowColor: "rgba(239,68,68,0.15)", accentColor: "#ef4444" },
  { code: "syria", flag: "🇸🇾", color: "bg-purple-500/10 border-purple-500/20", statColor: "text-purple-400", glowColor: "rgba(168,85,247,0.15)", accentColor: "#a855f7" },
  { code: "sudan", flag: "🇸🇩", color: "bg-amber-500/10 border-amber-500/20", statColor: "text-amber-400", glowColor: "rgba(245,158,11,0.15)", accentColor: "#f59e0b" },
  { code: "kurdistan", flag: "🏳️", color: "bg-orange-500/10 border-orange-500/20", statColor: "text-orange-400", glowColor: "rgba(249,115,22,0.15)", accentColor: "#f97316" },
  { code: "afghanistan", flag: "🇦🇫", color: "bg-blue-500/10 border-blue-500/20", statColor: "text-blue-400", glowColor: "rgba(59,130,246,0.15)", accentColor: "#3b82f6" },
  { code: "eritrea", flag: "🇪🇷", color: "bg-teal-500/10 border-teal-500/20", statColor: "text-teal-400", glowColor: "rgba(20,184,166,0.15)", accentColor: "#14b8a6" },
  { code: "somalia", flag: "🇸🇴", color: "bg-sky-500/10 border-sky-500/20", statColor: "text-sky-400", glowColor: "rgba(14,165,233,0.15)", accentColor: "#0ea5e9" },
]

function TimelineEvent({
  event,
  index,
  accentColor,
  tSource,
}: {
  event: { year: string; title: string; description: string; stat: string; statLabel: string; org: string; source: string }
  index: number
  accentColor: string
  tSource: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px" style={{ backgroundColor: `${accentColor}30` }} />
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring" }}
        className="absolute left-[-6px] top-1 h-3 w-3 rounded-full border-2"
        style={{ backgroundColor: accentColor, borderColor: accentColor, boxShadow: `0 0 12px ${accentColor}60` }}
      />
      <div
        className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
        style={{ backgroundColor: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}
      >
        {event.year}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">{event.description}</p>
      <div
        className="rounded-xl p-4 mb-3"
        style={{ backgroundColor: `${accentColor}08`, border: `1px solid ${accentColor}20` }}
      >
        <p className="font-serif text-3xl font-bold mb-1" style={{ color: accentColor }}>{event.stat}</p>
        <p className="text-xs text-gray-500">{event.statLabel}</p>
      </div>
      <a
        href={event.source}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-400 transition-colors"
      >
        {tSource}: {event.org}
        <ExternalLink className="h-3 w-3" />
      </a>
    </motion.div>
  )
}

function CountryModal({
  countryKey,
  onClose,
}: {
  countryKey: typeof countryKeys[0]
  onClose: () => void
}) {
  const t = useTranslations('whyTheyLeft')
  const country = t.raw(`countries.${countryKey.code}`) as any

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "unset" }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
    >
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        className="relative w-full max-w-2xl mx-4 my-4 rounded-2xl"
        style={{ backgroundColor: "#0a0a0a", border: `1px solid ${countryKey.accentColor}20` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${countryKey.glowColor}, transparent 60%)` }}
        />

        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b rounded-t-2xl"
          style={{ backgroundColor: "#0a0a0a", borderColor: `${countryKey.accentColor}15` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{countryKey.flag}</span>
            <div>
              <h2 className="font-bold text-white text-lg">{country.name}</h2>
              <p className="text-xs text-gray-500">{country.region}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-400 hover:text-white transition-colors border border-gray-800 hover:border-gray-600"
          >
            <X className="h-4 w-4" />
            {t('backToRoom')}
          </motion.button>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          {/* Intro */}
          <div className="mb-10">
            <div
              className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: `${countryKey.accentColor}15`, color: countryKey.accentColor, border: `1px solid ${countryKey.accentColor}30` }}
            >
              {country.stat} — {country.statLabel}
            </div>
            <p className="text-gray-400 leading-relaxed">{country.reason}</p>
          </div>

          {/* Timeline */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-8">
              {t('timelineTitle')}
            </p>
            {(country.timeline as any[]).map((event: any, index: number) => (
              <TimelineEvent
                key={index}
                event={event}
                index={index}
                accentColor={countryKey.accentColor}
                tSource={t('source')}
              />
            ))}
          </div>

          {/* GDPR */}
          <div className="rounded-xl p-4 border border-gray-800 bg-gray-900/50">
            <p className="text-xs text-gray-600 leading-relaxed">{t('gdprNote')}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function WhyTheyLeft() {
  const t = useTranslations('whyTheyLeft')
  const [activeKey, setActiveKey] = useState<typeof countryKeys[0] | null>(null)

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  }

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
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {countryKeys.map((ck) => {
            const country = t.raw(`countries.${ck.code}`) as any
            return (
              <motion.button
                key={ck.code}
                variants={cardVariant}
                whileHover={{ y: -6, boxShadow: `0 20px 40px ${ck.glowColor}` }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveKey(ck)}
                className={`rounded-2xl border bg-card p-5 flex flex-col gap-4 text-left cursor-pointer transition-all duration-200 ${ck.color}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{ck.flag}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{country.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {t('clickToExplore')}
                      <ChevronDown className="h-3 w-3" />
                    </p>
                  </div>
                </div>

                <div>
                  <p className={`font-serif text-3xl font-bold ${ck.statColor}`}>{country.stat}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{country.statLabel}</p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {country.reason}
                </p>

                <div className="text-xs font-medium flex items-center gap-1 mt-auto" style={{ color: ck.accentColor }}>
                  {t('seeTimeline')}
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.3 }}
  className="mt-12 relative overflow-hidden rounded-2xl"
>
  {/* Background layers */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
  <div className="absolute inset-0 border border-primary/15 rounded-2xl" />

  {/* Animated corner accents */}
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.6 }}
    className="absolute top-0 left-0 h-12 w-12"
  >
    <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary/60 to-transparent" />
    <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-primary/60 to-transparent" />
  </motion.div>

  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.7 }}
    className="absolute bottom-0 right-0 h-12 w-12"
  >
    <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-primary/60 to-transparent" />
    <div className="absolute bottom-0 right-0 h-px w-full bg-gradient-to-l from-primary/60 to-transparent" />
  </motion.div>

  {/* Glow pulse */}
  <motion.div
    animate={{ opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="absolute inset-0 rounded-2xl pointer-events-none"
    style={{
      background: "radial-gradient(ellipse at center, rgba(201,241,78,0.06), transparent 70%)",
    }}
  />

  {/* Content */}
  <div className="relative px-8 py-10 sm:px-12 sm:py-12 text-center">

    {/* Top icon */}
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
      className="mx-auto mb-6 h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
    >
      <span className="text-xl">🕊️</span>
    </motion.div>

    {/* Text — word by word reveal */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="text-base sm:text-lg text-foreground leading-relaxed max-w-2xl mx-auto font-light"
    >
      {t('bottomNote').split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.6 + i * 0.04 }}
          className="inline-block mr-1"
          style={{
            color: ['statistics.', 'doctors,', 'teachers,', 'parents,', 'children', 'everything.'].includes(word)
              ? '#C9F14E'
              : undefined
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>

    {/* Bottom divider */}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
    />

    {/* Stats row */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12"
    >
      {[
        { stat: "8", label: "Countries" },
        { stat: "50M+", label: "Displaced" },
        { stat: "1", label: "Platform" },
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -2 }}
          className="text-center"
        >
          <p className="font-serif text-2xl font-bold text-primary">{item.stat}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>

  </div>
</motion.div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeKey && (
          <CountryModal
            countryKey={activeKey}
            onClose={() => setActiveKey(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}