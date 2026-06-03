import Link from 'next/link';
import { BUSINESS, waLink } from '@/lib/constants';
import { CITIES, SEO_SERVICES, type City, type SeoService } from '@/lib/seo-data';
import { WhatsAppIcon } from './WhatsAppIcon';

type Props = { service: SeoService; city: City };

export default function ServiceCityPage({ service, city }: Props) {
  const waUrl = waLink(`${service.waMessage} Mi vehículo está en ${city.name}, ${city.department}.`);
  const otherServices = SEO_SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);
  const nearbyCities  = CITIES.filter((c) => c.slug !== city.slug).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-950 overflow-hidden pt-28 pb-14 sm:pb-20">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `repeating-linear-gradient(45deg,#f59e0b 0px,#f59e0b 1px,transparent 1px,transparent 20px)` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-1.5 text-xs text-brand-400 mb-5">
              <Link href="/" className="hover:text-white transition-colors">Tramita Yopal</Link>
              <span>/</span>
              <Link href="/#tramites" className="hover:text-white transition-colors">Trámites</Link>
              <span>/</span>
              <span className="text-brand-300">{service.name}</span>
              <span>/</span>
              <span className="text-white">{city.name}</span>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              {service.name}
              <br />
              <span className="text-gold-400">en {city.name}</span>
            </h1>

            <p className="text-lg text-brand-200 leading-relaxed mb-8 max-w-xl">
              {city.note}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-wa hover:bg-wa-hover text-white font-bold px-7 py-3.5 rounded-xl text-base transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                Cotizar por WhatsApp
              </a>
              <Link
                href="/#cotizar"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold px-7 py-3.5 rounded-xl text-base transition-colors"
              >
                Formulario de cotización
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
              {['Cotización gratis', `Respuesta en ${BUSINESS.responseTime}`, 'Envío gratis', 'Validación previa'].map((t) => (
                <span key={t} className="text-sm text-brand-400 flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-gold-400 rounded-full" />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ficha del servicio */}
      <section className="py-14 sm:py-20 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                {service.name} en {city.name}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Antes de iniciar{' '}
                <strong className="text-slate-700">revisamos el vehículo, al propietario y al comprador</strong>{' '}
                para detectar prendas activas, multas o restricciones en el RUNT que puedan
                bloquear el proceso. Solo arrancamos cuando todo está despejado — o te decimos
                exactamente qué resolver primero.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              {[
                { label: 'Tiempo estimado',   value: service.duration },
                { label: 'Validación previa', value: 'Incluida, sin costo' },
                { label: 'Cotización',        value: 'Gratis, sin compromiso' },
                { label: 'Envío tarjeta',     value: `Gratis a ${city.name}` },
                { label: 'Horario',           value: `${BUSINESS.hours.weekdays} · ${BUSINESS.hours.saturday}` },
                { label: 'Tramitamos en',     value: `Tránsito de ${BUSINESS.city}, Casanare` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center gap-4 px-6 py-3.5 border-b border-slate-100 last:border-0">
                  <span className="text-slate-400 text-sm flex-shrink-0">{item.label}</span>
                  <span className="text-slate-900 font-semibold text-sm text-right">{item.value}</span>
                </div>
              ))}
              <div className="px-6 py-4 bg-brand-950">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-brand-300 hover:text-white transition-colors font-medium"
                >
                  <span>Cotizar {service.name} en {city.name}</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Vehículo matriculado en otra ciudad? */}
      {!city.isOfficeCity && (
        <section className="py-10 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900 text-sm mb-1">
                  ¿Tu vehículo está matriculado en otra ciudad?
                </p>
                <p className="text-slate-500 text-sm">
                  No importa — atendemos cualquier trámite sin importar dónde esté matriculado el vehículo. Escríbenos y evaluamos tu caso.
                </p>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors whitespace-nowrap"
              >
                Consultar →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Otros trámites en esta ciudad */}
      <section className="py-14 sm:py-20 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
            Otros trámites vehiculares en {city.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/tramites/${s.slug}/${city.slug}`}
                className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-brand-300 hover:shadow-md transition-all group"
              >
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors mb-1">
                  {s.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{s.description}</p>
                <span className="text-xs font-semibold text-brand-600 group-hover:text-brand-800 transition-colors">
                  Ver trámite →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Este servicio en otras ciudades */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500 mb-4">
            {service.name} en otros municipios de {city.department}:
          </p>
          <div className="flex flex-wrap gap-2">
            {nearbyCities.map((c) => (
              <Link
                key={c.slug}
                href={`/tramites/${service.slug}/${c.slug}`}
                className="text-sm text-brand-600 hover:text-brand-800 hover:underline transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
