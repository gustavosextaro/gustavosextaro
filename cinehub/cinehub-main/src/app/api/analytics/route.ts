import { db } from '@/lib/firebase-admin';
import { NextRequest } from 'next/server';

interface AnalyticsEvent {
  type: 'pageview' | 'click';
  timestamp: number;
  userAgent: string;
  referrer: string;
  componentName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, component } = body;

    const event: AnalyticsEvent = {
      type,
      timestamp: Date.now(),
      userAgent: request.headers.get('user-agent') || 'Unknown',
      referrer: request.headers.get('referer') || 'Direct',
      ...(component && { componentName: component }),
    };

    // Save event to Firestore
    await db.collection('analytics').add(event);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return Response.json({ success: false, error: 'Failed to save event' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get all events from Firestore
    const snapshot = await db.collection('analytics').get();
    
    if (snapshot.empty) {
      return Response.json({
        totalPageviews: 0,
        todayPageviews: 0,
        weekPageviews: 0,
        clicksByComponent: {},
        referrers: {},
        tiktokPercentage: 0,
      });
    }

    const events: AnalyticsEvent[] = snapshot.docs.map(doc => doc.data() as AnalyticsEvent);

    // Calculate stats
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);

    const pageviews = events.filter(e => e.type === 'pageview');
    const clicks = events.filter(e => e.type === 'click');

    const totalPageviews = pageviews.length;
    const todayPageviews = pageviews.filter(e => e.timestamp > oneDayAgo).length;
    const weekPageviews = pageviews.filter(e => e.timestamp > oneWeekAgo).length;

    // Count clicks by component
    const clicksByComponent: Record<string, number> = {};
    clicks.forEach(event => {
      if (event.componentName) {
        clicksByComponent[event.componentName] = (clicksByComponent[event.componentName] || 0) + 1;
      }
    });

    // Count referrers
    const referrers: Record<string, number> = {};
    pageviews.forEach(event => {
      let referrer = 'Direct';
      if (event.referrer && event.referrer !== 'Direct') {
        try {
          const url = new URL(event.referrer);
          referrer = url.hostname;
        } catch {
          referrer = 'Direct';
        }
      }
      referrers[referrer] = (referrers[referrer] || 0) + 1;
    });

    // Calculate TikTok percentage
    const tiktokViews = pageviews.filter(e => 
      e.referrer.toLowerCase().includes('tiktok')
    ).length;
    const tiktokPercentage = totalPageviews > 0 
      ? Math.round((tiktokViews / totalPageviews) * 100)
      : 0;

    return Response.json({
      totalPageviews,
      todayPageviews,
      weekPageviews,
      clicksByComponent,
      referrers,
      tiktokPercentage,
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return Response.json({
      totalPageviews: 0,
      todayPageviews: 0,
      weekPageviews: 0,
      clicksByComponent: {},
      referrers: {},
      tiktokPercentage: 0,
    }, { status: 500 });
  }
}
