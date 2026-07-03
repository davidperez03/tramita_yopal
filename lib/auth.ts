import { redirect } from 'next/navigation';
import { createAuthClient } from './supabase/server';

// Roles en app_metadata.role de Supabase Auth.
// Un usuario sin role es tramitador (mínimo privilegio); para volver admin
// a alguien, ver el snippet SQL en supabase/schema.sql.
export type Role = 'admin' | 'tramitador';

export type SessionInfo = { userId: string; email: string | null; role: Role };

export async function getSessionInfo(): Promise<SessionInfo | null> {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return {
    userId: user.id,
    email:  user.email ?? null,
    role:   user.app_metadata?.role === 'admin' ? 'admin' : 'tramitador',
  };
}

export async function requireAdmin(): Promise<void> {
  const s = await getSessionInfo();
  if (!s || s.role !== 'admin') redirect('/admin');
}

// Cualquier usuario autenticado (admin o tramitador)
export async function requireUser(): Promise<SessionInfo> {
  const s = await getSessionInfo();
  if (!s) redirect('/admin');
  return s;
}

export async function isAuthed(): Promise<boolean> {
  return !!(await getSessionInfo());
}
