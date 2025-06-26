import { PAGE_SIZE } from './constants';

export const apiBase = import.meta.env.VITE_API_URL;

export const login = async (id: string) => {
  const res = await fetch(`${apiBase}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const fetchFeedUrl = (page: number) => `${apiBase}/posts/feed?page=${page}&limit=${PAGE_SIZE}`;
