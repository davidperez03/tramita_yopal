import Link from 'next/link';
import { waLink } from '@/lib/constants';
import type { City, SeoService } from '@/lib/seo-data';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { ScrollCard } from './ScrollCard';

type Props = {
  service: SeoService;
  href: string;
  ctaLabel: string;
  waLabel: string;
  // Si se pasan ciudades, la tarjeta agrega el pie "Atendemos en" con
  // enlaces por municipio (usado en RNA; RNC y Comparendos no lo necesitan).
  cities?: City[];
  index?: number;
};

const CITIES_SHOWN = 8;

export function TramiteCard({ service, href, ctaLabel, waLabel, cities, index = 0 }: Props) {
  return (
    <ScrollCard index={index}>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-950/5 hover:border-brand-300 transition-[border-color,box-shadow] overflow-hidden h-full flex flex-col">
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-2">{service.name}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.description}</p>
          <p className="text-xs text-slate-400 mb-5">
            Tiempo estimado: <span className="font-semibold text-slate-600">{service.duration}</span>
          </p>
          <div className="flex flex-col gap-2 mt-auto">
            <Link
              href={href}
              className="text-center bg-brand-950 hover:bg-brand-800 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors"
            >
              {ctaLabel}
            </Link>
            <a
              href={waLink(service.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-slate-200 hover:border-wa text-slate-600 hover:text-wa font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {waLabel}
            </a>
          </div>
        </div>

        {cities && (
          <div className="border-t border-slate-100 px-6 py-4 bg-slate-50">
            <p className="text-xs text-slate-400 mb-2 font-medium">Atendemos en:</p>
            <div className="flex flex-wrap gap-1.5">
              {cities.slice(0, CITIES_SHOWN).map((city) => (
                <Link
                  key={city.slug}
                  href={`/tramites/${service.slug}/${city.slug}`}
                  className="text-xs text-brand-600 hover:text-brand-800 hover:underline transition-colors"
                >
                  {city.name}
                </Link>
              ))}
              {cities.length > CITIES_SHOWN && (
                <span className="text-xs text-slate-400">+{cities.length - CITIES_SHOWN} más</span>
              )}
            </div>
          </div>
        )}
      </div>
    </ScrollCard>
  );
}
