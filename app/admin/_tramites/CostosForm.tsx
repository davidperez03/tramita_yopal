'use client';

import { useState, useTransition } from 'react';
import { cop } from '@/lib/format';
import type { Tramite } from '@/lib/domain/tramite';
import { updateCostos } from '../tramites-actions';

export function CostosForm({ t }: { t: Tramite }) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved]            = useState(false);
  const [tramitador, setTramitador]  = useState(t.costo_tramitador > 0 ? String(t.costo_tramitador) : '');
  const [envio, setEnvio]            = useState(t.costo_envio > 0 ? String(t.costo_envio) : '');
  const [imprev, setImprev]          = useState(t.costo_imprevistos > 0 ? String(t.costo_imprevistos) : '');

  const parse = (v: string) => parseInt(v.replace(/\D/g, '') || '0', 10);
  const fmt   = (v: string) => {
    const n = parse(v);
    return n > 0 ? new Intl.NumberFormat('es-CO').format(n) : '';
  };

  function handleSave() {
    startTransition(async () => {
      await updateCostos(t.id, parse(tramitador), parse(envio), parse(imprev));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="px-5 py-4 border-t border-slate-100">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Costos operativos</p>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: 'Tramitador', val: tramitador, set: setTramitador },
          { label: 'Envío',      val: envio,      set: setEnvio      },
          { label: 'Imprevistos',val: imprev,     set: setImprev     },
        ].map(({ label, val, set }) => (
          <div key={label}>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">$</span>
              <input
                type="text" inputMode="numeric"
                value={fmt(val)}
                onChange={e => set(e.target.value)}
                placeholder="0"
                className="w-full border border-slate-200 rounded-lg pl-5 pr-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={handleSave} disabled={isPending}
          className="text-xs font-bold px-4 py-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors">
          {saved ? 'Guardado ✓' : isPending ? 'Guardando...' : 'Guardar costos'}
        </button>
        {(parse(tramitador) + parse(envio) + parse(imprev)) > 0 && (
          <span className="text-xs text-slate-500">
            Neto: <strong className="text-emerald-700">{cop(t.valor_honorarios - parse(tramitador) - parse(envio) - parse(imprev))}</strong>
          </span>
        )}
      </div>
    </div>
  );
}
