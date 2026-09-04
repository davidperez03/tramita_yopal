import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { BUSINESS, waLink } from '@/lib/constants';
import { CITIES, SEO_SERVICES, CATEGORIAS } from '@/lib/seo-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/FadeIn';

// Solo lo genuinamente neutral entre categorías. AboutUs, Validator,
// Process, TrackingPromo, PaymentGuarantee, WhyUs, GuidesTeaser y FAQ
// están escritos en clave de vehículo (RUNT, prendas, "tarjeta de
// propiedad"...) — no aplican aquí, quedan solo en /rna.
const QuoteForm = dynamic(() => import('@/components/QuoteForm'));
const Reviews   = dynamic(() => import('@/components/Reviews'));
const Contact   = dynamic(() => import('@/components/Contact'));

const siteUrl = `https://${BUSINESS.domain}`;
const CAT = CATEGORIAS.comparendos;
const MAIN_CITY = CITIES.find((c) => c.isOfficeCity)!;
const cursoPedagogico = SEO_SERVICES.find((s) => s.slug === 'curso-pedagogico')!;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Comparendos y Multas de Tránsito | Tramita Yopal',
  description:
    'Consulta y gestión de comparendos en Yopal, Casanare: prescripción de multas de más de 3 años, pago con descuento por pronto pago y curso pedagógico del infractor.',
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

export default function ComparendosPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tramita Yopal', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Comparendos', item: `${siteUrl}/comparendos` },
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
            <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
              {OPCIONES.map((op) => (
                <FadeInItem key={op.href}>
                  <Link
                    href={op.href}
                    className="group flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-brand-300 hover:shadow-md transition-all p-6"
                  >
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors mb-2 flex items-center gap-2 flex-wrap">
                      {op.titulo}
                      {op.destacado && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 border border-gold-500/40 px-2 py-0.5 rounded">
                          {op.destacado}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed flex-1">{op.descripcion}</p>
                    <span className="text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition-colors mt-5">
                      {op.cta} →
                    </span>
                  </Link>
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
              <Link href="/rna" className="text-sm font-semibold text-brand-600 hover:text-brand-800 hover:underline transition-colors">
                {CATEGORIAS.rna.label} →
              </Link>
              <Link href="/rnc" className="text-sm font-semibold text-brand-600 hover:text-brand-800 hover:underline transition-colors">
                {CATEGORIAS.rnc.label} →
              </Link>
            </div>
          </div>
        </section>

        <QuoteForm />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
