"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SEOResult {
  score: number;
  title: string;
  description: string;
  headings: number;
  images: number;
  links: number;
  recommendations: string[];
}

const SEOChecker: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SEOResult | null>(null);
  const [error, setError] = useState('');

  const checkSEO = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      // Call the real SEO API
      const response = await fetch('/api/seo-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze URL');
      }

      const data = await response.json();
      
      // Transform API response to match our result format
      setResult({
        score: data.score,
        title: data.analysis.title || 'No title found',
        description: data.analysis.description || 'No description found',
        headings: data.analysis.totalHeadings || 0,
        images: data.analysis.totalImages || 0,
        links: data.analysis.totalLinks || 0,
        recommendations: data.recommendations || []
      });
    } catch (err: any) {
      setError(err.message || 'Failed to analyze the URL. Please check the URL and try again.');
      console.error('SEO Check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <section id="seo-checker" className="py-20 bg-gray-900 border-t border-green-500/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Free <span className="text-green-400">SEO</span> Checker
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Enter your website URL to get an instant SEO analysis with actionable insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800/50 border-green-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Website SEO Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                Get detailed insights about your website's SEO performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-gray-700 border-green-500/30 text-white placeholder:text-gray-400 focus:border-green-400"
                />
                <Button 
                  onClick={checkSEO}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8"
                >
                  {loading ? 'Analyzing...' : 'Check SEO'}
                </Button>
              </div>

              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}

              {result && (
                <div className="space-y-6 mt-8">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(result.score)} mb-2`}>
                      {result.score}
                    </div>
                    <div className="text-gray-400">SEO Score</div>
                    <Progress 
                      value={result.score} 
                      className="mt-4 h-3"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Technical Analysis</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Page Title</span>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            ✓ Found
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Meta Description</span>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            ✓ Present
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Headings</span>
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            {result.headings} found
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Images</span>
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            {result.images} total
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Links</span>
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            {result.links} found
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Recommendations</h3>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-300">
                            <span className="text-yellow-400 mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SEOChecker;