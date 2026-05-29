"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, MapPin, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StoryPage() {
  const { id } = useParams()
  const t = useTranslations('storyPage')
  const [story, setStory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const fetchStory = async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('id', id)
        .eq('is_approved', true)
        .single()

      if (error || !data) {
        setNotFound(true)
      } else {
        setStory(data)
      }
      setLoading(false)
    }
    fetchStory()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-6xl mb-4">📭</p>
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
              {t('notFound')}
            </h1>
            <p className="text-muted-foreground mb-6">{t('notFoundDesc')}</p>
            <Link href="/stories">
              <Button className="bg-primary text-primary-foreground rounded-full">
                {t('backToStories')}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isAnonymous = story.is_anonymous
  const name = story.display_name || ''
  const initials = name
    ? name.trim().split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
    : ''

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/stories">
              <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground -ml-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backToStories')}
              </Button>
            </Link>
          </motion.div>

          {/* Story card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    {isAnonymous
                      ? <User className="h-7 w-7 text-primary" />
                      : <span className="text-lg font-bold text-primary">{initials}</span>
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">
                      {isAnonymous ? t('anonymous') : name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isAnonymous ? t('identityProtected') : t('verifiedContributor')}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  {t('verifiedStory')}
                </span>
              </div>
            </div>

            {/* Meta info */}
            <div className="px-6 py-4 border-b border-border bg-muted/20">
              <div className="flex flex-wrap gap-4">
                {story.previous_country && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="capitalize">{story.previous_country} → Belgium</span>
                  </div>
                )}
                {story.years_in_belgium && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{story.years_in_belgium} {t('yearsInBelgium')}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{new Date(story.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap text-base">
                {story.content}
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <div className="rounded-xl bg-muted/30 border border-border p-4 flex items-start gap-3">
                <span className="text-primary text-lg">🔒</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAnonymous ? t('protectedAnonymous') : t('sharedConsent')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
          >
            <p className="font-semibold text-foreground mb-2">{t('similarStory')}</p>
            <p className="text-sm text-muted-foreground mb-4">{t('similarStoryDesc')}</p>
            <Link href="/stories/new">
              <Button className="bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full">
                {t('shareYourStory')}
              </Button>
            </Link>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  )
}