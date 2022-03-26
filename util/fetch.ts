export async function fetchJsonApi<T>(url: string, init?: RequestInit) {
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    ...init,
  });

  const body = await res.json();

  if (!res.ok) {
    throw body;
  }

  return body as T;
}