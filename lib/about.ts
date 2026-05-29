import { supabase } from './supabase'

// عدد المستخدمين المسجلين
export async function getUsersCount() {
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  return count || 0
}

// إرسال رسالة تواصل
export async function sendContactMessage({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert({
      name,
      email,
      message,
    })
    .select()
    .single()

  return { data, error }
}