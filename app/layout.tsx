import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from '../components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shift-f5a5ynmd1-adhdsupershifts-projects.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SuperShift Labs - Digital Innovation Agency',
    template: '%s | SuperShift Labs'
  },
  description: 'Expert web development, mobile apps, and cloud solutions in South Africa. Transform your digital presence with custom software that drives growth.',
  keywords: ['web development', 'mobile apps', 'cloud solutions', 'digital agency', 'software development', 'UI/UX design', 'custom software', 'South Africa', 'Centurion', 'responsive design', 'PWA', 'API development', 'database design'],
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
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'SuperShift Labs',
    title: 'SuperShift Labs - Digital Innovation Agency',
    description: 'Transform your digital presence with cutting-edge web development, mobile apps, and cloud solutions. Expert software development services in South Africa.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SuperShift Labs - Digital Innovation Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuperShift Labs - Digital Innovation Agency',
    description: 'Transform your digital presence with cutting-edge web development, mobile apps, and cloud solutions.',
    images: ['/og-image.png'],
    creator: '@supershiftlabs',
    site: '@supershiftlabs',
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
}

// JSON-LD Structured Data - Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'SuperShift Labs',
  legalName: 'SuperShift Labs',
  description: 'Digital Innovation Agency specializing in web development, mobile apps, and cloud solutions',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/favicon.svg`,
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
  telephone: '+13194708878',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Centurion',
    addressRegion: 'Gauteng',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-25.8601',
    longitude: '28.1886',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61584803090279',
    'https://www.instagram.com/supershiftlabs/',
    'https://x.com/supershiftlabs',
    'https://linkedin.com/company/supershiftlabs',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+13194708878',
      contactType: 'customer service',
      email: 'admin@supershiftlabs.com',
      availableLanguage: ['English', 'Afrikaans'],
      areaServed: 'ZA',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+13194708878',
      contactType: 'sales',
      email: 'admin@supershiftlabs.com',
      availableLanguage: ['English', 'Afrikaans'],
      areaServed: ['ZA', 'US', 'GB'],
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
  telephone: '+13194708878',
  email: 'admin@supershiftlabs.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Centurion',
    addressRegion: 'Gauteng',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-25.8601',
    longitude: '28.1886',
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
  areaServed: {
    '@type': 'Country',
    name: 'South Africa',
  },
}

// JSON-LD Structured Data - Service Offerings
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Service',
      name: 'Web Development',
      description: 'Custom web applications and responsive websites built with modern technologies',
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      serviceType: 'Web Development',
      areaServed: 'Worldwide',
    },
    {
      '@type': 'Service',
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      serviceType: 'Mobile App Development',
      areaServed: 'Worldwide',
    },
    {
      '@type': 'Service',
      name: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions',
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      serviceType: 'Cloud Computing',
      areaServed: 'Worldwide',
    },
    {
      '@type': 'Service',
      name: 'UI/UX Design',
      description: 'User-centered interface and experience design',
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      serviceType: 'Design',
      areaServed: 'Worldwide',
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
        </ThemeProvider>
      </body>
    </html>
  )
}
