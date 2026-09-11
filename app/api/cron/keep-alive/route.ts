import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Hace una consulta trivial a Supabase para que el proyecto nunca quede
// inactivo (el plan gratuito pausa proyectos tras ~7 días sin actividad,
// y los elimina si siguen pausados demasiado tiempo). Lo invoca el cron
// de Vercel (ver vercel.json) con Authorization: Bearer CRON_SECRET.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth   = req.headers.get('authorization');

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { error } = await supabaseAdmin.from('reviews').select('id').limit(1);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, checked_at: new Date().toISOString() });
}
