import Navigation from '@/components/Navigation'
import SEOChecker from '@/components/SEOChecker'
import Footer from '@/components/Footer'

export default function SEOCheckerPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />
      <main className="pt-20">
        <SEOChecker />
      </main>
      <Footer />
    </div>
  )
}
