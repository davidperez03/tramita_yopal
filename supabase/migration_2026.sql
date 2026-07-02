-- ============================================================
-- MIGRACIÓN: tipos[] y desglose de honorarios
-- Ejecutar en Supabase > SQL Editor sobre base existente
-- ============================================================

-- 1. tipo text → tipos text[]
ALTER TABLE tramites RENAME COLUMN tipo TO tipo_legacy;
ALTER TABLE tramites ADD COLUMN tipos text[] NOT NULL DEFAULT '{}';
UPDATE tramites SET tipos = ARRAY[tipo_legacy] WHERE tipo_legacy IS NOT NULL AND tipo_legacy <> '';
ALTER TABLE tramites DROP COLUMN tipo_legacy;

-- 2. valor_honorarios → honorarios_tramitador + honorarios_envio
ALTER TABLE tramites RENAME COLUMN valor_honorarios TO honorarios_tramitador;
ALTER TABLE tramites ADD COLUMN honorarios_envio integer NOT NULL DEFAULT 0;

-- Índice útil para buscar por tipo
CREATE INDEX IF NOT EXISTS idx_tramites_tipos ON tramites USING GIN (tipos);
