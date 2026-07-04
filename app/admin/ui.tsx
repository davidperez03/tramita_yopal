'use client';

import { useTransition, useState } from 'react';

export function cx(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(' ');
}

export const field =
  'w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-400';

// ── Badge ────────────────────────────────────────────────────
type BV = 'ok' | 'warn' | 'err' | 'info' | 'ghost' | 'brand';
const BADGE: Record<BV, string> = {
  ok:    'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  warn:  'bg-amber-50  text-amber-700  ring-1 ring-amber-200',
  err:   'bg-red-50    text-red-600    ring-1 ring-red-200',
  info:  'bg-blue-50   text-blue-700   ring-1 ring-blue-200',
  ghost: 'bg-slate-100 text-slate-500',
  brand: 'bg-brand-50  text-brand-700  ring-1 ring-brand-200',
};
export function Badge({ v = 'ghost', children }: { v?: BV; children: React.ReactNode }) {
  return (
    <span className={cx('inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full', BADGE[v])}>
      {children}
    </span>
  );
}

// ── Stat ─────────────────────────────────────────────────────
export function Stat({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl px-5 py-4 shadow-sm">
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</p>
      <p className={cx('text-[26px] font-black leading-none tabular-nums mt-2', accent ?? 'text-slate-900')}>{value}</p>
    </div>
  );
}

// ── FilterBar ────────────────────────────────────────────────
export function FilterBar<T extends string>({
  options, active, onChange,
}: { options: { key: T; label: string; count?: number }[]; active: T; onChange: (k: T) => void }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map(o => (
        <button key={o.key} onClick={() => onChange(o.key)}
          className={cx('text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors',
            active === o.key
              ? 'bg-brand-950 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-700')}>
          {o.label}
          {o.count != null && o.count > 0 && (
            <span className={cx('ml-1.5 text-[10px] font-black', active === o.key ? 'opacity-60' : 'text-slate-400')}>
              {o.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ── Empty ─────────────────────────────────────────────────────
export function Empty({ msg, sub }: { msg: string; sub?: string }) {
  return (
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center">
      <p className="text-slate-400 text-sm font-medium">{msg}</p>
      {sub && <p className="text-slate-300 text-xs mt-1">{sub}</p>}
    </div>
  );
}

// ── Btn ──────────────────────────────────────────────────────
type BtnV = 'primary' | 'ghost' | 'danger' | 'ok' | 'warn';
const BTN: Record<BtnV, string> = {
  primary: 'bg-brand-950 text-white hover:bg-brand-800 shadow-sm',
  ghost:   'bg-slate-100 text-slate-600 hover:bg-slate-200',
  danger:  'bg-red-50 text-red-600 hover:bg-red-100',
  ok:      'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  warn:    'bg-amber-50 text-amber-700 hover:bg-amber-100',
};
export function Btn({ v = 'ghost', disabled, onClick, children, submit }: {
  v?: BtnV; disabled?: boolean; onClick?: () => void; children: React.ReactNode; submit?: boolean;
}) {
  return (
    <button type={submit ? 'submit' : 'button'} disabled={disabled} onClick={onClick}
      className={cx('text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40', BTN[v])}>
      {children}
    </button>
  );
}

// ── useAction hook ───────────────────────────────────────────
export function useAction() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  function run(action: () => Promise<{ error?: string; success?: boolean } | void>) {
    setError(null);
    startTransition(async () => {
      const res = await action();
      if (res && 'error' in res && res.error) setError(res.error);
    });
  }
  return { isPending, error, setError, run };
}

// ── Inline error ─────────────────────────────────────────────
export function Err({ msg }: { msg: string | null }) {
  if (!msg) return null;
  return <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{msg}</p>;
}

// ── Divider row ──────────────────────────────────────────────
export function LabelVal({ label, val }: { label: string; val: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-xs text-slate-400 shrink-0 w-28">{label}</span>
      <span className="text-xs text-slate-700 font-medium">{val}</span>
    </div>
  );
}
