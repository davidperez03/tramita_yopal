'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { BUSINESS, waLink, WA_MESSAGES } from '@/lib/constants';
import Image from 'next/image';
import { WhatsAppIcon } from './WhatsAppIcon';

const navLinks = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#validar',  label: 'Validar mi caso' },
  { href: '#tramites', label: 'Trámites' },
  { href: '/guias',    label: 'Guías' },
  { href: '/seguimiento', label: 'Seguimiento' },
  { href: '#faq',      label: 'FAQ' },
];

const comparendoLinks = [
  { href: '/prescripcion-comparendos', label: 'Consultar multas prescritas' },
  { href: '/descuento-comparendo',     label: 'Pagar con descuento' },
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
          <a href="/" aria-label="Tramita Yopal — Inicio">
            <Image
              src="/logo.png"
              alt="Logo Tramita Yopal — Trámites vehiculares en Yopal, Casanare"
              width={220}
              height={80}
              className="h-14 w-auto rounded-2xl"
              sizes="220px"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.slice(0, 3).map((l) => (
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

            {/* Comparendos — desplegable con las 3 páginas relacionadas */}
            <div className="relative group">
              <button className="text-sm font-medium text-brand-300 hover:text-white transition-colors flex items-center gap-1">
                Comparendos
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 w-64">
                  {comparendoLinks.map((l) => (
                    <a key={l.href} href={l.href}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-700 transition-colors">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(3).map((l) => (
              <a
                key={l.href}
                href={h(l.href)}
                className="text-sm font-medium text-brand-300 hover:text-white transition-colors"
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
              Cotizar
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
            {navLinks.slice(0, 3).map((l) => (
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

            <p className="px-4 pt-2 pb-1 text-[10px] font-bold text-brand-500 uppercase tracking-wider">
              Comparendos
            </p>
            {comparendoLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block px-6 py-2 text-sm text-brand-200 hover:text-white hover:bg-brand-900 transition-colors">
                {l.label}
              </a>
            ))}

            {navLinks.slice(3).map((l) => (
              <a
                key={l.href}
                href={h(l.href)}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 font-medium text-brand-200 hover:text-white hover:bg-brand-900 transition-colors"
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
                Cotizar
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
