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
    if (response.status === 401) {
      deleteTokenCookie();
      throw new Error('認証に失敗しました。再度ログインしてください。');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'リクエストに失敗しました');
  }

  return response.json();
}

export { setTokenCookie, getTokenFromCookie, deleteTokenCookie };
