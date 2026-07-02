const MAX_ATTEMPTS = 5;
const WINDOW_MS    = 15 * 60 * 1000; // 15 minutos

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

function cleanup() {
  const now = Date.now();
  store.forEach((entry, key) => {
    if (entry.resetAt < now) store.delete(key);
  });
}

export function checkRateLimit(ip: string): boolean {
  cleanup();
  const now   = Date.now();
  const entry = store.get(ip);

  if (!entry || entry.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > MAX_ATTEMPTS) return true;
  return false;
}

export function resetRateLimit(ip: string) {
  store.delete(ip);
}
