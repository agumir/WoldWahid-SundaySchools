import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const intlMiddleware = createMiddleware({
  locales: ['en', 'am'],
  defaultLocale: 'en',
  localePrefix: 'always'
})

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle i18n routing
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check authentication for protected routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/student')) {
    const token = await getToken({ req: request })
    if (!token) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}

