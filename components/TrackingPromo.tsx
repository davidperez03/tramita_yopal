import Link from 'next/link';
import { FadeIn } from './FadeIn';

// Demo estática del timeline de /seguimiento/[codigo]
const DEMO_STEPS = [
  { label: 'Recibido',   done: true },
  { label: 'En proceso', done: true },
  { label: 'Aprobado',   done: true, current: true },
  { label: 'Entregado',  done: false },
];

export default function TrackingPromo() {
  return (
    <section className="py-14 sm:py-20 bg-brand-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <FadeIn direction="left">
            <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
              Exclusivo de Tramita Yopal
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Tu trámite, en vivo.
              <br />
              <span className="text-gold-400">Sin llamar, sin preguntar.</span>
            </h2>
            <p className="mt-4 text-brand-200 text-lg leading-relaxed max-w-lg">
              Al iniciar tu trámite te entregamos un código único. Con él ves el estado,
              el historial de avances y las fechas de cada etapa — a cualquier hora, desde tu celular.
              Y cada cambio también te llega por WhatsApp.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/seguimiento"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold px-7 py-3.5 rounded-xl text-base transition-colors"
              >
                Consultar mi trámite
              </Link>
            </div>
          </FadeIn>

          {/* Mini demo del seguimiento */}
          <FadeIn direction="right" className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10 p-6 w-full max-w-sm">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-black tracking-widest text-brand-600 uppercase">Tramita Yopal</p>
                <span className="font-mono text-[11px] text-slate-400 tracking-widest">A3F9C2E1</span>
              </div>
              <p className="text-sm font-extrabold text-slate-900 mb-5">Traspaso de Propiedad</p>

              <div className="relative mx-2">
                <div className="absolute top-[13px] left-0 right-0 h-0.5 bg-slate-100" />
                <div className="absolute top-[13px] left-0 h-0.5 bg-emerald-500" style={{ width: '66%' }} />
                <div className="relative flex justify-between">
                  {DEMO_STEPS.map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1.5">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 ${
                        s.current
                          ? 'bg-white border-emerald-500 ring-4 ring-emerald-100'
                          : s.done
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'bg-white border-slate-200'
                      }`}>
                        {s.done && !s.current ? (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : s.current ? (
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        )}
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-wide text-center w-14 ${
                        s.current ? 'text-emerald-700' : s.done ? 'text-slate-500' : 'text-slate-300'
                      }`}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                <p className="text-xs text-emerald-800">
                  <strong>Aprobado</strong> · El tránsito expidió tu documento. Coordinamos la entrega.
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
