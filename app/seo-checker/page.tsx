"use client";
import { useState } from 'react';
import { ArrowLeft, Search, CheckCircle, XCircle, AlertTriangle, Loader2, Mail, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function SEOCheckerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    seoScore: ''
  });
  const [contactStatus, setContactStatus] = useState('');

  const checkSEO = async () => {
    if (!url) return;

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch('/api/seo-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check SEO');
      }

      setResults(data);
      
      // Pre-fill contact form with SEO score
      setContactForm(prev => ({
        ...prev,
        seoScore: `${data.score}/100 SEO Score for ${url}`
      }));

    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });

      if (response.ok) {
        setContactStatus('success');
        setContactForm({ name: '', email: '', phone: '', message: '', seoScore: contactForm.seoScore });
      } else {
        setContactStatus('error');
      }
    } catch (err) {
      setContactStatus('error');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white hover:text-green-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Free SEO Checker Tool
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Analyze your website's SEO performance in seconds
          </p>
          <p className="text-gray-400 mb-12">
            Get a comprehensive SEO audit with actionable insights to improve your search rankings
          </p>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkSEO()}
                placeholder="Enter your website URL (e.g., https://example.com)"
                className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                disabled={loading}
              />
              <button
                onClick={checkSEO}
                disabled={loading || !url}
                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Check SEO
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section className="pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Overall Score */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-8 border border-gray-700 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">SEO Score</h2>
              <div className={`text-7xl font-bold mb-4 ${getScoreColor(results.score)}`}>
                {results.score}
                <span className="text-3xl text-gray-400">/100</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ${getScoreBg(results.score)}`}
                  style={{ width: `${results.score}%` }}
                />
              </div>
              <p className="text-gray-300 text-lg">
                {results.score >= 80 && 'Excellent! Your SEO is in great shape.'}
                {results.score >= 60 && results.score < 80 && 'Good, but there\'s room for improvement.'}
                {results.score < 60 && 'Needs work. Let us help you improve!'}
              </p>
            </div>

            {/* Issues Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-white">Passed</h3>
                </div>
                <p className="text-3xl font-bold text-green-500">{results.passed}</p>
                <p className="text-gray-400 mt-2">checks passed</p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-white">Warnings</h3>
                </div>
                <p className="text-3xl font-bold text-yellow-500">{results.warnings}</p>
                <p className="text-gray-400 mt-2">need attention</p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <h3 className="text-lg font-semibold text-white">Failed</h3>
                </div>
                <p className="text-3xl font-bold text-red-500">{results.failed}</p>
                <p className="text-gray-400 mt-2">critical issues</p>
              </div>
            </div>

            {/* Detailed Issues */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Detailed Analysis</h3>
              <div className="space-y-4">
                {results.issues.map((issue: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      issue.status === 'pass'
                        ? 'bg-green-500/10 border-green-500/50'
                        : issue.status === 'warning'
                        ? 'bg-yellow-500/10 border-yellow-500/50'
                        : 'bg-red-500/10 border-red-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {issue.status === 'pass' && <CheckCircle className="w-5 h-5 text-green-500 mt-1" />}
                      {issue.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />}
                      {issue.status === 'fail' && <XCircle className="w-5 h-5 text-red-500 mt-1" />}
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{issue.title}</h4>
                        <p className="text-gray-300 text-sm">{issue.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Need Help Improving Your SEO?
            </h2>
            <p className="text-xl text-gray-300">
              Let our experts help you boost your search rankings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                
                <div className="space-y-4">
                  <a 
                    href="mailto:admin@supershiftlabs.com"
                    className="flex items-center gap-4 text-gray-300 hover:text-green-400 transition-colors"
                  >
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email Us</p>
                      <p className="font-semibold">admin@supershiftlabs.com</p>
                    </div>
                  </a>

                  <a 
                    href="tel:+13195370228"
                    className="flex items-center gap-4 text-gray-300 hover:text-green-400 transition-colors"
                  >
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Call Us</p>
                      <p className="font-semibold">+1 (319) 537-0228</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="font-semibold">Davenport, Iowa</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">Why Choose Us?</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Expert SEO optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Fast turnaround time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Iowa-based support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Proven results</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                    placeholder="Tell us about your SEO needs..."
                  />
                </div>

                {contactForm.seoScore && (
                  <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
                    SEO Result: {contactForm.seoScore}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={contactStatus === 'sending'}
                  className="w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {contactStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-center">
                    ✓ Message sent! We'll get back to you soon.
                  </div>
                )}

                {contactStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
                    Failed to send message. Please try again or email us directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 SuperShift Labs. All rights reserved. | 
            <Link href="/" className="text-green-400 hover:text-green-300 ml-2">
              Back to Home
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
