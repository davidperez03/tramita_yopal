import OpenAI from 'openai';
import { BUSINESS } from '@/lib/constants';

const client = new OpenAI();

export async function POST(req: Request) {
  try {
    const { tramite, descripcion } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Validador no configurado.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } },
      );
    }

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
