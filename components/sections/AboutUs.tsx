import type { ReactNode } from 'react';
import { BUSINESS, waLink } from '@/lib/constants';
import { FadeIn } from '../FadeIn';

const waUrl = waLink('Hola, quiero saber más sobre sus servicios.');

const ic = 'w-4 h-4 text-brand-600 flex-shrink-0';
const sv = { fill: 'none' as const, viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.5 };

const datos: { label: string; value: string; icon: ReactNode }[] = [
  {
    label: 'Horario',
    value: `${BUSINESS.hours.weekdays} · ${BUSINESS.hours.saturday}`,
    icon: (
      <svg className={ic} {...sv}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Dónde tramitamos',
    value: 'Yopal, Casanare',
    icon: (
      <svg className={ic} {...sv}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: 'Medios de pago',
    value: 'Nequi · Daviplata · Bancolombia · Efectivo',
    icon: (
      <svg className={ic} {...sv}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    label: 'Envío de documentos',
    value: 'Interrapidísimo · Servientrega',
    icon: (
      <svg className={ic} {...sv}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
];

export default function AboutUs() {
  return (
    <section id="nosotros" className="py-14 sm:py-20 bg-[#fafaf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Izquierda */}
          <FadeIn direction="left">
            <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-3">
              Quiénes somos
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Gestión de trámites
              <br />
              <span className="text-brand-700">vehiculares en Yopal</span>
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Somos <strong>{BUSINESS.name}</strong>, especializados en trámites
              vehiculares en <strong>{BUSINESS.location}</strong>. Atendemos
              de forma completamente virtual — sin que tengas que pisar una oficina.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Antes de empezar revisamos el historial del vehículo y la documentación
              del propietario para detectar impedimentos. Así sabes exactamente con qué
              cuentas antes de invertir tiempo o dinero.
            </p>
          </FadeIn>

          {/* Derecha: datos */}
          <FadeIn direction="right" delay={0.1}>
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              {datos.map((item) => (
                <div key={item.label} className="flex items-start gap-3 px-6 py-4">
                  <div className="mt-0.5">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-400 text-xs mb-0.5">{item.label}</p>
                    <p className="text-slate-900 font-semibold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
              <div className="px-6 py-4 bg-brand-950">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-brand-300 hover:text-white transition-colors font-medium"
                >
                  <span>¿Tienes alguna duda antes de empezar?</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
