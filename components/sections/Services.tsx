'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Car, IdCard, AlertTriangle } from 'lucide-react';
import { waLink, WA_MESSAGES } from '@/lib/constants';
import { SEO_SERVICES, CATEGORIAS, type Categoria } from '@/lib/seo-data';
import { FadeIn } from '../FadeIn';
import { ScrollCard } from '../cards/ScrollCard';

const ICONS: Record<Categoria, typeof Car> = {
  rna: Car,
  rnc: IdCard,
  comparendos: AlertTriangle,
};

function buildCategorias() {
  return (Object.keys(CATEGORIAS) as Categoria[]).map((key) => ({
    key,
    ...CATEGORIAS[key],
    count: SEO_SERVICES.filter((s) => s.categoria === key).length,
    Icon: ICONS[key],
  }));
}

type Cat = ReturnType<typeof buildCategorias>[number];

function CategoryCard({ cat, index }: { cat: Cat; index: number }) {
  const { sigla, label, short, description, href, count, Icon } = cat;

  return (
    <ScrollCard index={index}>
      <Link
        href={href}
        className="group flex flex-col h-full bg-white rounded-3xl border border-slate-100 p-7 shadow-sm hover:border-brand-300 hover:shadow-xl hover:shadow-brand-950/5 transition-[border-color,box-shadow]"
      >
        <motion.div
          className="w-12 h-12 rounded-2xl bg-brand-950 flex items-center justify-center mb-5"
          whileHover={{ rotate: -8, scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <Icon className="w-6 h-6 text-gold-400" strokeWidth={1.75} />
        </motion.div>
        <p className="text-[11px] font-black tracking-widest text-brand-600 uppercase mb-1.5">
          {sigla}
        </p>
        <h3 className="text-lg font-extrabold text-slate-900 leading-snug mb-2">
          {label}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1">
          {description}
        </p>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            {count} trámite{count === 1 ? '' : 's'} · {short}
          </span>
          <span className="text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition-colors whitespace-nowrap flex items-center gap-1">
            Ver todos
            <motion.span className="inline-block" initial={{ x: 0 }} whileHover={{ x: 3 }}>→</motion.span>
          </span>
        </div>
      </Link>
    </ScrollCard>
  );
}

export default function Services() {
  const categorias = buildCategorias();

  return (
    <section id="tramites" className="py-14 sm:py-20 bg-[#fafaf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            ¿Qué trámite necesitas?
          </h2>
          <p className="mt-2 text-slate-500 text-lg">
            Vehículo, licencia o comparendo — en <strong className="text-slate-700">Yopal, Casanare</strong>.
            Cotizamos en menos de 30 minutos.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-5">
          {categorias.map((cat, i) => (
            <CategoryCard key={cat.key} cat={cat} index={i} />
          ))}
        </div>

        {/* Puerta abierta */}
        <FadeIn delay={0.3} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            ¿Tu vehículo <strong className="text-slate-700">no está matriculado en Yopal</strong>?
            Escríbenos y consultamos si podemos ayudarte.
          </p>
          <a
            href={waLink(WA_MESSAGES.noMatricula)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors whitespace-nowrap"
          >
            Consultar →
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
