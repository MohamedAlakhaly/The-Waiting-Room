"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, PenLine, Users, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStories } from "@/lib/stories"
import { getSignaturesCount } from "@/lib/petition"
import { getUsersCount } from "@/lib/about"

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (value === 0) return
    let start = 0
    const duration = 1200
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value])

  return <span>{display.toLocaleString()}</span>
}

export function FeaturedStory() {
  const t = useTranslations('storiesPage')
  const [storiesCount, setStoriesCount] = useState(0)
  const [signaturesCount, setSignaturesCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const [stories, signatures, users] = await Promise.all([
        getStories(),
        getSignaturesCount(),
        getUsersCount(),
      ])
      setStoriesCount(stories.data?.length || 0)
      setSignaturesCount(signatures)
      setUsersCount(users)
      setLoading(false)
    }
    loadData()
  }, [])

  const stats = [
    { icon: BookOpen, label: t('statsStories'), value: storiesCount },
    { icon: FileCheck, label: t('statsSignatures'), value: signaturesCount },
    { icon: Users, label: t('statsMembers'), value: usersCount },
  ]

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* Stats card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
          {t('statsLabel')}
        </p>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-muted animate-pulse" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-10 bg-muted rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="font-serif text-lg font-bold text-primary">
                    <AnimatedCounter value={stat.value} />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* CTA card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col gap-4 flex-1"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"
        >
          <PenLine className="h-6 w-6 text-primary" />
        </motion.div>

        {/* Text */}
        <div>
          <h3 className="font-serif text-lg font-bold text-foreground">
            {t('ctaTitle')}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {t('ctaDesc')}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <Link href="/stories/new">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full font-bold">
                {t('shareStory')}
              </Button>
            </motion.div>
          </Link>
          <Link href="/petitions">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="w-full rounded-full border-primary/20 text-primary hover:bg-primary/10">
                {t('signPetition')}
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>

    </div>
  )
}