'use client';

import { useState, useTransition } from 'react';
import { cop, fmtDate } from '@/lib/format';
import type { ClienteResumen } from '@/lib/domain/cliente';
import { type Tramite, ESTADO_CONFIG, calcPagos } from '@/lib/domain/tramite';
import { updateCliente } from './clientes-actions';
import { cx, Badge, Stat, Empty, Err, field } from './ui';

function norm(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/* ─── Trámite del cliente (fila compacta, solo lectura) ─── */
function TramiteRow({ t }: { t: Tramite }) {
  const cfg = ESTADO_CONFIG[t.estado];
  const { total } = calcPagos(t);
  return (
    <div className="flex items-center gap-3 flex-wrap py-2 border-b border-slate-50 last:border-b-0">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${cfg.badge}`}>
        {cfg.label}
      </span>
      <span className="text-xs text-slate-600 flex-1 min-w-0 truncate">{t.tipos.join(' + ')}</span>
      {t.placa && (
        <span className="text-[10px] font-mono font-bold tracking-widest bg-slate-900 text-white px-1.5 py-0.5 rounded flex-shrink-0">
          {t.placa}
        </span>
      )}
      {total > 0 && <span className="text-xs font-semibold text-slate-500 flex-shrink-0">{cop(total)}</span>}
      <span className="text-[10px] text-slate-300 flex-shrink-0">{fmtDate(t.created_at)}</span>
    </div>
  );
}

/* ─── Formulario de edición ─── */
function EditClienteForm({ c, onDone }: { c: ClienteResumen; onDone: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError]            = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateCliente(c.id, fd);
      if (res?.error) { setError(res.error); return; }
      setError(null);
      onDone();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Nombre *</label>
          <input name="nombre" required defaultValue={c.nombre} className={`${field} uppercase`}
            onChange={e => { e.target.value = e.target.value.toUpperCase(); }} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Teléfono</label>
          <input name="telefono" defaultValue={c.telefono ?? ''} placeholder="+57 300..." className={field} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Cédula</label>
          <input name="cedula" defaultValue={c.cedula ?? ''} inputMode="numeric" className={field} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Ciudad</label>
          <input name="ciudad" defaultValue={c.ciudad ?? ''} className={`${field} uppercase`}
            onChange={e => { e.target.value = e.target.value.toUpperCase(); }} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Correo</label>
          <input name="email" type="email" defaultValue={c.email ?? ''} className={field} />
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Notas internas</label>
        <textarea name="notas" rows={2} defaultValue={c.notas ?? ''}
          placeholder="Ej: Prefiere que lo llamen en la tarde..."
          className={`${field} resize-none`} />
      </div>
      <Err msg={error} />
      <div className="flex gap-2">
        <button type="submit" disabled={isPending}
          className="text-xs font-bold px-4 py-2 bg-brand-950 text-white rounded-xl hover:bg-brand-800 disabled:opacity-50 transition-colors">
          {isPending ? 'Guardando...' : 'Guardar cliente'}
        </button>
        <button type="button" onClick={onDone}
          className="text-xs font-medium px-3 py-2 text-slate-500 hover:text-slate-700">
          Cancelar
        </button>
      </div>
    </form>
  );
}

/* ─── Tarjeta de cliente ─── */
function ClienteCard({ c, tramites }: {
  c: ClienteResumen; tramites: Tramite[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing]   = useState(false);

  const suyos = tramites.filter(t => t.cliente_id === c.id);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <button type="button" onClick={() => setExpanded(v => !v)}
        className="w-full text-left px-5 py-3.5 hover:bg-slate-50/60 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-xs font-black text-brand-600 flex-shrink-0 uppercase select-none">
            {c.nombre.slice(0, 1)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-extrabold text-slate-900 uppercase leading-none">{c.nombre}</p>
              {c.tramites_activos > 0 && <Badge v="info">{c.tramites_activos} activo{c.tramites_activos !== 1 ? 's' : ''}</Badge>}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              {[c.telefono, c.cedula && `CC ${c.cedula}`, c.ciudad].filter(Boolean).join(' · ') || 'Sin datos de contacto'}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-black text-slate-700 tabular-nums leading-none">{c.tramites_total}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">
              trámite{c.tramites_total !== 1 ? 's' : ''}
            </p>
          </div>
          <svg className={cx('w-4 h-4 text-slate-300 transition-transform', expanded && 'rotate-180')}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 divide-y divide-slate-100">

          {/* Contacto + acciones */}
          <div className="px-5 py-4">
            {editing ? (
              <EditClienteForm c={c} onDone={() => setEditing(false)} />
            ) : (
              <div className="flex items-center gap-4 flex-wrap">
                {c.telefono && (
                  <a href={`https://wa.me/${c.telefono.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-600 hover:underline">
                    WhatsApp
                  </a>
                )}
                {c.telefono && (
                  <a href={`tel:${c.telefono}`} className="text-xs font-medium text-brand-600 hover:underline">
                    {c.telefono}
                  </a>
                )}
                {c.email && <span className="text-xs text-slate-500">{c.email}</span>}
                {c.ultimo_tramite && (
                  <span className="text-[11px] text-slate-400">Último trámite: {fmtDate(c.ultimo_tramite)}</span>
                )}
                <button type="button" onClick={() => setEditing(true)}
                  className="ml-auto text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors">
                  Editar datos
                </button>
              </div>
            )}
            {!editing && c.notas && (
              <p className="text-xs text-slate-600 mt-3 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                {c.notas}
              </p>
            )}
          </div>

          {/* Sus trámites (de los cargados en el panel) */}
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Trámites</p>
            {suyos.length === 0 ? (
              <p className="text-xs text-slate-300">
                {c.tramites_total > 0
                  ? 'Sus trámites no están entre los más recientes cargados — usa el buscador de la pestaña Trámites.'
                  : 'Sin trámites registrados.'}
              </p>
            ) : (
              <div>
                {suyos.map(t => <TramiteRow key={t.id} t={t} />)}
                {suyos.length < c.tramites_total && (
                  <p className="text-[11px] text-slate-300 mt-2">
                    Mostrando {suyos.length} de {c.tramites_total} — los demás están fuera de los recientes cargados.
                  </p>
                )}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

/* ─── Panel principal ─── */
export default function ClientesPanel({ clientes, total, limit, tramites }: {
  clientes: ClienteResumen[];
  total: number;
  limit: number;
  tramites: Tramite[];
}) {
  const [busqueda, setBusqueda] = useState('');

  const q      = norm(busqueda.trim());
  const digits = q.replace(/\D/g, '');

  const filtered = q
    ? clientes.filter(c =>
        norm(c.nombre).includes(q) ||
        (digits && c.telefono?.replace(/\D/g, '').includes(digits)) ||
        (digits && c.cedula?.includes(digits)) ||
        (c.ciudad && norm(c.ciudad).includes(q)),
      )
    : clientes;

  const conActivos = clientes.filter(c => c.tramites_activos > 0).length;
  const esteMes    = clientes.filter(c => c.created_at.slice(0, 7) === new Date().toISOString().slice(0, 7)).length;

  return (
    <div className="space-y-5">

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Clientes"        value={total} />
        <Stat label="Con trámite activo" value={conActivos} accent="text-blue-600" />
        <Stat label="Nuevos este mes" value={esteMes} accent="text-emerald-700" />
      </div>

      {/* Buscador */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
        </svg>
        <input type="search" value={busqueda} onChange={e => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre, teléfono, cédula o ciudad..."
          className="w-full pl-9 pr-9 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white placeholder:text-slate-300" />
        {busqueda && (
          <button onClick={() => setBusqueda('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-lg leading-none">
            ×
          </button>
        )}
      </div>

      {total > limit && !busqueda && (
        <p className="text-xs text-slate-400">Mostrando {limit} de {total} clientes.</p>
      )}
      {busqueda && (
        <p className="text-xs text-slate-400">
          {filtered.length === 0 ? `Sin resultados para "${busqueda}"` : `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''} para "${busqueda}"`}
        </p>
      )}

      {clientes.length === 0 ? (
        <Empty msg="Aún no hay clientes. Se crean automáticamente al registrar trámites." />
      ) : filtered.length === 0 ? (
        <Empty msg={`Sin coincidencias para "${busqueda}"`} />
      ) : (
        <div className="space-y-2">
          {filtered.map(c => <ClienteCard key={c.id} c={c} tramites={tramites} />)}
        </div>
      )}
    </div>
  );
}
