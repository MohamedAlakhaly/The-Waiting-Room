import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const OPEN_PATHS = ['/language', '/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow static files and open paths
  if (OPEN_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Check language cookie — redirect to /language on first visit
  const language = request.cookies.get('language')?.value
  if (!language) {
    return NextResponse.redirect(new URL('/language', request.url))
  }

  // Set RTL direction header for use in layout
  const response = NextResponse.next()
  const rtlLangs = ['ar', 'fa']
  response.headers.set('x-lang', language)
  response.headers.set('x-dir', rtlLangs.includes(language) ? 'rtl' : 'ltr')

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|icon|apple-icon|placeholder).*)',
  ],
}