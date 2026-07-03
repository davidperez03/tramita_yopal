import { supabaseAdmin } from './supabase';

// Rate limiting en dos capas:
//  1. Map en memoria — corta ráfagas dentro de la misma instancia sin ir a la DB.
//  2. RPC check_rate_limit en Supabase — contador compartido entre todas las
//     instancias serverless (la capa que de verdad limita en producción).

export type RateLimitScope = 'login' | 'chat' | 'validate' | 'form';

const LIMITS: Record<RateLimitScope, { max: number; windowSec: number }> = {
  login:    { max: 5,  windowSec: 15 * 60 }, // 5 intentos / 15 min
  chat:     { max: 30, windowSec: 10 * 60 }, // 30 mensajes / 10 min
  validate: { max: 6,  windowSec: 15 * 60 }, // 6 análisis IA / 15 min
  form:     { max: 8,  windowSec: 60 * 60 }, // 8 envíos de formulario / hora
};

type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

function memoryLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();

  if (store.size > 5000) {
    store.forEach((entry, k) => {
      if (entry.resetAt < now) store.delete(k);
    });
  }

  const entry = store.get(key);
  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count++;
  return entry.count > max;
}

export async function isRateLimited(scope: RateLimitScope, ip: string): Promise<boolean> {
  const { max, windowSec } = LIMITS[scope];
  const key = `${scope}:${ip}`;

  if (memoryLimited(key, max, windowSec * 1000)) return true;

  try {
    const { data, error } = await supabaseAdmin.rpc('check_rate_limit', {
      p_key: key,
      p_max: max,
      p_window_seconds: windowSec,
    });
    // Si la migración aún no se aplicó o la DB falla, no bloqueamos:
    // queda protegiendo la capa de memoria.
    if (error) return false;
    return data === true;
  } catch {
    return false;
  }
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-real-ip') ??
    headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  );
}
