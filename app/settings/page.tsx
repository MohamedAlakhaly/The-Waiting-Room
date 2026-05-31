"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, Clock, Users, FileText, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL

export default function AdminPage() {
  const router = useRouter()
  const t = useTranslations('admin')
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [stories, setStories] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [stats, setStats] = useState({ users: 0, signatures: 0, stories: 0 })
  const [activeTab, setActiveTab] = useState<'stories' | 'messages'>('stories')

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push('/')
        return
      }
      setIsAdmin(true)
      await loadData()
      setLoading(false)
    }
    checkAdmin()
  }, [])



  const loadData = async () => {
    const { data: storiesData } = await supabase
      .from('stories').select('*').order('created_at', { ascending: false })
    const { data: messagesData } = await supabase
      .from('contact_messages').select('*').order('created_at', { ascending: false })
    const { count: usersCount } = await supabase
      .from('profiles').select('*', { count: 'exact', head: true })
    const { count: signaturesCount } = await supabase
      .from('petition_signatures').select('*', { count: 'exact', head: true })

    setStories(storiesData || [])
    setMessages(messagesData || [])
    setStats({
      users: usersCount || 0,
      signatures: signaturesCount || 0,
      stories: storiesData?.length || 0,
    })
  }

  const approveStory = async (id: string) => {
    await supabase.from('stories').update({ is_approved: true }).eq('id', id)
    setStories(prev => prev.map(s => s.id === id ? { ...s, is_approved: true } : s))
  }

  const rejectStory = async (id: string) => {
    await supabase.from('stories').delete().eq('id', id)
    setStories(prev => prev.filter(s => s.id !== id))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!isAdmin) return null

  const pendingStories = stories.filter(s => !s.is_approved)
  const approvedStories = stories.filter(s => s.is_approved)

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-4 py-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-primary">{t('title')}</h1>
            <p className="text-muted-foreground text-sm mt-1">{t('subtitle')}</p>
          </div>
          <Button
            variant="outline"
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/login')
            }}
            className="rounded-full border-red-500/20 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t('signOut')}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: t('members'), value: stats.users, icon: Users, color: "text-blue-400" },
            { label: t('signatures'), value: stats.signatures, icon: FileText, color: "text-primary" },
            { label: t('allStories'), value: stats.stories, icon: FileText, color: "text-purple-400" },
            { label: t('pending'), value: pendingStories.length, icon: Clock, color: "text-amber-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
              <p className={`font-serif text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'stories', label: `${t('storiesTab')} (${pendingStories.length} ${t('pendingLabel')})` },
            { id: 'messages', label: `${t('messagesTab')} (${messages.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div className="space-y-4">
            {pendingStories.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
                  ⏳ {t('pendingReview')} ({pendingStories.length})
                </p>
                <div className="space-y-3">
                  {pendingStories.map(story => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-amber-500/20 bg-card p-5"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {story.is_anonymous ? 'Anonymous' : (story.display_name || 'Unknown')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {story.previous_country && `${story.previous_country} → BE · `}
                            {new Date(story.created_at).toLocaleDateString('en-GB')}
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            size="sm"
                            onClick={() => approveStory(story.id)}
                            className="rounded-full bg-primary text-primary-foreground h-8 px-3 text-xs"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            {t('approve')}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectStory(story.id)}
                            className="rounded-full border-red-500/20 text-red-400 hover:bg-red-500/10 h-8 px-3 text-xs"
                          >
                            <XCircle className="mr-1 h-3 w-3" />
                            {t('delete')}
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 bg-muted/20 rounded-xl p-3">
                        {story.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {approvedStories.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 mt-6">
                  ✅ {t('published')} ({approvedStories.length})
                </p>
                <div className="space-y-3">
                  {approvedStories.map(story => (
                    <div
                      key={story.id}
                      className="rounded-2xl border border-primary/10 bg-card p-5 opacity-70"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-foreground">
                          {story.is_anonymous ? 'Anonymous' : (story.display_name || 'Unknown')}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {t('published')}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectStory(story.id)}
                            className="rounded-full border-red-500/20 text-red-400 hover:bg-red-500/10 h-7 px-2 text-xs"
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{story.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stories.length === 0 && (
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-muted-foreground">{t('noStories')}</p>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-muted-foreground">{t('noMessages')}</p>
              </div>
            ) : (
              messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{msg.name || 'Anonymous'}</p>
                      <a href={`mailto:${msg.email}`} className="text-xs text-primary hover:underline">
                        {msg.email}
                      </a>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.created_at).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed bg-muted/20 rounded-xl p-3">
                    {msg.message}
                  </p>
                  <div className="mt-3">
                    <a
                      href={`mailto:${msg.email}?subject=Re: The Waiting Room`}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      {t('replyEmail')}
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  )
}