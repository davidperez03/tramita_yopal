'use client';

import { type TramiteEstado, ESTADO_CONFIG } from '@/lib/domain/tramite';
import { cx } from '../ui';

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

export function Pipeline({ counts, total, active, onChange }: {
  counts: Record<string, number>; total: number; active: string; onChange: (s: string) => void;
}) {
  const cancelCount = counts['cancelado'] ?? 0;
  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm overflow-x-auto">
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
