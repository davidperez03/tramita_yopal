-- Tabla de auditoría para cambios críticos en trámites
create table if not exists audit_log (
  id          uuid        primary key default gen_random_uuid(),
  ts          timestamptz not null    default now(),
  tabla       text        not null,
  registro_id uuid        not null,
  accion      text        not null,
  campo       text,
  valor_antes text,
  valor_despues text
);

alter table audit_log enable row level security;
-- Sin políticas públicas — solo service_role

-- Función trigger para capturar cambios en tramites
create or replace function fn_audit_tramites()
returns trigger language plpgsql as $$
declare
  cols text[] := array['estado','pago_inicial','pago_final'];
  col  text;
begin
  foreach col in array cols loop
    if (row_to_json(old)->>col) is distinct from (row_to_json(new)->>col) then
      insert into audit_log (tabla, registro_id, accion, campo, valor_antes, valor_despues)
      values ('tramites', new.id, 'update', col,
              row_to_json(old)->>col,
              row_to_json(new)->>col);
    end if;
  end loop;
  return new;
end;
$$;

drop trigger if exists trg_audit_tramites on tramites;
create trigger trg_audit_tramites
  after update on tramites
  for each row execute function fn_audit_tramites();
