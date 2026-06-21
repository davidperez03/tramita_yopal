'use server';

import { supabaseAdmin } from '@/lib/supabase';

export async function submitReview(formData: FormData) {
  const name   = (formData.get('name')   as string)?.trim();
  const email  = (formData.get('email')  as string)?.trim();
  const rating = parseInt(formData.get('rating') as string);
  const text   = (formData.get('text')   as string)?.trim();
  const type   = (formData.get('type')   as string)?.trim();

  if (!name || !email || !rating || !text || !type) {
    return { error: 'Por favor completa todos los campos obligatorios.' };
  }
  if (rating < 1 || rating > 5) {
    return { error: 'Selecciona una calificación.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Ingresa un correo electrónico válido.' };
  }

  const { error } = await supabaseAdmin.from('reviews').insert({
    name,
    email,
    rating,
    text,
    type,
    year: new Date().getFullYear().toString(),
    visible: false,
    source: 'Directo',
  });

  if (error) return { error: 'Ocurrió un error al enviar tu reseña. Intenta de nuevo.' };
  return { success: true };
}
