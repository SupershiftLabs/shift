"use client";
import dynamic from 'next/dynamic'
import Navigation from '../src/components/Navigation'
import Hero from '../src/components/Hero'

// Dynamic imports with ssr:false for below-the-fold components
// This reduces initial JavaScript bundle significantly
const Services = dynamic(() => import('../src/components/Services'), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
})
const Projects = dynamic(() => import('../src/components/Projects'), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
})
const About = dynamic(() => import('../src/components/About'), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
})
const Pricing = dynamic(() => import('../src/components/Pricing'), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
})
const FAQ = dynamic(() => import('../src/components/FAQ'), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
})
const Contact = dynamic(() => import('../src/components/Contact'), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
})
const Footer = dynamic(() => import('../src/components/Footer'), {
  loading: () => <div className="min-h-screen" />,
  ssr: false,
})
const AdminButton = dynamic(() => import('../src/components/AdminButton'), {
  ssr: false,
})
const WhatsAppButton = dynamic(() => import('../src/components/WhatsAppButton'), {
  ssr: false,
})
const SEOChecker = dynamic(() => import('../src/components/SEOChecker'), {
  ssr: false,
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
