import { NextResponse, NextRequest } from "next/server"

export const config = { matcher: '/' }

export function middleware(request: NextRequest) {
  const { nextUrl } = request
  const { redirect } = NextResponse

  if(!Boolean(nextUrl.locale)) return redirect(`${nextUrl.origin}/en`)
}

