'use client';

import { useState } from 'react';
import { cop, fmtDate } from '@/lib/format';
import {
  type TramiteEstado, type HistorialEntry, ESTADOS, ESTADO_CONFIG, METODOS_PAGO,
} from '@/lib/domain/tramite';

/* ─── Icono pago ─── */
export function PagoIcon({ paid }: { paid: boolean }) {
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
export function PaySlot({ label, amount, paid, date, metodo, onToggle, disabled }: {
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
export function MetodoSelector({ label, onConfirm, onCancel }: {
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
export function EstadoPills({ current, onChange, disabled }: {
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
export function HistorialMini({ entries }: { entries: HistorialEntry[] }) {
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
export function CodigoCopy({ codigo }: { codigo: string }) {
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
