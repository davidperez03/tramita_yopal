'use client';

import { useState, useTransition } from 'react';
import { fmtDate } from '@/lib/format';
import {
  type TramiteEstado, type HistorialEntry, ESTADO_CONFIG,
} from '@/lib/domain/tramite';
import { updateEstado } from './tramites-actions';
import { logout } from './actions';
import { cx, Err } from './ui';
import { HistorialMini } from './_tramites/widgets';

// Vista restringida del tramitador: sus trámites asignados, sin información
// financiera. Puede avanzar el estado (nunca cancelar).

export type TramiteAsignado = {
  id: string;
  created_at: string;
  placa: string | null;
  tipos: string[];
  estado: TramiteEstado;
  cliente: { nombre: string; telefono: string | null; ciudad: string | null } | null;
};

const ESTADOS_TRAMITADOR: TramiteEstado[] = ['recibido', 'en_proceso', 'aprobado', 'entregado'];

function Card({ t, historial }: { t: TramiteAsignado; historial: HistorialEntry[] }) {
  const [isPending, startTransition] = useTransition();
  const [expanded, setExpanded]      = useState(false);
  const [pendiente, setPendiente]    = useState<TramiteEstado | null>(null);
  const [nota, setNota]              = useState('');
  const [error, setError]            = useState<string | null>(null);

  const cfg      = ESTADO_CONFIG[t.estado];
  const cerrado  = t.estado === 'entregado' || t.estado === 'cancelado';

  function confirmar() {
    if (!pendiente) return;
    startTransition(async () => {
      const res = await updateEstado(t.id, pendiente, nota);
      if (res?.error) { setError(res.error); return; }
      setError(null);
      setPendiente(null);
      setNota('');
    });
  }

  return (
    <div className={cx('bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm', isPending && 'opacity-60')}>
      <div className={`h-1 w-full ${cfg.band}`} />
      <button type="button" onClick={() => setExpanded(v => !v)}
        className="w-full text-left px-5 py-3.5 hover:bg-slate-50/60 transition-colors">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-sm font-extrabold text-slate-900 uppercase leading-none flex-1 min-w-0">
            {t.cliente?.nombre ?? 'Sin cliente'}
          </p>
          {t.placa && (
            <span className="text-[11px] font-mono font-bold tracking-widest bg-slate-900 text-white px-2 py-0.5 rounded">
              {t.placa}
            </span>
          )}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
            {cfg.label}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 truncate">{t.tipos.join(' · ')} · {fmtDate(t.created_at)}</p>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 divide-y divide-slate-100">
          <div className="px-5 py-3 flex items-center gap-5 flex-wrap">
            {t.cliente?.telefono && (
              <a href={`https://wa.me/${t.cliente.telefono.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-600 hover:underline">
                WhatsApp del cliente
              </a>
            )}
            {t.cliente?.telefono && (
              <a href={`tel:${t.cliente.telefono}`} className="text-sm font-medium text-brand-600 hover:underline">
                {t.cliente.telefono}
              </a>
            )}
            {t.cliente?.ciudad && (
              <span className="text-xs font-semibold text-slate-500 uppercase">{t.cliente.ciudad}</span>
            )}
          </div>

          <div className="px-5 py-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Historial</p>
            <HistorialMini entries={historial} />
          </div>

          {!cerrado && (
            <div className="px-5 py-4 space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cambiar estado</p>
              <div className="flex flex-wrap gap-1.5">
                {ESTADOS_TRAMITADOR.map(s => (
                  <button key={s} type="button" disabled={isPending}
                    onClick={() => { if (s !== t.estado) { setPendiente(s); setNota(''); } }}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all ${
                      (pendiente ?? t.estado) === s
                        ? ESTADO_CONFIG[s].pillActive
                        : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                    }`}>
                    {ESTADO_CONFIG[s].label}
                  </button>
                ))}
              </div>

              {pendiente && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <p className="text-xs text-slate-500">
                    Cambiar a <strong className="text-slate-800">{ESTADO_CONFIG[pendiente].label}</strong>
                  </p>
                  <textarea
                    value={nota}
                    onChange={e => setNota(e.target.value)}
                    rows={2}
                    placeholder="Nota para el cliente (opcional)..."
                    className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-slate-300"
                  />
                  <div className="flex gap-2">
                    <button type="button" onClick={confirmar} disabled={isPending}
                      className="text-xs font-bold px-4 py-1.5 bg-brand-950 text-white rounded-lg hover:bg-brand-800 disabled:opacity-50 transition-colors">
                      Confirmar cambio
                    </button>
                    <button type="button" onClick={() => { setPendiente(null); setNota(''); }}
                      className="text-xs font-medium px-3 py-1.5 text-slate-500 hover:text-slate-700">
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
              <Err msg={error} />
            </div>
          )}

          {cerrado && (
            <div className="px-5 py-3">
              <p className="text-xs font-bold text-slate-400">Trámite cerrado.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TramitadorPanel({ tramites, historial, email }: {
  tramites: TramiteAsignado[];
  historial: HistorialEntry[];
  email: string | null;
}) {
  const historialMap = new Map<string, HistorialEntry[]>();
  for (const h of historial) {
    const arr = historialMap.get(h.tramite_id) ?? [];
    arr.push(h);
    historialMap.set(h.tramite_id, arr);
  }

  const activos  = tramites.filter(t => t.estado !== 'entregado' && t.estado !== 'cancelado');
  const cerrados = tramites.filter(t => t.estado === 'entregado' || t.estado === 'cancelado');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black tracking-widest text-brand-600 uppercase">Tramita Yopal</p>
            <p className="text-xs text-slate-400 mt-0.5">Panel de tramitador{email ? ` · ${email}` : ''}</p>
          </div>
          <form action={logout}>
            <button type="submit" className="text-xs text-slate-400 hover:text-slate-700 font-semibold transition-colors">
              Salir
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-base font-bold text-slate-900 mb-3">
            Trámites asignados {activos.length > 0 && <span className="text-slate-400 font-medium">({activos.length} activos)</span>}
          </h1>
          {activos.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
              <p className="text-slate-400 text-sm">No tienes trámites activos asignados.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {activos.map(t => <Card key={t.id} t={t} historial={historialMap.get(t.id) ?? []} />)}
            </div>
          )}
        </div>

        {cerrados.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-500 mb-3">Cerrados recientes</h2>
            <div className="space-y-2">
              {cerrados.map(t => <Card key={t.id} t={t} historial={historialMap.get(t.id) ?? []} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
