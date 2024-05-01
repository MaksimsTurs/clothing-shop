import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server"

export const config = { matcher: '/' }

export function middleware(request: NextRequest) {
  const language = cookies().get('locale')?.value || 'en'
  const { nextUrl } = request
  const { redirect } = NextResponse

  if(!nextUrl.locale) return redirect(`${nextUrl.origin}/${language}/home`)
}