'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-brand-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-gold-400 font-bold text-sm tracking-widest uppercase mb-4">Algo salió mal</p>
        <h1 className="text-4xl font-extrabold text-white mb-4">Error inesperado</h1>
        <p className="text-brand-300 text-lg mb-8 leading-relaxed">
          Ocurrió un error al cargar esta página. Intenta de nuevo o escríbenos por WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </main>
  );
}
