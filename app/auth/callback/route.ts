import { createSupabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=oauth_failed`)
  }

  if (code) {
    const supabase = await createSupabaseServer()
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      return NextResponse.redirect(`${origin}/login?error=exchange_failed`)
    }

    if (data.session) {
      const userEmail = data.session.user.email

      // تحديد الصفحة بعد تسجيل الدخول
      const redirectTo = userEmail === ADMIN_EMAIL ? '/admin' : '/'

      const response = NextResponse.redirect(`${origin}${redirectTo}`)

      // تأكد من وجود كوكي لغة
      const hasLang = request.headers.get('cookie')?.includes('language=')
      if (!hasLang) {
        response.cookies.set('language', 'en', {
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
          sameSite: 'lax',
        })
      }

      return response
    }
  }

  return NextResponse.redirect(`${origin}/login`)
}