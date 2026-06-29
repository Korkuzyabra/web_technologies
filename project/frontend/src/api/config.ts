export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';
export const API_USER = import.meta.env.VITE_API_USER ?? 'student';
export const API_PASSWORD = import.meta.env.VITE_API_PASSWORD ?? 'dvfu';

export function authHeader(): string {
  return `Basic ${btoa(`${API_USER}:${API_PASSWORD}`)}`;
}

export async function apiFetch(path: string, init: RequestInit = {}, auth = false): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (auth) headers.set('Authorization', authHeader());
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  return fetch(`${API_BASE}${path}`, { ...init, headers });
}

export async function apiJson<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  const response = await apiFetch(path, init, auth);
  if (!response.ok) throw new Error(`API ${response.status}: ${path}`);
  return response.json() as Promise<T>;
}
