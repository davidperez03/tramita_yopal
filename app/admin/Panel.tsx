'use client';

import { useState } from 'react';
import { SERVICE_NAMES } from '@/lib/constants';
import { fmtDatetime } from '@/lib/format';
import {
  approveReview, hideReview, deleteReview, addReview,
  logout, updateComparendoEstado, deleteComparendo,
} from './actions';
import TramitesPanel, { type Tramite, type HistorialEntry } from './TramitesPanel';
import ClientesPanel from './ClientesPanel';
import type { ClienteResumen } from '@/lib/domain/cliente';
import { cx, Badge, Stat, FilterBar, Empty, Btn, useAction, Err, field } from './ui';

// ── Types ─────────────────────────────────────────────────────────────────────

type EstadoComp = 'pendiente' | 'en_gestion' | 'atendido';

type Comparendo = {
  id: string; created_at: string;
  nombre: string; cedula: string | null; telefono: string;
  tipo: 'fisico' | 'fotomulta';
  fecha_comparendo: string; numero_comparendo: string | null;
  descuento_estimado: string | null; fecha_curso: string | null;
  estado: EstadoComp;
};

type Review = {
  id: string; name: string; email: string | null;
  rating: number; text: string; type: string; year: string;
  source: string; visible: boolean; created_at: string;
  photos: string[] | null;
};

type TabKey = 'tramites' | 'clientes' | 'comparendos' | 'resenas';

// ── Icons ─────────────────────────────────────────────────────────────────────

function IcoFile() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>;
}
function IcoWarn() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;
}
function IcoStar() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>;
}
function IcoUsers() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
}
const NAV: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'tramites',    label: 'Trámites',    icon: <IcoFile /> },
  { key: 'clientes',    label: 'Clientes',    icon: <IcoUsers /> },
  { key: 'comparendos', label: 'Comparendos', icon: <IcoWarn /> },
  { key: 'resenas',     label: 'Reseñas',     icon: <IcoStar /> },
];

// ── Reviews ───────────────────────────────────────────────────────────────────

function Stars({ n }: { n: number }) {
  return (
    <span className="text-amber-400 tracking-tight">
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

function ReviewCard({ r }: { r: Review }) {
  const { isPending, error, run } = useAction();
  return (
    <div className={cx(
      'bg-white border rounded-xl p-4 space-y-3 transition-opacity',
      isPending && 'opacity-50',
      r.visible ? 'border-slate-200' : 'border-amber-200 bg-amber-50/30',
    )}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500 flex-shrink-0 uppercase select-none">
          {r.name.slice(0, 1)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-slate-900">{r.name}</span>
            <Badge v={r.visible ? 'ok' : 'warn'}>{r.visible ? 'Publicada' : 'Pendiente'}</Badge>
            <Badge v="ghost">{r.source}</Badge>
          </div>
          {r.email && <p className="text-[11px] text-slate-400 mt-0.5">{r.email}</p>}
        </div>
        <div className="text-right flex-shrink-0">
          <Stars n={r.rating} />
          <p className="text-[11px] text-slate-400 mt-0.5">{r.year}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed pl-11">{r.text}</p>

      {r.photos && r.photos.length > 0 && (
        <div className="flex gap-2 flex-wrap pl-11">
          {r.photos.map((url, i) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-16 h-16 object-cover rounded-lg border border-slate-200 hover:opacity-80 transition-opacity" />
            </a>
          ))}
        </div>
      )}

      <Err msg={error} />

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{r.type}</span>
        <div className="flex gap-2">
          {!r.visible
            ? <Btn v="ok"     disabled={isPending} onClick={() => run(() => approveReview(r.id))}>Aprobar</Btn>
            : <Btn v="warn"   disabled={isPending} onClick={() => run(() => hideReview(r.id))}>Ocultar</Btn>
          }
          <Btn v="danger" disabled={isPending} onClick={() => { if (confirm('¿Eliminar esta reseña?')) run(() => deleteReview(r.id)); }}>
            Eliminar
          </Btn>
        </div>
      </div>
    </div>
  );
}

function AddReviewForm() {
  const [open, setOpen]      = useState(false);
  const { isPending, run }   = useAction();
  const [error, setError]    = useState<string | null>(null);
  const [rating, setRating]  = useState(5);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd   = new FormData(e.currentTarget);
    const form = e.currentTarget;
    fd.set('rating', String(rating));
    run(async () => {
      const res = await addReview(fd);
      if (res?.error) { setError(res.error); return; }
      form.reset(); setRating(5); setOpen(false); setError(null);
    });
  }

  if (!open) {
    return <Btn v="ghost" onClick={() => setOpen(true)}>+ Agregar reseña manual</Btn>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-900">Agregar reseña</p>
        <button type="button" onClick={() => setOpen(false)}
          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-700 text-lg leading-none rounded hover:bg-slate-200 transition-colors">
          ×
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Nombre *</label>
          <input name="name" required placeholder="Carlos Mantilla" className={field} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Correo</label>
          <input name="email" type="email" placeholder="correo@ejemplo.com" className={field} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Trámite *</label>
          <select name="type" required className={field}>
            <option value="">Selecciona...</option>
            {SERVICE_NAMES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Año *</label>
          <input name="year" required defaultValue={new Date().getFullYear().toString()} className={field} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Fuente</label>
          <select name="source" className={field}>
            <option>Google</option>
            <option>WhatsApp</option>
            <option>Directo</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Calificación *</label>
          <div className="flex gap-1 pt-1">
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} type="button" onClick={() => setRating(n)} className="text-2xl leading-none">
                <span className={rating >= n ? 'text-amber-400' : 'text-slate-200'}>★</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Texto *</label>
        <textarea name="text" required rows={3} placeholder="Excelente servicio..." className={`${field} resize-none`} />
      </div>

      <Err msg={error} />

      <div className="flex gap-3">
        <Btn v="primary" submit disabled={isPending}>{isPending ? 'Guardando...' : 'Guardar y publicar'}</Btn>
        <Btn v="ghost" onClick={() => setOpen(false)}>Cancelar</Btn>
      </div>
    </form>
  );
}

// ── Comparendos ───────────────────────────────────────────────────────────────

const ESTADO_COMP_CFG: Record<EstadoComp, { label: string; v: Parameters<typeof Badge>[0]['v'] }> = {
  pendiente:  { label: 'Pendiente',  v: 'warn' },
  en_gestion: { label: 'En gestión', v: 'info' },
  atendido:   { label: 'Atendido',   v: 'ok'   },
};

const DESC_V: Record<string, Parameters<typeof Badge>[0]['v']> = {
  '50%': 'ok', '25%': 'warn', 'ninguno': 'err',
};

function ComparendoCard({ c, hasTramite }: { c: Comparendo; hasTramite: boolean }) {
  const { isPending, error, run } = useAction();
  const cfg   = ESTADO_COMP_CFG[c.estado] ?? ESTADO_COMP_CFG.pendiente;
  const fecha = new Date(c.fecha_comparendo + 'T12:00:00').toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  return (
    <div className={cx(
      'bg-white border rounded-xl p-4 space-y-3 transition-opacity',
      isPending && 'opacity-50',
      c.estado === 'atendido' ? 'border-slate-100' : 'border-slate-200',
    )}>
      <div className="flex items-start gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge v={cfg.v}>{cfg.label}</Badge>
            <Badge v="ghost">{c.tipo === 'fisico' ? 'Físico' : 'Fotomulta'}</Badge>
            {c.descuento_estimado && (
              <Badge v={DESC_V[c.descuento_estimado] ?? 'ghost'}>
                {c.descuento_estimado === 'ninguno' ? 'Sin descuento' : c.descuento_estimado}
              </Badge>
            )}
            {hasTramite && <Badge v="brand">Tiene trámite</Badge>}
          </div>
          <p className="text-sm font-bold text-slate-900 uppercase">{c.nombre}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            {c.telefono}{c.cedula && ` · CC ${c.cedula}`}
          </p>
        </div>
        <div className="text-right text-xs text-slate-500 flex-shrink-0">
          <p className="font-semibold">Comp. {fecha}</p>
          {c.numero_comparendo && <p className="font-mono text-slate-400 mt-0.5">#{c.numero_comparendo}</p>}
          {c.fecha_curso && <p className="text-slate-400 mt-0.5">Curso: {fmtDatetime(c.fecha_curso)}</p>}
        </div>
      </div>

      <Err msg={error} />

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex gap-2 flex-wrap">
          {c.estado === 'pendiente'  && <Btn v="ghost" disabled={isPending} onClick={() => run(() => updateComparendoEstado(c.id, 'en_gestion'))}>En gestión →</Btn>}
          {c.estado === 'en_gestion' && <Btn v="ok"    disabled={isPending} onClick={() => run(() => updateComparendoEstado(c.id, 'atendido'))}>Marcar atendido</Btn>}
          {c.estado === 'atendido'   && <Btn v="ghost" disabled={isPending} onClick={() => run(() => updateComparendoEstado(c.id, 'pendiente'))}>Reabrir</Btn>}
        </div>
        <Btn v="danger" disabled={isPending}
          onClick={() => { if (confirm('¿Eliminar esta solicitud?')) run(() => deleteComparendo(c.id)); }}>
          Eliminar
        </Btn>
      </div>
    </div>
  );
}

// ── Sidebar nav item ──────────────────────────────────────────────────────────

function NavItem({
  item, active, badge, onClick,
}: {
  item: (typeof NAV)[number]; active: boolean; badge: number; onClick: () => void;
}) {
  return (
    <button onClick={onClick}
      className={cx(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left',
        active ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
      )}>
      <span className={cx('flex-shrink-0 transition-colors', active ? 'text-brand-600' : 'text-slate-400')}>
        {item.icon}
      </span>
      <span className="flex-1">{item.label}</span>
      {badge > 0 && (
        <span className="bg-amber-400 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
          {badge}
        </span>
      )}
    </button>
  );
}

// ── Panel ─────────────────────────────────────────────────────────────────────

export default function Panel({
  reviews, reviewsTotal,
  tramites, tramitesTotal,
  clientes, clientesTotal,
  comparendos, comparendosTotal,
  historial,
  limit,
}: {
  reviews: Review[]; reviewsTotal: number;
  tramites: Tramite[]; tramitesTotal: number;
  clientes: ClienteResumen[]; clientesTotal: number;
  comparendos: Comparendo[]; comparendosTotal: number;
  historial: HistorialEntry[];
  limit: number;
}) {
  const [tab, setTab]             = useState<TabKey>('tramites');
  const [filterRev, setFilterRev] = useState<'pendientes' | 'publicadas' | 'todas'>('pendientes');
  const [filterComp, setFilterComp] = useState<EstadoComp | 'todas'>('pendiente');

  const pending   = reviews.filter(r => !r.visible);
  const published = reviews.filter(r =>  r.visible);
  const pendComp  = comparendos.filter(c => c.estado === 'pendiente');
  const enGestion = comparendos.filter(c => c.estado === 'en_gestion');
  const atendidos = comparendos.filter(c => c.estado === 'atendido');

  const shownRev  = filterRev === 'todas' ? reviews : filterRev === 'pendientes' ? pending : published;
  const shownComp = filterComp === 'todas' ? comparendos : comparendos.filter(c => c.estado === filterComp);

  // Cross-reference maps — phone matching between tramites and comparendos
  const tramitesByPhone    = new Map<string, true>();
  const comparendosByPhone = new Map<string, true>();
  for (const t of tramites)   if (t.cliente?.telefono) tramitesByPhone.set(t.cliente.telefono, true);
  for (const c of comparendos) if (c.telefono)        comparendosByPhone.set(c.telefono, true);

  const BADGES: Record<TabKey, number> = {
    tramites:    0,
    clientes:    0,
    comparendos: pendComp.length,
    resenas:     pending.length,
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* ── Sidebar lg+ ────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-slate-100 fixed inset-y-0 left-0 z-20">
        <div className="px-5 pt-6 pb-5 border-b border-slate-100">
          <p className="text-[10px] font-black tracking-widest text-brand-600 uppercase">Tramita Yopal</p>
          <p className="text-xs text-slate-400 mt-0.5">Panel admin</p>
        </div>
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {NAV.map(item => (
            <NavItem key={item.key} item={item} active={tab === item.key} badge={BADGES[item.key]} onClick={() => setTab(item.key)} />
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-slate-100">
          <form action={logout}>
            <button type="submit"
              className="w-full text-left text-xs text-slate-400 hover:text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* ── Mobile header ───────────────────────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-20 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-xs font-black text-brand-600 uppercase tracking-widest">Tramita Yopal</p>
          <form action={logout}>
            <button type="submit" className="text-xs text-slate-400 hover:text-slate-700 font-semibold transition-colors">
              Salir
            </button>
          </form>
        </div>
        {/* Scrollable tab bar */}
        <div className="flex overflow-x-auto px-3 pb-3 gap-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {NAV.map(item => {
            const active = tab === item.key;
            const badge  = BADGES[item.key];
            return (
              <button key={item.key} onClick={() => setTab(item.key)}
                className={cx(
                  'flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap',
                  active ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
                )}>
                {item.label}
                {badge > 0 && (
                  <span className="bg-amber-400 text-white text-[10px] font-black px-1 rounded-full leading-none">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-60 min-h-screen">
        <div className="pt-[104px] lg:pt-0 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 w-full space-y-6">

          {/* Trámites */}
          {tab === 'tramites' && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-base font-bold text-slate-900">Trámites</h1>
                  <p className="text-xs text-slate-400 mt-0.5">{tramitesTotal} registros en total</p>
                </div>
                <a href="/api/admin/export" download
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 px-3 py-1.5 rounded-lg transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  CSV
                </a>
              </div>
              <TramitesPanel tramites={tramites} total={tramitesTotal} limit={limit} comparendosByPhone={comparendosByPhone} historial={historial} />
            </>
          )}

          {/* Clientes */}
          {tab === 'clientes' && (
            <>
              <div>
                <h1 className="text-base font-bold text-slate-900">Clientes</h1>
                <p className="text-xs text-slate-400 mt-0.5">{clientesTotal} clientes en total</p>
              </div>
              <ClientesPanel clientes={clientes} total={clientesTotal} limit={limit} tramites={tramites} />
            </>
          )}

          {/* Comparendos */}
          {tab === 'comparendos' && (
            <>
              <div>
                <h1 className="text-base font-bold text-slate-900">Comparendos</h1>
                <p className="text-xs text-slate-400 mt-0.5">{comparendosTotal} solicitudes en total</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Stat label="Total"      value={comparendos.length} />
                <Stat label="Pendientes" value={pendComp.length}   accent="text-amber-600" />
                <Stat label="En gestión" value={enGestion.length}  accent="text-blue-600" />
                <Stat label="Atendidos"  value={atendidos.length}  accent="text-emerald-700" />
              </div>
              <FilterBar
                options={[
                  { key: 'pendiente',  label: 'Pendientes',  count: pendComp.length },
                  { key: 'en_gestion', label: 'En gestión',  count: enGestion.length },
                  { key: 'atendido',   label: 'Atendidos' },
                  { key: 'todas',      label: 'Todas' },
                ]}
                active={filterComp}
                onChange={setFilterComp}
              />
              {comparendosTotal > limit && (
                <p className="text-xs text-slate-400">Mostrando {limit} de {comparendosTotal} comparendos.</p>
              )}
              {shownComp.length === 0
                ? <Empty msg="Sin solicitudes en esta categoría." />
                : <div className="space-y-3">
                    {shownComp.map(c => (
                      <ComparendoCard key={c.id} c={c} hasTramite={tramitesByPhone.has(c.telefono)} />
                    ))}
                  </div>
              }
            </>
          )}

          {/* Reseñas */}
          {tab === 'resenas' && (
            <>
              <div>
                <h1 className="text-base font-bold text-slate-900">Reseñas</h1>
                <p className="text-xs text-slate-400 mt-0.5">{reviewsTotal} reseñas en total</p>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-3 gap-3">
                <Stat label="Total"      value={reviews.length} />
                <Stat label="Pendientes" value={pending.length}   accent="text-amber-600" />
                <Stat label="Publicadas" value={published.length} accent="text-emerald-700" />
              </div>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <FilterBar
                  options={[
                    { key: 'pendientes', label: 'Pendientes', count: pending.length   },
                    { key: 'publicadas', label: 'Publicadas', count: published.length },
                    { key: 'todas',      label: 'Todas' },
                  ]}
                  active={filterRev}
                  onChange={setFilterRev}
                />
                <AddReviewForm />
              </div>
              {reviewsTotal > limit && (
                <p className="text-xs text-slate-400">Mostrando {limit} de {reviewsTotal} reseñas.</p>
              )}
              {shownRev.length === 0
                ? <Empty msg="Sin reseñas en esta categoría." />
                : <div className="space-y-3">{shownRev.map(r => <ReviewCard key={r.id} r={r} />)}</div>
              }
            </>
          )}


        </div>
      </main>
    </div>
  );
}
