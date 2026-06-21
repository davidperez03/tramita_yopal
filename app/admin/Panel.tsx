'use client';

import { useState, useTransition } from 'react';
import { SERVICES } from '@/lib/constants';
import { approveReview, hideReview, deleteReview, addReview, logout } from './actions';

type Review = {
  id: string;
  name: string;
  email: string | null;
  rating: number;
  text: string;
  type: string;
  year: string;
  source: string;
  visible: boolean;
  created_at: string;
};

const serviceOptions = SERVICES.filter(s => s.id !== 'otros').map(s => s.name);

function Stars({ n }: { n: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className={`border rounded-2xl p-5 space-y-3 transition-opacity ${isPending ? 'opacity-50' : ''} ${review.visible ? 'border-slate-200 bg-white' : 'border-amber-100 bg-amber-50'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-900 text-sm">{review.name}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${review.visible ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {review.visible ? 'Publicada' : 'Pendiente'}
            </span>
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{review.source}</span>
          </div>
          {review.email && (
            <p className="text-xs text-slate-400 mt-0.5">{review.email}</p>
          )}
        </div>
        <div className="flex-shrink-0 text-right">
          <Stars n={review.rating} />
          <p className="text-xs text-slate-400 mt-0.5">{review.year}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">{review.text}</p>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">{review.type}</span>
        <div className="flex gap-2">
          {!review.visible ? (
            <button
              onClick={() => startTransition(() => approveReview(review.id))}
              disabled={isPending}
              className="text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Aprobar
            </button>
          ) : (
            <button
              onClick={() => startTransition(() => hideReview(review.id))}
              disabled={isPending}
              className="text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Ocultar
            </button>
          )}
          <button
            onClick={() => {
              if (confirm('¿Eliminar esta reseña? Esta acción no se puede deshacer.')) {
                startTransition(() => deleteReview(review.id));
              }
            }}
            disabled={isPending}
            className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

function AddReviewForm() {
  const [open, setOpen]             = useState(false);
  const [isPending, startTransition] = useTransition();
  const [result, setResult]         = useState<{ success?: boolean; error?: string } | null>(null);
  const [rating, setRating]         = useState(5);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('rating', String(rating));
    startTransition(async () => {
      const res = await addReview(formData);
      setResult(res);
      if (res.success) {
        (e.target as HTMLFormElement).reset();
        setRating(5);
        setOpen(false);
        setResult(null);
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 px-4 py-2.5 rounded-xl transition-colors"
      >
        <span className="text-lg leading-none">+</span> Agregar reseña manualmente
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-50 border border-brand-100 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Agregar reseña</h3>
        <button type="button" onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl leading-none">×</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre *</label>
          <input name="name" required placeholder="Carlos Mantilla" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Correo (opcional)</label>
          <input name="email" type="email" placeholder="correo@ejemplo.com" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Trámite *</label>
          <select name="type" required className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
            <option value="">Selecciona...</option>
            {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Año *</label>
          <input name="year" required defaultValue={new Date().getFullYear().toString()} placeholder="2025" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Fuente</label>
          <select name="source" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
            <option value="Google">Google</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Directo">Directo</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Calificación *</label>
          <div className="flex gap-1 mt-1">
            {[1,2,3,4,5].map(n => (
              <button key={n} type="button" onClick={() => setRating(n)} className="text-2xl leading-none">
                <span className={rating >= n ? 'text-amber-400' : 'text-slate-200'}>★</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Texto de la reseña *</label>
        <textarea name="text" required rows={3} placeholder="Excelente servicio..." className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white resize-none" />
      </div>

      {result?.error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{result.error}</p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={isPending} className="bg-brand-950 hover:bg-brand-800 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">
          {isPending ? 'Guardando...' : 'Guardar y publicar'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-700 text-sm font-medium px-4 py-2">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default function Panel({ reviews }: { reviews: Review[] }) {
  const [filter, setFilter] = useState<'todas' | 'pendientes' | 'publicadas'>('pendientes');
  const [isPending, startTransition] = useTransition();

  const pending   = reviews.filter(r => !r.visible);
  const published = reviews.filter(r =>  r.visible);
  const filtered  = filter === 'todas' ? reviews : filter === 'pendientes' ? pending : published;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-brand-950 text-white px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-brand-400 text-xs font-bold tracking-widest uppercase">Tramita Yopal</p>
            <h1 className="text-lg font-extrabold">Panel de reseñas</h1>
          </div>
          <form action={logout}>
            <button type="submit" className="text-brand-300 hover:text-white text-sm font-medium transition-colors">
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total',      value: reviews.length,   color: 'text-slate-900' },
            { label: 'Pendientes', value: pending.length,   color: 'text-amber-600' },
            { label: 'Publicadas', value: published.length, color: 'text-green-700' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm">
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Agregar */}
        <AddReviewForm />

        {/* Filtros */}
        <div className="flex gap-2">
          {(['pendientes', 'publicadas', 'todas'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm font-semibold px-4 py-2 rounded-xl capitalize transition-colors ${
                filter === f
                  ? 'bg-brand-950 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {f}
              {f === 'pendientes' && pending.length > 0 && (
                <span className="ml-1.5 bg-amber-400 text-brand-950 text-xs font-black px-1.5 py-0.5 rounded-full">
                  {pending.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Lista */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
            <p className="text-slate-400 text-sm">No hay reseñas en esta categoría.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
        )}

      </div>
    </div>
  );
}
