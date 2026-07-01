'use client';

import { useState, useTransition } from 'react';
import { SERVICES } from '@/lib/constants';
import {
  createTramite, updateEstado, togglePago, deleteTramite, updateNotas,
  type TramiteEstado,
} from './tramites-actions';

export type Tramite = {
  id: string;
  created_at: string;
  updated_at: string | null;
  cliente_nombre: string;
  cliente_telefono: string | null;
  cliente_ciudad: string | null;
  placa: string | null;
  tipo: string;
  descripcion: string | null;
  estado: string;
  valor_honorarios: number;
  valor_derechos: number;
  valor_avaluo: number;
  pago_inicial: boolean;
  pago_inicial_fecha: string | null;
  pago_final: boolean;
  pago_final_fecha: string | null;
  notas: string | null;
};

const serviceOptions = [
  ...SERVICES.filter(s => s.id !== 'otros').map(s => s.name),
  'Otro',
];

const ESTADOS: TramiteEstado[] = ['recibido', 'en_proceso', 'aprobado', 'entregado', 'cancelado'];

const ESTADO_LABELS: Record<string, string> = {
  recibido:   'Recibido',
  en_proceso: 'En proceso',
  aprobado:   'Aprobado',
  entregado:  'Entregado',
  cancelado:  'Cancelado',
};

/* Color del badge en el header de la tarjeta */
const ESTADO_BADGE: Record<string, string> = {
  recibido:   'bg-slate-100 text-slate-600 border-slate-200',
  en_proceso: 'bg-blue-50 text-blue-700 border-blue-200',
  aprobado:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  entregado:  'bg-brand-50 text-brand-700 border-brand-200',
  cancelado:  'bg-red-50 text-red-600 border-red-200',
};

/* Color activo del pill de estado (al seleccionarlo) */
const ESTADO_PILL_ACTIVE: Record<string, string> = {
  recibido:   'bg-slate-200 border-slate-400 text-slate-800',
  en_proceso: 'bg-blue-100 border-blue-500 text-blue-800',
  aprobado:   'bg-emerald-100 border-emerald-500 text-emerald-800',
  entregado:  'bg-brand-100 border-brand-500 text-brand-800',
  cancelado:  'bg-red-100 border-red-400 text-red-700',
};

/* Banda de color en la parte superior de la tarjeta */
const ESTADO_BAND: Record<string, string> = {
  recibido:   'bg-slate-300',
  en_proceso: 'bg-blue-500',
  aprobado:   'bg-emerald-500',
  entregado:  'bg-brand-600',
  cancelado:  'bg-red-400',
};

const cop = (n: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0,
  }).format(n);

function calcPagos(t: Tramite) {
  const base  = t.valor_honorarios + t.valor_derechos;
  const mitad = Math.round(base * 0.5);
  return { pago1: mitad + t.valor_avaluo, pago2: mitad, total: base + t.valor_avaluo };
}

const inputCls =
  'w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white';

/* ─── Input de dinero con separadores de miles ─── */
function MoneyInput({ name, placeholder = '0' }: { name: string; placeholder?: string }) {
  const [display, setDisplay] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '');
    const num    = digits === '' ? 0 : parseInt(digits, 10);
    setDisplay(num > 0 ? new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(num) : '');
  }

  const raw = display === '' ? '0' : display.replace(/\D/g, '');

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">$</span>
      <input
        type="text"
        inputMode="numeric"
        value={display}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${inputCls} pl-6`}
      />
      <input type="hidden" name={name} value={raw} />
    </div>
  );
}

/* ─── Icono pago (mini) ─── */
function PagoIcon({ paid }: { paid: boolean }) {
  return paid ? (
    <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

/* ─── Slot de pago clicable ─── */
function PaySlot({
  label, amount, paid, date, onToggle, disabled,
}: {
  label: string; amount: number; paid: boolean;
  date: string | null; onToggle: () => void; disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`flex-1 rounded-2xl p-4 text-left transition-all border-2 ${
        paid
          ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
          : 'bg-slate-50 border-dashed border-slate-200 hover:border-brand-300 hover:bg-brand-50/40'
      }`}
    >
      <div className="flex items-center gap-1.5 mb-2">
        {paid ? (
          <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="9" />
          </svg>
        )}
        <span className={`text-xs font-bold uppercase tracking-wide ${paid ? 'text-emerald-700' : 'text-slate-400'}`}>
          {label}
        </span>
      </div>
      {amount > 0 && (
        <p className={`text-base font-black leading-none ${paid ? 'text-emerald-900' : 'text-slate-700'}`}>
          {cop(amount)}
        </p>
      )}
      <p className={`text-xs mt-1.5 ${paid ? 'text-emerald-600' : 'text-slate-400'}`}>
        {paid ? (date ?? 'Recibido') : 'Clic para marcar recibido'}
      </p>
    </button>
  );
}

/* ─── Pills de estado ─── */
function EstadoPills({
  current, onChange, disabled,
}: {
  current: string; onChange: (e: TramiteEstado) => void; disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ESTADOS.map(s => (
        <button
          key={s}
          type="button"
          onClick={() => { if (s !== current) onChange(s); }}
          disabled={disabled}
          className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all ${
            current === s
              ? ESTADO_PILL_ACTIVE[s]
              : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'
          }`}
        >
          {ESTADO_LABELS[s]}
        </button>
      ))}
    </div>
  );
}

/* ─── Formulario nuevo trámite ─── */
function AddTramiteForm() {
  const [open, setOpen]              = useState(false);
  const [isPending, startTransition] = useTransition();
  const [result, setResult]          = useState<{ success?: boolean; error?: string } | null>(null);
  const [tipo, setTipo]              = useState('');

  const esTraspaso = tipo === 'Traspaso de Propiedad';

  function close() { setOpen(false); setTipo(''); }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!esTraspaso) fd.set('valor_avaluo', '0');
    startTransition(async () => {
      const res = await createTramite(fd);
      setResult(res);
      if (res.success) {
        (e.target as HTMLFormElement).reset();
        close();
        setResult(null);
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold text-white bg-brand-700 hover:bg-brand-600 px-5 py-3 rounded-2xl transition-colors shadow-sm"
      >
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
        {/* Cliente */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Cliente *</label>
            <input name="cliente_nombre" required placeholder="NOMBRE COMPLETO"
              onChange={e => { e.target.value = e.target.value.toUpperCase(); }}
              className={`${inputCls} uppercase`} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Placa</label>
            <input
              name="placa"
              placeholder="ABC123"
              maxLength={7}
              onChange={e => { e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); }}
              className={`${inputCls} uppercase font-mono tracking-widest`}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Teléfono</label>
            <input name="cliente_telefono" placeholder="+57 300..." className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Ciudad</label>
            <input name="cliente_ciudad" placeholder="YOPAL"
              onChange={e => { e.target.value = e.target.value.toUpperCase(); }}
              className={`${inputCls} uppercase`} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Tipo de trámite *</label>
          <select name="tipo" required value={tipo} onChange={e => setTipo(e.target.value)} className={`${inputCls} bg-white`}>
            <option value="">Selecciona un trámite...</option>
            {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Valores — solo aparecen una vez seleccionado el tipo */}
        {tipo && (
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
                    Avalúo <span className="text-amber-600 font-medium normal-case">(1% valor comercial)</span>
                  </label>
                  <MoneyInput name="valor_avaluo" />
                </div>
              )}
            </div>
            {esTraspaso && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                El avalúo se cobra completo al iniciar — no entra en el 50/50.
              </p>
            )}
          </div>
        )}

        {tipo && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Descripción del caso
              </label>
              <textarea name="descripcion" rows={3}
                placeholder="Lo que el cliente comunicó, documentos recibidos, detalles del vehículo..."
                className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Notas internas
              </label>
              <textarea name="notas" rows={3}
                placeholder="Seguimiento, pendientes, alertas internas..."
                className={`${inputCls} resize-none`} />
            </div>
          </div>
        )}

        {result?.error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{result.error}</p>
        )}

        <div className="flex gap-3 pt-1">
          <button type="submit" disabled={isPending}
            className="bg-brand-950 hover:bg-brand-800 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
            {isPending ? 'Guardando...' : 'Crear trámite'}
          </button>
          <button type="button" onClick={close} className="text-slate-500 hover:text-slate-700 text-sm font-medium px-4 py-2.5">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── Tarjeta de trámite (colapsable) ─── */
function TramiteCard({ t }: { t: Tramite }) {
  const [isPending, startTransition]          = useTransition();
  const [expanded, setExpanded]               = useState(false);
  const [notas, setNotas]                     = useState(t.notas ?? '');
  const [notaState, setNotaState]             = useState<'idle' | 'dirty' | 'saved'>('idle');
  const { pago1, pago2, total }               = calcPagos(t);
  const bloqueado                             = t.estado === 'entregado';

  const fecha = new Date(t.created_at).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  function saveNotas() {
    if (notaState !== 'dirty') return;
    startTransition(async () => {
      await updateNotas(t.id, notas);
      setNotaState('saved');
      setTimeout(() => setNotaState('idle'), 2000);
    });
  }

  return (
    <div className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-opacity ${isPending ? 'opacity-60' : ''} ${bloqueado ? 'border-brand-200 bg-brand-50/20' : 'border-slate-200'}`}>

      {/* Banda de color según estado */}
      <div className={`h-1 w-full ${ESTADO_BAND[t.estado] ?? 'bg-slate-300'}`} />

      {/* Header colapsado — siempre visible */}
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className="w-full text-left px-5 py-4 hover:bg-slate-50/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className={`inline-flex text-[11px] font-bold px-2 py-0.5 rounded-full border ${ESTADO_BADGE[t.estado] ?? ESTADO_BADGE.recibido}`}>
                {ESTADO_LABELS[t.estado] ?? t.estado}
              </span>
              <span className="text-[11px] text-slate-400">{fecha}</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-extrabold text-slate-900 truncate uppercase">{t.cliente_nombre}</p>
              {t.placa && (
                <span className="flex-shrink-0 text-xs font-mono font-bold tracking-widest bg-slate-900 text-white px-2 py-0.5 rounded-md">
                  {t.placa}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 truncate uppercase">
              {t.tipo}
              {t.cliente_ciudad && <span className="before:content-['·'] before:mx-1 before:text-slate-300">{t.cliente_ciudad}</span>}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1" title={`Pago 1: ${t.pago_inicial ? 'recibido' : 'pendiente'} · Pago 2: ${t.pago_final ? 'recibido' : 'pendiente'}`}>
              <PagoIcon paid={t.pago_inicial} />
              <PagoIcon paid={t.pago_final} />
            </div>
            {total > 0 && (
              <span className="text-xs font-bold text-slate-600 hidden sm:block">{cop(total)}</span>
            )}
            <svg className={`w-4 h-4 text-slate-400 transition-transform ml-1 ${expanded ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Contenido expandido */}
      {expanded && (
        <div className="border-t border-slate-100">

          {/* Fila de contacto */}
          {(t.cliente_telefono || t.cliente_ciudad) && (
            <div className="px-5 pt-4 pb-2 flex gap-6 flex-wrap">
              {t.cliente_ciudad && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Ciudad</p>
                  <p className="text-sm text-slate-700 uppercase">{t.cliente_ciudad}</p>
                </div>
              )}
              {t.cliente_telefono && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Teléfono</p>
                  <a href={`tel:${t.cliente_telefono}`} className="text-sm text-brand-600 hover:underline font-medium">
                    {t.cliente_telefono}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Descripción */}
          {t.descripcion && (
            <div className="mx-5 mb-4 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Descripción del caso</p>
              <p className="text-sm text-slate-700 leading-relaxed">{t.descripcion}</p>
            </div>
          )}

          {/* Financiero + Pagos: dos columnas en desktop */}
          <div className="px-5 pb-4 grid sm:grid-cols-2 gap-4">

            {/* Resumen financiero */}
            {total > 0 && (
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Desglose</p>
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-xs text-slate-500">Honorarios</span>
                    <span className="text-xs font-bold text-slate-800">{cop(t.valor_honorarios)}</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-xs text-slate-500">Derechos</span>
                    <span className="text-xs font-bold text-slate-800">{cop(t.valor_derechos)}</span>
                  </div>
                  {t.tipo === 'Traspaso de Propiedad' && (
                    <div className="flex justify-between items-center px-4 py-2.5">
                      <span className="text-xs text-amber-600">Avalúo</span>
                      <span className="text-xs font-bold text-amber-700">{cop(t.valor_avaluo)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center px-4 py-2.5 bg-slate-50">
                    <span className="text-xs font-bold text-slate-700">Total</span>
                    <span className="text-sm font-extrabold text-slate-900">{cop(total)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Pagos */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Seguimiento de pagos</p>
              <div className="flex gap-3">
                <PaySlot label="Pago 1" amount={pago1} paid={t.pago_inicial} date={t.pago_inicial_fecha}
                  onToggle={() => startTransition(() => void togglePago(t.id, 'pago_inicial', !t.pago_inicial))}
                  disabled={isPending || bloqueado} />
                <PaySlot label="Pago 2" amount={pago2} paid={t.pago_final} date={t.pago_final_fecha}
                  onToggle={() => startTransition(() => void togglePago(t.id, 'pago_final', !t.pago_final))}
                  disabled={isPending || bloqueado} />
              </div>
            </div>
          </div>

          {/* Estado — oculto si bloqueado */}
          {!bloqueado && (
            <div className="px-5 pb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Estado del trámite</p>
              <EstadoPills
                current={t.estado}
                onChange={s => startTransition(() => void updateEstado(t.id, s))}
                disabled={isPending}
              />
            </div>
          )}

          {/* Bloqueo visual cuando está entregado */}
          {bloqueado && (
            <div className="px-5 pb-4">
              <div className="flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-xl px-4 py-2.5">
                <svg className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                <p className="text-xs font-bold text-brand-700">Trámite entregado — historial bloqueado</p>
              </div>
            </div>
          )}

          {/* Notas internas */}
          <div className="px-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Notas internas</p>
              {!bloqueado && (
                <button
                  onClick={saveNotas}
                  disabled={isPending || notaState === 'idle'}
                  className={`text-xs font-bold px-3 py-1 rounded-lg border transition-all ${
                    notaState === 'saved'
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200 cursor-default'
                      : notaState === 'dirty'
                      ? 'text-brand-700 bg-brand-50 border-brand-200 hover:bg-brand-100'
                      : 'text-slate-300 border-slate-100 cursor-default'
                  }`}
                >
                  {notaState === 'saved' ? '✓ Guardado' : 'Guardar'}
                </button>
              )}
            </div>
            <textarea
              value={notas}
              readOnly={bloqueado}
              onChange={bloqueado ? undefined : e => { setNotas(e.target.value); setNotaState('dirty'); }}
              rows={3}
              placeholder={bloqueado ? '' : 'Seguimiento, pendientes, alertas del caso...'}
              className={`w-full text-sm border rounded-xl px-3 py-2.5 resize-none leading-relaxed ${
                bloqueado
                  ? 'border-slate-100 bg-slate-50 text-slate-500 cursor-default focus:outline-none'
                  : 'border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-700 placeholder:text-slate-300'
              }`}
            />
          </div>

          {/* Footer — eliminar solo si está cancelado */}
          {t.estado === 'cancelado' && (
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => {
                  if (confirm('¿Eliminar este trámite? Esta acción no se puede deshacer.')) {
                    startTransition(() => void deleteTramite(t.id));
                  }
                }}
                disabled={isPending}
                className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
              >
                Eliminar trámite
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Panel principal ─── */
export default function TramitesPanel({ tramites }: { tramites: Tramite[] }) {
  const [filtro, setFiltro] = useState<string>('todos');

  const counts = ESTADOS.reduce<Record<string, number>>((acc, e) => {
    acc[e] = tramites.filter(t => t.estado === e).length;
    return acc;
  }, {});

  const filtered = filtro === 'todos' ? tramites : tramites.filter(t => t.estado === filtro);

  const cobrado = tramites.reduce((sum, t) => {
    const { pago1, pago2 } = calcPagos(t);
    return sum + (t.pago_inicial ? pago1 : 0) + (t.pago_final ? pago2 : 0);
  }, 0);

  // Solo honorarios cobrados — ganancia real, sin derechos ni avalúo
  const honorariosCobrados = tramites.reduce((sum, t) => {
    const mitad = Math.round(t.valor_honorarios * 0.5);
    return sum + (t.pago_inicial ? mitad : 0) + (t.pago_final ? mitad : 0);
  }, 0);

  const pendiente = tramites
    .filter(t => t.estado !== 'cancelado')
    .reduce((sum, t) => {
      const { pago1, pago2 } = calcPagos(t);
      return sum + (!t.pago_inicial ? pago1 : 0) + (!t.pago_final ? pago2 : 0);
    }, 0);

  return (
    <div className="space-y-6">

      {/* Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total trámites', value: tramites.length.toString(),                       color: 'text-slate-900'   },
          { label: 'En curso',       value: (counts.en_proceso + counts.recibido).toString(), color: 'text-blue-700'    },
          { label: 'Honorarios',     value: cop(honorariosCobrados),                          color: 'text-emerald-700' },
          { label: 'Total cobrado',  value: cop(cobrado),                                     color: 'text-brand-700'   },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm">
            <p className={`text-xl font-black leading-none ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>

      {pendiente > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
          <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
          <p className="text-xs text-amber-800">
            <strong>Por cobrar:</strong> {cop(pendiente)} en trámites activos.
          </p>
        </div>
      )}

      <AddTramiteForm />

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {(['todos', ...ESTADOS] as const).map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-colors ${
              filtro === f
                ? 'bg-brand-950 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            {f === 'todos' ? `Todos (${tramites.length})` : ESTADO_LABELS[f]}
            {f !== 'todos' && counts[f] > 0 && (
              <span className={`ml-1.5 text-[10px] font-black ${filtro === f ? 'opacity-70' : 'text-slate-400'}`}>
                {counts[f]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">No hay trámites en esta categoría.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(t => <TramiteCard key={t.id} t={t} />)}
        </div>
      )}
    </div>
  );
}
