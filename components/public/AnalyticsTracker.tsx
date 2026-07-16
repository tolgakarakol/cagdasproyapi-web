'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track public pages, ignore admin
    if (!pathname.startsWith('/admin')) {
      fetch('/api/analytics', { method: 'POST' }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
