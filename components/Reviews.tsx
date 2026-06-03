import { REVIEWS } from '@/lib/constants';
import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="resenas" className="py-14 sm:py-20 bg-[#fafaf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
            Reseñas Reales
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Lo que dicen nuestros clientes
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <Stars n={5} />
            <span className="text-slate-500 text-sm">Clientes satisfechos</span>
          </div>
        </FadeIn>

        <FadeInStagger className="grid md:grid-cols-3 gap-6" stagger={0.1}>
          {REVIEWS.map((r) => (
            <FadeInItem key={r.name}>
              <div className="bg-white rounded-2xl p-6 border border-slate-100 h-full flex flex-col">
                <Stars n={r.rating} />
                <blockquote className="mt-4 text-slate-700 text-sm leading-relaxed flex-1">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <footer className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{r.name}</div>
                    <div className="text-xs text-slate-400">{r.type}</div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">
                    ✓ Verificado {r.year}
                  </span>
                </footer>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
