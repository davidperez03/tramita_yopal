import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Car } from 'lucide-react';
import { BUSINESS, waLink } from '@/lib/constants';
import { CITIES, SEO_SERVICES, CATEGORIAS } from '@/lib/seo-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/FadeIn';

// Contenido general (quiénes somos, proceso, garantías, formulario,
// reseñas, FAQ, contacto) — el mismo que antes vivía solo en la home,
// ahora dentro de cada categoría en vez de saturar la portada.
const AboutUs         = dynamic(() => import('@/components/AboutUs'));
const Validator        = dynamic(() => import('@/components/Validator'));
const Process          = dynamic(() => import('@/components/Process'));
const TrackingPromo    = dynamic(() => import('@/components/TrackingPromo'));
const PaymentGuarantee = dynamic(() => import('@/components/PaymentGuarantee'));
const QuoteForm        = dynamic(() => import('@/components/QuoteForm'));
const WhyUs            = dynamic(() => import('@/components/WhyUs'));
const Reviews          = dynamic(() => import('@/components/Reviews'));
const GuidesTeaser     = dynamic(() => import('@/components/GuidesTeaser'));
const FAQ              = dynamic(() => import('@/components/FAQ'));
const Contact          = dynamic(() => import('@/components/Contact'));

const siteUrl = `https://${BUSINESS.domain}`;
const CAT = CATEGORIAS.rna;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'RNA — Registro Nacional Automotor | Tramita Yopal',
  description:
    'Trámites sobre tu vehículo ante el RNA en Yopal, Casanare: traspaso de propiedad, levantamiento de prenda, traslado de cuenta, duplicado de placas y cambio de servicio.',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tramita Yopal', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'RNA', item: `${siteUrl}/rna` },
    ],
  };

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
            <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
              {RNA_SERVICES.map((service) => (
                <FadeInItem key={service.slug}>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{service.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.description}</p>
                      <p className="text-xs text-slate-400 mb-5">
                        Tiempo estimado: <span className="font-semibold text-slate-600">{service.duration}</span>
                      </p>
                      <div className="flex flex-col gap-2 mt-auto">
                        <Link
                          href={`/tramites/${service.slug}/${MAIN_CITY.slug}`}
                          className="text-center bg-brand-950 hover:bg-brand-800 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors"
                        >
                          Ver en Yopal
                        </Link>
                        <a
                          href={waLink(service.waMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 border border-slate-200 hover:border-wa text-slate-600 hover:text-wa font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors"
                        >
                          <WhatsAppIcon className="w-4 h-4" />
                          Cotizar
                        </a>
                      </div>
                    </div>

                    {/* Ciudades */}
                    <div className="border-t border-slate-100 px-6 py-4 bg-slate-50">
                      <p className="text-xs text-slate-400 mb-2 font-medium">Atendemos en:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {CITIES.slice(0, 8).map((city) => (
                          <Link
                            key={city.slug}
                            href={`/tramites/${service.slug}/${city.slug}`}
                            className="text-xs text-brand-600 hover:text-brand-800 hover:underline transition-colors"
                          >
                            {city.name}
                          </Link>
                        ))}
                        {CITIES.length > 8 && (
                          <span className="text-xs text-slate-400">+{CITIES.length - 8} más</span>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
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
        <QuoteForm />
        <WhyUs />
        <Reviews />
        <GuidesTeaser />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
