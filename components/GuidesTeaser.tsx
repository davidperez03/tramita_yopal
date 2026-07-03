import Link from 'next/link';
import { GUIAS } from '@/lib/guias';
import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';

export default function GuidesTeaser() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
              Aprende antes de tramitar
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Guías escritas por quienes tramitan a diario
            </h2>
          </div>
          <Link
            href="/guias"
            className="flex-shrink-0 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors whitespace-nowrap"
          >
            Ver todas las guías →
          </Link>
        </FadeIn>

        <FadeInStagger className="grid md:grid-cols-3 gap-5" stagger={0.1}>
          {GUIAS.slice(0, 3).map((g) => (
            <FadeInItem key={g.slug}>
              <Link
                href={`/guias/${g.slug}`}
                className="bg-[#fafaf7] rounded-2xl border border-slate-100 p-6 hover:border-brand-300 hover:shadow-md transition-all group flex flex-col h-full"
              >
                <p className="text-[11px] text-slate-400 mb-3">{g.minutos} min de lectura</p>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors leading-snug mb-2">
                  {g.tituloCorto}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                  {g.descripcion}
                </p>
                <span className="text-sm font-semibold text-brand-600 group-hover:text-brand-800 transition-colors mt-4">
                  Leer guía →
                </span>
              </Link>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
