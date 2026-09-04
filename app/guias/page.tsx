import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { GUIAS } from '@/lib/guias';
import { fmtDate } from '@/lib/format';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const siteUrl = `https://${BUSINESS.domain}`;

export const metadata: Metadata = {
  title: 'Guías de trámites vehiculares en Colombia | Tramita Yopal',
  description:
    'Guías prácticas y actualizadas sobre trámites de vehículos: traspaso, prescripción de comparendos, levantamiento de prenda y más. Escritas por quienes tramitan a diario en el tránsito de Yopal.',
  alternates: { canonical: `${siteUrl}/guias` },
  openGraph: {
    title: 'Guías de trámites vehiculares | Tramita Yopal',
    description: 'Guías prácticas sobre traspaso, prescripción de comparendos y más trámites vehiculares.',
    url: `${siteUrl}/guias`,
    siteName: 'Tramita Yopal',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function GuiasPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Guías de trámites vehiculares',
    url: `${siteUrl}/guias`,
    hasPart: GUIAS.map((g) => ({
      '@type': 'Article',
      headline: g.titulo,
      url: `${siteUrl}/guias/${g.slug}`,
      dateModified: g.actualizado,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <section className="relative bg-brand-950 pt-28 pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-black tracking-widest text-gold-400 uppercase mb-3">Guías</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
              Trámites vehiculares,
              <br />
              <span className="text-gold-400">explicados sin enredos</span>
            </h1>
            <p className="text-lg text-brand-200 max-w-2xl">
              Escritas por quienes hacemos estos trámites todos los días en el organismo de tránsito de Yopal.
              Sin letra menuda, sin promesas falsas.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-[#fafaf7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {GUIAS.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guias/${g.slug}`}
                  className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-brand-300 hover:shadow-md transition-all group flex flex-col"
                >
                  <p className="text-[11px] text-slate-400 mb-3">
                    Actualizada el {fmtDate(g.actualizado)} · {g.minutos} min de lectura
                  </p>
                  <h2 className="text-base font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors leading-snug mb-2">
                    {g.tituloCorto}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">{g.descripcion}</p>
                  <span className="text-sm font-semibold text-brand-600 group-hover:text-brand-800 transition-colors mt-4">
                    Leer guía →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
