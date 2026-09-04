import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { BUSINESS, waLink } from '@/lib/constants';
import { CITIES, SEO_SERVICES, CATEGORIAS } from '@/lib/seo-data';
import { DESCUENTO_COMPARENDO, MULTAS_SON_DE_LA_PERSONA } from '@/lib/reglas-negocio';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { OpcionCard } from '@/components/cards/OpcionCard';
import { FaqAccordion } from '@/components/cards/FaqAccordion';
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/FadeIn';

// AboutUs, Validator, Process, TrackingPromo, PaymentGuarantee y WhyUs
// están escritos en clave de vehículo (RUNT, prendas, "tarjeta de
// propiedad"...) — no aplican aquí, quedan solo en /rna. GuidesTeaser
// vive en la home (no es de una sola categoría). El FAQ de esta página
// sí es propio (preguntas sobre comparendos, no sobre vehículos).
const QuoteForm = dynamic(() => import('@/components/sections/QuoteForm'));
const Reviews   = dynamic(() => import('@/components/sections/Reviews'));
const Contact   = dynamic(() => import('@/components/sections/Contact'));

const siteUrl = `https://${BUSINESS.domain}`;
const CAT = CATEGORIAS.comparendos;
const MAIN_CITY = CITIES.find((c) => c.isOfficeCity)!;
const cursoPedagogico = SEO_SERVICES.find((s) => s.slug === 'curso-pedagogico')!;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Comparendos y Multas de Tránsito | Tramita Yopal',
  description:
    'Consulta y gestión de comparendos en Yopal, Casanare: prescripción de multas de más de 3 años, pago con descuento por pronto pago y curso pedagógico del infractor.',
  keywords: [
    'comparendos Yopal', 'multas de tránsito Yopal', 'prescripción de comparendos Yopal',
    'comparendos prescritos Casanare', 'pago comparendo con descuento Yopal',
    'descuento comparendo tránsito Colombia', 'curso pedagógico infractor Yopal',
    'SIMIT Yopal', 'consulta multas de tránsito Yopal', 'multas prescritas Colombia',
  ],
  alternates: { canonical: `${siteUrl}/comparendos` },
  openGraph: {
    title: 'Comparendos y Multas de Tránsito | Tramita Yopal',
    description: 'Prescripción, descuento por pronto pago y curso pedagógico para comparendos de tránsito.',
    url: `${siteUrl}/comparendos`,
    siteName: 'Tramita Yopal',
    locale: 'es_CO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const OPCIONES = [
  {
    titulo: 'Prescripción de comparendos',
    descripcion: 'Las multas de más de 3 años pueden estar prescritas. Consultamos gratis en el SIMIT y el RUNT, y tramitamos la declaración para eliminarlas del sistema.',
    href: '/prescripcion-comparendos',
    cta: 'Consultar gratis',
    destacado: 'Consulta gratis',
  },
  {
    titulo: 'Pago con descuento',
    descripcion: 'Si tu comparendo es reciente, puedes pagarlo con 50% o 25% de descuento según cuántos días hábiles hayan pasado. Calculamos tu plazo exacto.',
    href: '/descuento-comparendo',
    cta: 'Calcular mi descuento',
    destacado: null,
  },
  {
    titulo: cursoPedagogico.name,
    descripcion: cursoPedagogico.description,
    href: `/tramites/${cursoPedagogico.slug}/${MAIN_CITY.slug}`,
    cta: 'Ver requisitos',
    destacado: null,
  },
];

const FAQS_COMPARENDOS = [
  {
    q: '¿Me conviene más el descuento o la prescripción?',
    a: `Depende de qué tan reciente sea el comparendo. Si es reciente, aplica el descuento por pronto pago: 50% en los primeros ${DESCUENTO_COMPARENDO.fisico.dias50} días hábiles (${DESCUENTO_COMPARENDO.fotomulta.dias50} si es fotomulta) y 25% hasta el día ${DESCUENTO_COMPARENDO.fisico.diasHasta25} (${DESCUENTO_COMPARENDO.fotomulta.diasHasta25} en fotomulta). Si ya pasaron esos plazos, revisa si tiene más de 3 años — ahí puede aplicar la prescripción, que lo elimina por completo.`,
  },
  {
    q: '¿Las multas afectan mi vehículo o a mí como persona?',
    a: MULTAS_SON_DE_LA_PERSONA,
  },
  {
    q: '¿Qué pasa si no hago nada con un comparendo pendiente?',
    a: 'Sigue apareciendo en el SIMIT y bloquea trámites como el traspaso mientras esté a tu nombre. El cobro también puede escalar a embargos si no se atiende.',
  },
  {
    q: '¿El curso pedagógico es obligatorio para acceder al descuento?',
    a: 'Sí. Sin el certificado de asistencia al curso pedagógico presencial, el descuento no se aplica aunque estés dentro del plazo.',
  },
];

export default function ComparendosPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Tramita Yopal', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Comparendos', item: `${siteUrl}/comparendos` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Trámites de comparendos y multas en Yopal, Casanare',
      itemListElement: OPCIONES.map((op, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: op.titulo,
          description: op.descripcion,
          url: `${siteUrl}${op.href}`,
          provider: {
            '@type': 'LocalBusiness',
            name: BUSINESS.name,
            telephone: `+${BUSINESS.whatsapp}`,
            address: { '@type': 'PostalAddress', addressLocality: BUSINESS.city, addressRegion: BUSINESS.department, addressCountry: 'CO' },
          },
          areaServed: { '@type': 'State', name: BUSINESS.department },
          offers: { '@type': 'Offer', description: 'Consulta gratuita sin compromiso', priceCurrency: 'COP' },
        },
      })),
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS_COMPARENDOS.map((f) => ({
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
                <span className="text-white">Comparendos</span>
              </nav>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-gold-400" strokeWidth={1.75} />
                </span>
                <p className="text-xs font-black tracking-widest text-gold-400 uppercase">{CAT.label}</p>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                Comparendos<br />
                <span className="text-gold-400">y multas de tránsito</span>
              </h1>
              <p className="text-brand-200 text-lg max-w-xl leading-relaxed">
                Ya sea que tu multa sea nueva y quieras pagarla con descuento, o vieja y pueda estar prescrita, primero revisamos tu caso gratis y te decimos qué te conviene.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Recordatorio: las multas son de la persona */}
        <section className="py-8 bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-amber-800 leading-relaxed max-w-3xl">
              <strong>Importante:</strong> las multas de tránsito se registran a nombre de la persona, no del vehículo — un carro puede tener comparendos en su historial y seguir habilitado para trámites como el traspaso, siempre que esas multas no estén a nombre del comprador ni del vendedor.
            </p>
          </div>
        </section>

        {/* Opciones */}
        <section className="py-16 bg-[#fafaf7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
                ¿Cuál es tu caso?
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {OPCIONES.map((op, i) => (
                <OpcionCard
                  key={op.href}
                  href={op.href}
                  titulo={op.titulo}
                  descripcion={op.descripcion}
                  cta={op.cta}
                  destacado={op.destacado}
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
              <Link href="/rna" className="text-sm font-semibold text-brand-600 hover:text-brand-800 hover:underline transition-colors">
                {CATEGORIAS.rna.label} →
              </Link>
              <Link href="/rnc" className="text-sm font-semibold text-brand-600 hover:text-brand-800 hover:underline transition-colors">
                {CATEGORIAS.rnc.label} →
              </Link>
            </div>
          </div>
        </section>

        <QuoteForm categoria="comparendos" />
        <Reviews />

        {/* FAQ va al final — después de generar confianza, justo antes del contacto */}
        <section className="py-14 sm:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
                Preguntas frecuentes sobre comparendos
              </h2>
            </FadeIn>
            <FadeInStagger className="space-y-3" stagger={0.06}>
              {FAQS_COMPARENDOS.map((f) => (
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
