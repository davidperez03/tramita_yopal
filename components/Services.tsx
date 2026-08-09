import Link from 'next/link';
import { SERVICES, waLink, WA_MESSAGES } from '@/lib/constants';
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

        {/* Índice de trámites — filas editoriales, sin tarjetas */}
        <FadeInStagger className="border-t-2 border-brand-950" stagger={0.06}>
          {SERVICES.map((s) => {
            const waUrl = waLink(s.whatsappMessage);
            const isPrescripcion = s.id === 'prescripcion-comparendos';
            const isOtros = s.id === 'otros';
            // El id de cada servicio del catálogo es su slug SEO
            const href = isPrescripcion
              ? '/prescripcion-comparendos'
              : isOtros ? waUrl : `/tramites/${s.id}/yopal`;
            const isExt = isOtros;

            return (
              <FadeInItem key={s.id}>
                <Link
                  href={href}
                  target={isExt ? '_blank' : undefined}
                  rel={isExt ? 'noopener noreferrer' : undefined}
                  className="group grid grid-cols-[1fr_auto] sm:grid-cols-[3.5rem_1fr_9rem_11rem] items-center gap-x-6 gap-y-1 py-5 sm:py-6 border-b border-slate-200 hover:bg-white transition-colors"
                >
                  <span className="hidden sm:block text-xs font-bold tracking-widest text-slate-300 tabular-nums">
                    {s.number}
                  </span>
                  <div className="col-span-2 sm:col-span-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors flex items-center gap-2.5 flex-wrap">
                      {s.name}
                      {isPrescripcion && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 border border-gold-500/40 px-2 py-0.5 rounded">
                          Consulta gratis
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1 max-w-xl">{s.description}</p>
                  </div>
                  <span className="hidden sm:block text-xs text-slate-400">
                    {s.duration ?? 'Según el caso'}
                  </span>
                  <span className="text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition-colors justify-self-start sm:justify-self-end whitespace-nowrap">
                    {isOtros ? 'Preguntar por WhatsApp' : 'Ver trámite'} →
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
