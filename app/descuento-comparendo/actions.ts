'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { BUSINESS } from '@/lib/constants';

export async function solicitarDescuento(formData: FormData) {
  const nombre             = (formData.get('nombre')             as string)?.trim().toUpperCase();
  const cedula             = (formData.get('cedula')             as string)?.trim();
  const telefono           = (formData.get('telefono')           as string)?.trim();
  const tipo               = formData.get('tipo')               as string;
  const fecha_comparendo   = formData.get('fecha_comparendo')   as string;
  const numero_comparendo  = (formData.get('numero_comparendo') as string)?.trim();
  const descuento_estimado = formData.get('descuento_estimado') as string;
  const fecha_curso        = (formData.get('fecha_curso')        as string)?.trim();

  if (!nombre || !telefono || !tipo || !fecha_comparendo) {
    return { error: 'Completa todos los campos obligatorios.' };
  }

  const { error: dbError } = await supabaseAdmin.from('comparendo_solicitudes').insert({
    nombre,
    cedula:            cedula           || null,
    telefono,
    tipo,
    fecha_comparendo,
    numero_comparendo: numero_comparendo || null,
    descuento_estimado: descuento_estimado || null,
    fecha_curso:       fecha_curso       || null,
  });

  if (dbError) return { error: 'Error al registrar la solicitud. Intenta de nuevo.' };

  // Notificación WhatsApp via CallMeBot
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (apiKey) {
    const fechaFmt = new Date(fecha_comparendo + 'T12:00:00').toLocaleDateString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
    const tipoLabel = tipo === 'fisico' ? 'Físico (agente)' : 'Fotomulta (electrónico)';
    const lineas = [
      '🚨 *NUEVO CASO COMPARENDO*',
      `Nombre: ${nombre}`,
      `Tel: ${telefono}`,
      cedula           ? `Cédula: ${cedula}`             : null,
      `Tipo: ${tipoLabel}`,
      `Fecha comparendo: ${fechaFmt}`,
      numero_comparendo ? `N° comparendo: ${numero_comparendo}` : null,
      descuento_estimado && descuento_estimado !== 'ninguno'
        ? `Descuento aprox: ${descuento_estimado}`
        : '⚠️ Plazo posiblemente vencido — confirmar',
    ].filter(Boolean).join('\n');

    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${BUSINESS.whatsapp}&text=${encodeURIComponent(lineas)}&apikey=${apiKey}`,
    ).catch(() => {});
  }

  return { success: true };
}
