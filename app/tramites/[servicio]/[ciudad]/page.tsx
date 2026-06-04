import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BUSINESS } from '@/lib/constants';
import { CITIES, SEO_SERVICES } from '@/lib/seo-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCityPage from '@/components/ServiceCityPage';

type Params = { servicio: string; ciudad: string };

export async function generateStaticParams(): Promise<Params[]> {
  return SEO_SERVICES.flatMap((s) =>
    CITIES.map((c) => ({ servicio: s.slug, ciudad: c.slug }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const service = SEO_SERVICES.find((s) => s.slug === params.servicio);
  const city    = CITIES.find((c) => c.slug === params.ciudad);
  if (!service || !city) return {};

  const siteUrl = `https://${BUSINESS.domain}`;
  const pageUrl = `${siteUrl}/tramites/${service.slug}/${city.slug}`;
  const title   = `${service.name} en ${city.name}, ${city.department} | Tramita Yopal`;
  const description = `¿Necesitas ${service.keyword} en ${city.name}? Tramita Yopal gestiona tu trámite vehicular en ${city.department}. ✓ Validación previa ✓ Envío gratis ✓ Cotización en ${BUSINESS.responseTime}.`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      `${service.keyword} ${city.name}`,
      `${service.keyword} ${city.department}`,
      `${service.name.toLowerCase()} ${city.name}`,
      `trámites vehiculares ${city.name}`,
      `gestor vehicular ${city.name}`,
      `tramitador ${city.name} ${city.department}`,
    ],
    alternates: { canonical: pageUrl },
    openGraph: { title, description, url: pageUrl, siteName: 'Tramita Yopal', locale: 'es_CO', type: 'website' },
    robots: { index: true, follow: true },
  };
}

export default function Page({ params }: { params: Params }) {
  const service = SEO_SERVICES.find((s) => s.slug === params.servicio);
  const city    = CITIES.find((c) => c.slug === params.ciudad);
  if (!service || !city) notFound();

  const siteUrl = `https://${BUSINESS.domain}`;
  const pageUrl = `${siteUrl}/tramites/${service.slug}/${city.slug}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Tramita Yopal', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Trámites',      item: `${siteUrl}/#tramites` },
        { '@type': 'ListItem', position: 3, name: service.name,    item: pageUrl },
        { '@type': 'ListItem', position: 4, name: city.name,       item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${service.name} en ${city.name}`,
      description: service.description,
      provider: {
        '@type': 'LocalBusiness',
        name: BUSINESS.name,
        telephone: `+${BUSINESS.whatsapp}`,
        address: { '@type': 'PostalAddress', addressLocality: BUSINESS.city, addressRegion: BUSINESS.department, addressCountry: 'CO' },
      },
      areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: city.department } },
      serviceType: service.name,
      offers: { '@type': 'Offer', description: 'Cotización gratuita sin compromiso', priceCurrency: 'COP' },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <ServiceCityPage service={service} city={city} />
      </main>
      <Footer />
    </>
  );
}
