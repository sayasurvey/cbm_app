import { redirect } from 'next/navigation'

const cookieOptions = {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
};

const setTokenCookie = (token: string) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

const getTokenFromCookie = () => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];
};

const deleteTokenCookie = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export async function fetcher(url: string, options: RequestInit = {}) {
  const token = getTokenFromCookie();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: options.method || 'GET',
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    switch (response.status) {
      case 401:
        deleteTokenCookie();
        redirect('/login');
      case 403:
        throw new Error('権限がありません');
      case 404:
        throw new Error('ページが見つかりません');
      default:
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message);
    }
  }

  return response.json();
}

export { setTokenCookie, getTokenFromCookie, deleteTokenCookie };
