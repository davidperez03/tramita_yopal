'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { BUSINESS, waLink, WA_MESSAGES } from '@/lib/constants';
import Image from 'next/image';
import { WhatsAppIcon } from './WhatsAppIcon';

const navLinks = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#validar',  label: '🔍 Validar caso' },
  { href: '#tramites', label: 'Trámites' },
  { href: '/prescripcion-comparendos', label: 'Multas' },
  { href: '#cotizar',  label: 'Cotizar' },
  { href: '#faq',      label: 'FAQ' },
];

const waUrl = waLink(WA_MESSAGES.cotizar);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const h = (href: string) => href.startsWith('#') && pathname !== '/' ? `/${href}` : href;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-brand-950/95 backdrop-blur-md shadow-md shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="#" aria-label="Tramita Yopal — Inicio">
            <Image
              src="/logo.png"
              alt="Logo Tramita Yopal — Trámites vehiculares en Yopal, Casanare"
              width={200}
              height={70}
              className="h-12 w-auto rounded-xl"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={h(l.href)}
                className={`text-sm font-medium transition-colors ${
                  l.href === '#validar'
                    ? 'text-gold-400 hover:text-gold-300'
                    : 'text-brand-300 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-wa hover:bg-wa-hover text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
            <a
              href="#cotizar"
              className="bg-gold-500 hover:bg-gold-600 text-brand-950 text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Cotizar 🎉
            </a>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Menú"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-brand-950 border-t border-brand-800 py-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={h(l.href)}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 font-medium transition-colors ${
                  l.href === '#validar'
                    ? 'text-gold-400 hover:text-gold-300'
                    : 'text-brand-200 hover:text-white hover:bg-brand-900'
                }`}
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 px-4 pt-3 border-t border-brand-800 mt-2">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-wa text-white font-bold py-2.5 rounded-lg">
                <WhatsAppIcon /> WhatsApp
              </a>
              <a href="#cotizar" onClick={() => setOpen(false)}
                className="text-center bg-gold-500 text-brand-950 font-bold py-2.5 rounded-lg">
                Cotizar 🎉
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
