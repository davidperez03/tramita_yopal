'use client';

import { type TramiteEstado, ESTADOS, ESTADO_CONFIG } from '@/lib/domain/tramite';

export function BulkActionsBar({
  count, bulkEstado, bulkNota, isPending,
  onSelectEstado, onNotaChange, onConfirm, onReset, onClear,
}: {
  count: number;
  bulkEstado: TramiteEstado | null;
  bulkNota: string;
  isPending: boolean;
  onSelectEstado: (e: TramiteEstado) => void;
  onNotaChange: (nota: string) => void;
  onConfirm: () => void;
  onReset: () => void;
  onClear: () => void;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white rounded-2xl shadow-2xl px-5 py-4 w-[min(520px,90vw)]">
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-2.5">
          <p className="text-xs font-bold text-white/60 uppercase tracking-wider">
            {count} trámite{count !== 1 ? 's' : ''} seleccionado{count !== 1 ? 's' : ''}
          </p>

          {bulkEstado ? (
            <>
              <p className="text-xs text-white/70">
                Cambiar todos a{' '}
                <strong className="text-white">{ESTADO_CONFIG[bulkEstado].label}</strong>
              </p>
              <textarea
                value={bulkNota}
                onChange={e => onNotaChange(e.target.value)}
                rows={2}
                placeholder="Nota para los clientes (opcional)"
                className="w-full text-xs bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/30 resize-none focus:outline-none focus:ring-1 focus:ring-white/40"
              />
              <div className="flex gap-2">
                <button
                  onClick={onConfirm}
                  disabled={isPending}
                  className="text-xs font-bold px-4 py-1.5 bg-brand-500 hover:bg-brand-400 text-white rounded-lg disabled:opacity-50 transition-colors"
                >
                  {isPending ? 'Aplicando...' : `Confirmar (${count})`}
                </button>
                <button
                  onClick={onReset}
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
                  onClick={() => onSelectEstado(s)}
                  className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                >
                  → {ESTADO_CONFIG[s].label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClear}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white text-xl leading-none transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}
