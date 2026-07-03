import { supabaseAdmin } from './supabase';

// Busca el cliente por teléfono (o por nombre si no hay teléfono) y lo crea
// si no existe. Devuelve null si la DB falla — el registro que lo llama se
// crea igual, solo que sin enlace.
export async function findOrCreateCliente(input: {
  nombre: string;
  telefono: string | null;
  ciudad?: string | null;
  cedula?: string | null;
}): Promise<string | null> {
  try {
    const lookup = input.telefono
      ? supabaseAdmin.from('clientes').select('id').eq('telefono', input.telefono)
      : supabaseAdmin.from('clientes').select('id').eq('nombre', input.nombre).is('telefono', null);
    const { data: existing } = await lookup.is('deleted_at', null).limit(1);
    if (existing?.[0]) return existing[0].id;

    const { data: created, error } = await supabaseAdmin
      .from('clientes')
      .insert({
        nombre:   input.nombre,
        telefono: input.telefono,
        ciudad:   input.ciudad ?? null,
        cedula:   input.cedula ?? null,
      })
      .select('id')
      .single();

    if (!error && created) return created.id;

    // Conflicto de unicidad (carrera por teléfono/cédula): reintenta la búsqueda
    if (input.telefono) {
      const { data: retry } = await supabaseAdmin
        .from('clientes').select('id').eq('telefono', input.telefono).limit(1);
      if (retry?.[0]) return retry[0].id;
    }
    return null;
  } catch {
    return null;
  }
}
