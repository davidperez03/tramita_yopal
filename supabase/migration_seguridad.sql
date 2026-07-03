-- ============================================================
-- MIGRACIÓN SEGURIDAD: rate limiting durable
-- Ejecutar en Supabase > SQL Editor sobre base existente
-- ============================================================

-- Contadores de rate limit compartidos entre instancias serverless.
-- El Map en memoria de lib/rateLimit.ts solo protege dentro de una
-- instancia; esta tabla es la fuente de verdad entre todas.
create table if not exists rate_limits (
  key       text        primary key,
  count     integer     not null,
  reset_at  timestamptz not null
);

alter table rate_limits enable row level security;
-- Sin políticas públicas — solo service_role.

-- Incrementa el contador de forma atómica y devuelve true si se
-- superó el límite. Reinicia la ventana cuando expira.
create or replace function check_rate_limit(
  p_key            text,
  p_max            integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  insert into rate_limits as r (key, count, reset_at)
  values (p_key, 1, now() + make_interval(secs => p_window_seconds))
  on conflict (key) do update
    set count    = case when r.reset_at < now() then 1
                        else r.count + 1 end,
        reset_at = case when r.reset_at < now() then now() + make_interval(secs => p_window_seconds)
                        else r.reset_at end
  returning count into v_count;

  -- Limpieza oportunista de claves expiradas (~1% de las llamadas)
  if random() < 0.01 then
    delete from rate_limits where reset_at < now() - interval '1 day';
  end if;

  return v_count > p_max;
end;
$$;

-- Solo el service_role puede ejecutarla
revoke execute on function check_rate_limit(text, integer, integer) from public, anon, authenticated;
