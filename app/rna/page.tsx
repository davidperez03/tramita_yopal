import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Car } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { CITIES, SEO_SERVICES, CATEGORIAS } from '@/lib/seo-data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TramiteCard } from '@/components/cards/TramiteCard';
import { FadeIn } from '@/components/FadeIn';

// Contenido general (quiénes somos, proceso, garantías, formulario,
// reseñas, FAQ, contacto) — el mismo que antes vivía solo en la home,
// ahora dentro de cada categoría en vez de saturar la portada.
const AboutUs         = dynamic(() => import('@/components/sections/AboutUs'));
const Validator        = dynamic(() => import('@/components/sections/Validator'));
const Process          = dynamic(() => import('@/components/sections/Process'));
const TrackingPromo    = dynamic(() => import('@/components/sections/TrackingPromo'));
const PaymentGuarantee = dynamic(() => import('@/components/sections/PaymentGuarantee'));
const QuoteForm        = dynamic(() => import('@/components/sections/QuoteForm'));
const WhyUs            = dynamic(() => import('@/components/sections/WhyUs'));
const Reviews          = dynamic(() => import('@/components/sections/Reviews'));
const FAQ              = dynamic(() => import('@/components/sections/FAQ'));
const Contact          = dynamic(() => import('@/components/sections/Contact'));

const siteUrl = `https://${BUSINESS.domain}`;
const CAT = CATEGORIAS.rna;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'RNA — Registro Nacional Automotor | Tramita Yopal',
  description:
    'Trámites sobre tu vehículo ante el RNA en Yopal, Casanare: traspaso de propiedad, levantamiento de prenda, traslado de cuenta, duplicado de placas y cambio de servicio.',
  keywords: [
    'RNA Yopal', 'Registro Nacional Automotor Yopal', 'traspaso vehículo Yopal',
    'levantamiento de prenda Yopal', 'traslado de cuenta vehículo Casanare',
    'duplicado de placas Yopal', 'cambio de servicio vehículo Yopal',
    'trámites RUNT Yopal', 'gestor vehicular Casanare', 'trámites vehiculares Yopal',
  ],
  alternates: { canonical: `${siteUrl}/rna` },
  openGraph: {
    title: 'RNA — Registro Nacional Automotor | Tramita Yopal',
    description: 'Trámites vehiculares ante el Registro Nacional Automotor, gestionados desde Yopal, Casanare.',
    url: `${siteUrl}/rna`,
    siteName: 'Tramita Yopal',
    locale: 'es_CO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const MAIN_CITY = CITIES.find((c) => c.isOfficeCity)!;
const RNA_SERVICES = SEO_SERVICES.filter((s) => s.categoria === 'rna');

export default function RnaPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Tramita Yopal', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'RNA', item: `${siteUrl}/rna` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Trámites del vehículo (RNA) en Yopal, Casanare',
      itemListElement: RNA_SERVICES.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
          url: `${siteUrl}/tramites/${s.slug}/${MAIN_CITY.slug}`,
          provider: {
            '@type': 'LocalBusiness',
            name: BUSINESS.name,
            telephone: `+${BUSINESS.whatsapp}`,
            address: { '@type': 'PostalAddress', addressLocality: BUSINESS.city, addressRegion: BUSINESS.department, addressCountry: 'CO' },
          },
          areaServed: { '@type': 'State', name: BUSINESS.department },
          offers: { '@type': 'Offer', description: 'Cotización gratuita sin compromiso', priceCurrency: 'COP' },
        },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-brand-950 pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <nav className="flex items-center gap-1.5 text-xs text-brand-400 mb-5">
                <Link href="/" className="hover:text-white transition-colors">Tramita Yopal</Link>
                <span>/</span>
                <span className="text-white">RNA</span>
              </nav>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-gold-400" strokeWidth={1.75} />
                </span>
                <p className="text-xs font-black tracking-widest text-gold-400 uppercase">{CAT.label}</p>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                Trámites del vehículo<br />
                <span className="text-gold-400">ante el RNA</span>
              </h1>
              <p className="text-brand-200 text-lg max-w-xl leading-relaxed">
                El Registro Nacional Automotor (RNA) es donde queda registrado todo lo relacionado con tu vehículo: propietario, prendas, matrícula y placas. Gestionamos estos trámites de forma remota, con validación previa gratuita.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Servicios */}
        <section className="py-16 bg-[#fafaf7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
                Trámites que gestionamos
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RNA_SERVICES.map((service, i) => (
                <TramiteCard
                  key={service.slug}
                  service={service}
                  href={`/tramites/${service.slug}/${MAIN_CITY.slug}`}
                  ctaLabel="Ver en Yopal"
                  waLabel="Cotizar"
                  cities={CITIES}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Otras categorías */}
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-slate-500 mb-4">¿Buscabas otra cosa?</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rnc" className="text-sm font-semibold text-brand-600 hover:text-brand-800 hover:underline transition-colors">
                {CATEGORIAS.rnc.label} →
              </Link>
              <Link href="/comparendos" className="text-sm font-semibold text-brand-600 hover:text-brand-800 hover:underline transition-colors">
                {CATEGORIAS.comparendos.label} →
              </Link>
            </div>
          </div>
        </section>

        <AboutUs />
        <Validator />
        <Process />
        <TrackingPromo />
        <PaymentGuarantee />
        <QuoteForm categoria="rna" />
        <WhyUs />
        <Reviews />
        {/* FAQ va al final — después de generar confianza, justo antes del contacto */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
