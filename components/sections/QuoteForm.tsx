'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { BUSINESS, SERVICES, waLink } from '@/lib/constants';
import { REGLA_AVALUO } from '@/lib/reglas-negocio';
import { CATEGORIAS, type Categoria } from '@/lib/seo-data';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { FadeIn } from '../FadeIn';

// No es un trámite del catálogo (no hay tarjeta que expedir ni ciudad de
// matrícula) — tiene su propio formulario especializado en /descuento-comparendo,
// así que en vez de armar un WhatsApp genérico redirigimos allá.
const OPCION_DESCUENTO_COMPARENDO = 'Pago de comparendo con descuento';

const OPCION_OTRO = 'Otro / No estoy seguro';

// Agrupado por categoría (RNA/RNC/Comparendos) en vez de una sola lista
// plana mezclando trámites del vehículo, de la licencia y de multas.
const tramiteGroups: { key: Categoria; label: string; options: string[] }[] =
  (Object.keys(CATEGORIAS) as Categoria[]).map((key) => ({
    key,
    label: `${CATEGORIAS[key].sigla} — ${CATEGORIAS[key].short}`,
    options: [
      ...SERVICES.filter((s) => s.categoria === key).map((s) => s.name),
      ...(key === 'comparendos' ? [OPCION_DESCUENTO_COMPARENDO] : []),
    ],
  }));

const inputClass =
  'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent';

type Props = {
  // Si se indica, el formulario solo muestra los trámites de esa
  // categoría (usado en /rna, /rnc, /comparendos) en vez de las 3
  // mezcladas — coherente con la página donde vive el formulario.
  categoria?: Categoria;
};

export default function QuoteForm({ categoria }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: '', tramite: '', ciudad: '', descripcion: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (form.tramite === OPCION_DESCUENTO_COMPARENDO) {
      router.push('/descuento-comparendo');
      return;
    }

    const msg = `Hola, necesito una cotización.
*Nombre:* ${form.nombre}
*Trámite:* ${form.tramite || 'No especificado'}
*Ciudad:* ${form.ciudad}
*Descripción:* ${form.descripcion || 'Sin descripción adicional'}`;
    window.open(waLink(msg), '_blank');
  };

  const cat = categoria ? CATEGORIAS[categoria] : null;

  return (
    <section id="cotizar" className="py-14 sm:py-20 bg-brand-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Izquierda */}
          <FadeIn direction="left" className="text-white">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              {cat ? (
                <>
                  Cuéntanos tu caso de {cat.short.toLowerCase()}.
                  <br />
                  <span className="text-gold-400">Nos encargamos del resto.</span>
                </>
              ) : (
                <>
                  Cuéntanos tu caso.
                  <br />
                  <span className="text-gold-400">Nos encargamos del resto.</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-brand-300 text-lg leading-relaxed">
              Cotizamos gratis en menos de {BUSINESS.responseTime}. Sin compromiso.
            </p>
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
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tipo de trámite {cat && <span className="text-slate-400 font-normal">({cat.sigla})</span>} *
                </label>
                <select name="tramite" required value={form.tramite} onChange={handleChange} className={`${inputClass} bg-white`}>
                  <option value="">Selecciona tu trámite...</option>
                  {cat ? (
                    <>
                      {tramiteGroups.find((g) => g.key === categoria)!.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      <option value={OPCION_OTRO}>{OPCION_OTRO}</option>
                    </>
                  ) : (
                    <>
                      {tramiteGroups.map((g) => (
                        <optgroup key={g.key} label={g.label}>
                          {g.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                        </optgroup>
                      ))}
                      <option value={OPCION_OTRO}>{OPCION_OTRO}</option>
                    </>
                  )}
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

              {form.tramite === OPCION_DESCUENTO_COMPARENDO ? (
                <button
                  type="submit"
                  className="w-full bg-brand-950 hover:bg-brand-800 text-white font-bold py-3.5 rounded-xl text-base transition-colors flex items-center justify-center gap-2"
                >
                  Continuar al formulario de descuento →
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-wa hover:bg-wa-hover text-white font-bold py-3.5 rounded-xl text-base transition-colors flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Cotizar por WhatsApp
                </button>
              )}

              <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-center space-y-0.5">
                {categoria === 'rna' ? (
                  <>
                    <p className="text-xs font-semibold text-slate-700">Sin cobro total por adelantado</p>
                    <p className="text-xs text-slate-400">Pagas al iniciar y cuando el tránsito aprueba — nada más.</p>
                  </>
                ) : categoria === 'rnc' || categoria === 'comparendos' ? (
                  <>
                    <p className="text-xs font-semibold text-slate-700">Un solo pago, sin sorpresas</p>
                    <p className="text-xs text-slate-400">Te confirmamos el valor exacto antes de cobrar.</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-slate-700">Sin sorpresas en el cobro</p>
                    <p className="text-xs text-slate-400">Te confirmamos el valor exacto antes de cobrar nada — varía según el trámite.</p>
                  </>
                )}
              </div>

              {form.tramite === 'Traspaso de Propiedad' && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 leading-relaxed">
                  <strong>Traspaso:</strong> el avalúo vehicular (1%, {REGLA_AVALUO.corta}) se paga completo al organismo de tránsito al iniciar. Tu asesor te lo detalla en la cotización.
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
