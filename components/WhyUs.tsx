import { waLink } from '@/lib/constants';
import { FadeIn } from './FadeIn';
import { PackageCheck, Truck, CheckCircle2 } from 'lucide-react';

const waUrl = waLink('Hola, quiero más información sobre sus servicios.');

const listItems = [
  { title: 'Sin cobro total por adelantado',   desc: 'Honorarios y derechos de trámite se dividen en dos: mitad al iniciar, mitad al aprobar. El único cobro que no se divide es el avalúo en traspaso, que lo exige el tránsito completo.' },
  { title: 'Tramitamos en ventanilla por ti', desc: 'Gestionamos tu trámite de forma presencial en el organismo de tránsito de Yopal. Tú solo envías los documentos por mensajería.' },
  { title: 'Validación previa sin costo',     desc: 'Antes de cobrar revisamos el vehículo, el propietario y el comprador para detectar prendas, multas o restricciones.' },
  { title: 'Trámites en Yopal, Casanare',     desc: 'Especializados en el organismo de tránsito de Yopal. ¿Vehículo de otra ciudad? Cuéntanos tu caso.' },
  { title: 'Sin letra pequeña',               desc: 'Te decimos exactamente qué necesitas, cuánto cuesta y cuánto tarda — antes de empezar.' },
];

export default function WhyUs() {
  return (
    <section id="por-que" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Izquierda */}
          <div className="space-y-5">
            <FadeIn direction="left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                Por qué elegir
                <br />
                <span className="text-brand-700">Tramita Yopal</span>
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="bg-brand-950 rounded-2xl p-7 text-white">
                <div className="w-12 h-12 bg-brand-800 ring-1 ring-white/10 rounded-2xl flex items-center justify-center mb-4">
                  <PackageCheck className="w-6 h-6 text-brand-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-2">Seguimiento en línea, en tiempo real</h3>
                <p className="text-brand-200 text-sm leading-relaxed mb-4">
                  Al iniciar tu trámite recibes un código único. Lo ingresas en nuestra página de
                  seguimiento y ves el estado, el historial y las fechas de cada etapa — a cualquier
                  hora, sin preguntar. Y cada avance también te llega por WhatsApp.
                </p>
                <a href="/seguimiento" className="inline-flex items-center gap-1.5 text-sm font-bold text-gold-400 hover:text-gold-300 transition-colors">
                  Consultar mi trámite →
                </a>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="bg-gold-500/10 border border-gold-500/30 rounded-2xl p-6">
                <div className="w-10 h-10 bg-gold-500/20 rounded-xl flex items-center justify-center mb-3">
                  <Truck className="w-5 h-5 text-gold-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Envío gratis a domicilio</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Una vez listo el trámite, te enviamos la tarjeta de propiedad sin costo adicional.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Derecha */}
          <FadeIn direction="right" className="divide-y divide-slate-100">
            {listItems.map((item) => (
              <div key={item.title} className="py-5 flex gap-4 items-start group">
                <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5 group-hover:text-brand-700 transition-colors" strokeWidth={2} />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                  <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="pt-6">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-700 font-semibold text-sm hover:text-brand-900 transition-colors"
              >
                Hablar con un asesor →
              </a>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
