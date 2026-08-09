'use client';

import { useState, useTransition } from 'react';
import { SERVICE_NAMES_WITH_OTHER } from '@/lib/constants';
import { createTramite } from '../tramites-actions';
import { cx } from '../ui';
import { inputCls, MoneyInput, AvaluoInput } from './inputs';

export function AddTramiteForm() {
  const [open, setOpen]              = useState(false);
  const [isPending, startTransition] = useTransition();
  const [result, setResult]          = useState<{ success?: boolean; error?: string } | null>(null);
  const [tipos, setTipos]            = useState<string[]>([]);

  const esTraspaso = tipos.includes('Traspaso de Propiedad');

  function toggleTipo(s: string) {
    setTipos(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function close() { setOpen(false); setTipos([]); setResult(null); }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const fd = new FormData(e.currentTarget);
      // Inyectar tipos seleccionados (no vienen del DOM directamente)
      tipos.forEach(t => fd.append('tipos', t));
      const res = await createTramite(fd);
      setResult(res);
      if (res.success) { (e.target as HTMLFormElement).reset(); close(); }
    });
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold text-white bg-brand-700 hover:bg-brand-600 px-5 py-3 rounded-2xl transition-colors shadow-sm">
        <span className="text-xl leading-none font-light">+</span>
        Registrar nuevo trámite
      </button>
    );
  }

  return (
    <div className="bg-white border-2 border-brand-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-brand-600 uppercase tracking-widest">Nuevo trámite</p>
          <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">Registrar caso</h3>
        </div>
        <button type="button" onClick={close}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 text-xl leading-none transition-colors">
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Datos del cliente */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Cliente *</label>
            <input name="cliente_nombre" required placeholder="NOMBRE COMPLETO"
              onChange={e => { e.target.value = e.target.value.toUpperCase(); }}
              className={`${inputCls} uppercase`} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Placa</label>
            <input name="placa" placeholder="ABC123" maxLength={7}
              onChange={e => { e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); }}
              className={`${inputCls} uppercase font-mono tracking-widest`} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Teléfono</label>
            <input name="cliente_telefono" placeholder="+57 300..." className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Cédula</label>
            <input name="cliente_cedula" placeholder="Opcional" inputMode="numeric"
              onChange={e => { e.target.value = e.target.value.replace(/\D/g, ''); }}
              className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Ciudad</label>
            <input name="cliente_ciudad" placeholder="YOPAL"
              onChange={e => { e.target.value = e.target.value.toUpperCase(); }}
              className={`${inputCls} uppercase`} />
          </div>
        </div>

        {/* Tipos de trámite — multi-selección */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Tipos de trámite * <span className="font-normal normal-case text-slate-400">(puede seleccionar varios)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {SERVICE_NAMES_WITH_OTHER.map(s => {
              const activo = tipos.includes(s);
              return (
                <button key={s} type="button" onClick={() => toggleTipo(s)}
                  className={cx(
                    'text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all',
                    activo
                      ? 'bg-brand-950 border-brand-950 text-white'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-700',
                  )}>
                  {s}
                </button>
              );
            })}
          </div>
          {tipos.length === 0 && result && (
            <p className="text-xs text-red-500 mt-1">Selecciona al menos un tipo.</p>
          )}
        </div>

        {/* Valores */}
        {tipos.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Valores (COP)</p>
            <div className={`grid gap-3 ${esTraspaso ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Honorarios</label>
                <MoneyInput name="valor_honorarios" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Derechos (RUNT + org.)</label>
                <MoneyInput name="valor_derechos" />
              </div>
              {esTraspaso && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                    Base del avalúo
                  </label>
                  <AvaluoInput />
                </div>
              )}
            </div>
            {esTraspaso && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                El avalúo (1%) se cobra completo al iniciar — no entra en el 50/50. Base: avalúo de
                liquidación de impuestos si el vehículo supera 125cc, o valor del contrato de
                compraventa si es de 125cc o menos.
              </p>
            )}
          </div>
        )}

        {result?.error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{result.error}</p>
        )}

        <div className="flex gap-3 pt-1">
          <button type="submit" disabled={isPending || tipos.length === 0}
            className="bg-brand-950 hover:bg-brand-800 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
            {isPending ? 'Guardando...' : 'Crear trámite'}
          </button>
          <button type="button" onClick={close}
            className="text-slate-500 hover:text-slate-700 text-sm font-medium px-4 py-2.5">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
