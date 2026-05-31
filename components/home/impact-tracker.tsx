"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { getSignaturesCount } from "@/lib/petition"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

function AnimatedNumber({ value, suffix = "+" }: { value: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 })
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, motionValue, value])

  useEffect(() => {
    spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.floor(v).toLocaleString() + suffix
    })
  }, [spring, suffix])

  return <span ref={ref}>0</span>
}

export function ImpactTracker() {
  const t = useTranslations('impact')
  const [signaturesCount, setSignaturesCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const goalCount = 10000
  const sectionRef = useRef(null)

  useEffect(() => {
    getSignaturesCount().then(count => {
      setSignaturesCount(count)
      setLoading(false)
    })
  }, [])

  const progress = (signaturesCount / goalCount) * 100

  const stats = [
    { number: "3+", label: t('yearsWait') },
    { number: "47%", label: t('rejectionRate') },
    { number: "12", label: t('countriesAffected') },
  ]

  return (
    <section ref={sectionRef} className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl bg-secondary p-8 sm:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Left */}
            <div className="flex flex-col gap-6">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                {t('label')}
              </motion.span>

              {/* العداد الحقيقي */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                viewport={{ once: true }}
                className="font-serif text-6xl font-bold text-primary sm:text-7xl lg:text-8xl"
              >
                {loading ? (
                  <span className="text-muted-foreground/30">...</span>
                ) : (
                  <AnimatedNumber value={signaturesCount} />
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col gap-1"
              >
                <span className="text-xl font-medium text-secondary-foreground">{t('signatures')}</span>
                <span className="text-base text-muted-foreground">{t('signaturesDesc')}</span>
              </motion.div>

              {/* Progress bar */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">0</span>
                  <motion.span
                    className="text-sm font-bold text-primary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {loading ? '...' : `${Math.min(Math.round(progress), 100)}%`}
                  </motion.span>
                  <span className="text-sm text-muted-foreground">{goalCount.toLocaleString()}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: loading ? '0%' : `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t('goal', { count: goalCount.toLocaleString() })}
                </p>
              </div>

              {/* CTA زر */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/petitions">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button className="rounded-full font-bold px-6 h-12">
                      <FileText className="mr-2 h-4 w-4" />
                      {t('signNow')}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Right — stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6 content-center">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  whileHover={{ scale: 1.03, borderColor: "var(--primary)" }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-border bg-muted/30 p-5 flex flex-col gap-1 cursor-default"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
                    viewport={{ once: true }}
                    className="font-serif text-3xl font-bold text-primary"
                  >
                    {stat.number}
                  </motion.span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}