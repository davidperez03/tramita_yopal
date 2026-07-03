import OpenAI from 'openai';
import { BUSINESS } from '@/lib/constants';
import { isRateLimited, getClientIp } from '@/lib/rateLimit';

const MAX_TRAMITE_LEN     = 120;
const MAX_DESCRIPCION_LEN = 3000;

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req.headers);
    if (await isRateLimited('validate', ip)) {
      return new Response(
        JSON.stringify({ error: 'Demasiadas consultas. Espera unos minutos o escríbenos por WhatsApp.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const body = await req.json();
    let { tramite, descripcion } = body ?? {};

    if (!tramite || typeof tramite !== 'string' || !descripcion || typeof descripcion !== 'string') {
      return new Response(JSON.stringify({ error: 'Datos incompletos.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }
    tramite     = tramite.slice(0, MAX_TRAMITE_LEN);
    descripcion = descripcion.slice(0, MAX_DESCRIPCION_LEN);

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Validador no configurado.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const client = new OpenAI();
    const userMessage = `Trámite que necesita: ${tramite}\n\nDescripción del caso: ${descripcion}\n\nAnaliza este caso y dame el diagnóstico: qué documentos necesita, qué posibles impedimentos puede haber y qué pasos seguir.`;

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          const stream = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            max_tokens: 1500,
            stream: true,
            messages: [
              {
                role: 'system',
                content: 'Eres un experto en trámites vehiculares colombianos. Responde en español colombiano, de forma clara y práctica.',
              },
              { role: 'user', content: userMessage },
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
              `data: ${JSON.stringify({ text: `Error al analizar el caso. Contáctanos por WhatsApp al ${BUSINESS.phone}.` })}\n\n`,
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
