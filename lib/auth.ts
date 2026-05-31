import { supabase } from './supabase'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL

// تسجيل حساب جديد
export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  })
  return { data, error }
}

// تسجيل دخول — يرجع isAdmin لتحديد التوجيه
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  const isAdmin = data?.user?.email === ADMIN_EMAIL
  return { data, error, isAdmin }
}

// تسجيل دخول بـ Google
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  return { data, error }
}

// تسجيل خروج
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// جلب المستخدم الحالي
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}