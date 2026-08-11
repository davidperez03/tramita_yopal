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

        <FadeInStagger className="border-t-2 border-brand-950" stagger={0.06}>
          {GUIAS.slice(0, 4).map((g) => (
            <FadeInItem key={g.slug}>
              <Link
                href={`/guias/${g.slug}`}
                className="group grid sm:grid-cols-[8rem_1fr_auto] items-baseline gap-x-8 gap-y-1 py-6 border-b border-slate-200 hover:bg-[#fafaf7] transition-colors"
              >
                <span className="text-[11px] text-slate-400 uppercase tracking-wide">
                  {g.minutos} min de lectura
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors leading-snug">
                    {g.tituloCorto}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mt-1 max-w-2xl line-clamp-2">
                    {g.descripcion}
                  </p>
                </div>
                <span className="text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition-colors">
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
