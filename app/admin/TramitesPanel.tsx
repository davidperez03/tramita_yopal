'use client';

import { useState, useTransition } from 'react';
import { SERVICE_NAMES_WITH_OTHER } from '@/lib/constants';
import { fmtDate } from '@/lib/format';
import {
  type Tramite, type TramiteEstado, ESTADOS, ESTADO_CONFIG, METODOS_PAGO, calcPagos,
} from '@/lib/domain/tramite';
import {
  createTramite, updateEstado, togglePago,
  deleteTramite, cancelTramite, togglePagoDevuelto, bulkUpdateEstado,
} from './tramites-actions';
import { cx, Badge, Stat, Err } from './ui';

export type { Tramite };

export type HistorialEntry = {
  tramite_id: string;
  ts: string;
  estado: string;
  nota: string | null;
};

function norm(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

const cop = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

const inputCls =
  'w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white';

/* ─── Input de dinero ─── */
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
      <input type="text" inputMode="numeric" value={display} onChange={handleChange}
        placeholder={placeholder} className={`${inputCls} pl-6`} />
      <input type="hidden" name={name} value={raw} />
    </div>
  );
}

/* ─── Input de avalúo: usuario ingresa valor comercial, sistema calcula 1% ─── */
function AvaluoInput() {
  const [display, setDisplay] = useState('');
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '');
    const num    = digits === '' ? 0 : parseInt(digits, 10);
    setDisplay(num > 0 ? new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(num) : '');
  }
  const comercial = display === '' ? 0 : parseInt(display.replace(/\D/g, ''), 10);
  const avaluo1pct = Math.round(comercial * 0.01);
  return (
    <div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">$</span>
        <input type="text" inputMode="numeric" value={display} onChange={handleChange}
          placeholder="Valor comercial del vehículo" className={`${inputCls} pl-6`} />
        <input type="hidden" name="avaluo_comercial" value={comercial} />
      </div>
      {comercial > 0 && (
        <p className="text-xs font-semibold text-amber-700 mt-1.5">
          Avalúo a cobrar (1%): <span className="font-black">{cop(avaluo1pct)}</span>
        </p>
      )}
    </div>
  );
}

/* ─── Icono pago ─── */
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

/* ─── Slot de pago ─── */
function PaySlot({ label, amount, paid, date, metodo, onToggle, disabled }: {
  label: string; amount: number; paid: boolean;
  date: string | null; metodo: string | null;
  onToggle: () => void; disabled: boolean;
}) {
  return (
    <button type="button" onClick={onToggle} disabled={disabled}
      className={`flex-1 rounded-2xl p-4 text-left transition-all border-2 ${
        paid
          ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
          : 'bg-slate-50 border-dashed border-slate-200 hover:border-brand-300 hover:bg-brand-50/40'
      }`}>
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
        {paid ? (date ?? 'Recibido') : 'Clic para marcar'}
      </p>
      {paid && metodo && (
        <p className="text-[10px] text-emerald-500 mt-0.5 capitalize">{metodo}</p>
      )}
    </button>
  );
}

/* ─── Selector de método ─── */
function MetodoSelector({ label, onConfirm, onCancel }: {
  label: string; onConfirm: (m: string) => void; onCancel: () => void;
}) {
  const [metodo, setMetodo] = useState('');
  return (
    <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 space-y-3">
      <p className="text-xs font-bold text-brand-700 uppercase tracking-wide">Método — {label}</p>
      <div className="flex gap-2 flex-wrap">
        {METODOS_PAGO.map(m => (
          <button key={m} type="button" onClick={() => setMetodo(m)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border-2 transition-colors capitalize ${
              metodo === m ? 'bg-brand-700 border-brand-700 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300'
            }`}>
            {m}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button type="button" disabled={!metodo} onClick={() => onConfirm(metodo)}
          className="text-xs font-bold px-4 py-2 bg-brand-950 text-white rounded-xl disabled:opacity-40 hover:bg-brand-800 transition-colors">
          Confirmar pago
        </button>
        <button type="button" onClick={onCancel}
          className="text-xs font-medium px-4 py-2 text-slate-500 hover:text-slate-700">
          Cancelar
        </button>
      </div>
    </div>
  );
}

/* ─── Pills de estado ─── */
function EstadoPills({ current, onChange, disabled }: {
  current: string; onChange: (e: TramiteEstado) => void; disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ESTADOS.map(s => (
        <button key={s} type="button" disabled={disabled}
          onClick={() => { if (s !== current) onChange(s); }}
          className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all ${
            current === s
              ? ESTADO_CONFIG[s].pillActive
              : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'
          }`}>
          {ESTADO_CONFIG[s].label}
        </button>
      ))}
    </div>
  );
}

/* ─── Historial mini (en admin) ─── */
function HistorialMini({ entries }: { entries: HistorialEntry[] }) {
  if (entries.length === 0) return <p className="text-xs text-slate-300">Sin registros aún.</p>;
  return (
    <ol className="space-y-2.5">
      {entries.map((e, i) => {
        const cfg  = ESTADO_CONFIG[e.estado as TramiteEstado];
        const last = i === entries.length - 1;
        return (
          <li key={i} className="flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${last ? cfg.band : 'bg-slate-200'}`} />
            <span className={`text-xs flex-1 ${last ? 'font-bold text-slate-800' : 'text-slate-400'}`}>
              {cfg.label}
            </span>
            <span className="text-[10px] text-slate-300 whitespace-nowrap">{fmtDate(e.ts)}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* ─── Código copiable ─── */
function CodigoCopy({ codigo }: { codigo: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(codigo).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button type="button" onClick={copy} title="Copiar código"
      className="inline-flex items-center gap-1.5 font-mono font-bold text-xs bg-slate-900 text-white px-2.5 py-1 rounded-lg tracking-widest hover:bg-slate-700 transition-colors">
      {codigo}
      {copied ? (
        <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

/* ─── Pipeline ─── */
const FLOW_ESTADOS: TramiteEstado[] = ['recibido', 'en_proceso', 'aprobado', 'entregado'];

function PipelineCol({ label, count, isActive, band, onClick, danger = false }: {
  label: string; count: number; isActive: boolean; band: string; onClick: () => void; danger?: boolean;
}) {
  return (
    <button onClick={onClick}
      className={cx(
        'flex flex-col items-center px-4 py-3 border-l border-slate-100 first:border-l-0 transition-colors select-none',
        isActive && !danger ? 'bg-slate-50' : isActive ? 'bg-red-50/70' : 'hover:bg-slate-50/60',
      )}>
      <div className={cx('h-[2px] w-8 rounded-full mb-2.5', band, !isActive && count === 0 && 'opacity-20')} />
      <p className={cx('text-xl font-black tabular-nums leading-none',
        !isActive && count === 0 ? 'text-slate-200' : danger ? 'text-red-600' : 'text-slate-900')}>
        {count}
      </p>
      <p className={cx('text-[9px] font-bold uppercase tracking-wider mt-1.5',
        danger && count > 0 ? 'text-red-400' : 'text-slate-400')}>
        {label}
      </p>
    </button>
  );
}

function Pipeline({ counts, total, active, onChange }: {
  counts: Record<string, number>; total: number; active: string; onChange: (s: string) => void;
}) {
  const cancelCount = counts['cancelado'] ?? 0;
  return (
    <div className="bg-white border border-slate-100 rounded-xl overflow-x-auto">
      <div className="flex min-w-max">
        <PipelineCol label="Todos" count={total} isActive={active === 'todos'} band="bg-slate-300"
          onClick={() => onChange('todos')} />
        {FLOW_ESTADOS.map(e => (
          <PipelineCol key={e} label={ESTADO_CONFIG[e].label} count={counts[e] ?? 0}
            isActive={active === e} band={ESTADO_CONFIG[e].band}
            onClick={() => onChange(active === e ? 'todos' : e)} />
        ))}
        <div className="w-px bg-slate-100 self-stretch my-2" />
        <PipelineCol label="Cancelados" count={cancelCount} isActive={active === 'cancelado'}
          band={cancelCount > 0 ? 'bg-red-400' : 'bg-slate-100'}
          onClick={() => onChange(active === 'cancelado' ? 'todos' : 'cancelado')}
          danger />
      </div>
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

  function close() { setOpen(false); setTipo(''); setResult(null); }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const res = await createTramite(new FormData(e.currentTarget));
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
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Ciudad</label>
            <input name="cliente_ciudad" placeholder="YOPAL"
              onChange={e => { e.target.value = e.target.value.toUpperCase(); }}
              className={`${inputCls} uppercase`} />
          </div>
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Tipo de trámite *</label>
          <select name="tipo" required value={tipo} onChange={e => setTipo(e.target.value)}
            className={`${inputCls} bg-white`}>
            <option value="">Selecciona un trámite...</option>
            {SERVICE_NAMES_WITH_OTHER.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Valores */}
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
                    Valor comercial del vehículo
                  </label>
                  <AvaluoInput />
                </div>
              )}
            </div>
            {esTraspaso && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                El avalúo (1% del valor comercial) se cobra completo al iniciar — no entra en el 50/50.
              </p>
            )}
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
          <button type="button" onClick={close}
            className="text-slate-500 hover:text-slate-700 text-sm font-medium px-4 py-2.5">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── Tarjeta de trámite ─── */
function TramiteCard({ t, hasTramiteComp, historial, selected, onToggle }: {
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
            <p className="text-sm font-extrabold text-slate-900 uppercase leading-none">{t.cliente_nombre}</p>
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
        {/* Segunda línea: tipo + fecha — subtle */}
        <p className="text-[11px] text-slate-400 mt-1 truncate">{t.tipo} · {fmtDate(t.created_at)}</p>
      </button>

      {/* Cuerpo expandido */}
      {expanded && (
        <div className="border-t border-slate-100 divide-y divide-slate-100">

          {/* Info del cliente — tira horizontal */}
          <div className="px-5 py-3 flex items-center gap-5 flex-wrap">
            {t.cliente_telefono && (
              <a href={`tel:${t.cliente_telefono}`}
                className="text-sm font-medium text-brand-600 hover:underline">
                {t.cliente_telefono}
              </a>
            )}
            {t.cliente_ciudad && (
              <span className="text-xs font-semibold text-slate-500 uppercase">{t.cliente_ciudad}</span>
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

          {/* Desglose financiero — compacto */}
          {total > 0 && (
            <div className="px-5 py-3 flex items-center gap-4 flex-wrap text-xs text-slate-500 bg-slate-50/50">
              <span>Honorarios <strong className="text-slate-800 ml-1">{cop(t.valor_honorarios)}</strong></span>
              <span className="text-slate-300">·</span>
              <span>Derechos <strong className="text-slate-800 ml-1">{cop(t.valor_derechos)}</strong></span>
              {t.valor_avaluo > 0 && (
                <>
                  <span className="text-slate-300">·</span>
                  <span>Avalúo <strong className="text-amber-700 ml-1">{cop(t.valor_avaluo)}</strong></span>
                </>
              )}
              <span className="text-slate-300">·</span>
              <span className="font-bold text-slate-800">Total {cop(total)}</span>
            </div>
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

/* ─── Panel principal ─── */
export default function TramitesPanel({
  tramites, total, limit, comparendosByPhone, historial,
}: {
  tramites: Tramite[];
  total: number;
  limit: number;
  comparendosByPhone: Map<string, true>;
  historial: HistorialEntry[];
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
          norm(t.cliente_nombre).includes(q) ||
          (t.placa && norm(t.placa).includes(q)) ||
          (digits && t.cliente_telefono?.replace(/\D/g, '').includes(digits))
        );
      })
    : enPeriodo;

  const counts = ESTADOS.reduce<Record<string, number>>((acc, e) => {
    acc[e] = listBase.filter(t => t.estado === e).length;
    return acc;
  }, {});

  const filtered = filtro === 'todos' ? listBase : listBase.filter(t => t.estado === filtro);

  // ── Métricas financieras ──
  const activos    = enPeriodo.filter(t => t.estado !== 'cancelado');
  const cancelados = enPeriodo.filter(t => t.estado === 'cancelado');

  const cobrado = enPeriodo.reduce((sum, t) => {
    const { pago1, pago2 } = calcPagos(t);
    return sum + (t.pago_inicial ? pago1 : 0) + (t.pago_final ? pago2 : 0);
  }, 0);

  const devuelto = cancelados.reduce((sum, t) => {
    if (!t.pago_devuelto || !t.pago_inicial) return sum;
    return sum + calcPagos(t).pago1;
  }, 0);

  const neto = cobrado - devuelto;

  const honorariosCobrados = activos.reduce((sum, t) => {
    const base = t.valor_honorarios;
    const p1h  = Math.floor(base / 2);
    const p2h  = base - p1h;
    return sum + (t.pago_inicial ? p1h : 0) + (t.pago_final ? p2h : 0);
  }, 0);

  const pendiente = activos
    .filter(t => t.estado !== 'entregado')
    .reduce((sum, t) => {
      const { pago1, pago2 } = calcPagos(t);
      return sum + (!t.pago_inicial ? pago1 : 0) + (!t.pago_final ? pago2 : 0);
    }, 0);

  const devolucionesPendientes = cancelados
    .filter(t => t.pago_inicial && !t.pago_devuelto)
    .reduce((sum, t) => sum + calcPagos(t).pago1, 0);

  const deudaPostEntrega = activos
    .filter(t => t.estado === 'entregado' && (!t.pago_inicial || !t.pago_final))
    .reduce((sum, t) => {
      const { pago1, pago2 } = calcPagos(t);
      return sum + (!t.pago_inicial ? pago1 : 0) + (!t.pago_final ? pago2 : 0);
    }, 0);

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
              hasTramiteComp={!!(t.cliente_telefono && comparendosByPhone.has(t.cliente_telefono))}
              historial={historialMap.get(t.id) ?? []}
              selected={selected.has(t.id)}
              onToggle={() => toggleSelect(t.id)}
            />
          ))}
        </div>
      )}

      {/* Barra flotante de acción masiva */}
      {selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white rounded-2xl shadow-2xl px-5 py-4 w-[min(520px,90vw)]">
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-2.5">
              <p className="text-xs font-bold text-white/60 uppercase tracking-wider">
                {selected.size} trámite{selected.size !== 1 ? 's' : ''} seleccionado{selected.size !== 1 ? 's' : ''}
              </p>

              {bulkEstado ? (
                <>
                  <p className="text-xs text-white/70">
                    Cambiar todos a{' '}
                    <strong className="text-white">{ESTADO_CONFIG[bulkEstado].label}</strong>
                  </p>
                  <textarea
                    value={bulkNota}
                    onChange={e => setBulkNota(e.target.value)}
                    rows={2}
                    placeholder="Nota para los clientes (opcional)"
                    className="w-full text-xs bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/30 resize-none focus:outline-none focus:ring-1 focus:ring-white/40"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={confirmBulk}
                      disabled={isBulkPending}
                      className="text-xs font-bold px-4 py-1.5 bg-brand-500 hover:bg-brand-400 text-white rounded-lg disabled:opacity-50 transition-colors"
                    >
                      {isBulkPending ? 'Aplicando...' : `Confirmar (${selected.size})`}
                    </button>
                    <button
                      onClick={() => { setBulkEstado(null); setBulkNota(''); }}
                      className="text-xs text-white/50 hover:text-white px-3 py-1.5 transition-colors"
                    >
                      Cambiar estado
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {(ESTADOS.filter(e => e !== 'cancelado') as TramiteEstado[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setBulkEstado(s)}
                      className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                    >
                      → {ESTADO_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={clearSelection}
              className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white text-xl leading-none transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
