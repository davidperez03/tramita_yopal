'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from './actions';

export type TramiteEstado = 'recibido' | 'en_proceso' | 'aprobado' | 'entregado' | 'cancelado';

export async function createTramite(formData: FormData) {
  await requireAdmin();
  const cliente_nombre   = (formData.get('cliente_nombre')   as string)?.trim();
  const cliente_telefono = (formData.get('cliente_telefono') as string)?.trim();
  const cliente_ciudad   = (formData.get('cliente_ciudad')   as string)?.trim();
  const placa            = (formData.get('placa')            as string)?.trim().toUpperCase();
  const tipo             = (formData.get('tipo')             as string)?.trim();
  const descripcion      = (formData.get('descripcion')      as string)?.trim();
  const valor_honorarios = parseInt((formData.get('valor_honorarios') as string)?.replace(/\D/g, '') || '0', 10);
  const valor_derechos   = parseInt((formData.get('valor_derechos')   as string)?.replace(/\D/g, '') || '0', 10);
  const valor_avaluo     = parseInt((formData.get('valor_avaluo')     as string)?.replace(/\D/g, '') || '0', 10);
  const notas            = (formData.get('notas') as string)?.trim();

  if (!cliente_nombre || !tipo) {
    return { error: 'Nombre del cliente y tipo de trámite son obligatorios.' };
  }

  const { error } = await supabaseAdmin.from('tramites').insert({
    cliente_nombre,
    cliente_telefono: cliente_telefono || null,
    cliente_ciudad:   cliente_ciudad   || null,
    placa:            placa            || null,
    tipo,
    descripcion:      descripcion      || null,
    estado: 'recibido',
    valor_honorarios,
    valor_derechos,
    valor_avaluo,
    notas: notas || null,
  });

  if (error) return { error: 'Error al crear el trámite.' };
  revalidatePath('/admin');
  return { success: true };
}

export async function updateEstado(id: string, estado: TramiteEstado) {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from('tramites')
    .update({ estado, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { error: 'Error al actualizar estado.' };
  revalidatePath('/admin');
  return { success: true };
}

export async function togglePago(
  id: string,
  campo: 'pago_inicial' | 'pago_final',
  value: boolean,
) {
  await requireAdmin();
  const updates: Record<string, unknown> = {
    [campo]: value,
    updated_at: new Date().toISOString(),
  };
  if (campo === 'pago_inicial') {
    updates.pago_inicial_fecha = value ? new Date().toISOString().split('T')[0] : null;
  } else {
    updates.pago_final_fecha = value ? new Date().toISOString().split('T')[0] : null;
  }

  const { error } = await supabaseAdmin.from('tramites').update(updates).eq('id', id);
  if (error) return { error: 'Error al actualizar pago.' };
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteTramite(id: string) {
  await requireAdmin();
  const { error } = await supabaseAdmin.from('tramites').delete().eq('id', id);
  if (error) return { error: 'Error al eliminar.' };
  revalidatePath('/admin');
  return { success: true };
}

export async function updateNotas(id: string, notas: string) {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from('tramites')
    .update({ notas, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { error: 'Error al guardar notas.' };
  revalidatePath('/admin');
  return { success: true };
}
