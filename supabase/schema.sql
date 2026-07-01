-- ============================================================
-- TRAMITA YOPAL — Supabase Schema
-- Ejecutar en: Supabase > SQL Editor
-- ============================================================


-- ──────────────────────────────────────────────────────────────
-- TABLA: reviews
-- ──────────────────────────────────────────────────────────────
create table if not exists reviews (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null    default now(),
  name         text        not null,
  email        text,
  rating       integer     not null    check (rating between 1 and 5),
  text         text        not null,
  type         text        not null,
  year         text        not null,
  source       text        not null    default 'Tramita Yopal',
  visible      boolean     not null    default false,
  photos       text[]                                          -- hasta 3 URLs de Supabase Storage
);

-- RLS: solo lecturas públicas de reseñas visibles
alter table reviews enable row level security;

create policy "Lectura pública de reseñas visibles"
  on reviews for select
  using (visible = true);


-- ──────────────────────────────────────────────────────────────
-- TABLA: tramites
-- ──────────────────────────────────────────────────────────────
create table if not exists tramites (
  id                  uuid        primary key default gen_random_uuid(),
  created_at          timestamptz not null    default now(),
  updated_at          timestamptz             default now(),

  -- Cliente
  cliente_nombre      text        not null,
  cliente_telefono    text,
  cliente_ciudad      text,
  placa               text,                                    -- Ej: "ABC123"

  -- Trámite
  tipo                text        not null,
  descripcion         text,

  -- Estado del proceso
  estado              text        not null    default 'recibido'
                      check (estado in ('recibido','en_proceso','aprobado','entregado','cancelado')),

  -- Valores económicos (en COP, enteros)
  valor_honorarios    integer     not null    default 0,
  valor_derechos      integer     not null    default 0,
  valor_avaluo        integer     not null    default 0,       -- Solo aplica a Traspaso de Propiedad

  -- Pagos (política 50/50)
  -- pago1 = round((honorarios + derechos) * 0.5) + avaluo
  -- pago2 = round((honorarios + derechos) * 0.5)
  pago_inicial        boolean     not null    default false,
  pago_inicial_fecha  date,
  pago_final          boolean     not null    default false,
  pago_final_fecha    date,

  -- Notas internas (no visibles al cliente)
  notas               text
);

-- RLS: la tabla de trámites es solo para el admin (service_role key)
-- No se expone con la anon key
alter table tramites enable row level security;

-- No hay políticas públicas — el admin usa supabaseAdmin (service_role)


-- ──────────────────────────────────────────────────────────────
-- STORAGE BUCKET: review-photos
-- ──────────────────────────────────────────────────────────────
-- Crear manualmente en Supabase > Storage > New bucket:
--   Nombre: review-photos
--   Público: SÍ (para servir URLs públicas de las fotos)
--
-- Política de upload (anon puede subir):
insert into storage.buckets (id, name, public)
  values ('review-photos', 'review-photos', true)
  on conflict (id) do nothing;

create policy "Upload público de fotos de reseñas"
  on storage.objects for insert
  with check (bucket_id = 'review-photos');

create policy "Lectura pública de fotos de reseñas"
  on storage.objects for select
  using (bucket_id = 'review-photos');


-- ──────────────────────────────────────────────────────────────
-- TABLA: comparendo_solicitudes  (Módulo C)
-- ──────────────────────────────────────────────────────────────
create table if not exists comparendo_solicitudes (
  id                  uuid        primary key default gen_random_uuid(),
  created_at          timestamptz not null    default now(),
  nombre              text        not null,
  cedula              text,
  telefono            text        not null,
  tipo                text        not null    check (tipo in ('fisico', 'fotomulta')),
  fecha_comparendo    date        not null,
  numero_comparendo   text,
  descuento_estimado  text,                   -- '50%' | '25%' | 'ninguno'
  fecha_curso         text,                   -- fecha y hora preferida para el curso CIA (opcional, formato ISO local)
  estado              text not null default 'pendiente'
                      check (estado in ('pendiente', 'en_gestion', 'atendido'))
);

alter table comparendo_solicitudes enable row level security;
-- Sin políticas públicas — solo admin via service_role
