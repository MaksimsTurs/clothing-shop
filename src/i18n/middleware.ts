import { createI18nMiddleware } from 'next-international/middleware'

import type { NextRequest } from 'next/server'

export const defaultLocale = 'en'
export const locales = ['ru', 'en', 'de'] as const

const i18nMiddleware = createI18nMiddleware({ defaultLocale, locales })

export function middleware(request: NextRequest) {
	return i18nMiddleware(request)
}

export const config = { matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'] }
