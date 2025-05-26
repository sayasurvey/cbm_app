export async function fetcher(url: string, options: RequestInit = {}) {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

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
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      throw new Error('認証に失敗しました。再度ログインしてください。');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'リクエストに失敗しました');
  }

  return response.json();
}
