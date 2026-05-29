import { supabase } from './supabase'

// تحقق إذا المستخدم وقّع مسبقاً
export async function hasUserSigned() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data } = await supabase
    .from('petition_signatures')
    .select('id')
    .eq('user_id', user.id)
    .single()

  return !!data
}

// إضافة توقيع
export async function signPetition({
  displayName,
  email,
  isAnonymous,
}: {
  displayName: string
  email: string
  isAnonymous: boolean
}) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: 'You must be signed in' } }

  // تحقق مجدداً إذا وقّع مسبقاً
  const alreadySigned = await hasUserSigned()
  if (alreadySigned) return { error: { message: 'You have already signed' } }

  const { data, error } = await supabase
    .from('petition_signatures')
    .insert({
      user_id: user.id,
      display_name: isAnonymous ? null : displayName,
      email: email || user.email,
      is_anonymous: isAnonymous,
    })
    .select()
    .single()

  return { data, error }
}

// جلب عدد التوقيعات
export async function getSignaturesCount() {
  const { count } = await supabase
    .from('petition_signatures')
    .select('*', { count: 'exact', head: true })

  return count || 0
}

// جلب آخر المؤيدين
export async function getRecentSupporters() {
  const { data } = await supabase
    .from('petition_signatures')
    .select('display_name, is_anonymous, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return data || []
}

export async function getUsersCount() {
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  return count || 0
}