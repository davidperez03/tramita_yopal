'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '@/lib/constants';
import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-14 sm:py-20 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Preguntas frecuentes
          </h2>
        </FadeIn>

        <FadeInStagger className="border-t-2 border-brand-950" stagger={0.05}>
          {FAQS.map((faq, i) => (
            <FadeInItem key={i}>
              <div className="border-b border-slate-200">
                <button
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group min-h-[52px]"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-[15px] font-semibold text-slate-900 leading-snug group-hover:text-brand-700 transition-colors">
                    {faq.question}
                  </span>
                  <motion.span
                    className="w-6 h-6 flex items-center justify-center flex-shrink-0 text-brand-700 text-lg font-light select-none"
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-10 text-sm text-slate-600 leading-relaxed max-w-2xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
