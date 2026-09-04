import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { IdCard } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { CITIES, SEO_SERVICES, CATEGORIAS } from '@/lib/seo-data';
import { CALE_INFO } from '@/lib/reglas-negocio';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TramiteCard } from '@/components/cards/TramiteCard';
import { FaqAccordion } from '@/components/cards/FaqAccordion';
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/FadeIn';

// AboutUs, Validator, Process, TrackingPromo, PaymentGuarantee, WhyUs y
// FAQ están escritos en clave de vehículo (RUNT, prendas, "tarjeta de
// propiedad"...) — no aplican aquí, quedan solo en /rna. GuidesTeaser
// vive en la home (no es de una sola categoría).
const QuoteForm = dynamic(() => import('@/components/sections/QuoteForm'));
const Reviews   = dynamic(() => import('@/components/sections/Reviews'));
const Contact   = dynamic(() => import('@/components/sections/Contact'));

const siteUrl = `https://${BUSINESS.domain}`;
const CAT = CATEGORIAS.rnc;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'RNC — Registro Nacional de Conductores | Tramita Yopal',
  description:
    'Acompañamiento en licencia de conducción por primera vez, recategorización, refrendación y duplicado ante el RNC en Yopal, Casanare. Infórmate sobre los CALE antes de tramitar.',
  keywords: [
    'RNC Yopal', 'Registro Nacional de Conductores Yopal', 'licencia de conducción Yopal',
    'licencia de conducción primera vez Yopal', 'recategorización licencia de conducción Yopal',
    'refrendación licencia de conducción Yopal', 'duplicado licencia de conducción Yopal',
    'CALE licencia de conducción Colombia', 'CALE Centros de Apoyo Logístico de Evaluación',
    'RUNT licencia Yopal', 'CRC examen médico conducción Yopal', 'CEA curso conducción Yopal',
  ],
  alternates: { canonical: `${siteUrl}/rnc` },
  openGraph: {
    title: 'RNC — Registro Nacional de Conductores | Tramita Yopal',
    description: 'Acompañamiento en trámites de licencia de conducción ante el RNC, desde Yopal, Casanare.',
    url: `${siteUrl}/rnc`,
    siteName: 'Tramita Yopal',
    locale: 'es_CO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const MAIN_CITY = CITIES.find((c) => c.isOfficeCity)!;
const RNC_SERVICES = SEO_SERVICES.filter((s) => s.categoria === 'rnc');

const CALE_FAQS = [
  {
    q: '¿Qué son los CALE?',
    a: 'Los Centros de Apoyo Logístico de Evaluación (CALE) son las entidades que el Ministerio de Transporte creó para examinar de forma independiente a quien saca licencia por primera vez o recategoriza — separando esa evaluación de las escuelas de conducción (CEA), que seguirán encargándose solo de enseñar.',
  },
  {
    q: '¿Ya están en operación los CALE?',
    a: `No. ${CALE_INFO.estado} (${CALE_INFO.circular}, sobre ${CALE_INFO.resolucion}).`,
  },
  {
    q: '¿A qué trámites afectarán los CALE?',
    a: `A ${CALE_INFO.tramitesAfectados}. La refrendación y el duplicado no requieren examen, con o sin CALE.`,
  },
  {
    q: '¿Por qué conviene tramitar la licencia ahora?',
    a: `Por costo, no por una fecha límite: ${CALE_INFO.riesgoCosto}. ${CALE_INFO.leyVigente}, así que ese aumento sigue en camino — solo está en pausa mientras el Ministerio revisa la estructura y el costo.`,
  },
];

export default function RncPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Tramita Yopal', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'RNC', item: `${siteUrl}/rnc` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Trámites de licencia de conducción (RNC) en Yopal, Casanare',
      itemListElement: RNC_SERVICES.map((s, i) => ({
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
          offers: { '@type': 'Offer', description: 'Asesoría gratuita sin compromiso', priceCurrency: 'COP' },
        },
      })),
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CALE_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-brand-950 pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <nav className="flex items-center gap-1.5 text-xs text-brand-400 mb-5">
                <Link href="/" className="hover:text-white transition-colors">Tramita Yopal</Link>
                <span>/</span>
                <span className="text-white">RNC</span>
              </nav>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <IdCard className="w-6 h-6 text-gold-400" strokeWidth={1.75} />
                </span>
                <p className="text-xs font-black tracking-widest text-gold-400 uppercase">{CAT.label}</p>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                Licencia de Conducción<br />
                <span className="text-gold-400">y trámites ante el RNC</span>
              </h1>
              <p className="text-brand-200 text-lg max-w-xl leading-relaxed">
                Te acompañamos y asesoramos en tu trámite de licencia ante el Registro Nacional de Conductores (RNC): inscripción en el RUNT, agendamiento de citas y radicación. Tú presentas el examen médico y el curso directamente en el CRC y el CEA — nosotros nos encargamos del resto del papeleo.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Aviso CALE */}
        <section className="py-10 bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="flex flex-col sm:flex-row items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-black">!</span>
              <div>
                <h2 className="font-extrabold text-amber-900 mb-1.5">
                  Los CALE están aplazados — pero el aumento de costo sigue en camino
                </h2>
                <p className="text-sm text-amber-800 leading-relaxed max-w-3xl">
                  {CALE_INFO.resumenCorto}
                </p>
                <p className="text-xs text-amber-700 mt-2">
                  Fuente: {CALE_INFO.circular}, sobre la {CALE_INFO.resolucion}.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Qué es el RNC */}
        <section className="py-14 bg-white border-b border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3">¿Qué es el RNC?</h2>
              <p className="text-slate-600 leading-relaxed">
                El Registro Nacional de Conductores (RNC) es el registro dentro del RUNT donde queda tu perfil como conductor: licencias, categorías, restricciones y comparendos asociados a tu cédula. Cualquier trámite sobre tu licencia — sacarla, recategorizarla, refrendarla o duplicarla — se gestiona a través del RNC.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Servicios */}
        <section className="py-16 bg-[#fafaf7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
                Trámites de licencia que gestionamos
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {RNC_SERVICES.map((service, i) => (
                <TramiteCard
                  key={service.slug}
                  service={service}
                  href={`/tramites/${service.slug}/${MAIN_CITY.slug}`}
                  ctaLabel="Ver detalle"
                  waLabel="Consultar"
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Otras categorías */}
        <section className="py-10 bg-[#fafaf7] border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-slate-500 mb-4">¿Buscabas otra cosa?</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rna" className="text-sm font-semibold text-brand-600 hover:text-brand-800 hover:underline transition-colors">
                {CATEGORIAS.rna.label} →
              </Link>
              <Link href="/comparendos" className="text-sm font-semibold text-brand-600 hover:text-brand-800 hover:underline transition-colors">
                {CATEGORIAS.comparendos.label} →
              </Link>
            </div>
          </div>
        </section>

        <QuoteForm categoria="rnc" />
        <Reviews />

        {/* FAQ va al final — después de generar confianza, justo antes del contacto */}
        <section className="py-14 sm:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
                Preguntas frecuentes sobre los CALE
              </h2>
            </FadeIn>
            <FadeInStagger className="space-y-3" stagger={0.06}>
              {CALE_FAQS.map((f) => (
                <FadeInItem key={f.q}>
                  <FaqAccordion q={f.q} a={f.a} bg="fafaf7" />
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
