'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';
import { createAuthClient } from '@/lib/supabase/server';
import { isRateLimited, getClientIp } from '@/lib/rateLimit';

export { requireAdmin };

export async function login(formData: FormData) {
  const ip = getClientIp(await headers());
  if (await isRateLimited('login', ip)) redirect('/admin?error=rate');

  const email    = (formData.get('email')    as string)?.trim();
  const password = (formData.get('password') as string)?.trim();

  if (!email || !password) redirect('/admin?error=1');

  const supabase = await createAuthClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect('/admin?error=1');
  redirect('/admin');
}

export async function logout() {
  const supabase = await createAuthClient();
  await supabase.auth.signOut();
  redirect('/admin');
}

export async function approveReview(id: string) {
  await requireAdmin();
  const { error } = await supabaseAdmin.from('reviews').update({ visible: true }).eq('id', id);
  if (error) return { error: 'Error al aprobar la reseña.' };
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function hideReview(id: string) {
  await requireAdmin();
  const { error } = await supabaseAdmin.from('reviews').update({ visible: false }).eq('id', id);
  if (error) return { error: 'Error al ocultar la reseña.' };
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function deleteReview(id: string) {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from('reviews')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return { error: 'Error al eliminar la reseña.' };
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}


export async function addReview(formData: FormData) {
  await requireAdmin();

  const name   = (formData.get('name')   as string)?.trim();
  const email  = (formData.get('email')  as string)?.trim() || null;
  const rating = parseInt(formData.get('rating') as string);
  const text   = (formData.get('text')   as string)?.trim();
  const type   = (formData.get('type')   as string)?.trim();
  const year   = (formData.get('year')   as string)?.trim();
  const source = (formData.get('source') as string)?.trim() || 'Google';

  if (!name || !rating || !text || !type || !year) {
    return { error: 'Nombre, calificación, texto, tipo y año son obligatorios.' };
  }

  const { error } = await supabaseAdmin.from('reviews').insert({
    name, email, rating, text, type, year, visible: true, source,
  });

  revalidatePath('/admin');
  revalidatePath('/');
  if (error) return { error: 'Error al agregar la reseña.' };
  return { success: true };
}
