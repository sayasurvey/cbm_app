import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const getTokenFromCookie = (request: NextRequest) => {
  const tokenCookie = request.cookies.get('token');
  return tokenCookie?.value;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getTokenFromCookie(request);
  const isAuthenticated = !!token;

  // ルートパスの処理
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/books', request.url))
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // 保護されたルートの処理
  if (!isAuthenticated) {
    console.log("ユーザーは未認証です。ログインページにリダイレクトします。")
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/books/:path*',
    '/api/books/:path*'
  ]
};
