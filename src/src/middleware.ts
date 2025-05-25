import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('middleware', request.url)
  
  // すべてのCookieを取得して表示
  const allCookies = request.cookies.getAll()

  // tokenの存在と値を確認
  const tokenCookie = allCookies.find(cookie => cookie.name === 'token')
  const isAuthenticated = !!tokenCookie?.value
  console.log('Token cookie:', tokenCookie)
  console.log('Is authenticated:', isAuthenticated)

  // 未認証のユーザーはログインページにリダイレクト
  if (!isAuthenticated) {
    console.log("ユーザーは未認証です。ログインページにリダイレクトします。")
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 認証済みの場合はそのまま次の処理へ進む
  return NextResponse.next()
}

// matcherで特定のパスにのみミドルウェアを適用
export const config = {
  matcher: [
    '/books/:path*',
    '/api/books/:path*'
  ]
}
