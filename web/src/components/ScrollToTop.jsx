import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resets scroll position on route change (hash links keep native behaviour). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
