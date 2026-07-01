-- Índices para campos de filtro más frecuentes
create index if not exists idx_tramites_estado     on tramites (estado);
create index if not exists idx_tramites_created    on tramites (created_at desc);
create index if not exists idx_tramites_updated    on tramites (updated_at desc nulls last);
create index if not exists idx_comparendos_estado  on comparendo_solicitudes (estado);
create index if not exists idx_reviews_visible     on reviews (visible);

-- Restringir la política de upload anónimo en review-photos
-- Solo el service_role (servidor) puede subir fotos
drop policy if exists "Upload público de fotos de reseñas" on storage.objects;

create policy "Upload de fotos solo desde servidor"
  on storage.objects for insert
  with check (bucket_id = 'review-photos' AND auth.role() = 'service_role');
