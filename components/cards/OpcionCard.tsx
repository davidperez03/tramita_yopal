import Link from 'next/link';
import { ScrollCard } from './ScrollCard';

type Props = {
  href: string;
  titulo: string;
  descripcion: string;
  cta: string;
  destacado?: string | null;
  index?: number;
};

export function OpcionCard({ href, titulo, descripcion, cta, destacado, index = 0 }: Props) {
  return (
    <ScrollCard index={index}>
      <Link
        href={href}
        className="group flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-brand-300 hover:shadow-xl hover:shadow-brand-950/5 transition-[border-color,box-shadow] p-6"
      >
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors mb-2 flex items-center gap-2 flex-wrap">
          {titulo}
          {destacado && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 border border-gold-500/40 px-2 py-0.5 rounded">
              {destacado}
            </span>
          )}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1">{descripcion}</p>
        <span className="text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition-colors mt-5">
          {cta} →
        </span>
      </Link>
    </ScrollCard>
  );
}
