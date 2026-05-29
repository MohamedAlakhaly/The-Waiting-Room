import { supabase } from './supabase'

// جلب قصة المستخدم الحالي
export async function getUserStory() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: null }

  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return { data, error }
}

// تعديل القصة
export async function updateStory({
  id,
  content,
  previousCountry,
  yearsInBelgium,
  isAnonymous,
  displayName,
}: {
  id: string
  content: string
  previousCountry: string
  yearsInBelgium: string
  isAnonymous: boolean
  displayName?: string
}) {
  const { data, error } = await supabase
    .from('stories')
    .update({
      content,
      previous_country: previousCountry || null,
      years_in_belgium: yearsInBelgium || null,
      is_anonymous: isAnonymous,
      display_name: isAnonymous ? null : displayName || null,
      is_approved: false, // تحتاج موافقة منك بعد التعديل
    })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

// إضافة قصة جديدة
export async function addStory({
  content,
  previousCountry,
  yearsInBelgium,
  isAnonymous,
  displayName,
}: {
  content: string
  previousCountry: string
  yearsInBelgium: string
  isAnonymous: boolean
  displayName?: string
}) {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: { message: 'You must be signed in to share your story' } }
  }

  const { data, error } = await supabase
    .from('stories')
    .insert({
      user_id: user.id,
      content,
      previous_country: previousCountry || null,
      years_in_belgium: yearsInBelgium || null,
      is_anonymous: isAnonymous,
      display_name: isAnonymous ? null : displayName || null,
      is_approved: false,
    })
    .select()
    .single()

  return { data, error }
}

// جلب كل القصص المعتمدة
export async function getStories() {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function deleteStory(id: string) {
  const { error } = await supabase
    .from('stories')
    .delete()
    .eq('id', id)

  return { error }
}