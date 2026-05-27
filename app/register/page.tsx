'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { EyeOff, Eye, UserPlus, CheckCircle, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp, signInWithGoogle } from '@/lib/auth'

export default function RegisterPage() {
  const router = useRouter()
  const t = useTranslations('register')

  // State للفورم
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // State للتحكم
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  }

  // التحقق من صحة البيانات
  const validate = () => {
    if (!name.trim()) return 'Please enter your name'
    if (!email.trim()) return 'Please enter your email'
    if (!email.includes('@')) return 'Please enter a valid email'
    if (password.length < 6) return 'Password must be at least 6 characters'
    if (password !== confirmPassword) return 'Passwords do not match'
    return null
  }

  // تسجيل حساب جديد
  const handleRegister = async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')

    const { error } = await signUp(email, password, name)

    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        setError('This email is already registered. Try signing in instead.')
      } else if (error.message.includes('invalid email')) {
        setError('Please enter a valid email address')
      } else if (error.message.includes('weak password')) {
        setError('Password is too weak. Use at least 6 characters')
      } else {
        setError(error.message)
      }
      setLoading(false)
    } else {
      // نجح — اظهر رسالة التحقق من البريد
      setSubmitted(true)
    }
  }

  // تسجيل بـ Google
  const handleGoogle = async () => {
    setGoogleLoading(true)
    setError('')
    await signInWithGoogle()
  }

  // Enter يشغّل التسجيل
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleRegister()
  }

  // شاشة نجاح التسجيل
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-full max-w-sm text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-6 h-20 w-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
          >
            <Mail className="h-10 w-10 text-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-2xl font-bold text-[#F5F4F4]"
          >
            Check your email
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 text-sm text-[#D1D5DB] leading-relaxed"
          >
            We sent a confirmation link to{' '}
            <span className="text-[#C9F14E] font-medium">{email}</span>.
            Click the link to activate your account.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Link href="/login">
              <Button className="w-full h-12 bg-[#C9F14E] text-[#0F0F0F] font-bold hover:bg-[#D9F87E] rounded-full">
                Go to Sign In
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center px-4 py-8">
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
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3"
              >
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Name */}
          <motion.div variants={item} className="space-y-2">
            <Label className="text-[#F5F4F4] text-sm">{t('name')}</Label>
            <Input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Mohamed A."
              className="bg-[#0F0F0F] border-[#202020] text-[#F5F4F4] placeholder:text-[#D1D5DB]/40 focus:border-[#C9F14E] h-12 rounded-xl"
            />
          </motion.div>

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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D1D5DB] hover:text-[#C9F14E] transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {/* مؤشر قوة كلمة المرور */}
            {password.length > 0 && (
              <div className="flex gap-1 mt-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      password.length >= (i + 1) * 2
                        ? password.length >= 8 ? 'bg-[#C9F14E]' : 'bg-amber-400'
                        : 'bg-[#2A2A2A]'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={item} className="space-y-2">
            <Label className="text-[#F5F4F4] text-sm">{t('confirmPassword')}</Label>
            <div className="relative">
              <Input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                className={`bg-[#0F0F0F] border-[#202020] text-[#F5F4F4] h-12 rounded-xl pr-10 transition-colors ${
                  confirmPassword && password !== confirmPassword
                    ? 'focus:border-red-500 border-red-500/50'
                    : confirmPassword && password === confirmPassword
                    ? 'focus:border-[#C9F14E] border-[#C9F14E]/50'
                    : 'focus:border-[#C9F14E]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D1D5DB] hover:text-[#C9F14E] transition-colors"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {/* أيقونة تطابق كلمة المرور */}
              {confirmPassword && password === confirmPassword && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-10 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle className="h-4 w-4 text-[#C9F14E]" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div variants={item}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-12 bg-[#C9F14E] text-[#0F0F0F] font-bold hover:bg-[#D9F87E] rounded-full disabled:opacity-40"
                onClick={handleRegister}
                disabled={loading || !name || !email || !password || !confirmPassword}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="h-4 w-4 border-2 border-[#0F0F0F] border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <UserPlus className="mr-2 h-4 w-4" />
                )}
                {loading ? '...' : t('submit')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div variants={item} className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#2A2A2A]" />
            <span className="text-xs text-[#D1D5DB]">{t('orContinueWith')}</span>
            <div className="flex-1 h-px bg-[#2A2A2A]" />
          </motion.div>

          {/* Google */}
          <motion.div variants={item}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full h-12 border-[#202020] text-[#F5F4F4] hover:border-[#C9F14E] hover:text-[#C9F14E] rounded-full bg-transparent disabled:opacity-40"
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

        {/* Login link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center text-sm text-[#D1D5DB]"
        >
          {t('hasAccount')}{' '}
          <Link href="/login" className="text-[#C9F14E] font-medium hover:underline">
            {t('login')}
          </Link>
        </motion.p>

      </div>
    </div>
  )
}