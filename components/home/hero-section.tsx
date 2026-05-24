"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef } from "react"
import { FileText, MessageSquarePlus, Heart, User } from "lucide-react"

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 })

  useEffect(() => {
    motionValue.set(value)
  }, [motionValue, value])

  useEffect(() => {
    spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.floor(v).toLocaleString() + suffix
    })
  }, [spring, suffix])

  return <span ref={ref}>0</span>
}

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Content */}
          <div className="flex flex-col gap-6">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground w-fit"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {t('badge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              <span className="text-balance">
                {t('title')}{" "}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-primary"
                >
                  {t('titleHighlight')}
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              {t('description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/petitions">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    {t('signPetition')}
                  </Button>
                </motion.div>
              </Link>
              <Link href="/stories/new">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="ghost">
                    <MessageSquarePlus className="mr-2 h-4 w-4" />
                    {t('shareStory')}
                  </Button>
                </motion.div>
              </Link>
              <Link href="/donate">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline">
                    <Heart className="mr-2 h-4 w-4" />
                    {t('supportWork')}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Visual بدل الصورة */}
<motion.div
  initial={{ opacity: 0, scale: 0.95, x: 40 }}
  animate={{ opacity: 1, scale: 1, x: 0 }}
  transition={{ duration: 0.7, delay: 0.2 }}
  className="relative"
>
  <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
    <div className="aspect-[4/3] flex flex-col items-center justify-center gap-6 p-8">

      {/* Avatars متداخلة */}
      <div className="flex -space-x-3">
        {["bg-blue-500/20 text-blue-400", "bg-emerald-500/20 text-emerald-400", "bg-amber-500/20 text-amber-400", "bg-purple-500/20 text-purple-400"].map((color, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 200 }}
            className={`h-14 w-14 rounded-full border-2 border-background flex items-center justify-center ${color}`}
          >
            <User className="h-7 w-7" />
          </motion.div>
        ))}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="h-14 w-14 rounded-full border-2 border-background bg-primary/20 text-primary flex items-center justify-center text-xs font-bold"
        >
          +1k
        </motion.div>
      </div>

      {/* Countries */}
      <div className="flex flex-wrap justify-center gap-2">
        {["🇾🇪 Yemen", "🇸🇾 Syria", "🇦🇫 Afghanistan", "🇸🇩 Sudan", "🇵🇸 Palestine"].map((country, i) => (
          <motion.span
            key={country}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            className="rounded-full bg-muted border border-border px-3 py-1 text-xs text-muted-foreground"
          >
            {country}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-muted-foreground text-center max-w-xs"
      >
        {t('affected')}
      </motion.p>
    </div>
  </div>

  {/* Floating stat card */}
  <motion.div
    initial={{ opacity: 0, y: 20, x: -20 }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    transition={{ duration: 0.6, delay: 0.7 }}
    className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-card p-4 shadow-xl hidden sm:block"
  >
    <p className="text-2xl font-bold text-primary">
      <AnimatedNumber value={1248} suffix="+" />
    </p>
    <p className="text-xs text-muted-foreground mt-0.5">{t('affected')}</p>
  </motion.div>

</motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-card p-4 shadow-xl hidden sm:block"
            >
              <p className="text-2xl font-bold text-primary">
                <AnimatedNumber value={1248} suffix="+" />
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{t('affected')}</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}