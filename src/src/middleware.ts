import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const getTokenFromCookie = (request: NextRequest) => {
  const tokenCookie = request.cookies.get('token');
  return tokenCookie?.value;
};

export function middleware(request: NextRequest) {
  
  const token = getTokenFromCookie(request);
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    console.log("ユーザーは未認証です。ログインページにリダイレクトします。")
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/books/:path*',
    '/api/books/:path*'
  ]
};
