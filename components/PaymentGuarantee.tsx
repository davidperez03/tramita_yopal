import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';

export default function PaymentGuarantee() {
  return (
    <section className="py-14 sm:py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Nunca te cobramos todo por adelantado
          </h2>
          <p className="mt-3 text-slate-500 text-lg max-w-xl">
            Cobramos en dos momentos: uno para arrancar, otro cuando el tránsito aprueba.
          </p>
        </FadeIn>

        <FadeInStagger className="grid sm:grid-cols-2 rounded-2xl overflow-hidden mb-8 shadow-sm" stagger={0.1}>

          <FadeInItem>
            <div className="bg-white border border-slate-200 sm:border-r-0 sm:rounded-l-2xl p-8 sm:p-10 h-full">
              <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-4">Al aprobar la cotización</p>
              <div className="text-7xl font-black text-slate-900 leading-none mb-4">
                50<span className="text-brand-600 text-4xl">%</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Con esa mitad arrancamos. No cobramos nada antes de que apruebes el precio.
              </p>
            </div>
          </FadeInItem>

          <FadeInItem>
            <div className="bg-brand-950 sm:rounded-r-2xl p-8 sm:p-10 h-full">
              <p className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-4">Cuando el tránsito aprueba</p>
              <div className="text-7xl font-black text-white leading-none mb-4">
                50<span className="text-gold-400 text-4xl">%</span>
              </div>
              <p className="text-brand-300 text-sm leading-relaxed">
                Pagas el resto cuando el tránsito expide tu documento. Después te lo enviamos sin costo adicional.
              </p>
            </div>
          </FadeInItem>

        </FadeInStagger>

        <FadeIn>
          <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-amber-400 pl-4">
            <strong className="text-slate-700">Traspaso de Propiedad:</strong> el tránsito cobra un avalúo del 1 % del valor comercial del vehículo, y ese valor hay que pagarlo completo desde el inicio — no se divide en dos. No es un cobro nuestro, es lo que exige el organismo. Tu asesor te lo detalla al cotizarte.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
