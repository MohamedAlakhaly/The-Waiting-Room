import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const OPEN_PATHS = ['/language', '/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (OPEN_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const language = request.cookies.get('language')?.value
  if (!language) {
    return NextResponse.redirect(new URL('/language', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|icon|apple-icon|placeholder).*)'],
}
