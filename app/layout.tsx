import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from '../components/ui/sonner'
import CookieConsent from '../src/components/CookieConsent'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shift-f5a5ynmd1-adhdsupershifts-projects.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SuperShift Labs - Web & Mobile Apps Davenport Iowa',
    template: '%s | SuperShift Labs - Davenport, IA'
  },
  description: 'Leading web development and mobile app agency in Davenport, Iowa. Custom software, cloud solutions, and digital transformation for Iowa businesses.',
  keywords: ['web development Davenport Iowa', 'mobile apps Iowa', 'software development Davenport', 'web design Iowa', 'React developers Davenport', 'Next.js development Iowa', 'custom software Quad Cities', 'Iowa web agency', 'Davenport tech company', 'cloud solutions Iowa', 'UI/UX design Davenport', 'responsive websites Iowa', 'e-commerce development Davenport', 'SaaS development Iowa'],
  authors: [{ name: 'SuperShift Labs' }],
  creator: 'SuperShift Labs',
  publisher: 'SuperShift Labs',
  category: 'technology',
  applicationName: 'SuperShift Labs',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'SuperShift Labs',
    title: 'SuperShift Labs - Web & Mobile Apps Davenport Iowa',
    description: 'Leading web development and mobile app agency in Davenport, Iowa. Custom software, cloud solutions, and digital transformation for Iowa businesses.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SuperShift Labs - Web Development Agency in Davenport, Iowa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuperShift Labs - Web & Mobile Apps Davenport Iowa',
    description: 'Leading web development and mobile app agency in Davenport, Iowa. Custom software and digital solutions for Iowa businesses.',
    images: ['/og-image.png'],
    creator: '@supershiftlabs',
    site: '@supershiftlabs',
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'ZKNMbUpzHBoI5isAqxuw31uFQi4YdYBf8GBhtU4Aud0',
    other: {
      'msvalidate.01': '673F60950618C9179C22B6BABA9E21F8',
    },
  },
}

// JSON-LD Structured Data - Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'SuperShift Labs',
  legalName: 'SuperShift Labs',
  description: 'Leading web development and mobile app agency in Davenport, Iowa. Specializing in custom software, cloud solutions, and digital transformation for Iowa businesses.',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/logo.png`,
    width: '512',
    height: '512',
  },
  image: {
    '@type': 'ImageObject',
    url: `${siteUrl}/og-image.png`,
    width: '1200',
    height: '630',
  },
  email: 'admin@supershiftlabs.com',
  telephone: '+13195370228',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Davenport',
    addressRegion: 'IA',
    postalCode: '52801',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '41.5236',
    longitude: '-90.5776',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61584803090279',
    'https://www.instagram.com/supershiftlabs/',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+13195370228',
      contactType: 'customer service',
      email: 'admin@supershiftlabs.com',
      availableLanguage: ['English'],
      areaServed: 'US',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+13195370228',
      contactType: 'sales',
      email: 'admin@supershiftlabs.com',
      availableLanguage: ['English'],
      areaServed: ['US', 'IA'],
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '50',
  },
  foundingDate: '2024',
  slogan: 'Transform Your Digital Presence',
  knowsAbout: [
    'Web Development',
    'Mobile App Development',
    'Cloud Solutions',
    'UI/UX Design',
    'Software Development',
    'API Development',
    'Database Design',
  ],
}

// JSON-LD Structured Data - Website Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'SuperShift Labs',
  description: 'Expert web development, mobile apps, and cloud solutions in South Africa',
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
}

// JSON-LD Structured Data - Local Business Schema
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteUrl}/#localbusiness`,
  name: 'SuperShift Labs',
  image: `${siteUrl}/og-image.png`,
  priceRange: '$$',
  telephone: '+13195370228',
  email: 'admin@supershiftlabs.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Davenport',
    addressRegion: 'IA',
    postalCode: '52801',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '41.5236',
    longitude: '-90.5776',
  },
  url: siteUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  areaServed: [
    {
      '@type': 'State',
      name: 'Iowa',
    },
    {
      '@type': 'City',
      name: 'Davenport',
    },
    {
      '@type': 'Place',
      name: 'Quad Cities',
    },
  ],
}

// JSON-LD Structured Data - Service Offerings
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Service',
      name: 'Web Development',
      description: 'Custom web applications and responsive websites built with modern technologies for Iowa businesses',
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      serviceType: 'Web Development',
      areaServed: ['Iowa', 'Midwest', 'United States'],
    },
    {
      '@type': 'Service',
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android serving Iowa and US clients',
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      serviceType: 'Mobile App Development',
      areaServed: ['Iowa', 'Midwest', 'United States'],
    },
    {
      '@type': 'Service',
      name: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions for Iowa businesses',
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      serviceType: 'Cloud Computing',
      areaServed: ['Iowa', 'Midwest', 'United States'],
    },
    {
      '@type': 'Service',
      name: 'UI/UX Design',
      description: 'User-centered interface and experience design for Iowa and US companies',
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      serviceType: 'Design',
      areaServed: ['Iowa', 'Midwest', 'United States'],
    },
  ],
}

// Breadcrumb Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteUrl,
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pjhrogdbzpqnxhfxxmsb.supabase.co" />
        <link rel="preconnect" href="https://pjhrogdbzpqnxhfxxmsb.supabase.co" />
        <link rel="dns-prefetch" href="https://d64gsuwffb70l.cloudfront.net" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#22c55e" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SuperShift Labs" />
        
        {/* JSON-LD Structured Data - Multiple Schemas for SEO */}
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          id="localbusiness-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
