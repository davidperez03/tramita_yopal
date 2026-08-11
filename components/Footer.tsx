import Image from 'next/image';
import { BUSINESS, SERVICES, waLink, WA_MESSAGES } from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

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
              Gestión de trámites vehiculares con validación previa de compradores,
              vendedores y vehículo. Atendemos desde {BUSINESS.location} para todo Colombia.
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
            <h4 className="text-white font-semibold text-sm mb-3">
              <a href="/tramites" className="hover:text-brand-300 transition-colors">Trámites</a>
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => {
                const href = s.id === 'prescripcion-comparendos'
                  ? '/prescripcion-comparendos'
                  : s.id === 'otros' ? '/#tramites' : `/tramites/${s.id}/yopal`;
                return (
                  <li key={s.id}>
                    <a href={href} className="text-sm hover:text-white transition-colors">
                      {s.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Empresa</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/#nosotros', label: 'Quiénes somos' },
                { href: '/guias',     label: 'Guías de trámites' },
                { href: '/seguimiento', label: 'Seguir mi trámite' },
                { href: '/#validar',  label: 'Validar mi caso' },
                { href: '/prescripcion-comparendos', label: 'Consultar multas' },
                { href: '/descuento-comparendo', label: 'Pagar comparendo con descuento' },
                { href: '/#proceso',  label: 'Cómo trabajamos' },
                { href: '/#faq',      label: 'Preguntas frecuentes' },
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
