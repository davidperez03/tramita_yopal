import Image from 'next/image';
import { BUSINESS, waLink, WA_MESSAGES } from '@/lib/constants';
import { CATEGORIAS } from '@/lib/seo-data';
import { WhatsAppIcon } from '../WhatsAppIcon';

const waUrl = waLink(WA_MESSAGES.cotizar);

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="mb-3">
              <Image
                src="/logo.png"
                alt="Logo Tramita Yopal"
                width={220}
                height={80}
                className="h-14 w-auto rounded-2xl"
                sizes="220px"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Gestión de trámites de tu vehículo (RNA), tu licencia (RNC) y tus
              comparendos, con validación previa gratuita. Atendemos desde {BUSINESS.location} para todo Colombia.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-wa text-sm font-medium hover:underline"
            >
              <WhatsAppIcon />
              {BUSINESS.phone}
            </a>
          </div>

          {/* Trámites */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Trámites</h4>
            <ul className="space-y-2">
              {(Object.keys(CATEGORIAS) as (keyof typeof CATEGORIAS)[]).map((key) => (
                <li key={key}>
                  <a href={CATEGORIAS[key].href} className="text-sm hover:text-white transition-colors">
                    {CATEGORIAS[key].sigla} — {CATEGORIAS[key].short}
                  </a>
                </li>
              ))}
              <li>
                <a href="/tramites" className="text-sm hover:text-white transition-colors">
                  Ver todos los trámites
                </a>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Empresa</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/guias',     label: 'Guías de trámites' },
                { href: '/seguimiento', label: 'Seguir mi trámite' },
                { href: '/#cotizar',  label: 'Cotizar' },
                { href: '/dejar-resena', label: 'Deja tu reseña' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Contacto</h4>
            <div className="space-y-2 text-sm">
              <p>{BUSINESS.address}</p>
              <p>{BUSINESS.hours.full}</p>
              <p className="text-slate-500 text-xs mt-3">
                🔒 Información segura · No compartimos datos con terceros
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="/politica-privacidad" className="text-slate-500 hover:text-white transition-colors">Política de privacidad</a>
            <span className="text-slate-700">·</span>
            <a href="/terminos" className="text-slate-500 hover:text-white transition-colors">Términos y condiciones</a>
          </div>
          <div className="flex items-center gap-4">
            <p>Hecho con ♥ en Colombia · {BUSINESS.location}</p>
            <a
              href="mailto:lambdaeta.x@gmail.com?subject=Quiero%20un%20sitio%20web%20como%20el%20de%20Tramita%20Yopal"
              className="flex items-center gap-1.5 text-slate-500 hover:text-white transition-colors group"
            >
              <span className="inline-flex items-center px-1 h-4 bg-brand-700 group-hover:bg-brand-500 rounded transition-colors text-white font-bold tracking-tight" style={{ fontSize: '9px' }}>λe</span>
              Desarrollado por <span className="text-slate-300 group-hover:text-white transition-colors font-medium">LambdaEta</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
