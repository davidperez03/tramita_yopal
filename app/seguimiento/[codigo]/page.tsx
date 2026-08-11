import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { ESTADO_CONFIG, type TramiteEstado } from '@/lib/domain/tramite';
import { fmtDate, fmtDatetime } from '@/lib/format';
import { ProgressFill } from './ProgressFill';

const FLOW: TramiteEstado[] = ['recibido', 'en_proceso', 'aprobado', 'entregado'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ codigo: string }>;
}): Promise<Metadata> {
  const { codigo } = await params;
  return {
    title: `Seguimiento ${codigo.toUpperCase()} | Tramita Yopal`,
    robots: { index: false },
  };
}

export default async function SeguimientoPage({
  params,
}: {
  params: Promise<{ codigo: string }>;
}) {
  const { codigo } = await params;
  const upper = codigo.toUpperCase();

  const { data: t } = await supabaseAdmin
    .from('tramites')
    .select('id, tipos, estado, created_at, placa, cliente:clientes(ciudad), pago_inicial, pago_inicial_fecha, pago_final, pago_final_fecha, cancelacion_motivo')
    .eq('codigo_seguimiento', upper)
    .is('deleted_at', null)
    .single();

  if (!t) notFound();

  const clienteCiudad = (t.cliente as unknown as { ciudad: string | null } | null)?.ciudad;

  const { data: historial } = await supabaseAdmin
    .from('tramite_historial')
    .select('ts, estado, nota')
    .eq('tramite_id', t.id)
    .order('ts', { ascending: true });

  const estado    = t.estado as TramiteEstado;
  const cancelado = estado === 'cancelado';
  const flowIndex = FLOW.indexOf(estado);
  const cfg       = ESTADO_CONFIG[estado];
  const eventos   = historial ?? [];

  // Progreso: porcentaje entre 0 y 100 a lo largo de los 4 pasos
  const progressPct = flowIndex <= 0 ? 0 : (flowIndex / (FLOW.length - 1)) * 100;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Barra de color del estado en la parte superior */}
      <div className={`h-1.5 w-full ${cancelado ? 'bg-red-400' : cfg.band}`} />

      <div className="flex flex-col items-center px-4 py-10">

        {/* Cabecera */}
        <div className="w-full max-w-lg mb-6">
          <Link
            href="/seguimiento"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 mb-6 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Consultar otro código
          </Link>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-black tracking-widest text-brand-600 uppercase mb-1">Tramita Yopal</p>
              <h1 className="text-xl font-extrabold text-slate-900 leading-tight">
                {t.tipos.join(' + ')}
              </h1>
              {clienteCiudad && (
                <p className="text-xs text-slate-400 mt-0.5">{clienteCiudad}</p>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              {t.placa && (
                <span className="font-mono font-black tracking-widest text-sm bg-slate-900 text-white px-3 py-1.5 rounded-lg">
                  {t.placa}
                </span>
              )}
              <span className="font-mono text-[11px] text-slate-400 tracking-widest">{upper}</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg space-y-4">

          {/* Estado actual */}
          <div className={`rounded-2xl border shadow-sm p-5 ${
            cancelado
              ? 'bg-red-50 border-red-100'
              : 'bg-white border-slate-200'
          }`}>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Estado actual</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`inline-flex text-sm font-extrabold px-3 py-1.5 rounded-full border ${cfg.badge}`}>
                {cfg.label}
              </span>
              {!cancelado && (
                <span className="text-xs text-slate-400">
                  Iniciado el {fmtDate(t.created_at)}
                </span>
              )}
            </div>

            {cancelado && t.cancelacion_motivo && (
              <div className="mt-3 border-l-2 border-red-300 pl-3">
                <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-0.5">Motivo de cancelación</p>
                <p className="text-sm text-red-700">{t.cancelacion_motivo}</p>
              </div>
            )}
          </div>

          {/* Pipeline visual — solo trámites activos */}
          {!cancelado && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-8">Progreso</p>

              {/* Línea base + progreso */}
              <div className="relative mx-4">
                {/* Fondo gris de la línea */}
                <div className="absolute top-[14px] left-0 right-0 h-0.5 bg-slate-100" />
                {/* Progreso en color — anima el llenado al cargar */}
                {flowIndex > 0 && (
                  <ProgressFill pct={progressPct} colorClass={cfg.band} />
                )}

                {/* Pasos */}
                <div className="relative flex justify-between">
                  {FLOW.map((e, i) => {
                    const done    = i < flowIndex;
                    const current = i === flowIndex;
                    const ecfg    = ESTADO_CONFIG[e];
                    const evento  = eventos.find(ev => ev.estado === e);
                    return (
                      <div key={e} className="flex flex-col items-center gap-2">
                        {/* Círculo */}
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 transition-all ${
                          done
                            ? 'bg-brand-600 border-brand-600'
                            : current
                              ? 'bg-white border-brand-600 ring-4 ring-brand-100'
                              : 'bg-white border-slate-200'
                        }`}>
                          {done ? (
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : current ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-600" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-slate-200" />
                          )}
                        </div>

                        {/* Etiqueta */}
                        <span className={`text-[9px] font-bold text-center leading-tight uppercase tracking-wide w-14 ${
                          i > flowIndex ? 'text-slate-300' : current ? 'text-brand-700' : 'text-slate-500'
                        }`}>
                          {ecfg.label}
                        </span>

                        {/* Fecha si completado */}
                        {evento && (done || current) && (
                          <span className="text-[9px] text-slate-400 text-center leading-tight w-14">
                            {fmtDate(evento.ts)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Línea de tiempo */}
          {eventos.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-5">Historial</p>
              <ol className="space-y-0">
                {eventos.map((ev, i) => {
                  const ecfg   = ESTADO_CONFIG[ev.estado as TramiteEstado];
                  const ultimo = i === eventos.length - 1;
                  const esCancelado = ev.estado === 'cancelado';
                  return (
                    <li key={i} className="relative flex gap-4">
                      {/* Línea + punto */}
                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 ${
                          ultimo
                            ? esCancelado
                              ? 'bg-red-50 border-red-300'
                              : 'bg-brand-50 border-brand-400'
                            : 'bg-white border-slate-200'
                        }`}>
                          {ultimo && !esCancelado && <div className="w-2 h-2 rounded-full bg-brand-500" />}
                          {ultimo && esCancelado  && <div className="w-2 h-2 rounded-full bg-red-400" />}
                          {!ultimo && <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
                        </div>
                        {!ultimo && <div className="w-px flex-1 bg-slate-100 my-1" />}
                      </div>

                      {/* Contenido */}
                      <div className={`flex-1 min-w-0 ${ultimo ? 'pb-0' : 'pb-5'}`}>
                        <span className={`inline-flex text-[11px] font-extrabold px-2 py-0.5 rounded-full border ${ecfg.badge}`}>
                          {ecfg.label}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-0.5">{fmtDatetime(ev.ts)}</p>
                        {ev.nota && (
                          <p className="text-xs text-slate-600 mt-1.5 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                            {ev.nota}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Pagos */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Estado de pagos</p>
            <div className="space-y-2">
              {[
                { label: 'Pago inicial', ok: t.pago_inicial, fecha: t.pago_inicial_fecha },
                { label: 'Pago final',   ok: t.pago_final,   fecha: t.pago_final_fecha   },
              ].map(({ label, ok, fecha }) => (
                <div key={label} className={`flex items-center justify-between rounded-xl px-4 py-2.5 border ${
                  ok ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      ok ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}>
                      {ok ? (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      )}
                    </div>
                    <span className={`text-xs font-bold ${ok ? 'text-emerald-800' : 'text-slate-400'}`}>
                      {label}
                    </span>
                  </div>
                  <span className={`text-xs ${ok ? 'text-emerald-600' : 'text-slate-300'}`}>
                    {ok && fecha ? fmtDate(fecha) : ok ? 'Recibido' : 'Pendiente'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 pb-4">
            ¿Tiene preguntas? Contáctenos directamente.
          </p>
        </div>
      </div>
    </main>
  );
}
