'use client';

import { useAnalytics } from '@/hooks/use-analytics';

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}
