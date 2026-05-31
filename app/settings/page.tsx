"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { User, Lock, Trash2, CheckCircle } from "lucide-react"
import { AnimatePresence } from "framer-motion"

export default function SettingsPage() {
  const t = useTranslations('settings')
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // كلمة المرور
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [originalName, setOriginalName] = useState("")

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setName(user.user_metadata?.name || '')
        setOriginalName(user.user_metadata?.name || '')
      }
    }
    getUser()
  }, [])

  // تحديث الاسم
  const handleUpdateName = async () => {
    if (!name.trim()) return
    setLoading(true)
    setError("")
    setSuccess("")

    const { error } = await supabase.auth.updateUser({
      data: { name }
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(t('nameSaved'))
      setOriginalName(name)
    }
    setLoading(false)
  }

  // تغيير كلمة المرور
  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setError(t('passwordTooShort'))
      return
    }
    setPasswordLoading(true)
    setError("")
    setSuccess("")

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(t('passwordSaved'))
      setCurrentPassword("")
      setNewPassword("")
    }
    setPasswordLoading(false)
  }

  // حذف الحساب
  const handleDeleteAccount = async () => {
  setDeleting(true)

  const response = await fetch('/api/delete-account', {
    method: 'DELETE',
  })

  if (response.ok) {
    await supabase.auth.signOut()
    router.push('/login')
  } else {
    const data = await response.json()
    setError(data.error || 'Failed to delete account')
    setDeleting(false)
    setShowDeleteConfirm(false)
  }
}
// lltauhloywjyrhmfyutf.supabase.co
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-serif text-3xl font-bold text-foreground">
              {t('title')}
            </h1>
            <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >

            {/* Success/Error */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <p className="text-sm text-primary">{success}</p>
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile */}
            <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-semibold text-foreground">{t('profileSection')}</h2>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">{t('nameLabel')}</Label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  className="bg-background border-border focus:border-primary h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">{t('emailLabel')}</Label>
                <Input
                  value={user?.email || ''}
                  disabled
                  className="bg-background border-border h-11 opacity-50"
                />
                <p className="text-xs text-muted-foreground">{t('emailNote')}</p>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
  onClick={handleUpdateName}
  disabled={loading || name === originalName || !name.trim()}
  className="bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full px-6 disabled:opacity-40"
>
  {loading ? '...' : t('saveChanges')}
</Button>
              </motion.div>
            </motion.div>

            {/* Password — فقط لو مش Google */}
            {user?.app_metadata?.provider !== 'google' && (
              <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-semibold text-foreground">{t('passwordSection')}</h2>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">{t('newPassword')}</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-background border-border focus:border-primary h-11"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleChangePassword}
                    disabled={passwordLoading || !newPassword}
                    className="bg-primary text-primary-foreground hover:bg-[#D9F87E] rounded-full px-6 disabled:opacity-40"
                  >
                    {passwordLoading ? '...' : t('changePassword')}
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Danger Zone */}
            <motion.div variants={item} className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-400" />
                </div>
                <h2 className="font-semibold text-red-400">{t('dangerSection')}</h2>
              </div>

              <p className="text-sm text-muted-foreground">{t('deleteDesc')}</p>

              <AnimatePresence>
                {showDeleteConfirm && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 space-y-3"
                  >
                    <p className="text-sm font-semibold text-red-400">{t('deleteConfirmTitle')}</p>
                    <p className="text-xs text-muted-foreground">{t('deleteConfirmDesc')}</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleDeleteAccount}
                        disabled={deleting}
                        className="flex-1 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-bold"
                      >
                        {deleting ? '...' : t('deleteConfirm')}
                      </Button>
                      <Button
                        onClick={() => setShowDeleteConfirm(false)}
                        variant="outline"
                        className="flex-1 h-10 rounded-full text-sm"
                      >
                        {t('deleteCancel')}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showDeleteConfirm && (
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  variant="outline"
                  className="rounded-full border-red-500/20 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('deleteAccount')}
                </Button>
              )}
            </motion.div>

          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}