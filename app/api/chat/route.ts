import OpenAI from 'openai';
import { BUSINESS, CHATBOT_SYSTEM_PROMPT } from '@/lib/constants';
import { isRateLimited, getClientIp } from '@/lib/rateLimit';

const MAX_MESSAGES    = 20;
const MAX_CONTENT_LEN = 2000;

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req.headers);
    if (await isRateLimited('chat', ip)) {
      return new Response(
        JSON.stringify({ error: 'Demasiados mensajes. Espera unos minutos o escríbenos por WhatsApp.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const body = await req.json();
    const raw = body?.messages;

    if (!Array.isArray(raw) || raw.length === 0) {
      return new Response(JSON.stringify({ error: 'Mensajes inválidos.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    // Solo roles user/assistant, con tope de cantidad y longitud —
    // evita inyección de mensajes system y abuso de tokens.
    const messages: { role: 'user' | 'assistant'; content: string }[] = [];
    for (const m of raw.slice(-MAX_MESSAGES)) {
      if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') {
        return new Response(JSON.stringify({ error: 'Mensajes inválidos.' }), {
          status: 400, headers: { 'Content-Type': 'application/json' },
        });
      }
      messages.push({ role: m.role, content: m.content.slice(0, MAX_CONTENT_LEN) });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Chatbot no configurado. Contáctanos por WhatsApp.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const client = new OpenAI();
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          const stream = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            max_tokens: 1024,
            stream: true,
            messages: [
              { role: 'system', content: CHATBOT_SYSTEM_PROMPT },
              ...messages,
            ],
          });

          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? '';
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`),
              );
            }
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ text: `Lo siento, ocurrió un error. Por favor contáctanos por WhatsApp al ${BUSINESS.phone}.` })}\n\n`,
            ),
          );
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Error interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
