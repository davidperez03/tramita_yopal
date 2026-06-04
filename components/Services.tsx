import Link from 'next/link';
import { SERVICES, waLink, WA_MESSAGES } from '@/lib/constants';
import { SEO_SERVICES } from '@/lib/seo-data';
import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';

export default function Services() {
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

        <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => {
            const waUrl = waLink(s.whatsappMessage);
            const isPrescripcion = s.id === 'prescripcion';
            const isOtros = s.id === 'otros';
            const seoSlug = SEO_SERVICES.find((ss) => ss.name === s.name)?.slug;
            const href = isPrescripcion
              ? '/prescripcion-comparendos'
              : seoSlug ? `/tramites/${seoSlug}/yopal` : waUrl;
            const isExt = !isPrescripcion && !seoSlug;

            return (
              <FadeInItem key={s.id}>
                <Link
                  href={href}
                  target={isExt ? '_blank' : undefined}
                  rel={isExt ? 'noopener noreferrer' : undefined}
                  className={`group rounded-2xl border p-6 hover:shadow-md transition-all flex flex-col h-full ${
                    isPrescripcion
                      ? 'bg-brand-950 border-brand-800 hover:border-gold-500/50'
                      : 'bg-white border-slate-100 hover:border-brand-300'
                  }`}
                >
                  <span className={`text-xs font-bold tracking-widest mb-3 ${isPrescripcion ? 'text-brand-600' : 'text-slate-300'}`}>
                    {s.number}
                  </span>
                  <h3 className={`text-base font-bold transition-colors mb-2 flex-1 ${
                    isPrescripcion
                      ? 'text-white group-hover:text-gold-400'
                      : 'text-slate-900 group-hover:text-brand-700'
                  }`}>
                    {s.name}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${isPrescripcion ? 'text-brand-300' : 'text-slate-500'}`}>
                    {s.description}
                  </p>
                  <span className={`text-sm font-semibold transition-colors flex items-center gap-1 ${
                    isPrescripcion
                      ? 'text-gold-400 group-hover:text-gold-300'
                      : 'text-wa group-hover:text-wa-hover'
                  }`}>
                    {isOtros ? 'Preguntar por WhatsApp →' : 'Ver trámite →'}
                  </span>
                </Link>
              </FadeInItem>
            );
          })}
        </FadeInStagger>

        {/* Puerta abierta */}
        <FadeIn delay={0.3} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8 border-t border-slate-200">
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
