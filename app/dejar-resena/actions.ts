'use server';

import { supabaseAdmin } from '@/lib/supabase';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
const MAX_SIZE_MB   = 5;

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

  // Upload photos (opcional, máx. 3)
  const photoFiles = (formData.getAll('photos') as File[])
    .filter(f => f instanceof File && f.size > 0)
    .slice(0, 3);

  const photoUrls: string[] = [];

  for (const file of photoFiles) {
    if (!ALLOWED_TYPES.includes(file.type)) continue;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) continue;

    const ext      = file.name.split('.').pop() ?? 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer   = Buffer.from(await file.arrayBuffer());

    const { data, error } = await supabaseAdmin.storage
      .from('review-photos')
      .upload(filename, buffer, { contentType: file.type, upsert: false });

    if (!error && data) {
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('review-photos')
        .getPublicUrl(data.path);
      photoUrls.push(publicUrl);
    }
  }

  const { error } = await supabaseAdmin.from('reviews').insert({
    name,
    email,
    rating,
    text,
    type,
    year:    new Date().getFullYear().toString(),
    visible: false,
    source:  'Directo',
    photos:  photoUrls.length > 0 ? photoUrls : null,
  });

  if (error) return { error: 'Ocurrió un error al enviar tu reseña. Intenta de nuevo.' };
  return { success: true };
}
