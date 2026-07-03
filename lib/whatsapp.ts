// Envío de WhatsApp vía Cloud API de Meta.
// Requiere WHATSAPP_ACCESS_TOKEN y WHATSAPP_PHONE_NUMBER_ID.
// Mientras no estén configurados, las notificaciones quedan en cola
// (estado 'pendiente') y se envían cuando se configuren.

export type EnvioResult =
  | { ok: true }
  | { ok: false; configured: boolean; error: string };

export function whatsappConfigurado(): boolean {
  return !!(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);
}

// Normaliza a formato internacional sin '+': celular colombiano de 10
// dígitos → prefijo 57.
export function normalizarTelefono(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10 && digits.startsWith('3')) return `57${digits}`;
  return digits;
}

export async function sendWhatsApp(to: string, body: string): Promise<EnvioResult> {
  const token   = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) {
    return { ok: false, configured: false, error: 'WhatsApp Cloud API no configurado.' };
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: normalizarTelefono(to),
        type: 'text',
        text: { body, preview_url: true },
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { ok: false, configured: true, error: `HTTP ${res.status}: ${detail.slice(0, 300)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, configured: true, error: e instanceof Error ? e.message : 'Error de red' };
  }
}
