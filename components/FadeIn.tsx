'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { EASE_OUT } from '@/lib/animations';

const ease = EASE_OUT;

export function FadeIn({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}) {
  const offsets = {
    up:    { y: 28, x: 0 },
    left:  { y: 0,  x: -28 },
    right: { y: 0,  x: 28 },
    none:  { y: 0,  x: 0 },
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  className = '',
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
