import { NextResponse } from 'next/server';
import { procesarPendientes } from '@/lib/notificaciones';

export const dynamic = 'force-dynamic';

// Reintenta notificaciones pendientes/fallidas. Lo invoca el cron de Vercel
// (ver vercel.json) con Authorization: Bearer CRON_SECRET.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth   = req.headers.get('authorization');

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const resultado = await procesarPendientes(50);
  return NextResponse.json(resultado);
}
