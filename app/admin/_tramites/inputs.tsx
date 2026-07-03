'use client';

import { useState } from 'react';
import { cop } from '@/lib/format';

export const inputCls =
  'w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white';

/* ─── Input de dinero ─── */
export function MoneyInput({ name, placeholder = '0' }: { name: string; placeholder?: string }) {
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
export function AvaluoInput() {
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
