import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS, waLink } from '@/lib/constants';
import { CITIES, SEO_SERVICES } from '@/lib/seo-data';
import { CALE_INFO } from '@/lib/reglas-negocio';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

const siteUrl = `https://${BUSINESS.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Licencia de Conducción y RNC | Tramita Yopal',
  description:
    'Acompañamiento en licencia de conducción por primera vez, recategorización, renovación y duplicado ante el RNC en Yopal, Casanare. Infórmate sobre los CALE antes de tramitar.',
  alternates: { canonical: `${siteUrl}/licencias` },
  openGraph: {
    title: 'Licencia de Conducción y RNC | Tramita Yopal',
    description: 'Acompañamiento en trámites de licencia de conducción ante el RNC, desde Yopal, Casanare.',
    url: `${siteUrl}/licencias`,
    siteName: 'Tramita Yopal',
    locale: 'es_CO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const MAIN_CITY = CITIES.find((c) => c.isOfficeCity)!;

const LICENCIA_SLUGS = [
  'licencia-primera-vez',
  'recategorizacion-licencia',
  'renovacion-licencia',
  'duplicado-licencia',
];

const LICENCIA_SERVICES = SEO_SERVICES.filter((s) => LICENCIA_SLUGS.includes(s.slug));

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
    a: `A ${CALE_INFO.tramitesAfectados}. La renovación y el duplicado no requieren examen, con o sin CALE.`,
  },
  {
    q: '¿Por qué conviene tramitar la licencia ahora?',
    a: `Por costo, no por una fecha límite: hoy el trámite completo ronda ${CALE_INFO.costoActual}, y con los CALE en operación podría subir a ${CALE_INFO.costoConCale}. ${CALE_INFO.leyVigente}, así que ese aumento sigue en camino — solo está en pausa mientras el Ministerio revisa la estructura y el costo.`,
  },
];

export default function LicenciasPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tramita Yopal', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Licencias', item: `${siteUrl}/licencias` },
    ],
  };

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
            <nav className="flex items-center gap-1.5 text-xs text-brand-400 mb-5">
              <Link href="/" className="hover:text-white transition-colors">Tramita Yopal</Link>
              <span>/</span>
              <span className="text-white">Licencias</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              Licencia de Conducción<br />
              <span className="text-gold-400">y trámites ante el RNC</span>
            </h1>
            <p className="text-brand-200 text-lg max-w-xl leading-relaxed">
              Te acompañamos y asesoramos en tu trámite de licencia ante el Registro Nacional de Conductores (RNC): inscripción en el RUNT, agendamiento de citas y radicación. Tú presentas el examen médico y el curso directamente en el CRC y el CEA — nosotros nos encargamos del resto del papeleo.
            </p>
          </div>
        </section>

        {/* Aviso CALE */}
        <section className="py-10 bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start gap-4">
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
            </div>
          </div>
        </section>

        {/* Qué es el RNC */}
        <section className="py-14 bg-white border-b border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">¿Qué es el RNC?</h2>
            <p className="text-slate-600 leading-relaxed">
              El Registro Nacional de Conductores (RNC) es el registro dentro del RUNT donde queda tu perfil como conductor: licencias, categorías, restricciones y comparendos asociados a tu cédula. Cualquier trámite sobre tu licencia — sacarla, recategorizarla, renovarla o duplicarla — se gestiona a través del RNC.
            </p>
          </div>
        </section>

        {/* Servicios */}
        <section className="py-16 bg-[#fafaf7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
              Trámites de licencia que gestionamos
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {LICENCIA_SERVICES.map((service) => (
                <div key={service.slug} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{service.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.description}</p>
                    <p className="text-xs text-slate-400 mb-5">
                      Tiempo estimado: <span className="font-semibold text-slate-600">{service.duration}</span>
                    </p>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/tramites/${service.slug}/${MAIN_CITY.slug}`}
                        className="text-center bg-brand-950 hover:bg-brand-800 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors"
                      >
                        Ver detalle
                      </Link>
                      <a
                        href={waLink(service.waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 border border-slate-200 hover:border-wa text-slate-600 hover:text-wa font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        Consultar
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ CALE */}
        <section className="py-14 sm:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
              Preguntas frecuentes sobre los CALE
            </h2>
            <div className="space-y-3">
              {CALE_FAQS.map((f) => (
                <details key={f.q} className="group bg-[#fafaf7] rounded-2xl border border-slate-100 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-semibold text-sm text-slate-900 hover:text-brand-700 transition-colors">
                    {f.q}
                    <svg className="w-4 h-4 text-slate-300 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-[#fafaf7] border-t border-slate-100">
          <div className="max-w-xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
              ¿No sabes qué trámite de licencia necesitas?
            </h2>
            <p className="text-slate-500 mb-6">
              Escríbenos y te asesoramos gratis. En menos de {BUSINESS.responseTime} te decimos exactamente qué hacer.
            </p>
            <a
              href={waLink('Hola, tengo una duda sobre mi licencia de conducción y no sé qué trámite necesito.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wa hover:bg-wa-hover text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Preguntar gratis por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
