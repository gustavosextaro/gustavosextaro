// Analytics utility for tracking events
export type AnalyticsEventType = 'pageview' | 'click';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  component?: string;
  timestamp: number;
  referrer?: string;
  userAgent?: string;
}

export async function trackEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'userAgent' | 'referrer'>) {
  try {
    const referrer = typeof window !== 'undefined' ? document.referrer : '';
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
    
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
      referrer,
      userAgent,
    };

    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullEvent),
    });
  } catch (error) {
    // Silently fail - don't break the app if analytics fails
    console.error('Analytics tracking error:', error);
  }
}

export function trackPageView() {
  trackEvent({ type: 'pageview' });
}

export function trackClick(component: string) {
  trackEvent({ type: 'click', component });
}
