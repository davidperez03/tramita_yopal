import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isAuthed } from '@/lib/auth';
import { calcPagos, type Tramite } from '@/lib/domain/tramite';

function csvRow(fields: (string | number | boolean | null | undefined)[]) {
  return fields
    .map(f => {
      const v = f == null ? '' : String(f);
      return v.includes(',') || v.includes('"') || v.includes('\n')
        ? `"${v.replace(/"/g, '""')}"`
        : v;
    })
    .join(',');
}

export async function GET() {
  const authed = await isAuthed();
  if (!authed) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('tramites')
    .select(
      'id, created_at, updated_at, cliente_nombre, cliente_telefono, cliente_ciudad, placa, tipo, estado, valor_honorarios, valor_derechos, valor_avaluo, pago_inicial, pago_inicial_fecha, pago_inicial_metodo, pago_final, pago_final_fecha, pago_final_metodo, cancelacion_motivo, pago_devuelto, codigo_seguimiento',
    )
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Error al exportar.' }, { status: 500 });

  const header = csvRow([
    'id', 'fecha_creacion', 'fecha_actualizacion', 'cliente', 'telefono', 'ciudad',
    'placa', 'tipo', 'estado',
    'honorarios', 'derechos', 'avaluo', 'total',
    'pago_inicial', 'pago_inicial_fecha', 'pago_inicial_metodo',
    'pago_final', 'pago_final_fecha', 'pago_final_metodo',
    'cancelacion_motivo', 'pago_devuelto', 'codigo_seguimiento',
  ]);

  const rows = (data as Tramite[]).map(t => {
    const { total } = calcPagos(t);
    return csvRow([
      t.id, t.created_at, t.updated_at,
      t.cliente_nombre, t.cliente_telefono, t.cliente_ciudad,
      t.placa, t.tipo, t.estado,
      t.valor_honorarios, t.valor_derechos, t.valor_avaluo, total,
      t.pago_inicial, t.pago_inicial_fecha, t.pago_inicial_metodo,
      t.pago_final, t.pago_final_fecha, t.pago_final_metodo,
      t.cancelacion_motivo, t.pago_devuelto, t.codigo_seguimiento,
    ]);
  });

  const csv = [header, ...rows].join('\n');
  const filename = `tramites_${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
