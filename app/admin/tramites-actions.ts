'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { randomBytes } from 'crypto';
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

  const { error } = await supabaseAdmin.from('tramites').insert({
    cliente_nombre,
    cliente_telefono:   cliente_telefono || null,
    cliente_ciudad:     cliente_ciudad   || null,
    placa:              placa            || null,
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

export async function updateEstado(id: string, estado: TramiteEstado, nota?: string) {
  await requireAdmin();
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

  revalidatePath('/admin');
  revalidatePath('/seguimiento', 'layout');
  return { success: true };
}

export async function togglePago(
  id: string,
  campo: 'pago_inicial' | 'pago_final',
  value: boolean,
  metodo?: string,
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

  const fechaCampo = campo === 'pago_inicial' ? 'pago_inicial_fecha' : 'pago_final_fecha';
  const metodoCampo = campo === 'pago_inicial' ? 'pago_inicial_metodo' : 'pago_final_metodo';

  const updates: Record<string, unknown> = {
    [campo]:      value,
    [fechaCampo]: value ? new Date().toISOString().split('T')[0] : null,
    updated_at:   new Date().toISOString(),
  };

  if (value && metodo) updates[metodoCampo] = metodo;
  if (!value)           updates[metodoCampo] = null;

  const { error } = await supabaseAdmin.from('tramites').update(updates).eq('id', id);
  if (error) return { error: 'Error al actualizar pago.' };
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
  }

  revalidatePath('/admin');
  revalidatePath('/seguimiento', 'layout');
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

