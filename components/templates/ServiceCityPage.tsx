import Link from 'next/link';
import { Car, IdCard, AlertTriangle } from 'lucide-react';
import { BUSINESS, waLink } from '@/lib/constants';
import { CITIES, SEO_SERVICES, CATEGORIAS, type City, type SeoService, type Categoria } from '@/lib/seo-data';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { OpcionCard } from '../cards/OpcionCard';
import { FaqAccordion } from '../cards/FaqAccordion';
import { FadeIn, FadeInStagger, FadeInItem } from '../FadeIn';

type Props = { service: SeoService; city: City };

const RELATED_SERVICES_COUNT = 4;
const NEARBY_CITIES_COUNT    = 6;

const ICONS: Record<Categoria, typeof Car> = {
  rna: Car,
  rnc: IdCard,
  comparendos: AlertTriangle,
};

export default function ServiceCityPage({ service, city }: Props) {
  const contexto = service.esTramitePersonal
    ? `Estoy en ${city.name}, ${city.department}.`
    : `Mi vehículo está en ${city.name}, ${city.department}.`;
  const waUrl = waLink(`${service.waMessage} ${contexto}`);
  // Prioriza trámites de la misma categoría (RNA/RNC/Comparendos) — no tiene
  // sentido recomendar una licencia debajo de un traspaso de propiedad.
  const mismaCategoria = SEO_SERVICES.filter((s) => s.slug !== service.slug && s.categoria === service.categoria);
  const otrasCategorias = SEO_SERVICES.filter((s) => s.slug !== service.slug && s.categoria !== service.categoria);
  const otherServices = [...mismaCategoria, ...otrasCategorias].slice(0, RELATED_SERVICES_COUNT);
  const nearbyCities  = CITIES.filter((c) => c.slug !== city.slug).slice(0, NEARBY_CITIES_COUNT);
  const categoria     = CATEGORIAS[service.categoria];
  const CatIcon       = ICONS[service.categoria];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-950 overflow-hidden pt-28 pb-14 sm:pb-20">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `repeating-linear-gradient(45deg,#f59e0b 0px,#f59e0b 1px,transparent 1px,transparent 20px)` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-2xl">
            <nav className="flex items-center gap-1.5 text-xs text-brand-400 mb-5">
              <Link href="/" className="hover:text-white transition-colors">Tramita Yopal</Link>
              <span>/</span>
              <Link href={categoria.href} className="hover:text-white transition-colors">{categoria.sigla}</Link>
              <span>/</span>
              <span className="text-brand-300">{service.name}</span>
              <span>/</span>
              <span className="text-white">{city.name}</span>
            </nav>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <CatIcon className="w-4 h-4 text-gold-400" strokeWidth={1.75} />
              </span>
              <p className="text-xs font-black tracking-widest text-gold-400 uppercase">{categoria.label}</p>
            </div>

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
          </FadeIn>
        </div>
      </section>

      {/* Ficha del servicio */}
      <section className="py-14 sm:py-20 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            <FadeIn direction="left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                {service.name} en {city.name}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                {service.pasos[0]}
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={0.1} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
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
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Requisitos + Cómo funciona */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            <FadeIn direction="left">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                Requisitos para {service.name.toLowerCase()}
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Esto es lo que necesitas tener a la mano. Si te falta algo, te decimos cómo conseguirlo.
              </p>
              <FadeInStagger className="space-y-3" stagger={0.04}>
                {service.requisitos.map((r) => (
                  <FadeInItem key={r}>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-slate-600 leading-relaxed">{r}</span>
                    </div>
                  </FadeInItem>
                ))}
              </FadeInStagger>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                Cómo funciona desde {city.name}
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                {city.isOfficeCity
                  ? 'Puedes traer los documentos a nuestra oficina o enviarlos — tú eliges.'
                  : `Todo se hace a distancia: tú envías los documentos desde ${city.name} y nosotros tramitamos en Yopal.`}
              </p>
              <FadeInStagger className="space-y-4" stagger={0.06}>
                {service.pasos.map((p, i) => (
                  <FadeInItem key={i}>
                    <div className="flex items-start gap-4">
                      <span className="w-7 h-7 rounded-full bg-brand-950 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-600 leading-relaxed pt-1">{p}</span>
                    </div>
                  </FadeInItem>
                ))}
              </FadeInStagger>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes del servicio */}
      <section className="py-14 sm:py-20 bg-[#fafaf7] border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
              Preguntas frecuentes sobre {service.name.toLowerCase()}
            </h2>
          </FadeIn>
          <FadeInStagger className="space-y-3" stagger={0.06}>
            {service.faqs.map((f) => (
              <FadeInItem key={f.q}>
                <FaqAccordion q={f.q} a={f.a} bg="white" />
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ¿No estás en la ciudad sede? */}
      {!city.isOfficeCity && (
        <section className="py-10 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900 text-sm mb-1">
                  {service.esTramitePersonal
                    ? `¿No estás en ${BUSINESS.city}?`
                    : '¿Tu vehículo está matriculado en otra ciudad?'}
                </p>
                <p className="text-slate-500 text-sm">
                  Cuéntanos tu caso — lo revisamos y te decimos si podemos gestionarlo. Sin compromiso.
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
            </FadeIn>
          </div>
        </section>
      )}

      {/* Otros trámites en esta ciudad */}
      <section className="py-14 sm:py-20 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
              Otros trámites en {city.name}
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((s, i) => (
              <OpcionCard
                key={s.slug}
                href={`/tramites/${s.slug}/${city.slug}`}
                titulo={s.name}
                descripcion={s.description}
                cta="Ver trámite"
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Este servicio en otras ciudades */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
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
          </FadeIn>
        </div>
      </section>
    </>
  );
}
