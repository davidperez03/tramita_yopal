import { supabaseAdmin } from './supabase';
import { sendWhatsApp, whatsappConfigurado } from './whatsapp';
import { BUSINESS } from './constants';
import type { TramiteEstado } from './domain/tramite';

const SITE        = `https://${BUSINESS.domain}`;
const MAX_INTENTOS = 5;

function primerNombre(nombre: string): string {
  const p = nombre.trim().split(/\s+/)[0] ?? nombre;
  return p.charAt(0) + p.slice(1).toLowerCase();
}

function buildMensaje(params: {
  estado: TramiteEstado;
  nombre: string;
  tipos: string[];
  codigo: string | null;
  nota?: string | null;
  motivo?: string | null;
}): string {
  const { estado, nombre, tipos, codigo, nota, motivo } = params;
  const saludo  = `Hola ${primerNombre(nombre)},`;
  const tramite = tipos.join(' + ');

  const cuerpo: Record<Exclude<TramiteEstado, 'recibido'>, string> = {
    en_proceso: `tu trámite de *${tramite}* ya está *en proceso* en el organismo de tránsito. Te avisaremos cada avance.`,
    aprobado:   `¡buenas noticias! Tu trámite de *${tramite}* fue *aprobado* ✅ Pronto coordinamos contigo la entrega.`,
    entregado:  `tu trámite de *${tramite}* fue *entregado* 🎉 ¡Gracias por confiar en Tramita Yopal! Nos ayudarías mucho dejando tu reseña: ${SITE}/dejar-resena`,
    cancelado:  `tu trámite de *${tramite}* fue *cancelado*.${motivo ? ` Motivo: ${motivo}.` : ''} Si tienes dudas, escríbenos.`,
  };

  const lineas = [
    `${saludo} ${cuerpo[estado as Exclude<TramiteEstado, 'recibido'>]}`,
    nota?.trim() ? `\n📝 ${nota.trim()}` : null,
    codigo && estado !== 'entregado' && estado !== 'cancelado'
      ? `\nSigue tu trámite en tiempo real: ${SITE}/seguimiento/${codigo}`
      : null,
    `\n— Tramita Yopal 🚗`,
  ];

  return lineas.filter(Boolean).join('\n');
}

async function intentarEnvio(notifId: string, telefono: string, contenido: string, intentosPrevios: number) {
  const res = await sendWhatsApp(telefono, contenido);

  if (res.ok) {
    await supabaseAdmin.from('notificaciones').update({
      estado:     'enviada',
      enviada_at: new Date().toISOString(),
      intentos:   intentosPrevios + 1,
      error:      null,
    }).eq('id', notifId);
    return true;
  }

  // Sin credenciales no cuenta como intento: queda pendiente para cuando
  // se configure el proveedor.
  if (!res.configured) return false;

  await supabaseAdmin.from('notificaciones').update({
    estado:   'fallida',
    intentos: intentosPrevios + 1,
    error:    res.error,
  }).eq('id', notifId);
  return false;
}

// Encola la notificación del cambio de estado y trata de enviarla de una vez.
// Nunca lanza: un fallo de notificación no debe bloquear la acción del admin.
export async function notificarCambioEstado(
  tramiteId: string,
  estado: TramiteEstado,
  nota?: string | null,
) {
  try {
    if (estado === 'recibido') return;

    const { data: t } = await supabaseAdmin
      .from('tramites')
      .select('id, tipos, codigo_seguimiento, cancelacion_motivo, cliente:clientes(nombre, telefono)')
      .eq('id', tramiteId)
      .single();

    const cliente = (t?.cliente ?? null) as { nombre: string; telefono: string | null } | null;
    if (!t || !cliente?.telefono) return;

    const contenido = buildMensaje({
      estado,
      nombre: cliente.nombre,
      tipos:  t.tipos ?? [],
      codigo: t.codigo_seguimiento,
      nota,
      motivo: t.cancelacion_motivo,
    });

    const { data: notif } = await supabaseAdmin
      .from('notificaciones')
      .insert({
        tramite_id:   t.id,
        canal:        'whatsapp',
        plantilla:    `estado_${estado}`,
        destinatario: cliente.telefono,
        contenido,
      })
      .select('id')
      .single();

    if (notif) await intentarEnvio(notif.id, cliente.telefono, contenido, 0);
  } catch {
    // Auditable en la tabla; no interrumpe el flujo del admin.
  }
}

// Reintenta pendientes/fallidas (lo llama el cron).
export async function procesarPendientes(max = 50): Promise<{ enviadas: number; fallidas: number }> {
  if (!whatsappConfigurado()) return { enviadas: 0, fallidas: 0 };

  const { data: rows } = await supabaseAdmin
    .from('notificaciones')
    .select('id, destinatario, contenido, intentos')
    .neq('estado', 'enviada')
    .lt('intentos', MAX_INTENTOS)
    .order('created_at', { ascending: true })
    .limit(max);

  let enviadas = 0;
  let fallidas = 0;
  for (const n of rows ?? []) {
    const ok = await intentarEnvio(n.id, n.destinatario, n.contenido, n.intentos);
    if (ok) enviadas++; else fallidas++;
  }
  return { enviadas, fallidas };
}
