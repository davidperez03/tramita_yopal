'use client';

import { useState, useTransition } from 'react';
import { SERVICES } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { submitReview } from './actions';

const serviceOptions = [
  ...SERVICES.filter(s => s.id !== 'otros').map(s => s.name),
  'Otro',
];

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  const labels = ['', 'Malo', 'Regular', 'Bueno', 'Muy bueno', 'Excelente'];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className="text-4xl leading-none transition-transform hover:scale-110 focus:outline-none"
          >
            <span className={(hover || value) >= n ? 'text-amber-400' : 'text-slate-200'}>★</span>
          </button>
        ))}
      </div>
      {(hover || value) > 0 && (
        <p className="text-sm font-medium text-slate-500">{labels[hover || value]}</p>
      )}
    </div>
  );
}

const inputClass = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent';

export default function DejarResena() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult]         = useState<{ success?: boolean; error?: string } | null>(null);
  const [rating, setRating]         = useState(0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('rating', String(rating));
    startTransition(async () => {
      const res = await submitReview(formData);
      setResult(res);
    });
  }

  if (result?.success) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-20">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">¡Gracias por tu reseña!</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              La recibimos y la revisaremos pronto. Tu experiencia ayuda a otras personas a conocernos.
            </p>
            <a href="/" className="mt-6 inline-block text-brand-600 font-semibold text-sm hover:underline">
              Volver al inicio →
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-28 pb-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6">

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">Deja tu reseña</h1>
            <p className="mt-2 text-slate-500">
              Tu experiencia ayuda a otras personas a conocernos. Solo tarda un minuto.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-5">

            {/* Calificación */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Calificación <span className="text-red-500">*</span>
              </label>
              <StarPicker value={rating} onChange={setRating} />
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                required
                placeholder="Ej: Carlos Mantilla"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="tucorreo@ejemplo.com"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-slate-400">
                Tu correo no será visible en el sitio. Lo usamos solo para verificar tu identidad.
              </p>
            </div>

            {/* Tipo de trámite */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                ¿Qué trámite realizaste? <span className="text-red-500">*</span>
              </label>
              <select name="type" required className={`${inputClass} bg-white`}>
                <option value="">Selecciona...</option>
                {serviceOptions.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Texto */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Cuéntanos tu experiencia <span className="text-red-500">*</span>
              </label>
              <textarea
                name="text"
                required
                rows={4}
                placeholder="¿Cómo fue el proceso? ¿Qué te pareció el servicio?"
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Error */}
            {result?.error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {result.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending || rating === 0}
              className="w-full bg-brand-950 hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl text-sm transition-colors"
            >
              {isPending ? 'Enviando...' : 'Enviar reseña'}
            </button>

            <p className="text-center text-xs text-slate-400">
              🔒 Tus datos están seguros y no los compartimos con nadie.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
