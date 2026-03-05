import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
})

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protect admin routes
  if (pathname.includes('/admin')) {
    const sessionCookie =
      request.cookies.get('sb-access-token') ||
      request.cookies.get('supabase-auth-token')

    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon|icons|images|fonts).*)'],
}
