import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  skipAuth?: boolean;
  params?: Record<string, string | number>;
}

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: any;
  refetch: () => void;
}

const cache = new Map<string, any>();

export function useApi<T = any>(resource: string, options: ApiOptions = {}): ApiState<T> {
  const { jwt } = useAuth();
  const [data, setData] = useState<T | null>(cache.get(resource) ?? null);
  const [loading, setLoading] = useState(!cache.has(resource));
  const [error, setError] = useState<any>(null);
  const refetchIndex = useRef(0);

  // Prepend API URL if not already absolute
  let url = resource.startsWith('http') ? resource : `${import.meta.env.VITE_API_URL}${resource}`;

  const refetch = () => {
    refetchIndex.current++;
    fetchData();
  };

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      let fetchUrl = url;
      if (options.params) {
        const params = new URLSearchParams(options.params as any).toString();
        fetchUrl += `?${params}`;
      }
      const res = await fetch(fetchUrl, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(jwt && !options.skipAuth ? { Authorization: `Bearer ${jwt}` } : {}),
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      cache.set(resource, json);
      setData(json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let didCancel = false;
    if (!cache.has(resource)) {
      (async () => {
        setLoading(true);
        setError(null);
        try {
          let fetchUrl = url;
          if (options.params) {
            const params = new URLSearchParams(options.params as any).toString();
            fetchUrl += `?${params}`;
          }
          const res = await fetch(fetchUrl, {
            method: options.method || 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...(jwt && !options.skipAuth ? { Authorization: `Bearer ${jwt}` } : {}),
              ...options.headers,
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
          });
          if (!res.ok) throw new Error(await res.text());
          const json = await res.json();
          cache.set(resource, json);
          if (!didCancel) setData(json);
        } catch (e) {
          if (!didCancel) setError(e);
        } finally {
          if (!didCancel) setLoading(false);
        }
      })();
    }
    return () => { didCancel = true; };
    // eslint-disable-next-line
  }, [resource, JSON.stringify(options), jwt]);

  // Prevent repeated fetches if data is empty and not loading
  useEffect(() => {
    if (data && Array.isArray(data) && data.length === 0) {
      setLoading(false);
    }
  }, [data]);

  return { data, loading, error, refetch };
}
