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
            const waUrl   = waLink(s.whatsappMessage);
            const seoSlug = SEO_SERVICES.find((ss) => ss.name === s.name)?.slug;
            const href    = seoSlug ? `/tramites/${seoSlug}/yopal` : waUrl;
            const isExt   = !seoSlug;
            return (
              <FadeInItem key={s.id}>
                <a
                  href={href}
                  target={isExt ? '_blank' : undefined}
                  rel={isExt ? 'noopener noreferrer' : undefined}
                  className="group bg-white rounded-2xl border border-slate-100 p-6 hover:border-brand-300 hover:shadow-md transition-all flex flex-col h-full"
                >
                  <span className="text-xs font-bold text-slate-300 tracking-widest mb-3">
                    {s.number}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors mb-2 flex-1">
                    {s.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {s.description}
                  </p>
                  <span className="text-sm font-semibold text-wa group-hover:text-wa-hover transition-colors flex items-center gap-1">
                    {s.id === 'otros' ? 'Preguntar por WhatsApp →' : 'Ver trámite →'}
                  </span>
                </a>
              </FadeInItem>
            );
          })}

          {/* Tarjeta prescripción — enlaza a página dedicada */}
          <FadeInItem>
            <Link
              href="/prescripcion-comparendos"
              className="group bg-brand-950 rounded-2xl border border-brand-800 p-6 hover:border-gold-500/50 hover:shadow-md transition-all flex flex-col h-full"
            >
              <span className="text-xs font-bold text-brand-600 tracking-widest mb-3">007</span>
              <h3 className="text-base font-bold text-white group-hover:text-gold-400 transition-colors mb-2 flex-1">
                Prescripción de Comparendos
              </h3>
              <p className="text-sm text-brand-300 leading-relaxed mb-4">
                ¿Tienes multas de más de 3 años sin pagar? Pueden estar prescritas.
                Revisamos gratis y tramitamos la declaración.
              </p>
              <span className="text-sm font-semibold text-gold-400 group-hover:text-gold-300 transition-colors flex items-center gap-1">
                Ver servicio →
              </span>
            </Link>
          </FadeInItem>
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
