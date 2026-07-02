'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body>
        <main style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: 'sans-serif' }}>
          <div style={{ textAlign: 'center', maxWidth: 400 }}>
            <p style={{ color: '#f59e0b', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              Error crítico
            </p>
            <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
              Algo salió mal
            </h1>
            <p style={{ color: '#94a3b8', marginBottom: 24 }}>
              Ocurrió un error inesperado. Intenta recargar la página.
            </p>
            <button
              onClick={reset}
              style={{ background: '#f59e0b', color: '#020617', fontWeight: 700, padding: '12px 28px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 14 }}
            >
              Intentar de nuevo
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
