import type { Metadata } from 'next';
import Link from 'next/link';
import { Car, IdCard, AlertTriangle } from 'lucide-react';
import { BUSINESS, waLink } from '@/lib/constants';
import { CITIES, SEO_SERVICES, CATEGORIAS, type Categoria } from '@/lib/seo-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/FadeIn';

const siteUrl = `https://${BUSINESS.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Todos los Trámites | Tramita Yopal',
  description:
    'Todos los trámites que gestionamos en Yopal, Casanare, organizados por sistema: vehículo (RNA), licencia de conducción (RNC) y comparendos y multas.',
  alternates: { canonical: `${siteUrl}/tramites` },
  openGraph: {
    title: 'Todos los Trámites | Tramita Yopal',
    description: 'Trámites de vehículo, licencia y comparendos, gestionados desde Yopal, Casanare para todo Colombia.',
    url: `${siteUrl}/tramites`,
    siteName: 'Tramita Yopal',
    locale: 'es_CO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const MAIN_CITY = CITIES.find((c) => c.isOfficeCity)!;

const ICONS: Record<Categoria, typeof Car> = {
  rna: Car,
  rnc: IdCard,
  comparendos: AlertTriangle,
};

export default function TramitesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tramita Yopal', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Trámites', item: `${siteUrl}/tramites` },
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
                <span className="text-white">Trámites</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                Todos los trámites<br />
                <span className="text-gold-400">en un solo lugar</span>
              </h1>
              <p className="text-brand-200 text-lg max-w-xl leading-relaxed">
                Organizados por sistema — vehículo (RNA), licencia de conducción (RNC) y comparendos — para que encuentres el tuyo rápido. Validación previa gratuita en todos.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Servicios agrupados por categoría */}
        {(Object.keys(CATEGORIAS) as Categoria[]).map((key) => {
          const cat = CATEGORIAS[key];
          const Icon = ICONS[key];
          const services = SEO_SERVICES.filter((s) => s.categoria === key);
          return (
            <section key={key} className="py-16 border-t border-slate-100 odd:bg-[#fafaf7] even:bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn className="flex items-center gap-3 mb-8">
                  <Link
                    href={cat.href}
                    className="w-11 h-11 rounded-2xl bg-brand-950 flex items-center justify-center flex-shrink-0 hover:bg-brand-800 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-gold-400" strokeWidth={1.75} />
                  </Link>
                  <div>
                    <p className="text-[11px] font-black tracking-widest text-brand-600 uppercase">{cat.sigla}</p>
                    <Link href={cat.href} className="text-2xl font-extrabold text-slate-900 hover:text-brand-700 transition-colors">
                      {cat.label}
                    </Link>
                  </div>
                </FadeIn>

                <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.06}>
                  {services.map((service) => (
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
          );
        })}

        {/* CTA */}
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="max-w-xl mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
                ¿No sabes qué trámite necesitas?
              </h2>
              <p className="text-slate-500 mb-6">
                Escríbenos y te asesoramos gratis. En menos de {BUSINESS.responseTime} te decimos exactamente qué hacer.
              </p>
              <a
                href={waLink('Hola, necesito ayuda para saber qué trámite necesito.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-wa hover:bg-wa-hover text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Preguntar gratis por WhatsApp
              </a>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
