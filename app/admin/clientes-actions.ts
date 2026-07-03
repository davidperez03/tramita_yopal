'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';

export async function updateCliente(id: string, formData: FormData) {
  await requireAdmin();

  const nombre   = (formData.get('nombre')   as string)?.trim().slice(0, 120);
  const telefono = (formData.get('telefono') as string)?.trim().slice(0, 20);
  const cedula   = (formData.get('cedula')   as string)?.trim().replace(/\D/g, '').slice(0, 20);
  const ciudad   = (formData.get('ciudad')   as string)?.trim().slice(0, 80);
  const email    = (formData.get('email')    as string)?.trim().slice(0, 200);
  const notas    = (formData.get('notas')    as string)?.trim().slice(0, 2000);

  if (!nombre) return { error: 'El nombre es obligatorio.' };
  if (telefono && !/^[\d\s()+.-]{7,20}$/.test(telefono)) {
    return { error: 'Teléfono inválido.' };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Correo inválido.' };
  }

  const { error } = await supabaseAdmin
    .from('clientes')
    .update({
      nombre,
      telefono: telefono || null,
      cedula:   cedula   || null,
      ciudad:   ciudad   || null,
      email:    email    || null,
      notas:    notas    || null,
    })
    .eq('id', id);

  if (error) {
    // 23505 = unique_violation (teléfono o cédula ya pertenecen a otro cliente)
    if (error.code === '23505') {
      return { error: 'Ese teléfono o cédula ya pertenece a otro cliente.' };
    }
    return { error: 'Error al guardar el cliente.' };
  }

  revalidatePath('/admin');
  return { success: true };
}
