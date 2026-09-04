import Link from 'next/link';
import { Car, IdCard, AlertTriangle } from 'lucide-react';
import { waLink, WA_MESSAGES } from '@/lib/constants';
import { SEO_SERVICES, CATEGORIAS, type Categoria } from '@/lib/seo-data';
import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';

const ICONS: Record<Categoria, typeof Car> = {
  rna: Car,
  rnc: IdCard,
  comparendos: AlertTriangle,
};

export default function Services() {
  const categorias = (Object.keys(CATEGORIAS) as Categoria[]).map((key) => ({
    key,
    ...CATEGORIAS[key],
    count: SEO_SERVICES.filter((s) => s.categoria === key).length,
    Icon: ICONS[key],
  }));

  return (
    <section id="tramites" className="py-14 sm:py-20 bg-[#fafaf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            ¿Qué trámite necesitas?
          </h2>
          <p className="mt-2 text-slate-500 text-lg">
            Trámites vehiculares en <strong className="text-slate-700">Yopal, Casanare</strong>.
            Cotizamos en menos de 30 minutos.
          </p>
        </FadeIn>

        <FadeInStagger className="grid sm:grid-cols-3 gap-5" stagger={0.08}>
          {categorias.map(({ key, sigla, label, short, description, href, count, Icon }) => (
            <FadeInItem key={key}>
              <Link
                href={href}
                className="group flex flex-col h-full bg-white rounded-3xl border border-slate-100 p-7 shadow-sm hover:border-brand-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-950 flex items-center justify-center mb-5 group-hover:bg-brand-800 transition-colors">
                  <Icon className="w-6 h-6 text-gold-400" strokeWidth={1.75} />
                </div>
                <p className="text-[11px] font-black tracking-widest text-brand-600 uppercase mb-1.5">
                  {sigla}
                </p>
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug mb-2">
                  {label}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {description}
                </p>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400">
                    {count} trámite{count === 1 ? '' : 's'} · {short}
                  </span>
                  <span className="text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition-colors whitespace-nowrap">
                    Ver todos →
                  </span>
                </div>
              </Link>
            </FadeInItem>
          ))}
        </FadeInStagger>

        {/* Puerta abierta */}
        <FadeIn delay={0.3} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            ¿Tu vehículo <strong className="text-slate-700">no está matriculado en Yopal</strong>?
            Escríbenos y consultamos si podemos ayudarte.
          </p>
          <a
            href={waLink(WA_MESSAGES.noMatricula)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors whitespace-nowrap"
          >
            Consultar →
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
