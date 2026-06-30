'use client';

import { useState, FormEvent } from 'react';
import { BUSINESS, SERVICES, waLink } from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';
import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';
import { Tag, Zap, Truck, ShieldCheck } from 'lucide-react';

const tramiteOptions = [
  ...SERVICES.filter((s) => s.id !== 'otros').map((s) => s.name),
  'Otro / No estoy seguro',
];

const inputClass =
  'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent';

const stats = [
  { icon: Tag,         value: 'Gratis',    label: 'Cotización sin compromiso' },
  { icon: Zap,         value: '< 30 min', label: 'Tiempo de respuesta'       },
  { icon: Truck,       value: 'Gratis',   label: 'Envío a tu domicilio'      },
  { icon: ShieldCheck, value: '100%',     label: 'Validación previa incluida' },
];

export default function QuoteForm() {
  const [form, setForm] = useState({
    nombre: '', tramite: '', ciudad: '', descripcion: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Hola, necesito una cotización.
*Nombre:* ${form.nombre}
*Trámite:* ${form.tramite || 'No especificado'}
*Ciudad:* ${form.ciudad}
*Descripción:* ${form.descripcion || 'Sin descripción adicional'}`;
    window.open(waLink(msg), '_blank');
  };

  return (
    <section id="cotizar" className="py-14 sm:py-20 bg-brand-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Izquierda */}
          <FadeIn direction="left" className="text-white">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Cuéntanos tu caso.
              <br />
              <span className="text-gold-400">Nos encargamos del resto.</span>
            </h2>
            <p className="mt-4 text-brand-300 text-lg leading-relaxed">
              Cotizamos gratis en menos de {BUSINESS.responseTime}. Sin compromiso.
            </p>

            <FadeInStagger className="grid grid-cols-2 gap-3 mt-8" stagger={0.08}>
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <FadeInItem key={s.label}>
                    <div className="bg-white/[0.07] hover:bg-white/[0.10] border border-white/10 rounded-2xl p-4 transition-colors h-full">
                      <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                        <Icon className="w-4 h-4 text-gold-400" strokeWidth={1.5} />
                      </div>
                      <p className="text-white font-extrabold text-xl leading-none">{s.value}</p>
                      <p className="text-brand-400 text-xs mt-1">{s.label}</p>
                    </div>
                  </FadeInItem>
                );
              })}
            </FadeInStagger>
          </FadeIn>

          {/* Derecha — formulario */}
          <FadeIn direction="right" delay={0.15}>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                Cuéntanos sobre tu trámite
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo *</label>
                <input name="nombre" required value={form.nombre} onChange={handleChange} placeholder="Ej: Juan García" className={inputClass} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de trámite *</label>
                <select name="tramite" required value={form.tramite} onChange={handleChange} className={`${inputClass} bg-white`}>
                  <option value="">Selecciona tu trámite...</option>
                  {tramiteOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">¿Desde qué ciudad nos escribes? *</label>
                <input name="ciudad" required value={form.ciudad} onChange={handleChange} placeholder="Ej: Yopal, Bogotá, Medellín..." className={inputClass} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Descripción del caso <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Cuéntanos cualquier detalle relevante..." rows={3} className={`${inputClass} resize-none`} />
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 flex-shrink-0 accent-brand-600 cursor-pointer" />
                <span className="text-xs text-slate-500 leading-relaxed">
                  Acepto la{' '}
                  <a href="/politica-privacidad" target="_blank" className="text-brand-600 hover:underline font-medium">Política de Privacidad</a>
                  {' '}y los{' '}
                  <a href="/terminos" target="_blank" className="text-brand-600 hover:underline font-medium">Términos y Condiciones</a>
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-wa hover:bg-wa-hover text-white font-bold py-3.5 rounded-xl text-base transition-colors flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Cotizar por WhatsApp
              </button>

              <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-center space-y-0.5">
                <p className="text-xs font-semibold text-slate-700">Sin cobro total por adelantado</p>
                <p className="text-xs text-slate-400">Pagas al iniciar y cuando el tránsito aprueba — nada más.</p>
              </div>

              {form.tramite === 'Traspaso de Propiedad' && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 leading-relaxed">
                  <strong>Traspaso:</strong> el avalúo vehicular (1 % del valor comercial) se paga completo al organismo de tránsito al iniciar. Tu asesor te lo detalla en la cotización.
                </div>
              )}

              <p className="text-center text-xs text-slate-400">
                🔒 Información segura · No compartimos con terceros
              </p>
            </form>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
