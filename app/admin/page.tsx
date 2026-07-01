import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import Panel from './Panel';
import { login } from './actions';

async function isAuthed() {
  const jar   = await cookies();
  const value = jar.get('admin_session')?.value;
  return value === `ty_admin_${process.env.ADMIN_PASSWORD}`;
}

function LoginPage({ error }: { error?: string }) {
  return (
    <main className="min-h-screen bg-brand-950 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold tracking-widest text-brand-600 uppercase mb-1">Tramita Yopal</p>
          <h1 className="text-2xl font-extrabold text-slate-900">Panel de admin</h1>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              autoFocus
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-brand-950 hover:bg-brand-800 text-white font-bold py-3 rounded-xl text-sm transition-colors"
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
  const authed = await isAuthed();

  if (!authed) {
    const params = await searchParams;
    return <LoginPage error={params?.error ? 'Contraseña incorrecta.' : undefined} />;
  }

  const [{ data: reviews }, { data: tramites }, { data: comparendos }] = await Promise.all([
    supabaseAdmin
      .from('reviews')
      .select('id, name, email, rating, text, type, year, source, visible, created_at, photos')
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('tramites')
      .select('id, created_at, updated_at, cliente_nombre, cliente_telefono, cliente_ciudad, placa, tipo, descripcion, estado, valor_honorarios, valor_derechos, valor_avaluo, pago_inicial, pago_inicial_fecha, pago_final, pago_final_fecha, notas')
      .order('updated_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('comparendo_solicitudes')
      .select('id, created_at, nombre, cedula, telefono, tipo, fecha_comparendo, numero_comparendo, descuento_estimado, fecha_curso, estado')
      .order('created_at', { ascending: false }),
  ]);

  return <Panel reviews={reviews ?? []} tramites={tramites ?? []} comparendos={comparendos ?? []} />;
}
