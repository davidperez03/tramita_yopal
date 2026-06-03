'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '@/lib/constants';
import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-14 sm:py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Preguntas frecuentes
          </h2>
        </FadeIn>

        <FadeInStagger className="space-y-2.5" stagger={0.07}>
          {FAQS.map((faq, i) => (
            <FadeInItem key={i}>
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 text-left hover:bg-slate-50 transition-colors min-h-[52px]"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-sm font-semibold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <motion.svg
                    className="w-4 h-4 text-brand-600 flex-shrink-0"
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
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
                      <div className="px-5 sm:px-6 pb-5 pt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-50">
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
