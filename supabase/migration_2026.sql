-- ============================================================
-- MIGRACIÓN: tipos[] multi-servicio y costos operativos
-- Ejecutar en Supabase > SQL Editor sobre base existente
-- ============================================================

-- 1. tipo text → tipos text[]
ALTER TABLE tramites RENAME COLUMN tipo TO tipo_legacy;
ALTER TABLE tramites ADD COLUMN tipos text[] NOT NULL DEFAULT '{}';
UPDATE tramites SET tipos = ARRAY[tipo_legacy] WHERE tipo_legacy IS NOT NULL AND tipo_legacy <> '';
ALTER TABLE tramites DROP COLUMN tipo_legacy;

CREATE INDEX IF NOT EXISTS idx_tramites_tipos ON tramites USING GIN (tipos);

-- 2. Renombrar honorarios_tramitador → valor_honorarios (si viene de la migración anterior)
--    o simplemente verifica que valor_honorarios ya exista.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name='tramites' AND column_name='honorarios_tramitador') THEN
    ALTER TABLE tramites RENAME COLUMN honorarios_tramitador TO valor_honorarios;
    ALTER TABLE tramites DROP COLUMN IF EXISTS honorarios_envio;
  END IF;
END $$;

-- 3. Costos operativos (se registran al cierre del trámite)
ALTER TABLE tramites ADD COLUMN IF NOT EXISTS costo_tramitador  integer NOT NULL DEFAULT 0;
ALTER TABLE tramites ADD COLUMN IF NOT EXISTS costo_envio       integer NOT NULL DEFAULT 0;
ALTER TABLE tramites ADD COLUMN IF NOT EXISTS costo_imprevistos integer NOT NULL DEFAULT 0;
