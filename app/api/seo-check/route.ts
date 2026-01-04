import { NextRequest, NextResponse } from 'next/server';

// Google PageSpeed Insights API
const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY || ''; // Optional: works without key but with rate limits

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    let targetUrl: string;
    try {
      const urlObj = new URL(url);
      targetUrl = urlObj.toString();
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format. Please include http:// or https://' },
        { status: 400 }
      );
    }

    // Fetch data from PageSpeed Insights for both mobile and desktop
    const [mobileResult, desktopResult] = await Promise.all([
      fetchPageSpeedData(targetUrl, 'mobile'),
      fetchPageSpeedData(targetUrl, 'desktop')
    ]);

    if (!mobileResult.success || !desktopResult.success) {
      return NextResponse.json(
        { error: mobileResult.error || desktopResult.error || 'Failed to analyze URL' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      mobile: mobileResult.data,
      desktop: desktopResult.data,
      url: targetUrl,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('PageSpeed API Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze page. Please try again later.' },
      { status: 500 }
    );
  }
}

async function fetchPageSpeedData(url: string, strategy: 'mobile' | 'desktop') {
  try {
    // Build URL with all categories
    const params = new URLSearchParams({
      url,
      strategy,
    });

    // Add all categories
    params.append('category', 'performance');
    params.append('category', 'accessibility');
    params.append('category', 'best-practices');
    params.append('category', 'seo');

    if (API_KEY) {
      params.append('key', API_KEY);
    }

    const response = await fetch(`${PAGESPEED_API_URL}?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`
      };
    }

    const data = await response.json();
    
    // Extract key metrics
    const lighthouse = data.lighthouseResult;
    const categories = lighthouse?.categories || {};
    const audits = lighthouse?.audits || {};

    // Performance metrics
    const metrics = {
      // Scores (0-100)
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),

      // Core Web Vitals
      lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
      lcpScore: audits['largest-contentful-paint']?.score || 0,
      fid: audits['max-potential-fid']?.displayValue || 'N/A',
      fidScore: audits['max-potential-fid']?.score || 0,
      cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
      clsScore: audits['cumulative-layout-shift']?.score || 0,
      fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
      fcpScore: audits['first-contentful-paint']?.score || 0,
      tti: audits['interactive']?.displayValue || 'N/A',
      ttiScore: audits['interactive']?.score || 0,
      si: audits['speed-index']?.displayValue || 'N/A',
      siScore: audits['speed-index']?.score || 0,
      tbt: audits['total-blocking-time']?.displayValue || 'N/A',
      tbtScore: audits['total-blocking-time']?.score || 0,

      // Opportunities (top 5 improvements)
      opportunities: Object.values(audits)
        .filter((audit: any) => 
          audit.score !== null && 
          audit.score < 0.9 && 
          audit.details?.overallSavingsMs && 
          audit.details.overallSavingsMs > 0
        )
        .sort((a: any, b: any) => 
          (b.details?.overallSavingsMs || 0) - (a.details?.overallSavingsMs || 0)
        )
        .slice(0, 5)
        .map((audit: any) => ({
          title: audit.title,
          description: audit.description,
          savings: audit.displayValue || `${audit.details?.overallSavingsMs}ms`
        })),

      // Diagnostics (warnings and issues)
      diagnostics: Object.values(audits)
        .filter((audit: any) => 
          audit.score !== null && 
          audit.score < 1 && 
          audit.details?.items && 
          audit.details.items.length > 0
        )
        .slice(0, 5)
        .map((audit: any) => ({
          title: audit.title,
          description: audit.description,
          itemsCount: audit.details?.items?.length || 0
        })),

      // Screenshot and other data
      screenshot: lighthouse?.audits?.['final-screenshot']?.details?.data || null,
      fetchTime: lighthouse?.fetchTime || new Date().toISOString(),
    };

    return {
      success: true,
      data: metrics
    };

  } catch (error) {
    console.error(`PageSpeed fetch error (${strategy}):`, error);
    return {
      success: false,
      error: 'Failed to fetch PageSpeed data. The service might be temporarily unavailable.'
    };
  }
}
