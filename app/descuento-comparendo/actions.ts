'use server';

import { headers } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { BUSINESS } from '@/lib/constants';
import { isRateLimited, getClientIp } from '@/lib/rateLimit';
import { findOrCreateCliente } from '@/lib/clientes';

export async function solicitarDescuento(formData: FormData) {
  const ip = getClientIp(await headers());
  if (await isRateLimited('form', ip)) {
    return { error: 'Demasiados envíos. Intenta de nuevo más tarde.' };
  }

  const nombre             = (formData.get('nombre')             as string)?.trim().toUpperCase().slice(0, 120);
  const cedula             = (formData.get('cedula')             as string)?.trim().slice(0, 20);
  const telefono           = (formData.get('telefono')           as string)?.trim().slice(0, 20);
  const tipo               = formData.get('tipo')               as string;
  const fecha_comparendo   = formData.get('fecha_comparendo')   as string;
  const numero_comparendo  = (formData.get('numero_comparendo') as string)?.trim().slice(0, 40);
  const descuento_estimado = (formData.get('descuento_estimado') as string)?.slice(0, 40);
  const fecha_curso        = (formData.get('fecha_curso')        as string)?.trim().slice(0, 40);

  if (!nombre || !telefono || !tipo || !fecha_comparendo) {
    return { error: 'Completa todos los campos obligatorios.' };
  }
  if (tipo !== 'fisico' && tipo !== 'fotomulta') {
    return { error: 'Tipo de comparendo inválido.' };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_comparendo)) {
    return { error: 'Fecha de comparendo inválida.' };
  }
  if (!/^[\d\s()+.-]{7,20}$/.test(telefono)) {
    return { error: 'Ingresa un teléfono válido.' };
  }

  // El solicitante también es cliente (línea de comparendos): se crea o
  // enlaza por teléfono. Si falla, la solicitud se guarda igual sin enlace.
  const cliente_id = await findOrCreateCliente({
    nombre,
    telefono,
    cedula: cedula || null,
  });

  const { error: dbError } = await supabaseAdmin.from('comparendo_solicitudes').insert({
    nombre,
    cedula:            cedula           || null,
    telefono,
    tipo,
    fecha_comparendo,
    numero_comparendo: numero_comparendo || null,
    descuento_estimado: descuento_estimado || null,
    fecha_curso:       fecha_curso       || null,
    ...(cliente_id ? { cliente_id } : {}),
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
