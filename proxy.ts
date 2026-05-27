import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const OPEN_PATHS = ['/language', '/login', '/register', '/auth', '/']
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (OPEN_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const language = request.cookies.get('language')?.value
  if (!language) {
    return NextResponse.redirect(new URL('/language', request.url))
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|icon|apple-icon|placeholder).*)',
  ],
}