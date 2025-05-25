export async function fetcher(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: 'GET',
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('認証に失敗しました。再度ログインしてください。');
    }
    throw new Error('リクエストに失敗しました');
  }

  return response.json();
}
