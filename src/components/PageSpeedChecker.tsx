'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface PageSpeedMetrics {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  lcp: string
  fid: string
  cls: string
  fcp: string
  tti: string
  si: string
  tbt: string
  opportunities: Array<{
    title: string
    description: string
    savings: string
  }>
  diagnostics: Array<{
    title: string
    description: string
    itemsCount?: number
  }>
  screenshot?: string | null
}

interface PageSpeedResult {
  mobile: PageSpeedMetrics
  desktop: PageSpeedMetrics
  url: string
  timestamp: string
}

const PageSpeedChecker: React.FC = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PageSpeedResult | null>(null)
  const [error, setError] = useState('')

  const analyzePageSpeed = async () => {
    if (!url) {
      setError('Please enter a valid URL')
      return
    }

    // Add https:// if missing
    let finalUrl = url.trim()
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl
    }

    setLoading(true)
    setError('')
    setResult(null)
    
    try {
      const response = await fetch('/api/seo-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: finalUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze page')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Failed to analyze page. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 border-green-500'
    if (score >= 50) return 'bg-yellow-500/20 border-yellow-500'
    return 'bg-red-500/20 border-red-500'
  }

  const ScoreCard = ({ title, score }: { title: string; score: number }) => (
    <div className={`p-4 rounded-lg border ${getScoreBg(score)}`}>
      <div className="text-sm text-gray-400 mb-2">{title}</div>
      <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
        {score}
      </div>
      <Progress value={score} className="mt-2 h-2" />
    </div>
  )

  const MetricsDisplay = ({ metrics }: { metrics: PageSpeedMetrics }) => (
    <div className="space-y-6">
      {/* Scores Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ScoreCard title="Performance" score={metrics.performance} />
        <ScoreCard title="Accessibility" score={metrics.accessibility} />
        <ScoreCard title="Best Practices" score={metrics.bestPractices} />
        <ScoreCard title="SEO" score={metrics.seo} />
      </div>

      {/* Core Web Vitals */}
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Core Web Vitals</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-400">LCP</div>
            <div className="text-lg font-semibold text-white">{metrics.lcp}</div>
            <div className="text-xs text-gray-500">Largest Contentful Paint</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">FID</div>
            <div className="text-lg font-semibold text-white">{metrics.fid}</div>
            <div className="text-xs text-gray-500">First Input Delay</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">CLS</div>
            <div className="text-lg font-semibold text-white">{metrics.cls}</div>
            <div className="text-xs text-gray-500">Cumulative Layout Shift</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">TBT</div>
            <div className="text-lg font-semibold text-white">{metrics.tbt}</div>
            <div className="text-xs text-gray-500">Total Blocking Time</div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Additional Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-400">FCP</div>
            <div className="text-lg font-semibold text-white">{metrics.fcp}</div>
            <div className="text-xs text-gray-500">First Contentful Paint</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">TTI</div>
            <div className="text-lg font-semibold text-white">{metrics.tti}</div>
            <div className="text-xs text-gray-500">Time to Interactive</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Speed Index</div>
            <div className="text-lg font-semibold text-white">{metrics.si}</div>
            <div className="text-xs text-gray-500">Visual Completeness</div>
          </div>
        </div>
      </div>

      {/* Opportunities */}
      {metrics.opportunities && metrics.opportunities.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Opportunities <Badge variant="outline" className="ml-2">{metrics.opportunities.length}</Badge>
          </h3>
          <div className="space-y-3">
            {metrics.opportunities.map((opp, index) => (
              <div key={index} className="border-l-4 border-yellow-500 pl-4 py-2">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-white">{opp.title}</h4>
                  <span className="text-green-400 text-sm font-medium">{opp.savings}</span>
                </div>
                <p className="text-sm text-gray-400">{opp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diagnostics */}
      {metrics.diagnostics && metrics.diagnostics.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Diagnostics <Badge variant="outline" className="ml-2">{metrics.diagnostics.length}</Badge>
          </h3>
          <div className="space-y-3">
            {metrics.diagnostics.map((diag, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-semibold text-white mb-1">{diag.title}</h4>
                <p className="text-sm text-gray-400">{diag.description}</p>
                {diag.itemsCount && (
                  <span className="text-xs text-gray-500 mt-1 block">
                    {diag.itemsCount} item{diag.itemsCount !== 1 ? 's' : ''} affected
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <section id="pagespeed-checker" className="py-20 bg-gray-900 border-t border-green-500/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Free <span className="text-green-400 glow-green">PageSpeed</span> Checker
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Powered by Google PageSpeed Insights - Get comprehensive performance, accessibility, SEO, and best practices analysis
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="bg-gray-800/50 border-green-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Website Performance Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                Real-time analysis using Google's Lighthouse technology
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && analyzePageSpeed()}
                  className="bg-gray-700 border-green-500/30 text-white placeholder:text-gray-400"
                />
                <Button 
                  onClick={analyzePageSpeed}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 shadow-glow-green whitespace-nowrap"
                >
                  {loading ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                  <div className="text-red-400 font-semibold mb-1">Error</div>
                  <div className="text-red-300 text-sm">{error}</div>
                </div>
              )}

              {loading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
                  <p className="text-gray-400">Analyzing your website with Google PageSpeed Insights...</p>
                  <p className="text-gray-500 text-sm mt-2">This usually takes 30-60 seconds</p>
                </div>
              )}

              {result && !loading && (
                <div className="space-y-6 mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Analysis Results</h3>
                      <p className="text-sm text-gray-400">
                        {result.url} - {new Date(result.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <Tabs defaultValue="mobile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                      <TabsTrigger value="mobile" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                        📱 Mobile
                      </TabsTrigger>
                      <TabsTrigger value="desktop" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                        💻 Desktop
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="mobile" className="mt-6">
                      <MetricsDisplay metrics={result.mobile} />
                    </TabsContent>
                    <TabsContent value="desktop" className="mt-6">
                      <MetricsDisplay metrics={result.desktop} />
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>Powered by <a href="https://developers.google.com/speed/pagespeed/insights/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Google PageSpeed Insights API</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageSpeedChecker
