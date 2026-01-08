'use client';

import { useEffect } from 'react';
import { trackPageView, trackClick } from '@/lib/analytics';

export function useAnalytics() {
  useEffect(() => {
    // Track pageview when component mounts
    trackPageView();
  }, []);

  return { trackClick };
}
