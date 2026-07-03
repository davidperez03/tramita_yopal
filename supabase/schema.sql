-- ============================================================
-- TRAMITA YOPAL — Schema completo v4
-- Para base NUEVA: pegar todo en Supabase > SQL Editor
-- Auth: Supabase Auth (sin tabla sessions)
-- v4: tipos[], valor_honorarios, costo_* y rate_limits
-- ============================================================


-- ──────────────────────────────────────────────────────────────
-- TABLA: reviews
-- ──────────────────────────────────────────────────────────────
create table if not exists reviews (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text        not null,
  email        text,
  rating       integer     not null check (rating between 1 and 5),
  text         text        not null,
  type         text        not null,
  year         text        not null,
  source       text        not null default 'Tramita Yopal',
  visible      boolean     not null default false,
  photos       text[],
  deleted_at   timestamptz
);

alter table reviews enable row level security;

create policy "Lectura pública de reseñas visibles"
  on reviews for select
  using (visible = true and deleted_at is null);

create index if not exists idx_reviews_visible
  on reviews (visible);


-- ──────────────────────────────────────────────────────────────
-- TABLA: tramites
-- ──────────────────────────────────────────────────────────────
create table if not exists tramites (
  id                    uuid        primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz          default now(),

  -- Cliente
  cliente_nombre        text        not null,
  cliente_telefono      text,
  cliente_ciudad        text,
  placa                 text,

  -- Trámite (arreglo para combinar servicios, ej: traspaso + levante de prenda)
  tipos                 text[]      not null default '{}',

  -- Estado
  estado                text        not null default 'recibido'
                        check (estado in ('recibido','en_proceso','aprobado','entregado','cancelado')),

  -- Valores económicos — lo que cobra al cliente (COP, enteros, máximo 100.000.000)
  valor_honorarios      integer     not null default 0,
  valor_derechos        integer     not null default 0,
  valor_avaluo          integer     not null default 0,

  -- Costos operativos — se registran al cerrar el trámite (aprobado/entregado)
  costo_tramitador      integer     not null default 0,
  costo_envio           integer     not null default 0,
  costo_imprevistos     integer     not null default 0,

  -- Pagos (política 50/50)
  -- pago1 = floor((honorarios + derechos) / 2) + avaluo
  -- pago2 = (honorarios + derechos) - floor((honorarios + derechos) / 2)
  pago_inicial          boolean     not null default false,
  pago_inicial_fecha    date,
  pago_inicial_metodo   text
                        check (pago_inicial_metodo in ('efectivo','transferencia','nequi','daviplata','otro')),
  pago_final            boolean     not null default false,
  pago_final_fecha      date,
  pago_final_metodo     text
                        check (pago_final_metodo in ('efectivo','transferencia','nequi','daviplata','otro')),

  -- Cancelación
  cancelacion_motivo    text,
  pago_devuelto         boolean     not null default false,

  -- Seguimiento público (código hex 8 chars, único por trámite)
  codigo_seguimiento    text        unique,

  -- Soft-delete
  deleted_at            timestamptz
);

alter table tramites enable row level security;
-- Sin políticas públicas — solo service_role.

create index if not exists idx_tramites_estado
  on tramites (estado);
create index if not exists idx_tramites_created_at
  on tramites (created_at desc);
create index if not exists idx_tramites_updated_at
  on tramites (updated_at desc nulls last);
create index if not exists idx_tramites_codigo
  on tramites (codigo_seguimiento);


-- ──────────────────────────────────────────────────────────────
-- TABLA: tramite_historial  (línea de tiempo pública)
-- Una fila por cada cambio de estado, alimentada por triggers.
-- El cliente la consulta desde /seguimiento/[codigo]
-- ──────────────────────────────────────────────────────────────
create table if not exists tramite_historial (
  id          uuid        primary key default gen_random_uuid(),
  tramite_id  uuid        not null references tramites(id) on delete cascade,
  ts          timestamptz not null default now(),
  estado      text        not null
              check (estado in ('recibido','en_proceso','aprobado','entregado','cancelado')),
  nota        text
);

alter table tramite_historial enable row level security;
-- Sin políticas públicas — solo service_role.

create index if not exists idx_historial_tramite_ts
  on tramite_historial (tramite_id, ts);


-- ──────────────────────────────────────────────────────────────
-- TABLA: tramite_pagos_log  (auditoría interna de pagos)
-- Registra cada toggle de pago con tipos correctos y FK real.
-- Permite rastrear si alguien desmarcó y volvió a marcar un pago.
-- ──────────────────────────────────────────────────────────────
create table if not exists tramite_pagos_log (
  id          uuid        primary key default gen_random_uuid(),
  tramite_id  uuid        not null references tramites(id) on delete cascade,
  ts          timestamptz not null default now(),
  campo       text        not null
              check (campo in ('pago_inicial','pago_final','pago_devuelto')),
  valor       boolean     not null,  -- true = marcado, false = desmarcado
  metodo      text
              check (metodo in ('efectivo','transferencia','nequi','daviplata','otro')),
  nota        text
);

alter table tramite_pagos_log enable row level security;
-- Sin políticas públicas — solo service_role.

create index if not exists idx_pagos_log_tramite_ts
  on tramite_pagos_log (tramite_id, ts);


-- ──────────────────────────────────────────────────────────────
-- TABLA: comparendo_solicitudes
-- ──────────────────────────────────────────────────────────────
create table if not exists comparendo_solicitudes (
  id                  uuid        primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  nombre              text        not null,
  cedula              text,
  telefono            text        not null,
  tipo                text        not null check (tipo in ('fisico', 'fotomulta')),
  fecha_comparendo    date        not null,
  numero_comparendo   text,
  descuento_estimado  text,
  fecha_curso         text,
  estado              text        not null default 'pendiente'
                      check (estado in ('pendiente', 'en_gestion', 'atendido')),
  deleted_at          timestamptz
);

alter table comparendo_solicitudes enable row level security;
-- Sin políticas públicas — solo service_role.

create index if not exists idx_comparendos_estado
  on comparendo_solicitudes (estado);


-- ──────────────────────────────────────────────────────────────
-- TRIGGER: estado inicial al crear un trámite → tramite_historial
-- ──────────────────────────────────────────────────────────────
create or replace function trg_historial_on_insert()
returns trigger language plpgsql as $$
begin
  insert into tramite_historial (tramite_id, ts, estado)
  values (NEW.id, NEW.created_at, NEW.estado);
  return NEW;
end;
$$;

drop trigger if exists trg_tramite_insert_historial on tramites;
create trigger trg_tramite_insert_historial
  after insert on tramites
  for each row execute function trg_historial_on_insert();


-- ──────────────────────────────────────────────────────────────
-- TRIGGER: cambios en UPDATE → historial y pagos_log
-- ──────────────────────────────────────────────────────────────
create or replace function trg_tramite_on_update()
returns trigger language plpgsql as $$
begin
  -- Historial de estados lo maneja la acción del servidor (para incluir nota)

  -- Toggle pago_inicial → log interno
  if OLD.pago_inicial is distinct from NEW.pago_inicial then
    insert into tramite_pagos_log (tramite_id, campo, valor, metodo)
    values (
      NEW.id,
      'pago_inicial',
      NEW.pago_inicial,
      case when NEW.pago_inicial then NEW.pago_inicial_metodo else null end
    );
  end if;

  -- Toggle pago_final → log interno
  if OLD.pago_final is distinct from NEW.pago_final then
    insert into tramite_pagos_log (tramite_id, campo, valor, metodo)
    values (
      NEW.id,
      'pago_final',
      NEW.pago_final,
      case when NEW.pago_final then NEW.pago_final_metodo else null end
    );
  end if;

  -- Toggle pago_devuelto → log interno
  if OLD.pago_devuelto is distinct from NEW.pago_devuelto then
    insert into tramite_pagos_log (tramite_id, campo, valor)
    values (NEW.id, 'pago_devuelto', NEW.pago_devuelto);
  end if;

  return NEW;
end;
$$;

drop trigger if exists trg_tramite_on_update on tramites;
create trigger trg_tramite_on_update
  after update on tramites
  for each row execute function trg_tramite_on_update();


-- ──────────────────────────────────────────────────────────────
-- TABLA: rate_limits  (contadores compartidos entre instancias)
-- Ver lib/rateLimit.ts — capa durable del rate limiting.
-- ──────────────────────────────────────────────────────────────
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

revoke execute on function check_rate_limit(text, integer, integer) from public, anon, authenticated;


-- ──────────────────────────────────────────────────────────────
-- STORAGE BUCKET: review-photos
-- ──────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
  values ('review-photos', 'review-photos', true)
  on conflict (id) do nothing;

create policy "Lectura pública de fotos de reseñas"
  on storage.objects for select
  using (bucket_id = 'review-photos');
