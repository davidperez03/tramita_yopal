import { supabase } from '@/lib/supabase';
import { FadeIn, FadeInStagger, FadeInItem } from './FadeIn';

type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  type: string;
  year: string;
  source: string;
  photos: string[] | null;
};

const AVATAR_COLORS = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#7c3aed', '#be123c'];

function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < n ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function SourceBadge({ source }: { source: string }) {
  if (source === 'Google') {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" aria-label="Google">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0 text-brand-500" fill="currentColor" aria-label="Verificado">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/>
    </svg>
  );
}

const MAX_VISIBLE = 9;

export default async function Reviews() {
  const { data: reviews, count } = await supabase
    .from('reviews')
    .select('id, name, rating, text, type, year, source, photos', { count: 'exact' })
    .eq('visible', true)
    .order('created_at', { ascending: false })
    .limit(MAX_VISIBLE);

  if (!reviews || reviews.length === 0) return null;

  const total     = count ?? reviews.length;
  const avgRating = (reviews.reduce((s: number, r: Review) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section id="resenas" className="py-14 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
            Reseñas verificadas
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Lo que dicen nuestros clientes
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
            <span className="text-slate-800 font-bold text-lg">{avgRating}</span>
            <Stars n={5} />
            <span className="text-slate-400 text-sm">·</span>
            <span className="text-slate-500 text-sm">{total} reseña{total !== 1 ? 's' : ''}</span>
          </div>
        </FadeIn>

        <FadeInStagger className="grid md:grid-cols-3 gap-5 mb-10" stagger={0.1}>
          {reviews.map((r: Review) => (
            <FadeInItem key={r.id}>
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm h-full flex flex-col">

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                    style={{ background: avatarColor(r.name) }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{r.name}</p>
                    <p className="text-slate-400 text-xs">{r.year}</p>
                  </div>
                  <SourceBadge source={r.source} />
                </div>

                <Stars n={r.rating} />

                <blockquote className="mt-3 text-slate-600 text-sm leading-relaxed flex-1">
                  {r.text}
                </blockquote>

                {/* Fotos de la reseña */}
                {r.photos && r.photos.length > 0 && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {r.photos.map((url: string, i: number) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={`Foto ${i + 1}`}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-200 hover:opacity-80 transition-opacity"
                        />
                      </a>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1.5 text-xs text-brand-600 font-medium bg-brand-50 px-2.5 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {r.type}
                  </span>
                </div>

              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <FadeIn className="text-center">
          <p className="text-slate-500 text-sm mb-3">¿Ya usaste nuestro servicio?</p>
          <a
            href="/dejar-resena"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-brand-400 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm"
          >
            <span className="text-amber-400 text-base">★</span>
            Deja tu reseña
          </a>
        </FadeIn>

      </div>
    </section>
  );
}
