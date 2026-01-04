import Navigation from '@/components/Navigation'
import SEOChecker from '@/components/SEOChecker'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Free SEO Checker Tool | SuperShift Labs',
  description: 'Analyze your website\'s SEO performance with our free SEO checker tool. Get instant insights on meta tags, performance, accessibility, and more.',
  robots: 'noindex, nofollow', // Hidden from search engines
}

export default function SEOCheckerPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />
      <main className="pt-20">
        <SEOChecker />
        
        {/* Contact Form Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Help Improving Your SEO?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Our team of SEO experts can help you optimize your website for better search engine rankings. Get in touch for a free consultation.
              </p>
            </div>
            <Contact />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
