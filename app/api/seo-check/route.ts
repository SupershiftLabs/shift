import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

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
    let targetUrl: URL;
    try {
      targetUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch the webpage
    const response = await fetch(targetUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SuperShift SEO Checker/1.0)',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status}` },
        { status: 400 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Analyze SEO metrics
    const totalImages = $('img').length;
    const imagesWithoutAlt = $('img:not([alt]), img[alt=""]').length;
    const imagesWithAlt = totalImages - imagesWithoutAlt;

    const analysis = {
      // Title
      title: $('title').text() || '',
      titleLength: $('title').text().length,
      
      // Meta description
      description: $('meta[name="description"]').attr('content') || '',
      descriptionLength: ($('meta[name="description"]').attr('content') || '').length,
      
      // Headings
      h1Count: $('h1').length,
      h2Count: $('h2').length,
      h3Count: $('h3').length,
      totalHeadings: $('h1, h2, h3, h4, h5, h6').length,
      
      // Images
      totalImages,
      imagesWithoutAlt,
      imagesWithAlt,
      
      // Links
      totalLinks: $('a').length,
      internalLinks: $('a[href^="/"], a[href^="' + targetUrl.origin + '"]').length,
      externalLinks: $('a[href^="http"]').not('[href^="' + targetUrl.origin + '"]').length,
      
      // Open Graph
      hasOgTitle: $('meta[property="og:title"]').length > 0,
      hasOgDescription: $('meta[property="og:description"]').length > 0,
      hasOgImage: $('meta[property="og:image"]').length > 0,
      
      // Twitter Cards
      hasTwitterCard: $('meta[name="twitter:card"]').length > 0,
      
      // Structured Data
      hasStructuredData: $('script[type="application/ld+json"]').length > 0,
      structuredDataCount: $('script[type="application/ld+json"]').length,
      
      // Technical
      hasViewport: $('meta[name="viewport"]').length > 0,
      hasCanonical: $('link[rel="canonical"]').length > 0,
      hasRobots: $('meta[name="robots"]').length > 0,
      
      // Performance hints
      hasPreconnect: $('link[rel="preconnect"]').length,
      hasDnsPrefetch: $('link[rel="dns-prefetch"]').length,
    };

    // Calculate SEO score
    let score = 0;
    const recommendations: string[] = [];

    // Title (15 points)
    if (analysis.title) {
      if (analysis.titleLength >= 30 && analysis.titleLength <= 60) {
        score += 15;
      } else if (analysis.titleLength > 0) {
        score += 8;
        recommendations.push(`Title length (${analysis.titleLength}) should be between 30-60 characters`);
      }
    } else {
      recommendations.push('Add a page title tag');
    }

    // Meta Description (15 points)
    if (analysis.description) {
      if (analysis.descriptionLength >= 120 && analysis.descriptionLength <= 160) {
        score += 15;
      } else if (analysis.descriptionLength > 0) {
        score += 8;
        recommendations.push(`Meta description length (${analysis.descriptionLength}) should be between 120-160 characters`);
      }
    } else {
      recommendations.push('Add a meta description');
    }

    // Headings (10 points)
    if (analysis.h1Count === 1) {
      score += 5;
    } else if (analysis.h1Count === 0) {
      recommendations.push('Add exactly one H1 heading');
    } else {
      recommendations.push(`Found ${analysis.h1Count} H1 tags, should have exactly one`);
    }
    if (analysis.totalHeadings >= 3) {
      score += 5;
    } else {
      recommendations.push('Use more heading tags (H2, H3) for better structure');
    }

    // Images (10 points)
    if (analysis.totalImages > 0) {
      const altPercentage = (analysis.imagesWithAlt / analysis.totalImages) * 100;
      if (altPercentage === 100) {
        score += 10;
      } else if (altPercentage >= 80) {
        score += 7;
        recommendations.push(`${analysis.imagesWithoutAlt} images missing alt text`);
      } else {
        score += 3;
        recommendations.push(`${analysis.imagesWithoutAlt} images missing alt text - add descriptive alt attributes`);
      }
    }

    // Links (5 points)
    if (analysis.totalLinks >= 5) {
      score += 5;
    } else {
      recommendations.push('Add more internal and external links');
    }

    // Open Graph (15 points)
    if (analysis.hasOgTitle && analysis.hasOgDescription && analysis.hasOgImage) {
      score += 15;
    } else {
      const missing = [];
      if (!analysis.hasOgTitle) missing.push('og:title');
      if (!analysis.hasOgDescription) missing.push('og:description');
      if (!analysis.hasOgImage) missing.push('og:image');
      recommendations.push(`Add Open Graph tags: ${missing.join(', ')}`);
      score += (3 - missing.length) * 5;
    }

    // Twitter Cards (5 points)
    if (analysis.hasTwitterCard) {
      score += 5;
    } else {
      recommendations.push('Add Twitter Card meta tags');
    }

    // Structured Data (15 points)
    if (analysis.hasStructuredData) {
      if (analysis.structuredDataCount >= 2) {
        score += 15;
      } else {
        score += 10;
        recommendations.push('Add more structured data schemas (Organization, LocalBusiness, etc.)');
      }
    } else {
      recommendations.push('Add JSON-LD structured data markup');
    }

    // Technical SEO (10 points)
    if (analysis.hasViewport) score += 3;
    else recommendations.push('Add viewport meta tag for mobile optimization');
    
    if (analysis.hasCanonical) score += 3;
    else recommendations.push('Add canonical link tag');
    
    if (analysis.hasRobots) score += 2;
    else recommendations.push('Add robots meta tag');
    
    if (analysis.hasPreconnect > 0 || analysis.hasDnsPrefetch > 0) score += 2;
    else recommendations.push('Add resource hints (preconnect, dns-prefetch) for better performance');

    // Cap score at 100
    score = Math.min(score, 100);

    return NextResponse.json({
      score,
      url: targetUrl.toString(),
      analysis,
      recommendations: recommendations.slice(0, 10), // Top 10 recommendations
    });

  } catch (error) {
    console.error('SEO Check Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze URL. Please try again.' },
      { status: 500 }
    );
  }
}
