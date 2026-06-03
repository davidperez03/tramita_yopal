'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    '¡Hola! Soy el asistente de Tramita Yopal 🚗. Puedo responderte al instante sobre nuestros trámites vehiculares, documentos requeridos y tiempos. ¿En qué te puedo ayudar?',
};

const QUICK_OPTIONS = [
  '¿Qué documentos necesito para un traspaso?',
  '¿Cuánto tiempo tarda un levantamiento de prenda?',
  '¿Trabajan con todo Colombia?',
  '¿Cuánto cuesta un traspaso?',
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setInput('');
    setLoading(true);
    setShowQuick(false);

    const userMsg: Message = { role: 'user', content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    // Optimistic empty assistant message
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error('Network error');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '));

        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const { text } = JSON.parse(data);
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                content: updated[updated.length - 1].content + text,
              };
              return updated;
            });
          } catch {}
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content:
            'Lo siento, ocurrió un error. Por favor contáctanos directamente al WhatsApp 300 123 4567.',
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden max-h-[80vh]">
          {/* Header */}
          <div className="bg-brand-900 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <div className="text-white font-bold text-sm">Asistente Tramita Yopal</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-blue-200 text-xs">Respuesta instantánea</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Aviso privacidad */}
          <div className="px-4 py-1.5 bg-white border-b border-slate-100 text-center">
            <p className="text-[10px] text-slate-400">
              Chat con IA (Anthropic) · Sin almacenamiento de historial ·{' '}
              <a href="/politica-privacidad" target="_blank" className="underline hover:text-slate-600">
                Privacidad
              </a>
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-brand-700 text-white rounded-br-sm'
                      : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-sm'
                  }`}
                >
                  {msg.content || (
                    <span className="flex gap-1 items-center text-slate-400">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick options */}
          {showQuick && (
            <div className="px-4 py-2 bg-white border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-2 font-medium">Preguntas frecuentes:</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_OPTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 px-2.5 py-1 rounded-full transition-colors border border-slate-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-slate-100 bg-white">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Escribe tu pregunta..."
                disabled={loading}
                className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-60"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="w-10 h-10 bg-brand-800 hover:bg-brand-900 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-brand-800 hover:bg-brand-900 text-white rounded-2xl shadow-xl shadow-brand-900/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Abrir chat de ayuda"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
            <span className="text-amber-900 text-xs font-bold leading-none">✦</span>
          </span>
        )}
      </button>
    </>
  );
}
