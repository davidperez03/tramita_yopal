import OpenAI from 'openai';
import { BUSINESS, CHATBOT_SYSTEM_PROMPT } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

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
