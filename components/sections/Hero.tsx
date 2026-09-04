'use client';

import Link from 'next/link';
import { Car, IdCard, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS, waLink, WA_MESSAGES } from '@/lib/constants';
import { SEO_SERVICES, CATEGORIAS, type Categoria } from '@/lib/seo-data';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { EASE_OUT } from '@/lib/animations';

const ICONS: Record<Categoria, typeof Car> = {
  rna: Car,
  rnc: IdCard,
  comparendos: AlertTriangle,
};

const waUrl = waLink(WA_MESSAGES.cotizar);
const ease = EASE_OUT;

const wordVariant = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease } },
};

const trustPills = [
  { text: 'Validación previa gratuita' },
  { text: `Respuesta en ${BUSINESS.responseTime}` },
  { text: 'Sin sorpresas en el cobro' },
  { text: 'Seguimiento en línea de tu trámite' },
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
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
            >
              {['Tus', 'trámites'].map((w) => (
                <motion.span key={w} className="inline-block mr-[0.28em]" variants={wordVariant}>
                  {w}
                </motion.span>
              ))}
              <br />
              {['de', 'tránsito,'].map((w) => (
                <motion.span key={w} className="inline-block mr-[0.28em]" variants={wordVariant}>
                  {w}
                </motion.span>
              ))}
              <span className="relative inline-block">
                <motion.span className="text-gold-400 inline-block" variants={wordVariant}>sin enredos</motion.span>
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
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
              transition={{ duration: 0.55, delay: 0.8, ease }}
            >
              Vehículo, licencia o comparendo — lo que necesites, lo gestionamos en {BUSINESS.city} sin que tengas que salir de casa.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1, ease }}
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
              transition={{ duration: 0.6, delay: 1.15 }}
            >
              {trustPills.map((p, i) => (
                <span key={p.text} className="flex items-center gap-2 text-sm text-brand-400">
                  {i > 0 && <span className="text-brand-700">·</span>}
                  {p.text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Panel del sistema: RNA / RNC / Comparendos ── */}
          <div className="flex flex-col gap-3.5 w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
            {(Object.keys(CATEGORIAS) as Categoria[]).map((key, i) => {
              const cat   = CATEGORIAS[key];
              const Icon  = ICONS[key];
              const count = SEO_SERVICES.filter((s) => s.categoria === key).length;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 70, rotate: i % 2 === 0 ? -2 : 2 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.5 + i * 0.15 }}
                >
                  <motion.div whileHover={{ x: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 350, damping: 22 }}>
                    <Link
                      href={cat.href}
                      className="group flex items-center gap-4 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-gold-500/40 rounded-2xl px-5 py-4 transition-colors backdrop-blur-sm"
                    >
                      <span className="w-11 h-11 rounded-xl bg-brand-800/80 ring-1 ring-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-gold-400" strokeWidth={1.75} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[10px] font-black tracking-widest text-gold-400 uppercase">{cat.sigla}</span>
                        <span className="block text-white font-bold text-sm truncate">{cat.short}</span>
                        <span className="block text-brand-400 text-xs mt-0.5">{count} trámite{count === 1 ? '' : 's'}</span>
                      </span>
                      <span className="text-brand-400 group-hover:text-gold-400 transition-colors text-lg flex-shrink-0">→</span>
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
