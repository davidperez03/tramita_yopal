-- ============================================================
-- MIGRACIÓN CLIENTES: entidad cliente + backfill desde trámites
-- Ejecutar en Supabase > SQL Editor sobre base existente
-- (después de migration_2026 y migration_seguridad)
-- ============================================================

-- ──────────────────────────────────────────────────────────────
-- 1. Tabla clientes
-- ──────────────────────────────────────────────────────────────
create table if not exists clientes (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  nombre       text        not null,
  telefono     text        unique,   -- clave natural de contacto (WhatsApp)
  cedula       text        unique,
  ciudad       text,
  email        text,
  notas        text,
  deleted_at   timestamptz
);

alter table clientes enable row level security;
-- Sin políticas públicas — solo service_role.

create index if not exists idx_clientes_nombre on clientes (nombre);


-- ──────────────────────────────────────────────────────────────
-- 2. Enlace desde trámites
-- Las columnas cliente_nombre/telefono/ciudad se conservan como
-- respaldo desnormalizado; se eliminarán en una migración futura.
-- ──────────────────────────────────────────────────────────────
alter table tramites add column if not exists cliente_id uuid references clientes(id);

create index if not exists idx_tramites_cliente on tramites (cliente_id);


-- ──────────────────────────────────────────────────────────────
-- 3. Backfill: un cliente por teléfono (datos del trámite más
--    reciente), y para trámites sin teléfono, uno por nombre.
-- ──────────────────────────────────────────────────────────────
insert into clientes (nombre, telefono, ciudad)
select distinct on (cliente_telefono)
  cliente_nombre, cliente_telefono, cliente_ciudad
from tramites
where cliente_telefono is not null and cliente_telefono <> ''
order by cliente_telefono, created_at desc
on conflict (telefono) do nothing;

update tramites t
set cliente_id = c.id
from clientes c
where t.cliente_id is null
  and t.cliente_telefono is not null
  and t.cliente_telefono = c.telefono;

insert into clientes (nombre, ciudad)
select distinct on (cliente_nombre)
  cliente_nombre, cliente_ciudad
from tramites t
where (t.cliente_telefono is null or t.cliente_telefono = '')
  and t.cliente_id is null
  and not exists (
    select 1 from clientes c
    where c.nombre = t.cliente_nombre and c.telefono is null
  )
order by cliente_nombre, created_at desc;

update tramites t
set cliente_id = c.id
from clientes c
where t.cliente_id is null
  and (t.cliente_telefono is null or t.cliente_telefono = '')
  and c.nombre = t.cliente_nombre
  and c.telefono is null;


-- ──────────────────────────────────────────────────────────────
-- 4. Vista resumen para el panel admin
-- security_invoker: respeta el RLS de las tablas base (anon no ve nada)
-- ──────────────────────────────────────────────────────────────
create or replace view clientes_resumen
with (security_invoker = true) as
select
  c.id, c.created_at, c.nombre, c.telefono, c.cedula, c.ciudad, c.email, c.notas,
  count(t.id) filter (where t.deleted_at is null)                                                   as tramites_total,
  count(t.id) filter (where t.deleted_at is null and t.estado not in ('entregado','cancelado'))     as tramites_activos,
  max(t.created_at) filter (where t.deleted_at is null)                                             as ultimo_tramite
from clientes c
left join tramites t on t.cliente_id = c.id
where c.deleted_at is null
group by c.id;
