'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// Entrada ligada al scroll real del usuario (no un timer ni un fade-in
// genérico) + resorte al pasar el mouse. Única fuente de esta animación —
// la usan TramiteCard, OpcionCard, ReviewCard y las tarjetas de categoría
// de Services.tsx. Antes cada una repetía este mismo bloque de useScroll/
// useTransform con copy-paste.
const ENTRANCE = [
  { y: 70, x: -14, rotate: -3 },
  { y: 100, x: 0,  rotate: 2  },
  { y: 70, x: 14,  rotate: -2 },
  { y: 90, x: -8,  rotate: 3  },
];

type Props = {
  children: ReactNode;
  index?: number;
  hover?: boolean;
  className?: string;
};

export function ScrollCard({ children, index = 0, hover = true, className = 'h-full' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const entrance = ENTRANCE[index % ENTRANCE.length];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.55'],
  });

  const y       = useTransform(scrollYProgress, [0, 1], [entrance.y, 0]);
  const x       = useTransform(scrollYProgress, [0, 1], [entrance.x, 0]);
  const rotate  = useTransform(scrollYProgress, [0, 1], [entrance.rotate, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale   = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <motion.div ref={ref} className={className} style={{ y, x, rotate, opacity, scale }}>
      <motion.div
        className={className}
        whileHover={hover ? { y: -6, scale: 1.015 } : undefined}
        whileTap={hover ? { scale: 0.98 } : undefined}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
