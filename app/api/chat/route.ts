import Anthropic from '@anthropic-ai/sdk';
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/constants';

const client = new Anthropic();

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Chatbot no configurado. Contáctanos por WhatsApp.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          const stream = client.messages.stream({
            model: 'claude-haiku-4-5',
            max_tokens: 1024,
            system: [
              {
                type: 'text',
                text: CHATBOT_SYSTEM_PROMPT,
                // @ts-expect-error cache_control is valid but not yet in all type defs
                cache_control: { type: 'ephemeral' },
              },
            ],
            messages,
          });

          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ text: event.delta.text })}\n\n`,
                ),
              );
            }
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ text: 'Lo siento, ocurrió un error. Por favor contáctanos directamente al WhatsApp 300 123 4567.' })}\n\n`,
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
