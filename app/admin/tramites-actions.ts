'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { requireAdmin, requireUser } from '@/lib/auth';
import { randomBytes } from 'crypto';
import { notificarCambioEstado } from '@/lib/notificaciones';
import { findOrCreateCliente } from '@/lib/clientes';
import { calcPagos } from '@/lib/domain/tramite';
import type { TramiteEstado } from '@/lib/domain/tramite';

function generateCodigo(): string {
  return randomBytes(4).toString('hex').toUpperCase();
}

export type { TramiteEstado };

const MAX_VALOR = 100_000_000;

function parseValor(raw: FormDataEntryValue | null): number {
  const n = parseInt((raw as string)?.replace(/\D/g, '') || '0', 10);
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), MAX_VALOR) : 0;
}

export async function createTramite(formData: FormData) {
  await requireAdmin();

  const cliente_nombre          = (formData.get('cliente_nombre')   as string)?.trim();
  const cliente_telefono        = (formData.get('cliente_telefono') as string)?.trim();
  const cliente_ciudad          = (formData.get('cliente_ciudad')   as string)?.trim();
  const cliente_cedula          = (formData.get('cliente_cedula')   as string)?.trim().replace(/\D/g, '').slice(0, 20);
  const placa                   = (formData.get('placa')            as string)?.trim().toUpperCase();
  const tipos                   = (formData.getAll('tipos') as string[]).map(s => s.trim()).filter(Boolean);
  const valor_honorarios        = parseValor(formData.get('valor_honorarios'));
  const valor_derechos          = parseValor(formData.get('valor_derechos'));
  const avaluo_comercial        = parseValor(formData.get('avaluo_comercial'));
  const valor_avaluo            = Math.round(avaluo_comercial * 0.01);

  if (!cliente_nombre || !tipos.length) {
    return { error: 'Nombre del cliente y al menos un tipo de trámite son obligatorios.' };
  }

  const placaValida = /^[A-Z0-9]{1,7}$/.test(placa);
  if (placa && !placaValida) {
    return { error: 'Formato de placa inválido.' };
  }

  const cliente_id = await findOrCreateCliente({
    nombre:   cliente_nombre,
    telefono: cliente_telefono || null,
    ciudad:   cliente_ciudad   || null,
    cedula:   cliente_cedula   || null,
  });

  if (!cliente_id) return { error: 'Error al registrar el cliente.' };

  const { error } = await supabaseAdmin.from('tramites').insert({
    cliente_id,
    placa:              placa || null,
    tipos,
    estado:             'recibido',
    valor_honorarios,
    valor_derechos,
    valor_avaluo,
    codigo_seguimiento: generateCodigo(),
  });

  if (error) return { error: 'Error al crear el trámite.' };
  revalidatePath('/admin');
  return { success: true };
}

// Admin puede cambiar el estado de cualquier trámite; el tramitador solo el
// de los que tiene asignados, y nunca cancelarlos.
export async function updateEstado(id: string, estado: TramiteEstado, nota?: string) {
  const { userId, role } = await requireUser();

  if (role !== 'admin') {
    if (estado === 'cancelado') return { error: 'Solo un administrador puede cancelar trámites.' };
    const { data } = await supabaseAdmin
      .from('tramites')
      .select('asignado_a')
      .eq('id', id)
      .single();
    if (!data || data.asignado_a !== userId) {
      return { error: 'No tienes asignado este trámite.' };
    }
  }

  const { error } = await supabaseAdmin
    .from('tramites')
    .update({ estado, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { error: 'Error al actualizar estado.' };

  await supabaseAdmin.from('tramite_historial').insert({
    tramite_id: id,
    estado,
    nota: nota?.trim() || null,
  });

  await notificarCambioEstado(id, estado, nota);

  revalidatePath('/admin');
  revalidatePath('/seguimiento', 'layout');
  return { success: true };
}

export async function cancelTramite(id: string, motivo: string) {
  await requireAdmin();
  const m = motivo.trim();
  if (!m) return { error: 'El motivo de cancelación es obligatorio.' };

  const { error } = await supabaseAdmin
    .from('tramites')
    .update({ estado: 'cancelado', cancelacion_motivo: m, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { error: 'Error al cancelar el trámite.' };

  await supabaseAdmin.from('tramite_historial').insert({
    tramite_id: id,
    estado: 'cancelado',
    nota: m,
  });

  await notificarCambioEstado(id, 'cancelado');

  revalidatePath('/admin');
  revalidatePath('/seguimiento', 'layout');
  return { success: true };
}

// campo/monto: el cliente no siempre paga exactamente el 50/50 sugerido
// (a veces da un poco más, o paga todo de una vez) — monto guarda lo
// realmente recibido; si no se indica, se asume el valor sugerido.
export async function togglePago(
  id: string,
  campo: 'pago_inicial' | 'pago_final',
  value: boolean,
  metodo?: string,
  monto?: number,
) {
  await requireAdmin();

  if (campo === 'pago_final' && value) {
    const { data } = await supabaseAdmin
      .from('tramites')
      .select('pago_inicial')
      .eq('id', id)
      .single();
    if (!data?.pago_inicial) {
      return { error: 'Registra primero el pago inicial.' };
    }
  }

  const fechaCampo  = campo === 'pago_inicial' ? 'pago_inicial_fecha'  : 'pago_final_fecha';
  const metodoCampo = campo === 'pago_inicial' ? 'pago_inicial_metodo' : 'pago_final_metodo';
  const montoCampo  = campo === 'pago_inicial' ? 'pago_inicial_monto'  : 'pago_final_monto';

  const updates: Record<string, unknown> = {
    [campo]:      value,
    [fechaCampo]: value ? new Date().toISOString().split('T')[0] : null,
    updated_at:   new Date().toISOString(),
  };

  if (value && metodo) updates[metodoCampo] = metodo;
  if (!value)           updates[metodoCampo] = null;

  if (value) {
    updates[montoCampo] = monto != null ? Math.min(Math.max(Math.round(monto), 0), MAX_VALOR) : null;
  } else {
    updates[montoCampo] = null;
  }

  const { error } = await supabaseAdmin.from('tramites').update(updates).eq('id', id);
  if (error) return { error: 'Error al actualizar pago.' };
  revalidatePath('/admin');
  return { success: true };
}

// Para clientes que pagan el total en un solo momento: marca las dos
// cuotas de una vez (pago_final queda con monto 0 porque ya está
// cubierto por el pago inicial).
export async function marcarPagoCompleto(id: string, metodo: string) {
  await requireAdmin();

  const { data: t, error: fetchError } = await supabaseAdmin
    .from('tramites')
    .select('valor_honorarios, valor_derechos, valor_avaluo')
    .eq('id', id)
    .single();
  if (fetchError || !t) return { error: 'No se encontró el trámite.' };

  const { total } = calcPagos(t);
  const hoy = new Date().toISOString().split('T')[0];
  const ahora = new Date().toISOString();

  const { error } = await supabaseAdmin.from('tramites').update({
    pago_inicial: true, pago_inicial_fecha: hoy, pago_inicial_metodo: metodo, pago_inicial_monto: total,
    pago_final:   true, pago_final_fecha: hoy,   pago_final_metodo: metodo,   pago_final_monto: 0,
    updated_at: ahora,
  }).eq('id', id);

  if (error) return { error: 'Error al registrar el pago completo.' };
  revalidatePath('/admin');
  return { success: true };
}

export async function togglePagoDevuelto(id: string, value: boolean) {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from('tramites')
    .update({ pago_devuelto: value, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return { error: 'Error al actualizar devolución.' };
  revalidatePath('/admin');
  return { success: true };
}

export async function updateCostos(
  id: string,
  costo_tramitador: number,
  costo_envio: number,
  costo_imprevistos: number,
) {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from('tramites')
    .update({ costo_tramitador, costo_envio, costo_imprevistos, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return { error: 'Error al guardar costos.' };
  revalidatePath('/admin');
  return { success: true };
}

export async function bulkUpdateEstado(ids: string[], estado: TramiteEstado, nota?: string) {
  await requireAdmin();
  if (!ids.length) return { error: 'Sin trámites seleccionados.' };

  const notaTrimmed = nota?.trim() || null;

  for (const id of ids) {
    const { error } = await supabaseAdmin
      .from('tramites')
      .update({ estado, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) continue;

    await supabaseAdmin.from('tramite_historial').insert({
      tramite_id: id,
      estado,
      nota: notaTrimmed,
    });

    await notificarCambioEstado(id, estado, notaTrimmed);
  }

  revalidatePath('/admin');
  revalidatePath('/seguimiento', 'layout');
  return { success: true };
}

export async function asignarTramitador(id: string, userId: string | null) {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from('tramites')
    .update({ asignado_a: userId, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return { error: 'Error al asignar el tramitador.' };
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteTramite(id: string) {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from('tramites')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return { error: 'Error al eliminar.' };
  revalidatePath('/admin');
  return { success: true };
}

