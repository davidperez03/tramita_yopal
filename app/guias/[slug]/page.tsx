import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BUSINESS, waLink } from '@/lib/constants';
import { GUIAS } from '@/lib/guias';
import { SEO_SERVICES } from '@/lib/seo-data';
import { fmtDate } from '@/lib/format';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { FaqAccordion } from '@/components/cards/FaqAccordion';

type Params = { slug: string };

const siteUrl = `https://${BUSINESS.domain}`;

export function generateStaticParams(): Params[] {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const guia = GUIAS.find((g) => g.slug === params.slug);
  if (!guia) return {};

  const url = `${siteUrl}/guias/${guia.slug}`;
  return {
    title: `${guia.titulo} | Tramita Yopal`,
    description: guia.descripcion,
    alternates: { canonical: url },
    openGraph: {
      title: guia.titulo,
      description: guia.descripcion,
      url,
      siteName: 'Tramita Yopal',
      locale: 'es_CO',
      type: 'article',
      modifiedTime: guia.actualizado,
    },
  };
}

export default function GuiaPage({ params }: { params: Params }) {
  const guia = GUIAS.find((g) => g.slug === params.slug);
  if (!guia) notFound();

  const servicio = SEO_SERVICES.find((s) => s.slug === guia.servicioSlug);
  const url      = `${siteUrl}/guias/${guia.slug}`;
  const waUrl    = waLink(guia.waMessage);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guia.titulo,
      description: guia.descripcion,
      dateModified: guia.actualizado,
      inLanguage: 'es-CO',
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: BUSINESS.name, url: siteUrl },
      publisher: { '@type': 'Organization', name: BUSINESS.name, url: siteUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Tramita Yopal', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Guías', item: `${siteUrl}/guias` },
        { '@type': 'ListItem', position: 3, name: guia.tituloCorto, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guia.faqs.map((f) => ({
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
        {/* Cabecera */}
        <section className="relative bg-brand-950 pt-28 pb-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-xs text-brand-400 mb-5 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Tramita Yopal</Link>
              <span>/</span>
              <Link href="/guias" className="hover:text-white transition-colors">Guías</Link>
              <span>/</span>
              <span className="text-white">{guia.tituloCorto}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.15] tracking-tight mb-4">
              {guia.titulo}
            </h1>
            <p className="text-sm text-brand-300">
              Actualizada el {fmtDate(guia.actualizado)} · {guia.minutos} min de lectura · Por el equipo de {BUSINESS.name}
            </p>
          </div>
        </section>

        {/* Cuerpo */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {guia.intro.map((p, i) => (
              <p key={i} className="text-base text-slate-600 leading-relaxed mb-5">{p}</p>
            ))}

            {guia.secciones.map((s) => (
              <section key={s.titulo} className="mt-10">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4">{s.titulo}</h2>
                {s.parrafos.map((p, i) => (
                  <p key={i} className="text-base text-slate-600 leading-relaxed mb-4">{p}</p>
                ))}
                {s.lista && (
                  <ul className="space-y-2.5 mb-4">
                    {s.lista.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0 mt-2.5" />
                        <span className="text-base text-slate-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* CTA */}
            <div className="mt-12 bg-brand-950 rounded-3xl p-8 text-center">
              <h2 className="text-xl font-extrabold text-white mb-2">
                ¿Quieres que lo hagamos por ti?
              </h2>
              <p className="text-sm text-brand-300 mb-6 max-w-md mx-auto">
                Validación previa gratis, cotización cerrada y seguimiento en línea. Respondemos en {BUSINESS.responseTime}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-wa hover:bg-wa-hover text-white font-bold px-7 py-3.5 rounded-xl text-base transition-colors">
                  <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                  Cotizar por WhatsApp
                </a>
                {servicio && (
                  <Link href={`/tramites/${servicio.slug}/yopal`}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl text-base transition-colors">
                    Ver el servicio de {servicio.name}
                  </Link>
                )}
              </div>
            </div>

            {/* FAQ */}
            <section className="mt-12">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">Preguntas frecuentes</h2>
              <div className="space-y-3">
                {guia.faqs.map((f) => (
                  <FaqAccordion key={f.q} q={f.q} a={f.a} bg="fafaf7" />
                ))}
              </div>
            </section>

            {/* Otras guías */}
            <section className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-4 font-semibold">Otras guías que te pueden servir:</p>
              <div className="space-y-2">
                {GUIAS.filter((g) => g.slug !== guia.slug).map((g) => (
                  <Link key={g.slug} href={`/guias/${g.slug}`}
                    className="block text-sm text-brand-600 hover:text-brand-800 hover:underline transition-colors">
                    {g.tituloCorto} →
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
