import Navigation from '@/components/Navigation'
import PageSpeedChecker from '../../src/components/PageSpeedChecker'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Free PageSpeed Checker Tool | SuperShift Labs',
  description: 'Analyze your website\'s performance, SEO, accessibility, and best practices with our free PageSpeed Insights tool powered by Google Lighthouse.',
  robots: 'noindex, nofollow', // Hidden from search engines
}

export default function PageSpeedCheckerPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />
      <main className="pt-20">
        <PageSpeedChecker />
        
        {/* Contact Form Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Help Improving Your Performance?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Our team of performance optimization experts can help you achieve better PageSpeed scores, faster load times, and improved user experience. Get in touch for a free consultation.
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
