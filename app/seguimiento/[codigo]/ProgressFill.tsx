'use client';

import { motion } from 'motion/react';

// La página de seguimiento es Server Component (fetch directo a Supabase);
// este pedacito de cliente hace que la barra "llene" al cargar en vez de
// aparecer ya completa — refuerza la sensación de trámite en movimiento.
export function ProgressFill({ pct, colorClass }: { pct: number; colorClass: string }) {
  return (
    <motion.div
      className={`absolute top-[14px] left-0 h-0.5 ${colorClass}`}
      initial={{ width: 0 }}
      animate={{ width: `${pct}%` }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
    />
  );
}
