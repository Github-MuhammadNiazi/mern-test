import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { PAGE_SIZE } from '../constants';
import { fetchFeedUrl } from '../api';

interface Post {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

const Feed: React.FC = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement | null>(null);

  const { data, loading, error } = useApi<Post[]>(fetchFeedUrl(page));

  useEffect(() => {
    if (data && data.length > 0) {
      setItems(prev => [...prev, ...data]);
      if (data.length < PAGE_SIZE) setHasMore(false);
    } else if (data && data.length === 0) {
      if (page === 0) {
        setItems([]);
        setHasMore(false);
      } else {
        setHasMore(false);
      }
    }
    // eslint-disable-next-line
  }, [data]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    const option = { root: null, rootMargin: '20px', threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => { if (loader.current) observer.unobserve(loader.current); };
  }, [handleObserver]);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Feed</h2>
      {items.length === 0 && !loading && !hasMore && (
        <div style={{ color: '#888', textAlign: 'center' }}>No Posts Found</div>
      )}
      {items.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', marginBottom: 12, padding: 12 }}>
          <div><b>{post.author}</b> <span style={{ color: '#888' }}>{new Date(post.createdAt).toLocaleString()}</span></div>
          <div>{post.content}</div>
        </div>
      ))}
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{String(error)}</div>}
      <div ref={loader} />
      {!hasMore && items.length > 0 && <div style={{ color: '#888', textAlign: 'center' }}>No more posts</div>}
    </div>
  );
};

export default Feed;
