import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComparendoForm from './ComparendoForm';

const siteUrl = `https://${BUSINESS.domain}`;
const pageUrl = `${siteUrl}/descuento-comparendo`;

const FAQS = [
  {
    q: '¿Cómo funciona el descuento por pronto pago de un comparendo?',
    a: 'La ley permite pagar un comparendo con descuento si actúas dentro de los días hábiles siguientes a la infracción: para comparendo físico, 50% en los primeros 5 días hábiles y 25% entre el día 6 y el 20; para fotomulta, 50% en los primeros 11 días hábiles y 25% entre el día 12 y el 26. Después de esos plazos ya no aplica descuento.',
  },
  {
    q: '¿El curso pedagógico es obligatorio para acceder al descuento?',
    a: 'Sí. Es un requisito legal: sin el certificado de asistencia al curso pedagógico presencial, el descuento no se aplica aunque estés dentro del plazo. Nosotros agendamos el curso por ti dentro de tu plazo.',
  },
  {
    q: '¿Cómo sé cuánto descuento me corresponde?',
    a: 'Depende de la fecha exacta del comparendo y del tipo (físico o fotomulta). En este formulario calculamos automáticamente los días hábiles transcurridos y te mostramos el porcentaje que te corresponde en este momento.',
  },
  {
    q: '¿El porcentaje que muestra el formulario es definitivo?',
    a: 'Es una estimación basada en la fecha que indicas. El porcentaje definitivo es el que refleje el SIMIT al momento de la liquidación y pago, conforme a la Ley 769 de 2002 y sus modificaciones.',
  },
  {
    q: '¿Y si ya se venció el plazo del descuento?',
    a: 'Pierdes el descuento, pero si el comparendo tiene más de 3 años puede aplicar prescripción — un trámite distinto que elimina la multa por completo. Consulta gratis si tu caso aplica.',
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Paga tu Comparendo con Descuento en Yopal | Tramita Yopal',
  description: 'Paga tu comparendo en Yopal con hasta el 50% de descuento pagando a tiempo. Verifica tu plazo y solicita asesoría gratis.',
  keywords: [
    'descuento comparendo Yopal',
    'pago comparendo con descuento',
    '50% descuento comparendo tránsito',
    '25% descuento comparendo tránsito',
    'curso pedagógico infractor Yopal',
    'descuento fotomulta Casanare',
    'plazo descuento comparendo Colombia',
    'pronto pago comparendo tránsito',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Paga tu Comparendo con Descuento en Yopal | Tramita Yopal',
    description: 'Hasta 50% de descuento en tu comparendo de tránsito en Yopal.',
    url: pageUrl,
    siteName: 'Tramita Yopal',
    locale: 'es_CO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function DescuentoComparendoPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Tramita Yopal', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Pagar comparendo con descuento', item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Asesoría para pago de comparendo con descuento',
      description: 'Verificación del plazo y porcentaje de descuento por pronto pago, agendamiento del curso pedagógico obligatorio y acompañamiento hasta el pago.',
      provider: {
        '@type': 'LocalBusiness',
        name: BUSINESS.name,
        telephone: `+${BUSINESS.whatsapp}`,
        address: { '@type': 'PostalAddress', addressLocality: BUSINESS.city, addressRegion: BUSINESS.department, addressCountry: 'CO' },
      },
      areaServed: { '@type': 'City', name: BUSINESS.city, containedInPlace: { '@type': 'State', name: BUSINESS.department } },
      offers: { '@type': 'Offer', description: 'Asesoría gratuita, sin compromiso', priceCurrency: 'COP' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>

        {/* Hero */}
        <section className="relative bg-brand-950 overflow-hidden pt-28 pb-16 sm:pb-24">
          {/* Patrón de fondo */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: `repeating-linear-gradient(45deg,#10b981 0px,#10b981 1px,transparent 1px,transparent 20px)` }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* Izquierda — info */}
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Descuento en comparendos · Yopal, Casanare
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
                  Paga tu comparendo<br />
                  <span className="text-emerald-400">con hasta el 50% menos</span>
                </h1>

                <p className="text-lg text-brand-200 leading-relaxed mb-10 max-w-lg">
                  La ley te permite pagar con descuento si actúas dentro de los plazos
                  y completas el curso pedagógico presencial. Te guiamos en todo el proceso.
                </p>

                {/* Tarjetas de plazos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-5">
                    <p className="text-4xl font-black text-emerald-400 leading-none mb-4">50%</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-brand-100">
                        <span className="font-bold text-white">Físico:</span><br />
                        Primeros 5 días hábiles
                      </p>
                      <p className="text-brand-100">
                        <span className="font-bold text-white">Fotomulta:</span><br />
                        Primeros 11 días hábiles
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-amber-500/30 rounded-xl p-5">
                    <p className="text-4xl font-black text-amber-400 leading-none mb-4">25%</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-brand-100">
                        <span className="font-bold text-white">Físico:</span><br />
                        Días hábiles 6 al 20
                      </p>
                      <p className="text-brand-100">
                        <span className="font-bold text-white">Fotomulta:</span><br />
                        Días hábiles 12 al 26
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-xs text-brand-400 border-l-2 border-amber-500/60 pl-3">
                  El descuento exige completar el{' '}
                  <a href="/tramites/curso-pedagogico/yopal" className="underline hover:text-brand-200 transition-colors">
                    curso pedagógico presencial
                  </a>{' '}
                  dentro del plazo. El porcentaje definitivo es el que refleje el SIMIT al momento del pago.
                </p>
              </div>

              {/* Derecha — formulario */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Verifica tu plazo y agenda tu caso
                </h2>
                <p className="text-slate-500 text-sm mb-6">
                  Asesoría gratuita · Respondemos en menos de 30 min
                </p>
                <ComparendoForm />
              </div>

            </div>
          </div>
        </section>

        {/* Fundamento legal */}
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  label: 'Fundamento legal',
                  text: 'Ley 769 de 2002 — Código Nacional de Tránsito. El descuento por pronto pago aplica según los días hábiles transcurridos desde la infracción.',
                },
                {
                  label: 'Requisito obligatorio',
                  text: 'El curso pedagógico presencial es obligatorio para acceder al descuento — sin el certificado de asistencia, no se aplica el porcentaje.',
                },
                {
                  label: 'Verificación gratuita',
                  text: 'Calculamos tu plazo y porcentaje exacto según la fecha de tu comparendo, sin costo y sin compromiso.',
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-1 flex-shrink-0 bg-emerald-600 rounded-full" />
                  <div>
                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-20 bg-[#fafaf7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8">
              Preguntas frecuentes sobre el descuento de comparendos
            </h2>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details key={f.q} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-semibold text-sm text-slate-900 hover:text-emerald-700 transition-colors">
                    {f.q}
                    <svg className="w-4 h-4 text-slate-300 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-100 p-6">
              <div>
                <p className="font-semibold text-slate-900 text-sm mb-1">
                  ¿Necesitas agendar el curso pedagógico?
                </p>
                <p className="text-slate-500 text-sm">
                  Es el paso obligatorio para que el descuento se haga efectivo.
                </p>
              </div>
              <a href="/tramites/curso-pedagogico/yopal"
                className="flex-shrink-0 text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition-colors whitespace-nowrap">
                Ver el curso pedagógico →
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
