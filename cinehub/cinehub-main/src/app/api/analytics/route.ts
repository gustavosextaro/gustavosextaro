import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'analytics.json');

interface AnalyticsEvent {
  type: 'pageview' | 'click';
  component?: string;
  timestamp: number;
  referrer?: string;
  userAgent?: string;
}

interface AnalyticsData {
  events: AnalyticsEvent[];
}

async function ensureDataFile() {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      // File doesn't exist, create it
      await fs.writeFile(DATA_FILE, JSON.stringify({ events: [] }, null, 2));
    }
  } catch (error) {
    console.error('Error ensuring data file:', error);
  }
}

async function readData(): Promise<AnalyticsData> {
  try {
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading analytics data:', error);
    return { events: [] };
  }
}

async function writeData(data: AnalyticsData) {
  try {
    await ensureDataFile();
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing analytics data:', error);
  }
}

export async function POST(request: Request) {
  try {
    const event: AnalyticsEvent = await request.json();
    
    const data = await readData();
    data.events.push(event);
    
    // Keep only last 10,000 events to prevent file from growing too large
    if (data.events.length > 10000) {
      data.events = data.events.slice(-10000);
    }
    
    await writeData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await readData();
    
    // Calculate statistics
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    
    const totalPageviews = data.events.filter(e => e.type === 'pageview').length;
    const todayPageviews = data.events.filter(e => 
      e.type === 'pageview' && e.timestamp > oneDayAgo
    ).length;
    const weekPageviews = data.events.filter(e => 
      e.type === 'pageview' && e.timestamp > sevenDaysAgo
    ).length;
    
    // Count clicks by component
    const clicksByComponent: Record<string, number> = {};
    data.events
      .filter(e => e.type === 'click' && e.component)
      .forEach(e => {
        const component = e.component!;
        clicksByComponent[component] = (clicksByComponent[component] || 0) + 1;
      });
    
    // Count referrers
    const referrers: Record<string, number> = {};
    data.events
      .filter(e => e.type === 'pageview' && e.referrer)
      .forEach(e => {
        const ref = e.referrer!;
        if (ref) {
          const domain = new URL(ref).hostname || 'Direct';
          referrers[domain] = (referrers[domain] || 0) + 1;
        }
      });
    
    // TikTok percentage
    const tiktokViews = data.events.filter(e => 
      e.type === 'pageview' && e.referrer && e.referrer.includes('tiktok')
    ).length;
    const tiktokPercentage = totalPageviews > 0 
      ? Math.round((tiktokViews / totalPageviews) * 100) 
      : 0;
    
    return NextResponse.json({
      totalPageviews,
      todayPageviews,
      weekPageviews,
      clicksByComponent,
      referrers,
      tiktokPercentage,
      lastEvents: data.events.slice(-50).reverse(), // Last 50 events
    });
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
