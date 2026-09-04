'use client';

import { useState, FormEvent } from 'react';
import { waLink } from '@/lib/constants';
import { FadeIn, FadeInStagger, FadeInItem } from '../FadeIn';
import { WhatsAppIcon } from '../WhatsAppIcon';

const inputClass =
  'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white';

const steps = [
  {
    n: '01',
    title: 'Verificación gratuita',
    desc: 'Ingresas tu cédula y revisamos si tienes comparendos activos y cuáles llevan más de 3 años sin cobrar.',
  },
  {
    n: '02',
    title: 'Cotización del proceso',
    desc: 'Si aplica prescripción, te explicamos exactamente qué documentos se necesitan, cuánto cuesta y cuánto tarda.',
  },
  {
    n: '03',
    title: 'Tramitamos en ventanilla',
    desc: 'Gestionamos la declaración de prescripción ante el organismo de tránsito de Yopal. Tú no tienes que ir a ningún lado.',
  },
  {
    n: '04',
    title: 'Multa eliminada del sistema',
    desc: 'Una vez declarada la prescripción queda en firme y el comparendo desaparece del historial de tránsito.',
  },
];

const faqs = [
  {
    q: '¿Qué significa que un comparendo esté prescrito?',
    a: 'Significa que por el paso del tiempo ya no puedes ser obligado a pagarlo. En Colombia las multas de tránsito prescriben a los 3 años desde la fecha de la infracción. Pero que estén prescritas no las elimina solas del sistema — hay que tramitar la declaración para que desaparezcan del SIMIT.',
  },
  {
    q: '¿Por qué tengo que tramitarlo si ya no lo debo?',
    a: 'Porque el SIMIT no las borra automáticamente. Mientras no se declare la prescripción formalmente, la multa sigue bloqueando traspasos, traslados de cuenta y la obtención del paz y salvo vehicular — aunque legalmente ya no exista.',
  },
  {
    q: '¿También prescriben los comparendos en cobro coactivo?',
    a: 'Sí. El proceso de cobro coactivo también prescribe si la autoridad no lo impulsa dentro de los términos legales. Cuéntanos tu caso — verificamos el estado real del comparendo y te decimos si aplica prescripción.',
  },
  {
    q: '¿Cuánto tarda el proceso?',
    a: 'Entre 15 y 30 días hábiles una vez radicada la solicitud ante el organismo de tránsito. Te decimos el tiempo estimado exacto cuando revisamos tu caso.',
  },
  {
    q: '¿La verificación tiene algún costo?',
    a: 'No. Revisamos tus comparendos en el SIMIT con tu número de cédula completamente gratis. Solo cotizamos el trámite si aplica prescripción y tú decides seguir adelante.',
  },
  {
    q: '¿Aplica aunque mi vehículo no esté matriculado en Yopal?',
    a: 'Cuéntanos tu caso. La prescripción depende de dónde quedó registrado el comparendo, no de dónde está matriculado el vehículo. Revisamos y te decimos si podemos gestionarlo.',
  },
  {
    q: '¿Qué pasa si no hago nada?',
    a: 'El comparendo sigue apareciendo en el sistema y bloqueando cualquier trámite vehicular. No desaparece solo con el tiempo — hay que declarar la prescripción formalmente para que el SIMIT lo elimine.',
  },
];

export default function PrescripcionPage() {
  const [cedula, setCedula] = useState('');
  const [placa, setPlaca]   = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg =
      `Hola, quiero verificar si tengo comparendos prescritos.\n` +
      `*Cédula:* ${cedula}` +
      (placa ? `\n*Placa:* ${placa}` : '');
    window.open(waLink(msg), '_blank');
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-950 overflow-hidden pt-28 pb-16 sm:pb-20">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `repeating-linear-gradient(45deg,#f59e0b 0px,#f59e0b 1px,transparent 1px,transparent 20px)` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Texto */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-gold-500/15 text-gold-400 border border-gold-500/30 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                Prescripción de comparendos · Yopal, Casanare
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
                ¿Tienes multas
                <br />
                <span className="text-gold-400">de más de 3 años?</span>
              </h1>
              <p className="text-lg text-brand-200 leading-relaxed mb-4 max-w-lg">
                En Colombia, los comparendos de tránsito{' '}
                <strong className="text-white">prescriben a los 3 años</strong>.
                Si la autoridad no cobró en ese plazo, ya no estás obligado a pagarlos —
                pero hay que tramitar la prescripción para que queden eliminados del sistema.
              </p>
              <p className="text-brand-300 leading-relaxed max-w-lg">
                Sin ese trámite, las multas prescritas siguen bloqueando traspasos,
                traslados y la expedición del paz y salvo vehicular.
              </p>
            </FadeIn>

            {/* Formulario */}
            <FadeIn direction="right" delay={0.15}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Verifica tus multas gratis
                </h2>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Ingresa tu cédula y te decimos si tienes comparendos prescritos
                  — sin costo, sin compromiso.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Número de cédula *
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      placeholder="Ej: 1000123456"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Placa del vehículo{' '}
                      <span className="text-slate-400 font-normal">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={placa}
                      onChange={(e) =>
                        setPlaca(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))
                      }
                      placeholder="Ej: ABC123"
                      className={inputClass}
                    />
                  </div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 flex-shrink-0 accent-brand-600" />
                    <span className="text-xs text-slate-500 leading-relaxed">
                      Acepto la{' '}
                      <a href="/politica-privacidad" target="_blank" className="text-brand-600 hover:underline font-medium">
                        Política de Privacidad
                      </a>
                      {' '}y autorizo el uso de mis datos para verificar mis multas.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full bg-wa hover:bg-wa-hover text-white font-bold py-3.5 rounded-xl text-base transition-colors flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Verificar por WhatsApp
                  </button>
                </form>

                <p className="mt-4 text-xs text-slate-400 text-center">
                  Verificación gratuita · Si aplica, cotizamos el proceso
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-14 sm:py-20 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Cómo funciona
            </h2>
            <p className="mt-2 text-slate-500 text-lg">
              Del primer mensaje a la multa eliminada del sistema.
            </p>
          </FadeIn>

          <div className="relative">
            <div className="hidden lg:block absolute top-5 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px bg-slate-200" />
            <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.12}>
              {steps.map((step) => (
                <FadeInItem key={step.n}>
                  <div className="relative">
                    <div className="relative z-10 w-10 h-10 bg-brand-950 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4 ring-4 ring-[#fafaf7] shadow-md">
                      {step.n}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </div>
      </section>

      {/* Base legal */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                label: 'Fundamento legal',
                text: 'Ley 769 de 2002 — Código Nacional de Tránsito. Las infracciones prescriben a los 3 años si no hay cobro coactivo iniciado.',
              },
              {
                label: '¿Qué elimina el trámite?',
                text: 'La declaración de prescripción elimina el comparendo del SIMIT y levanta cualquier bloqueo que esté generando sobre traspasos o traslados.',
              },
              {
                label: 'Verificación gratuita',
                text: 'Consultamos en el SIMIT con tu número de cédula. Si hay comparendos prescritos, te lo decimos antes de cobrar cualquier honorario.',
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-1 flex-shrink-0 bg-brand-700 rounded-full" />
                <div>
                  <p className="text-xs font-bold text-brand-700 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cruce con descuento: comparendo reciente ≠ prescripción */}
          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm mb-1">
                ¿Tu comparendo es reciente?
              </p>
              <p className="text-slate-500 text-sm">
                Si te lo impusieron hace días, no aplica prescripción — pero puedes pagarlo
                con hasta el 50% de descuento si actúas dentro del plazo legal.
              </p>
            </div>
            <a
              href="/descuento-comparendo"
              className="flex-shrink-0 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors whitespace-nowrap"
            >
              Verificar mi descuento →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Preguntas frecuentes
            </h2>
          </FadeIn>
          <FadeInStagger className="space-y-2.5" stagger={0.07}>
            {faqs.map((faq, i) => (
              <FadeInItem key={i}>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-100 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-sm font-semibold text-slate-900 leading-snug">{faq.q}</span>
                    <svg
                      className={`w-4 h-4 text-brand-600 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-14 sm:py-20 bg-brand-950">
        <FadeIn className="max-w-xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">
            ¿Listo para revisar tus multas?
          </h2>
          <p className="text-brand-200 mb-8 leading-relaxed">
            La verificación es gratis. Si hay comparendos prescritos, te cotizamos el proceso
            sin compromiso.
          </p>
          <a
            href={waLink('Hola, quiero verificar si tengo comparendos prescritos.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-wa hover:bg-wa-hover text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors"
          >
            <WhatsAppIcon className="w-6 h-6" />
            Escribir al WhatsApp
          </a>
        </FadeIn>
      </section>
    </>
  );
}
