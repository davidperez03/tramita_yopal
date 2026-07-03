'use client';

import { useState, useTransition } from 'react';
import { cop, fmtDate } from '@/lib/format';
import {
  type Tramite, type TramiteEstado, type HistorialEntry,
  ESTADO_CONFIG, calcPagos, calcNeto,
} from '@/lib/domain/tramite';
import {
  updateEstado, togglePago, deleteTramite, cancelTramite, togglePagoDevuelto,
} from '../tramites-actions';
import { cx, Badge, Err } from '../ui';
import { PagoIcon, PaySlot, MetodoSelector, EstadoPills, HistorialMini, CodigoCopy } from './widgets';
import { CostosForm } from './CostosForm';

export function TramiteCard({ t, hasTramiteComp, historial, selected, onToggle }: {
  t: Tramite; hasTramiteComp: boolean; historial: HistorialEntry[];
  selected: boolean; onToggle: () => void;
}) {
  const [isPending, startTransition]                = useTransition();
  const [expanded, setExpanded]                     = useState(false);
  const [pagoError, setPagoError]                   = useState<string | null>(null);
  const [selectingMethodFor, setSelectingMethodFor] = useState<'pago_inicial' | 'pago_final' | null>(null);
  const [showCancelForm, setShowCancelForm]          = useState(false);
  const [cancelMotivo, setCancelMotivo]             = useState('');
  const [cancelError, setCancelError]               = useState<string | null>(null);
  const [pendingEstado, setPendingEstado]           = useState<TramiteEstado | null>(null);
  const [estadoNota, setEstadoNota]                 = useState('');

  const { pago1, pago2, total } = calcPagos(t);
  const bloqueado = t.estado === 'entregado';
  const cancelado = t.estado === 'cancelado';
  const cfg       = ESTADO_CONFIG[t.estado];

  function handlePagoToggle(campo: 'pago_inicial' | 'pago_final') {
    const currentValue = campo === 'pago_inicial' ? t.pago_inicial : t.pago_final;
    setPagoError(null);
    if (currentValue) {
      startTransition(async () => {
        const res = await togglePago(t.id, campo, false);
        if (res?.error) setPagoError(res.error);
      });
    } else {
      setSelectingMethodFor(campo);
    }
  }

  function handlePagoConMetodo(metodo: string) {
    const campo = selectingMethodFor;
    if (!campo) return;
    setSelectingMethodFor(null);
    setPagoError(null);
    startTransition(async () => {
      const res = await togglePago(t.id, campo, true, metodo);
      if (res?.error) setPagoError(res.error);
    });
  }

  function handleEstadoChange(s: TramiteEstado) {
    if (s === 'cancelado') { setShowCancelForm(true); return; }
    setPendingEstado(s);
    setEstadoNota('');
  }

  function confirmEstado() {
    if (!pendingEstado) return;
    startTransition(async () => {
      const res = await updateEstado(t.id, pendingEstado, estadoNota);
      if (res?.error) setPagoError(res.error);
      setPendingEstado(null);
      setEstadoNota('');
    });
  }

  function handleCancelSubmit() {
    if (!cancelMotivo.trim()) { setCancelError('El motivo es obligatorio.'); return; }
    setCancelError(null);
    startTransition(async () => {
      const res = await cancelTramite(t.id, cancelMotivo);
      if (res?.error) { setCancelError(res.error); return; }
      setShowCancelForm(false);
      setCancelMotivo('');
    });
  }

  return (
    <div className={cx(
      'border rounded-2xl overflow-hidden shadow-sm transition-opacity',
      isPending && 'opacity-60',
      selected ? 'bg-brand-50 border-brand-300' :
        bloqueado ? 'bg-white border-brand-200' :
        cancelado ? 'bg-white border-red-100' : 'bg-white border-slate-200',
    )}>
      {/* Banda de color superior */}
      <div className={`h-1 w-full ${cfg.band}`} />

      {/* Header colapsable */}
      <button type="button" onClick={() => setExpanded(v => !v)}
        className="w-full text-left px-5 py-3.5 hover:bg-slate-50/60 transition-colors group">
        <div className="flex items-center gap-3">
          {/* Checkbox de selección */}
          <div
            role="checkbox"
            aria-checked={selected}
            onClick={e => { e.stopPropagation(); onToggle(); }}
            className={cx(
              'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer',
              selected
                ? 'bg-brand-600 border-brand-600 opacity-100'
                : 'border-slate-300 bg-white opacity-0 group-hover:opacity-100',
            )}
          >
            {selected && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          {/* Izquierda: nombre + placa */}
          <div className="flex-1 min-w-0 flex items-center gap-2.5 flex-wrap">
            <p className="text-sm font-extrabold text-slate-900 uppercase leading-none">{t.cliente?.nombre ?? 'Sin cliente'}</p>
            {t.placa && (
              <span className="text-[11px] font-mono font-bold tracking-widest bg-slate-900 text-white px-2 py-0.5 rounded">
                {t.placa}
              </span>
            )}
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
              {cfg.label}
            </span>
            {hasTramiteComp && <Badge v="warn">Comparendo</Badge>}
          </div>
          {/* Derecha: pagos + chevron */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <PagoIcon paid={t.pago_inicial} />
            <PagoIcon paid={t.pago_final} />
            <svg className={cx('w-4 h-4 text-slate-300 transition-transform ml-1', expanded && 'rotate-180')}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {/* Segunda línea: tipos + fecha */}
        <p className="text-[11px] text-slate-400 mt-1 truncate">{t.tipos.join(' · ')} · {fmtDate(t.created_at)}</p>
      </button>

      {/* Cuerpo expandido */}
      {expanded && (
        <div className="border-t border-slate-100 divide-y divide-slate-100">

          {/* Info del cliente — tira horizontal */}
          <div className="px-5 py-3 flex items-center gap-5 flex-wrap">
            {t.cliente?.telefono && (
              <a href={`tel:${t.cliente.telefono}`}
                className="text-sm font-medium text-brand-600 hover:underline">
                {t.cliente.telefono}
              </a>
            )}
            {t.cliente?.ciudad && (
              <span className="text-xs font-semibold text-slate-500 uppercase">{t.cliente.ciudad}</span>
            )}
            {t.codigo_seguimiento && <CodigoCopy codigo={t.codigo_seguimiento} />}
          </div>

          {/* Motivo cancelación */}
          {cancelado && t.cancelacion_motivo && (
            <div className="px-5 py-3 bg-red-50">
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Motivo de cancelación</p>
              <p className="text-sm text-red-700">{t.cancelacion_motivo}</p>
            </div>
          )}

          {/* Historial + Pagos */}
          <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Historial</p>
              <HistorialMini entries={historial} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pagos</p>
              {selectingMethodFor ? (
                <MetodoSelector
                  label={selectingMethodFor === 'pago_inicial' ? 'Pago 1' : 'Pago 2'}
                  onConfirm={handlePagoConMetodo}
                  onCancel={() => setSelectingMethodFor(null)}
                />
              ) : (
                <div className="flex gap-3">
                  <PaySlot label="Pago 1" amount={pago1} paid={t.pago_inicial}
                    date={t.pago_inicial_fecha} metodo={t.pago_inicial_metodo}
                    onToggle={() => handlePagoToggle('pago_inicial')}
                    disabled={isPending || bloqueado || cancelado} />
                  <PaySlot label="Pago 2" amount={pago2} paid={t.pago_final}
                    date={t.pago_final_fecha} metodo={t.pago_final_metodo}
                    onToggle={() => handlePagoToggle('pago_final')}
                    disabled={isPending || bloqueado || cancelado} />
                </div>
              )}
              <Err msg={pagoError} />

              {/* Devolución para cancelados con pago */}
              {cancelado && t.pago_inicial && (
                <div className={cx(
                  'mt-3 flex items-center justify-between rounded-xl px-3 py-2.5 border',
                  t.pago_devuelto ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200',
                )}>
                  <p className={`text-xs font-bold ${t.pago_devuelto ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {t.pago_devuelto ? 'Pago devuelto' : 'Devolución pendiente'}
                  </p>
                  <button type="button" disabled={isPending}
                    onClick={() => startTransition(async () => { await togglePagoDevuelto(t.id, !t.pago_devuelto); })}
                    className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${
                      t.pago_devuelto
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}>
                    {t.pago_devuelto ? 'Marcar pendiente' : 'Marcar devuelto'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desglose financiero + costos operativos */}
          {total > 0 && (
            <div className="px-5 py-3 space-y-2 bg-slate-50/50">
              {/* Cobro al cliente */}
              <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500">
                <span>Honorarios <strong className="text-slate-800 ml-1">{cop(t.valor_honorarios)}</strong></span>
                {t.valor_derechos > 0 && (
                  <><span className="text-slate-300">·</span>
                  <span>Derechos <strong className="text-slate-800 ml-1">{cop(t.valor_derechos)}</strong></span></>
                )}
                {t.valor_avaluo > 0 && (
                  <><span className="text-slate-300">·</span>
                  <span>Avalúo <strong className="text-amber-700 ml-1">{cop(t.valor_avaluo)}</strong></span></>
                )}
                <span className="text-slate-300">·</span>
                <span className="font-bold text-slate-800">Total {cop(total)}</span>
              </div>
              {/* Costos registrados */}
              {(t.costo_tramitador > 0 || t.costo_envio > 0 || t.costo_imprevistos > 0) && (
                <div className="flex items-center gap-3 flex-wrap text-xs text-slate-400 border-t border-slate-100 pt-2">
                  <span className="font-bold text-slate-400 uppercase tracking-wide text-[10px]">Costos</span>
                  {t.costo_tramitador > 0 && <span>Tramitador <strong className="text-slate-600">{cop(t.costo_tramitador)}</strong></span>}
                  {t.costo_envio > 0 && <span>Envío <strong className="text-slate-600">{cop(t.costo_envio)}</strong></span>}
                  {t.costo_imprevistos > 0 && <span>Imprevistos <strong className="text-slate-600">{cop(t.costo_imprevistos)}</strong></span>}
                  <span className="text-slate-300">·</span>
                  <span>Neto <strong className="text-emerald-700">{cop(calcNeto(t))}</strong></span>
                </div>
              )}
            </div>
          )}

          {/* Costos operativos — visible cuando aprobado o entregado */}
          {(t.estado === 'aprobado' || t.estado === 'entregado') && (
            <CostosForm t={t} />
          )}

          {/* Cambiar estado */}
          {!bloqueado && !cancelado && !showCancelForm && (
            <div className="px-5 py-4 space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cambiar estado</p>
              <EstadoPills current={pendingEstado ?? t.estado} onChange={handleEstadoChange} disabled={isPending} />

              {pendingEstado && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <p className="text-xs text-slate-500">
                    Cambiar a <strong className="text-slate-800">{ESTADO_CONFIG[pendingEstado].label}</strong>
                  </p>
                  <textarea
                    value={estadoNota}
                    onChange={e => setEstadoNota(e.target.value)}
                    rows={2}
                    placeholder="Nota para el cliente (opcional)... Ej: Documentos recibidos y en revisión"
                    className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-slate-300"
                  />
                  <div className="flex gap-2">
                    <button type="button" onClick={confirmEstado} disabled={isPending}
                      className="text-xs font-bold px-4 py-1.5 bg-brand-950 text-white rounded-lg hover:bg-brand-800 disabled:opacity-50 transition-colors">
                      Confirmar cambio
                    </button>
                    <button type="button"
                      onClick={() => { setPendingEstado(null); setEstadoNota(''); }}
                      className="text-xs font-medium px-3 py-1.5 text-slate-500 hover:text-slate-700">
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Formulario cancelación */}
          {showCancelForm && (
            <div className="px-5 py-4">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-3">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wide">Motivo de cancelación</p>
                <textarea value={cancelMotivo} onChange={e => setCancelMotivo(e.target.value)}
                  rows={2} placeholder="Ej: Cliente desistió..."
                  className="w-full text-sm border border-red-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-slate-700 placeholder:text-slate-300" />
                <Err msg={cancelError} />
                <div className="flex gap-2">
                  <button type="button" onClick={handleCancelSubmit} disabled={isPending}
                    className="text-xs font-bold px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors">
                    Confirmar cancelación
                  </button>
                  <button type="button"
                    onClick={() => { setShowCancelForm(false); setCancelMotivo(''); setCancelError(null); }}
                    className="text-xs font-medium px-4 py-2 text-slate-500 hover:text-slate-700">
                    Volver
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bloqueado */}
          {bloqueado && (
            <div className="px-5 py-3">
              <div className="flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-xl px-4 py-2.5">
                <svg className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                <p className="text-xs font-bold text-brand-700">Trámite entregado — historial bloqueado</p>
              </div>
            </div>
          )}

          {/* Eliminar */}
          {cancelado && (
            <div className="px-5 py-3 flex justify-end bg-slate-50">
              <button
                onClick={() => {
                  if (confirm('¿Eliminar este trámite? No se puede deshacer.')) {
                    startTransition(async () => { await deleteTramite(t.id); });
                  }
                }}
                disabled={isPending}
                className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">
                Eliminar trámite
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
