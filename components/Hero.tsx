'use client';

import { motion } from 'motion/react';
import { BUSINESS, waLink, WA_MESSAGES } from '@/lib/constants';
import { CATEGORIAS } from '@/lib/seo-data';
import { WhatsAppIcon } from './WhatsAppIcon';
import { EASE_OUT } from '@/lib/animations';

const waUrl = waLink(WA_MESSAGES.cotizar);
const ease = EASE_OUT;

const trustPills = [
  { text: 'Validación previa gratuita' },
  { text: `Respuesta en ${BUSINESS.responseTime}` },
  { text: 'Sin cobro total por adelantado' },
  { text: 'Tarjeta a domicilio sin costo' },
  { text: 'Seguimiento en línea de tu trámite' },
];

const messages = [
  { from: 'client', text: 'Hola, necesito ayuda con un trámite pero no sé por dónde empezar.', time: '10:14' },
  { from: 'ty',     text: '¡Hola! Cuéntame: ¿es sobre tu vehículo (traspaso, prenda...), tu licencia, o un comparendo? Te oriento en minutos 🙂', time: '10:15' },
  { from: 'client', text: 'Es un traspaso — el carro lo tenía financiado con Bancolombia.', time: '10:17' },
  { from: 'ty',     text: '✅ Perfecto. Antes de cotizarte reviso el vehículo en el RUNT. Dame la placa y la cédula del vendedor 🔍', time: '10:19' },
  { from: 'client', text: 'Claro, ahí te las paso.', time: '10:20' },
];

export default function Hero() {
  return (
    <section className="relative bg-brand-950 overflow-hidden pt-20 flex flex-col">
      {/* Patrón de fondo */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg,#f59e0b 0px,#f59e0b 1px,transparent 1px,transparent 20px)`,
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-900/40 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 w-full">
        <div className="w-full grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Texto principal ── */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-gold-400">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
                {BUSINESS.city}, {BUSINESS.department}
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight mb-5"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease }}
            >
              Vehículo, licencia
              <br />
              y multas,{' '}
              <span className="relative inline-block">
                <span className="text-gold-400">sin enredos</span>
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                >
                  <motion.path
                    d="M2 6 Q100 2 198 6"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-brand-200 mb-8 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease }}
            >
              Gestionamos trámites de tu vehículo, tu licencia y tus comparendos en {BUSINESS.city} sin que tengas que salir de casa.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease }}
            >
              <motion.a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-wa text-white font-bold px-7 py-3.5 rounded-xl text-base"
                whileHover={{ scale: 1.03, backgroundColor: '#1ebe5c' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                Escribir al WhatsApp
              </motion.a>
              <motion.a
                href="#cotizar"
                className="flex items-center justify-center gap-2 bg-gold-500 text-brand-950 font-bold px-7 py-3.5 rounded-xl text-base"
                whileHover={{ scale: 1.03, backgroundColor: '#d97706' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                Cotizar ahora
              </motion.a>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              className="flex flex-wrap gap-x-5 gap-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {trustPills.map((p, i) => (
                <span key={p.text} className="flex items-center gap-2 text-sm text-brand-400">
                  {i > 0 && <span className="text-brand-700">·</span>}
                  {p.text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Captura WhatsApp ── */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10 max-w-sm">

              {/* Header WA */}
              <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">TY</div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">Tramita Yopal</div>
                  <div className="text-green-200 text-xs">en línea</div>
                </div>
                <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </div>

              {/* Mensajes */}
              <div className="bg-[#ece5dd] px-4 py-4 space-y-3">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-end gap-2 ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 8, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.6, duration: 0.3, ease: 'easeOut' }}
                  >
                    {msg.from === 'client' && (
                      <>
                        <div className="bg-[#dcf8c6] rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[75%] shadow-sm">
                          <p className="text-slate-800 text-[12px] leading-relaxed">{msg.text}</p>
                          <p className="text-slate-400 text-[10px] text-right mt-1">{msg.time} ✓✓</p>
                        </div>
                        <ClienteAvatar />
                      </>
                    )}
                    {msg.from === 'ty' && (
                      <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[80%] shadow-sm">
                        <p className="text-slate-800 text-[12px] leading-relaxed whitespace-pre-line">{msg.text}</p>
                        <p className="text-slate-400 text-[10px] text-right mt-1">{msg.time}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="bg-[#f0f0f0] px-3 py-2.5 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-slate-400">
                  Escribe un mensaje...
                </div>
                <div className="w-8 h-8 bg-wa rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Banner de categorías — neutral, sin mezclar trámites individuales */}
      <div className="border-t border-brand-800 bg-brand-900/40 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Object.values(CATEGORIAS), ...Object.values(CATEGORIAS), ...Object.values(CATEGORIAS)].map((c, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-brand-400 text-sm px-6">
              <span className="w-1 h-1 rounded-full bg-gold-500 inline-block" />
              <strong className="text-brand-200 font-bold">{c.sigla}</strong> — {c.short}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClienteAvatar() {
  return (
    <div className="w-5 h-5 rounded-full bg-slate-300 text-slate-600 text-[9px] font-bold flex items-center justify-center flex-shrink-0 select-none">
      M
    </div>
  );
}
