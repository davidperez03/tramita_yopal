import { supabaseAdmin } from '@/lib/supabase';
import { getSessionInfo } from '@/lib/auth';
import type { Tramite, HistorialEntry } from '@/lib/domain/tramite';
import Panel from './Panel';
import TramitadorPanel, { type TramiteAsignado } from './TramitadorPanel';
import { login } from './actions';

function LoginPage({ errorType }: { errorType?: string }) {
  const msg = errorType === 'rate'
    ? 'Demasiados intentos. Espera 15 minutos.'
    : errorType === '1'
    ? 'Credenciales incorrectas.'
    : undefined;

  return (
    <main className="min-h-screen bg-brand-950 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="mb-7 text-center">
          <p className="text-[10px] font-black tracking-widest text-brand-600 uppercase mb-1">Tramita Yopal</p>
          <h1 className="text-xl font-extrabold text-slate-900">Acceso al panel</h1>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Correo</label>
            <input
              name="email"
              type="email"
              required
              autoFocus
              autoComplete="email"
              placeholder="admin@tramitayopal.com"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {msg && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              {msg}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-brand-950 hover:bg-brand-800 text-white font-bold py-3 rounded-xl text-sm transition-colors mt-1"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getSessionInfo();

  if (!session) {
    const params = await searchParams;
    return <LoginPage errorType={params?.error} />;
  }

  const LIMIT = 100;

  // ── Vista tramitador: solo sus trámites asignados, sin finanzas ──
  if (session.role === 'tramitador') {
    const { data: asignados } = await supabaseAdmin
      .from('tramites')
      .select('id, created_at, placa, tipos, estado, cliente:clientes(nombre, telefono, ciudad)')
      .eq('asignado_a', session.userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(LIMIT);

    const tramitesAsignados = (asignados ?? []) as unknown as TramiteAsignado[];
    const ids = tramitesAsignados.map(t => t.id);
    const { data: hist } = ids.length > 0
      ? await supabaseAdmin
          .from('tramite_historial')
          .select('tramite_id, ts, estado, nota')
          .in('tramite_id', ids)
          .order('ts', { ascending: true })
      : { data: [] as HistorialEntry[] };

    return (
      <TramitadorPanel
        tramites={tramitesAsignados}
        historial={hist ?? []}
        email={session.email}
      />
    );
  }

  const TRAMITE_COLS =
    'id, created_at, updated_at, cliente_id, cliente:clientes(nombre, telefono, ciudad), asignado_a, placa, tipos, estado, valor_honorarios, valor_derechos, valor_avaluo, costo_tramitador, costo_envio, costo_imprevistos, pago_inicial, pago_inicial_fecha, pago_inicial_metodo, pago_inicial_monto, pago_final, pago_final_fecha, pago_final_metodo, pago_final_monto, cancelacion_motivo, pago_devuelto, codigo_seguimiento';

  const [reviewsRes, tramitesRes, clientesRes] = await Promise.all([
    supabaseAdmin
      .from('reviews')
      .select('id, name, email, rating, text, type, year, source, visible, created_at, photos', { count: 'exact' })
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(LIMIT),
    supabaseAdmin
      .from('tramites')
      .select(TRAMITE_COLS, { count: 'exact' })
      .is('deleted_at', null)
      .order('updated_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .limit(LIMIT),
    supabaseAdmin
      .from('clientes_resumen')
      .select('id, created_at, nombre, telefono, cedula, ciudad, email, notas, tramites_total, tramites_activos, ultimo_tramite', { count: 'exact' })
      .order('ultimo_tramite', { ascending: false, nullsFirst: false })
      .limit(LIMIT),
  ]);

  const tramitesData = (tramitesRes.data ?? []) as unknown as Tramite[];

  // Usuarios con acceso (para asignar tramitadores): todo el que no sea admin
  const { data: usersData } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
  const tramitadores = (usersData?.users ?? [])
    .filter(u => u.app_metadata?.role !== 'admin')
    .map(u => ({ id: u.id, email: u.email ?? u.id.slice(0, 8) }));

  const tramiteIds = tramitesData.map(t => t.id);
  const historialRes = tramiteIds.length > 0
    ? await supabaseAdmin
        .from('tramite_historial')
        .select('tramite_id, ts, estado, nota')
        .in('tramite_id', tramiteIds)
        .order('ts', { ascending: true })
    : { data: [] };

  return (
    <Panel
      reviews={reviewsRes.data ?? []}
      reviewsTotal={reviewsRes.count ?? 0}
      tramites={tramitesData}
      tramitesTotal={tramitesRes.count ?? 0}
      tramitadores={tramitadores}
      clientes={clientesRes.data ?? []}
      clientesTotal={clientesRes.count ?? 0}
      historial={historialRes.data ?? []}
      limit={LIMIT}
    />
  );
}
