import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('middleware', request.url)
  
  const allCookies = request.cookies.getAll()

  const tokenCookie = allCookies.find(cookie => cookie.name === 'token')
  const isAuthenticated = !!tokenCookie?.value

  if (!isAuthenticated) {
    console.log("ユーザーは未認証です。ログインページにリダイレクトします。")
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/books/:path*',
    '/api/books/:path*'
  ]
}
