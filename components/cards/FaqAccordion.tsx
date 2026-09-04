type Props = {
  q: string;
  a: string;
  // El fondo de la tarjeta debe contrastar con el de la sección que la
  // envuelve — por eso es configurable en vez de fijo.
  bg?: 'white' | 'fafaf7';
  // /descuento-comparendo usa acento esmeralda en vez del dorado/marca
  // habitual, para distinguir visualmente esa página.
  accent?: 'brand' | 'emerald';
};

export function FaqAccordion({ q, a, bg = 'white', accent = 'brand' }: Props) {
  return (
    <details className={`group ${bg === 'white' ? 'bg-white' : 'bg-[#fafaf7]'} rounded-2xl border border-slate-100 overflow-hidden`}>
      <summary className={`flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-semibold text-sm text-slate-900 ${accent === 'brand' ? 'hover:text-brand-700' : 'hover:text-emerald-700'} transition-colors`}>
        {q}
        <svg className="w-4 h-4 text-slate-300 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">{a}</p>
    </details>
  );
}
