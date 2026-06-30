import { PROCESS_STEPS, waLink } from '@/lib/constants';
import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';

const waUrl = waLink('Hola, quiero iniciar un trámite vehicular.');

export default function Process() {
  return (
    <section id="proceso" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Cómo funciona
          </h2>
          <p className="mt-2 text-slate-500 text-lg">
            Del primer mensaje a la tarjeta de propiedad en tu puerta.
          </p>
        </FadeIn>

        <div className="relative">
          <div className="hidden lg:block absolute top-5 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px bg-slate-100" />

          <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.12}>
            {PROCESS_STEPS.map((step, i) => (
              <FadeInItem key={step.step}>
                <div className="relative">
                  <div className="relative z-10 w-10 h-10 bg-brand-950 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4 ring-4 ring-white shadow-md">
                    {i + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>

        <FadeIn delay={0.3} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold px-7 py-3 rounded-xl transition-colors text-sm"
          >
            Iniciar mi trámite →
          </a>
          <p className="text-slate-400 text-sm">
            <span className="text-slate-700 font-semibold">Sin cobro total por adelantado.</span>
            {' '}Pagas en dos momentos — al iniciar y al aprobar.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
