import { createSupabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

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
      const response = NextResponse.redirect(`${origin}/`)
      // تأكد من وجود كوكي لغة حتى ما يرجّعه proxy لـ /language
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