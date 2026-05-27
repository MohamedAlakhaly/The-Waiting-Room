'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn, signInWithGoogle } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const t = useTranslations('login')

  // State للفورم
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  // Framer Motion variants
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  }

  // تسجيل الدخول بالإيميل وكلمة المرور
  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)

    if (error) {
      // ترجمة أشهر أخطاء Supabase لرسائل مفهومة
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password')
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please confirm your email first')
      } else {
        setError(error.message)
      }
      setLoading(false)
    } else {
      // نجح تسجيل الدخول — انتقل للرئيسية
      router.push('/')
      router.refresh()
    }
  }

  // تسجيل الدخول بـ Google — يفتح popup تلقائياً
  const handleGoogle = async () => {
    setGoogleLoading(true)
    setError('')
    await signInWithGoogle()
    // لا نوقف الـ loading هنا لأن Google تعيد التوجيه تلقائياً
  }

  // السماح بالضغط على Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSignIn()
  }

  // أضف في أعلى الـ component بعد الـ states
useEffect(() => {
  const checkSession = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) router.push('/')
  }
  checkSession()
}, [])

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <Link href="/language">
            <motion.h1
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="font-serif text-2xl font-bold text-[#C9F14E]"
            >
              The Waiting Room
            </motion.h1>
          </Link>
          <p className="mt-2 text-sm text-[#D1D5DB]">{t('subtitle')}</p>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-[#202020] bg-[#161616] p-6 space-y-4"
        >

          {/* رسالة الخطأ */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3"
            >
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Email */}
          <motion.div variants={item} className="space-y-2">
            <Label className="text-[#F5F4F4] text-sm">{t('email')}</Label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="email@example.com"
              className="bg-[#0F0F0F] border-[#202020] text-[#F5F4F4] placeholder:text-[#D1D5DB]/40 focus:border-[#C9F14E] h-12 rounded-xl"
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={item} className="space-y-2">
            <Label className="text-[#F5F4F4] text-sm">{t('password')}</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                className="bg-[#0F0F0F] border-[#202020] text-[#F5F4F4] focus:border-[#C9F14E] h-12 rounded-xl pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D1D5DB] hover:text-[#C9F14E] transition-colors"
              >
                {showPassword
                  ? <EyeOff className="h-4 w-4" />
                  : <Eye className="h-4 w-4" />
                }
              </button>
            </div>
          </motion.div>

          {/* Sign in button */}
          <motion.div variants={item}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-12 bg-[#C9F14E] text-[#0F0F0F] font-bold hover:bg-[#D9F87E] rounded-full disabled:opacity-50"
                onClick={handleSignIn}
                disabled={loading || !email || !password}
              >
                {loading ? (
                  // Spinner بسيط أثناء التحميل
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="h-4 w-4 border-2 border-[#0F0F0F] border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <LogIn className="mr-2 h-4 w-4" />
                )}
                {loading ? '...' : t('signIn')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div variants={item} className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#2A2A2A]" />
            <span className="text-xs text-[#D1D5DB]">{t('or')}</span>
            <div className="flex-1 h-px bg-[#2A2A2A]" />
          </motion.div>

          {/* Google button */}
          <motion.div variants={item}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full h-12 border-[#202020] text-[#F5F4F4] hover:border-[#C9F14E] hover:text-[#C9F14E] rounded-full bg-transparent disabled:opacity-50"
                onClick={handleGoogle}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="h-4 w-4 border-2 border-[#D1D5DB] border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                {t('googleSignIn')}
              </Button>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* Register link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center text-sm text-[#D1D5DB]"
        >
          {t('noAccount')}{' '}
          <Link href="/register" className="text-[#C9F14E] font-medium hover:underline">
            {t('register')}
          </Link>
        </motion.p>

      </div>
    </div>
  )
}