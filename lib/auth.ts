import { redirect } from 'next/navigation';
import { createAuthClient } from './supabase/server';

export async function requireAdmin(): Promise<void> {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin');
}

export async function isAuthed(): Promise<boolean> {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  return !!user;
}
