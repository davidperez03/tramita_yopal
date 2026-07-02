'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SeguimientoHome() {
  const router   = useRouter();
  const [codigo, setCodigo] = useState('');
  const [error,  setError]  = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const limpio = codigo.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (limpio.length !== 8) {
      setError('El código debe tener 8 caracteres. Ejemplo: A3F8C201');
      return;
    }
    router.push(`/seguimiento/${limpio}`);
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <p className="text-[10px] font-black tracking-widest text-brand-600 uppercase mb-2">
            Tramita Yopal
          </p>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Consultar trámite
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Ingrese el código que le compartió el gestor
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
              Código de seguimiento
            </label>
            <input
              type="text"
              value={codigo}
              onChange={e => {
                setCodigo(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="Ej: A3F8C201"
              maxLength={8}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              className="w-full font-mono font-bold tracking-widest text-center text-lg border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-slate-200 placeholder:font-normal placeholder:tracking-normal uppercase"
            />
            {error && (
              <p className="text-xs text-red-600 mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={codigo.trim().length === 0}
            className="w-full bg-brand-950 hover:bg-brand-800 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-colors"
          >
            Ver estado del trámite
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          ¿No tiene el código? Contáctenos directamente.
        </p>
      </div>
    </main>
  );
}
