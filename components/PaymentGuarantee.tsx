import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';

export default function PaymentGuarantee() {
  return (
    <section className="py-14 sm:py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn className="mb-10">
          <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
            Política de pago
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Nunca pagas todo por adelantado
          </h2>
          <p className="mt-3 text-slate-500 text-lg max-w-xl">
            Dividimos el cobro en dos momentos concretos para que siempre sepas exactamente cuándo y por qué pagas.
          </p>
        </FadeIn>

        <FadeInStagger className="grid sm:grid-cols-2 gap-5" stagger={0.12}>

          <FadeInItem>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 h-full flex flex-col gap-4">
              <span className="text-6xl font-black text-gold-500 leading-none">50%</span>
              <div>
                <p className="text-slate-900 font-bold text-lg mb-1">Para iniciar tu trámite</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Una vez revisado tu caso y aprobada la cotización, pagas esta mitad para que empecemos. Antes de eso no hay ningún cobro.
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/>
                </svg>
                Al aprobar la cotización
              </div>
            </div>
          </FadeInItem>

          <FadeInItem>
            <div className="bg-brand-950 rounded-2xl p-8 h-full flex flex-col gap-4">
              <span className="text-6xl font-black text-white leading-none">50%</span>
              <div>
                <p className="text-white font-bold text-lg mb-1">Una vez aprobado tu trámite</p>
                <p className="text-brand-300 text-sm leading-relaxed">
                  El restante lo pagas cuando el tránsito aprueba y expide tu documento. Luego lo enviamos a tu puerta sin costo adicional.
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-brand-400">
                <svg className="w-4 h-4 text-gold-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/>
                </svg>
                Una vez aprobado por el tránsito
              </div>
            </div>
          </FadeInItem>

        </FadeInStagger>

      </div>
    </section>
  );
}
