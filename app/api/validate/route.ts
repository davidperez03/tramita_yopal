import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(req: Request) {
  try {
    const { tramite, descripcion } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Validador no configurado.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const userMessage = `Trámite que necesita: ${tramite}

Descripción del caso: ${descripcion}

Por favor analiza este caso y dame el diagnóstico completo en el formato indicado.`;

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          const stream = client.messages.stream({
            model: 'claude-haiku-4-5',
            max_tokens: 1500,
            system: 'Eres un experto en trámites vehiculares colombianos.',
            messages: [{ role: 'user', content: userMessage }],
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
              `data: ${JSON.stringify({ text: 'Error al analizar el caso. Contáctanos directamente al WhatsApp 300 123 4567.' })}\n\n`,
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
