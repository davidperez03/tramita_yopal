import Link from 'next/link';
import { BUSINESS, waLink } from '@/lib/constants';
import { CITIES, SEO_SERVICES, type City, type SeoService } from '@/lib/seo-data';
import { WhatsAppIcon } from './WhatsAppIcon';

type Props = { service: SeoService; city: City };

export default function ServiceCityPage({ service, city }: Props) {
  const waUrl = waLink(`${service.waMessage} Mi vehículo está en ${city.name}, ${city.department}.`);
  const otherServices = SEO_SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);
  const nearbyCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 6);

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
            {/* Breadcrumb visual */}
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

            <p className="text-lg text-brand-200 leading-relaxed mb-6 max-w-xl">
              {city.isOfficeCity
                ? `${service.description} Tramitamos directamente en el organismo de tránsito de ${city.name}.`
                : `${service.description} Gestionamos trámites para vehículos de ${city.name} y todo ${city.department}.`
              }
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

      {/* Documentos + info */}
      <section className="py-14 sm:py-20 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Documentos */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
                Documentos requeridos
              </h2>
              <ul className="space-y-3">
                {service.documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-slate-700 text-sm leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate-500 leading-relaxed">
                Antes de pedirte los documentos{' '}
                <strong className="text-slate-700">revisamos el vehículo y al propietario</strong>{' '}
                para detectar impedimentos que puedan bloquear el proceso.
              </p>
            </div>

            {/* Ficha de servicio */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              {[
                { label: 'Tiempo estimado',    value: service.duration },
                { label: 'Validación previa',  value: 'Incluida, sin costo' },
                { label: 'Cotización',         value: 'Gratis, sin compromiso' },
                { label: 'Envío',              value: 'Gratis a tu domicilio' },
                { label: 'Horario',            value: `${BUSINESS.hours.weekdays} · ${BUSINESS.hours.saturday}` },
                { label: 'Dónde tramitamos',   value: `Organismo de tránsito de ${BUSINESS.city}` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-start gap-4 px-6 py-3.5 border-b border-slate-100 last:border-0">
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

      {/* Cómo funciona */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-10">
            Cómo tramitamos tu {service.name.toLowerCase()} en {city.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '01', t: 'Nos escribes', d: `Cuéntanos tu caso por WhatsApp o formulario. Cotizamos en menos de ${BUSINESS.responseTime}.` },
              { n: '02', t: 'Validamos', d: 'Revisamos el vehículo y al propietario para detectar prendas, multas o restricciones antes de empezar.' },
              { n: '03', t: 'Envías documentos', d: 'Remites los originales por Interrapidísimo o Servientrega. Nos encargamos del trámite en ventanilla.' },
              { n: '04', t: 'Recibes en casa', d: 'Te enviamos la tarjeta de propiedad a tu domicilio en cualquier parte de Colombia. Sin costo adicional.' },
            ].map((step) => (
              <div key={step.n} className="relative">
                <div className="w-10 h-10 bg-brand-950 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                  {step.n}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{step.t}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
