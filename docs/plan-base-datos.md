# Plan de base de datos — Fase 2: Clientes, Notificaciones y Roles

> **Estado: PROPUESTA — pendiente de aprobación.** Nada de esto se ha ejecutado en Supabase.
> Fecha: julio 2026

## Objetivo

Pasar de "lista de trámites" a un sistema de gestión con:

1. **Clientes como entidad** — historial por cliente, recompra, recordatorios.
2. **Notificaciones automáticas** — WhatsApp al cliente cuando su trámite cambia de estado.
3. **Recordatorios de vencimientos** — SOAT, tecnomecánica, licencias (ingreso recurrente).
4. **Roles** — admin (ustedes) vs. tramitador (quien ejecuta los trámites).

---

## 1. Tabla `clientes`

Hoy cada trámite repite `cliente_nombre/telefono/ciudad`. Se normaliza:

```sql
create table clientes (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  nombre       text        not null,
  telefono     text        unique,          -- clave natural de contacto (WhatsApp)
  cedula       text        unique,
  ciudad       text,
  email        text,
  notas        text,
  deleted_at   timestamptz
);

alter table tramites add column cliente_id uuid references clientes(id);
```

**Migración de datos**: script que agrupa trámites existentes por teléfono
(y por nombre cuando no hay teléfono), crea el cliente y enlaza `cliente_id`.
Las columnas `cliente_nombre/telefono/ciudad` de `tramites` se conservan un
tiempo como respaldo desnormalizado y se eliminan en una migración posterior.

**Qué habilita**: ficha de cliente en el admin con todos sus trámites,
búsqueda por cédula, y la base para recordatorios y campañas.

## 2. Tabla `vehiculos` (opcional pero recomendada)

Los recordatorios de vencimiento son por vehículo, no por cliente:

```sql
create table vehiculos (
  id                    uuid primary key default gen_random_uuid(),
  cliente_id            uuid not null references clientes(id),
  placa                 text not null unique,
  tipo                  text,              -- carro / moto / otro
  soat_vence            date,
  tecno_vence           date,
  created_at            timestamptz not null default now()
);
```

**Qué habilita**: "su SOAT vence en 30 días, ¿se lo gestionamos?" — la fuente
de ingreso recurrente más barata que existe: el cliente ya confió en ustedes.

## 3. Notificaciones automáticas de estado

```sql
create table notificaciones (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  tramite_id   uuid        references tramites(id) on delete cascade,
  cliente_id   uuid        references clientes(id),
  canal        text        not null default 'whatsapp'
               check (canal in ('whatsapp','sms','email')),
  plantilla    text        not null,       -- ej: 'estado_cambiado', 'recordatorio_soat'
  destinatario text        not null,       -- teléfono/email al momento del envío
  contenido    text        not null,
  estado       text        not null default 'pendiente'
               check (estado in ('pendiente','enviada','fallida')),
  enviada_at   timestamptz,
  error        text
);
```

**Flujo**: `updateEstado()` inserta la notificación en estado `pendiente` y un
worker la envía (con reintentos). Así el cambio de estado nunca se bloquea si
el proveedor de WhatsApp está caído, y queda auditoría completa de qué se
envió a quién.

**Proveedor WhatsApp — decisión pendiente**:

| Opción | Costo | Nota |
|---|---|---|
| CallMeBot (actual) | Gratis | Solo sirve para avisarles a ustedes, no a clientes. No sirve para esto. |
| WhatsApp Cloud API (Meta) | ~gratis hasta 1.000 conversaciones/mes | La opción seria. Requiere verificar el negocio en Meta. **Recomendada.** |
| Twilio WhatsApp | ~USD 0,005/msj + plantillas | Más simple de integrar, más caro a escala. |

**Worker de envío**: Vercel Cron (cada minuto) que procesa `pendiente` en lotes.

## 4. Recordatorios de vencimientos

Con `vehiculos.soat_vence/tecno_vence`, un Vercel Cron diario:

1. Busca vehículos con vencimiento en 30/15/5 días.
2. Inserta en `notificaciones` con plantilla `recordatorio_soat` / `recordatorio_tecno`.
3. Marca en una tabla `recordatorios_enviados` para no repetir.

## 5. Roles: admin vs. tramitador

Sin tabla nueva — se usa `app_metadata.role` de Supabase Auth:

- `admin`: todo (ustedes).
- `tramitador`: ve solo los trámites que tiene asignados, puede cambiar estado
  y registrar sus costos; **no ve** honorarios, métricas financieras ni datos
  de otros tramitadores.

```sql
alter table tramites add column asignado_a uuid references auth.users(id);
```

Cambios de código: `requireAdmin()` se divide en `requireRole('admin')` y
`requireRole('admin' | 'tramitador')`, y las server actions de trámites filtran
por `asignado_a` cuando el rol es tramitador.

**Paso manual previo** (para no dejar a nadie por fuera): asignar
`app_metadata.role = 'admin'` al usuario actual desde el dashboard de Supabase
antes de desplegar el cambio de código.

## 6. Documentos adjuntos (fase posterior)

Bucket **privado** `tramite-docs` en Supabase Storage + tabla `tramite_documentos`
(tramite_id, tipo: cédula/tarjeta/mandato/otro, path, subido_por). Acceso solo
por URL firmada de corta duración. Se deja para después de notificaciones.

---

## Orden de implementación propuesto

| Paso | Qué | Depende de |
|---|---|---|
| 1 | `clientes` + ficha en admin | ✅ **Implementado** (base desde cero con schema.sql v6, sin backfill) |
| 2 | Roles admin/tramitador + `asignado_a` | ✅ **Implementado** — rol en app_metadata, panel restringido del tramitador, asignación desde la tarjeta del trámite |
| 3 | `notificaciones` + WhatsApp Cloud API + worker | ✅ **Implementado** — falta configurar `WHATSAPP_ACCESS_TOKEN`/`WHATSAPP_PHONE_NUMBER_ID` (verificación del negocio en Meta — **iniciar ya**) |
| 4 | `vehiculos` + recordatorios de vencimiento | 3 |
| 5 | Documentos adjuntos | — |

## Decisiones que necesito de ustedes

1. **¿WhatsApp Cloud API (Meta)?** Si sí, iniciar la verificación del negocio en
   Meta Business ya mismo — es el paso lento de todo el plan.
2. **¿Los tramitadores tendrán acceso al sistema** (rol propio) o siguen
   coordinándose por WhatsApp? Define si el paso 2 va ahora o después.
3. **¿Capturamos cédula del cliente** en el formulario de nuevo trámite? Útil
   para trámites y para identificar clientes, pero es dato sensible (habeas
   data — actualizar política de privacidad).
