import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BUSINESS, FAQS, SERVICES } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const siteUrl = `https://${BUSINESS.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Tramita Yopal | Trámites Vehiculares en Yopal, Casanare',
  description:
    'Gestiona tus trámites vehiculares desde casa en Yopal, Casanare. Traspasos, levantamiento de prenda, duplicado de placas y más. ✓ Validación previa ✓ Envío gratis ✓ Respuesta en 30 min',
  keywords: [
    'trámites vehiculares Yopal',
    'traspaso vehículo Yopal',
    'levantamiento prenda Yopal',
    'duplicado placas Yopal',
    'traslado cuenta vehículo Casanare',
    'gestión trámites vehiculares Colombia',
    'trámites RUNT Yopal',
    'cambio propietario vehículo Yopal',
    'cambio de servicio vehículo Yopal',
    'gestor vehicular Yopal',
    'tramitador vehicular Casanare',
    'traspaso de moto Yopal',
    'tramitayopal',
  ],
  authors: [{ name: 'Tramita Yopal' }],
  creator: 'Tramita Yopal',
  alternates: {
    canonical: siteUrl,
    languages: { 'es-CO': siteUrl },
  },
  openGraph: {
    title: 'Tramita Yopal | Trámites Vehiculares en Yopal, Casanare',
    description:
      'Tu gestor de confianza para trámites vehiculares en Yopal. Validación previa, envío gratis a todo Colombia, respuesta en 30 min.',
    url: siteUrl,
    siteName: 'Tramita Yopal',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tramita Yopal | Trámites Vehiculares en Yopal',
    description: 'Trámites vehiculares sin complicaciones desde Yopal, Casanare. Validación previa incluida.',
  },
  verification: {
    google: 'zXw5jnuy3eETCwiaejtv9WnjvJGzEHpz1tT9Bj9fzGo',
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
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS.name,
    description:
      'Gestión de trámites vehiculares en Yopal, Casanare. Traspasos, levantamiento de prenda, duplicado de placas y más. Validación previa incluida.',
    url: siteUrl,
    telephone: `+${BUSINESS.whatsapp}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Yopal',
      addressRegion: 'Casanare',
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.3394,
      longitude: -72.3957,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '13:00',
      },
    ],
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Trámites Vehiculares',
      itemListElement: SERVICES.filter((s) => s.id !== 'otros').map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
          provider: { '@type': 'LocalBusiness', name: BUSINESS.name },
          areaServed: { '@type': 'City', name: 'Yopal', containedInPlace: { '@type': 'State', name: 'Casanare' } },
        },
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
