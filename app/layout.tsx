import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BUSINESS, FAQS, SERVICES } from '@/lib/constants';
import { CITIES } from '@/lib/seo-data';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const siteUrl = `https://${BUSINESS.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Trámites Vehiculares en Yopal | Tramita Yopal',
  description:
    'Traspaso, levantamiento de prenda y duplicado de placas en Yopal, Casanare. ✓ Validación previa gratis ✓ Gestión remota ✓ Envío de tarjeta a domicilio ✓ Respuesta en 30 min.',
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
    'prescripción comparendos Yopal',
    'comparendos prescritos Casanare',
    'multas tránsito prescritas Colombia',
    'traspaso carro sin ir al tránsito Yopal',
    'tramitayopal',
  ],
  authors: [{ name: 'Tramita Yopal' }],
  creator: 'Tramita Yopal',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  alternates: {
    canonical: siteUrl,
    languages: { 'es-CO': siteUrl },
  },
  openGraph: {
    title: 'Trámites Vehiculares en Yopal | Tramita Yopal',
    description:
      'Gestor de trámites vehiculares en Yopal, Casanare. Validación previa gratuita, gestión 100% remota y envío de tarjeta de propiedad a domicilio. Cotiza en 30 min.',
    url: siteUrl,
    siteName: 'Tramita Yopal',
    locale: 'es_CO',
    type: 'website',
    images: [{ url: `${siteUrl}/logo.png`, width: 800, height: 800, alt: 'Tramita Yopal — Trámites vehiculares en Yopal, Casanare' }],
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
      'Gestión de trámites vehiculares en Yopal, Casanare. Traspaso de propiedad, levantamiento de prenda, duplicado de placas, traslado de cuenta, cambio de servicio y prescripción de comparendos. Validación previa gratuita. Envío de tarjeta de propiedad a domicilio sin costo.',
    url: siteUrl,
    telephone: `+${BUSINESS.whatsapp}`,
    currenciesAccepted: 'COP',
    paymentAccepted: 'Nequi, Daviplata, Bancolombia, Transferencia bancaria, Efectivo',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: 'Yopal',
      addressRegion: 'Casanare',
      postalCode: '850001',
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.3394,
      longitude: -72.3957,
    },
    areaServed: CITIES.map((city) => ({
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'State', name: city.department },
    })),
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
    knowsAbout: [
      'Trámites vehiculares Colombia',
      'Traspaso de propiedad vehicular',
      'Levantamiento de prenda vehicular',
      'Traslado de cuenta vehicular',
      'Duplicado de placas',
      'Cambio de servicio vehicular',
      'Prescripción de comparendos de tránsito',
      'RUNT Colombia',
      'SIMIT Colombia',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Trámites Vehiculares Yopal',
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
