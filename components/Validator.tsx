import { waLink } from '@/lib/constants';
import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';
import { Shield, UserCheck, CreditCard, AlertCircle } from 'lucide-react';

const waUrl = waLink('Hola, quiero que validen mi caso antes de iniciar el trámite.');

const checks = [
  {
    icon: Shield,
    title: 'Estado del vehículo',
    desc: 'Verificamos en el RUNT que el vehículo no tenga restricciones, reportes de hurto ni impedimentos activos.',
  },
  {
    icon: UserCheck,
    title: 'Propietario actual',
    desc: 'Confirmamos que quien vende figure como propietario en la tarjeta y no haya inconsistencias legales.',
  },
  {
    icon: CreditCard,
    title: 'Prendas activas',
    desc: 'Revisamos si el vehículo tiene gravámenes financieros pendientes que deban levantarse antes del traspaso.',
  },
  {
    icon: AlertCircle,
    title: 'Multas y comparendos',
    desc: 'Consultamos si hay comparendos o multas pendientes que puedan bloquear el proceso a mitad de camino.',
  },
];

export default function Validator() {
  return (
    <section id="validar" className="py-14 sm:py-20 bg-brand-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: `repeating-linear-gradient(60deg,#f59e0b 0px,#f59e0b 1px,transparent 1px,transparent 20px)` }}
      />
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-800/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          <FadeIn direction="left">
            <div className="inline-flex items-center gap-2 bg-gold-500/15 text-gold-400 border border-gold-500/30 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <Shield className="w-3.5 h-3.5" /> Lo que nos diferencia
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              Validamos tu caso{' '}
              <span className="text-gold-400">antes de empezar</span>
            </h2>
            <p className="text-brand-200 text-lg leading-relaxed mb-4">
              Antes de cobrar o recibir un solo documento, revisamos que tu trámite no tenga
              impedimentos ocultos. Así evitamos que el proceso se caiga a mitad de camino.
            </p>
            <p className="text-brand-300 leading-relaxed mb-8">
              Queremos que llegues al trámite con toda la información clara — sin sorpresas
              a mitad del proceso que frenen o encarezcan la gestión.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
            >
              Consultar mi caso →
            </a>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4" stagger={0.1}>
            {checks.map((c, i) => {
              const Icon = c.icon;
              return (
                <FadeInItem key={c.title}>
                  <div className="group bg-white/[0.05] border border-white/10 hover:border-gold-500/40 hover:bg-white/[0.08] rounded-2xl p-5 transition-all h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-brand-800/80 ring-1 ring-white/10 rounded-xl flex items-center justify-center group-hover:bg-brand-700 transition-colors">
                        <Icon className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                      </div>
                      <span className="text-brand-600 text-xs font-bold tabular-nums">0{i + 1}</span>
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1.5">{c.title}</h3>
                    <p className="text-brand-300 text-xs leading-relaxed">{c.desc}</p>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>

        </div>
      </div>
    </section>
  );
}
