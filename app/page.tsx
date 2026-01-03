"use client";
import dynamic from 'next/dynamic'
import Navigation from '../src/components/Navigation'
import Hero from '../src/components/Hero'

// Dynamic imports for below-the-fold components (code splitting)
// These load after initial render, reducing initial bundle size
const Services = dynamic(() => import('../src/components/Services'), {
  loading: () => <div className="min-h-screen" />,
})
const Projects = dynamic(() => import('../src/components/Projects'), {
  loading: () => <div className="min-h-screen" />,
})
const About = dynamic(() => import('../src/components/About'), {
  loading: () => <div className="min-h-screen" />,
})
const Pricing = dynamic(() => import('../src/components/Pricing'), {
  loading: () => <div className="min-h-screen" />,
})
const FAQ = dynamic(() => import('../src/components/FAQ'), {
  loading: () => <div className="min-h-screen" />,
})
const Contact = dynamic(() => import('../src/components/Contact'), {
  loading: () => <div className="min-h-screen" />,
})
const Footer = dynamic(() => import('../src/components/Footer'), {
  loading: () => <div className="min-h-screen" />,
})
const AdminButton = dynamic(() => import('../src/components/AdminButton'), {
  ssr: false, // Only load on client side
})
const WhatsAppButton = dynamic(() => import('../src/components/WhatsAppButton'), {
  ssr: false, // Only load on client side
})
const SEOChecker = dynamic(() => import('../src/components/SEOChecker'), {
  ssr: false, // Only load on client side
})

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Pricing />
        <FAQ />
        <SEOChecker />
        <Contact />
      </main>
      <Footer />
      <AdminButton />
      <WhatsAppButton />
    </div>
  )
}
