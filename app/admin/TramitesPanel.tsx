'use client';

import { useState, useTransition } from 'react';
import { cop } from '@/lib/format';
import {
  type Tramite, type TramiteEstado, type HistorialEntry, type TramitadorOption, ESTADOS,
} from '@/lib/domain/tramite';
import { calcMetricas } from '@/lib/domain/metricas';
import { bulkUpdateEstado } from './tramites-actions';
import { Stat } from './ui';
import { Pipeline } from './_tramites/Pipeline';
import { AddTramiteForm } from './_tramites/AddTramiteForm';
import { TramiteCard } from './_tramites/TramiteCard';
import { BulkActionsBar } from './_tramites/BulkActionsBar';

export type { Tramite, HistorialEntry };

function norm(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export default function TramitesPanel({
  tramites, total, limit, comparendosByPhone, historial, tramitadores,
}: {
  tramites: Tramite[];
  total: number;
  limit: number;
  comparendosByPhone: Map<string, true>;
  historial: HistorialEntry[];
  tramitadores: TramitadorOption[];
}) {
  const [filtro, setFiltro]     = useState<string>('todos');
  const [periodo, setPeriodo]   = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');

  // ── Selección múltiple ──
  const [selected, setSelected]           = useState<Set<string>>(new Set());
  const [bulkEstado, setBulkEstado]       = useState<TramiteEstado | null>(null);
  const [bulkNota, setBulkNota]           = useState('');
  const [isBulkPending, startBulkTx]     = useTransition();

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function clearSelection() {
    setSelected(new Set());
    setBulkEstado(null);
    setBulkNota('');
  }

  function confirmBulk() {
    if (!bulkEstado) return;
    const ids = Array.from(selected);
    startBulkTx(async () => {
      await bulkUpdateEstado(ids, bulkEstado, bulkNota);
      clearSelection();
    });
  }

  // Agrupar historial por tramite_id
  const historialMap = new Map<string, HistorialEntry[]>();
  for (const h of historial) {
    const arr = historialMap.get(h.tramite_id) ?? [];
    arr.push(h);
    historialMap.set(h.tramite_id, arr);
  }

  const periodos = Array.from(new Set(tramites.map(t => t.created_at.slice(0, 7)))).sort().reverse();

  const enPeriodo = periodo === 'todos' ? tramites : tramites.filter(t => t.created_at.startsWith(periodo));

  const q        = norm(busqueda.trim());
  const listBase = q
    ? enPeriodo.filter(t => {
        const digits = q.replace(/\D/g, '');
        return (
          norm(t.cliente?.nombre ?? '').includes(q) ||
          (t.placa && norm(t.placa).includes(q)) ||
          (digits && t.cliente?.telefono?.replace(/\D/g, '').includes(digits))
        );
      })
    : enPeriodo;

  const counts = ESTADOS.reduce<Record<string, number>>((acc, e) => {
    acc[e] = listBase.filter(t => t.estado === e).length;
    return acc;
  }, {});

  const filtered = filtro === 'todos' ? listBase : listBase.filter(t => t.estado === filtro);

  const {
    cobrado, devuelto, neto, honorariosCobrados,
    pendiente, devolucionesPendientes, deudaPostEntrega,
  } = calcMetricas(enPeriodo);

  const fmtPeriodo = (ym: string) => {
    const [y, m] = ym.split('-');
    return new Date(Number(y), Number(m) - 1).toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-5">

      {/* Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Trámites"   value={enPeriodo.length} />
        <Stat label="Cobrado"    value={cop(cobrado)} accent="text-emerald-700" />
        <Stat label="Honorarios" value={cop(honorariosCobrados)} accent="text-brand-700" />
        <Stat label="Por cobrar" value={cop(pendiente)} accent={pendiente > 0 ? 'text-amber-600' : 'text-slate-400'} />
      </div>

      {/* Alertas */}
      {devuelto > 0 && (
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-600">
          Bruto cobrado: <strong>{cop(cobrado)}</strong>
          <span className="text-slate-300 mx-1">·</span>
          Devuelto: <strong className="text-red-600">{cop(devuelto)}</strong>
          <span className="text-slate-300 mx-1">·</span>
          Neto: <strong className="text-emerald-700">{cop(neto)}</strong>
        </div>
      )}
      {devolucionesPendientes > 0 && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
          <p className="text-xs text-red-800">
            <strong>Devolución pendiente:</strong> {cop(devolucionesPendientes)} por regresar a clientes.
          </p>
        </div>
      )}
      {deudaPostEntrega > 0 && (
        <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
          <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
          <p className="text-xs text-orange-800">
            <strong>Deuda post-entrega:</strong> {cop(deudaPostEntrega)} en trámites entregados con pago pendiente.
          </p>
        </div>
      )}

      <AddTramiteForm />

      {/* Filtro de período */}
      {periodos.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Período:</span>
          {['todos', ...periodos].map(p => (
            <button key={p} onClick={() => setPeriodo(p)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors capitalize ${
                periodo === p ? 'bg-brand-950 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'
              }`}>
              {p === 'todos' ? 'Todos' : fmtPeriodo(p)}
            </button>
          ))}
        </div>
      )}

      {/* Buscador */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
        </svg>
        <input type="search" value={busqueda} onChange={e => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre, placa o teléfono..."
          className="w-full pl-9 pr-9 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white placeholder:text-slate-300" />
        {busqueda && (
          <button onClick={() => setBusqueda('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-lg leading-none">
            ×
          </button>
        )}
      </div>

      {/* Pipeline */}
      <Pipeline counts={counts} total={listBase.length} active={filtro} onChange={setFiltro} />

      {total > limit && !busqueda && (
        <p className="text-xs text-slate-400">Mostrando {limit} de {total} trámites.</p>
      )}
      {busqueda && (
        <p className="text-xs text-slate-400">
          {listBase.length === 0 ? `Sin resultados para "${busqueda}"` : `${listBase.length} resultado${listBase.length !== 1 ? 's' : ''} para "${busqueda}"`}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">
            {busqueda ? `Sin coincidencias para "${busqueda}"` : 'No hay trámites en esta categoría.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Botón seleccionar todos */}
          {filtered.length > 1 && (
            <div className="flex items-center gap-3 px-1">
              <button
                onClick={() => {
                  const allIds = filtered.map(t => t.id);
                  const allSelected = allIds.every(id => selected.has(id));
                  if (allSelected) {
                    clearSelection();
                  } else {
                    setSelected(new Set(allIds));
                  }
                }}
                className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
              >
                {filtered.every(t => selected.has(t.id)) ? 'Deseleccionar todos' : `Seleccionar ${filtered.length}`}
              </button>
              {selected.size > 0 && (
                <span className="text-xs text-brand-600 font-bold">{selected.size} seleccionado{selected.size !== 1 ? 's' : ''}</span>
              )}
            </div>
          )}

          {filtered.map(t => (
            <TramiteCard
              key={t.id}
              t={t}
              hasTramiteComp={!!(t.cliente?.telefono && comparendosByPhone.has(t.cliente.telefono))}
              historial={historialMap.get(t.id) ?? []}
              selected={selected.has(t.id)}
              onToggle={() => toggleSelect(t.id)}
              tramitadores={tramitadores}
            />
          ))}
        </div>
      )}

      {/* Barra flotante de acción masiva */}
      {selected.size > 0 && (
        <BulkActionsBar
          count={selected.size}
          bulkEstado={bulkEstado}
          bulkNota={bulkNota}
          isPending={isBulkPending}
          onSelectEstado={setBulkEstado}
          onNotaChange={setBulkNota}
          onConfirm={confirmBulk}
          onReset={() => { setBulkEstado(null); setBulkNota(''); }}
          onClear={clearSelection}
        />
      )}
    </div>
  );
}
