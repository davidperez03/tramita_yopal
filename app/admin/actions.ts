'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';

const SESSION_VALUE = () => `ty_admin_${process.env.ADMIN_PASSWORD}`;

// Lanza si la sesión no es válida — protege todas las acciones sensibles
async function requireAdmin() {
  const jar   = await cookies();
  const value = jar.get('admin_session')?.value;
  if (!value || value !== SESSION_VALUE()) {
    redirect('/admin');
  }
}

export async function login(formData: FormData) {
  const password = (formData.get('password') as string)?.trim();
  if (password && password === process.env.ADMIN_PASSWORD) {
    (await cookies()).set('admin_session', SESSION_VALUE(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    });
    redirect('/admin');
  }
  redirect('/admin?error=1');
}

export async function logout() {
  await requireAdmin();
  (await cookies()).delete('admin_session');
  redirect('/admin');
}

export async function approveReview(id: string) {
  await requireAdmin();
  await supabaseAdmin.from('reviews').update({ visible: true }).eq('id', id);
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function hideReview(id: string) {
  await requireAdmin();
  await supabaseAdmin.from('reviews').update({ visible: false }).eq('id', id);
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function deleteReview(id: string) {
  await requireAdmin();
  await supabaseAdmin.from('reviews').delete().eq('id', id);
  revalidatePath('/admin');
  revalidatePath('/');
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
