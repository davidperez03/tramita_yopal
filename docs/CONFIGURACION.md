# Guía de configuración — Tramita Yopal

> Paso a paso de todo lo que falta configurar para dejar el sistema 100% operativo.
> Escrita para sobrevivir sin el contexto del chat. Última actualización: julio 2026.

## Estado del código (qué está hecho)

| Área | Estado |
|---|---|
| Sitio público + 114 páginas SEO + guías (`/guias`) | ✅ Listo |
| Seguridad: rate limiting durable, CSP/HSTS, validación de formularios | ✅ Listo |
| Panel admin: trámites, clientes, comparendos, reseñas, export CSV | ✅ Listo |
| Roles admin/tramitador con panel restringido y asignación | ✅ Listo |
| Notificaciones WhatsApp (cola + envío + cron de reintentos) | ✅ Listo (falta configurar Meta) |
| Seguimiento público por código | ✅ Listo |
| Políticas de privacidad y términos actualizados | ✅ Listo |

Lo que **falta es configuración externa** (Supabase, Vercel, Meta, Google), no código.

---

## 1. Supabase (base de datos) — OBLIGATORIO

1. Crea un proyecto nuevo en [supabase.com](https://supabase.com) (región recomendada: `us-east-1`).
2. Ve a **SQL Editor** → pega **todo** el contenido de `supabase/schema.sql` → Run.
   Es un solo archivo (v9); no hay migraciones separadas.
3. Ve a **Authentication → Users → Add user** y crea tu usuario admin con correo y contraseña.
4. **CRÍTICO — márcate como admin.** En SQL Editor ejecuta (con tu correo):

   ```sql
   update auth.users
   set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
   where email = 'tu@correo.com';
   ```

   Sin esto entrarás al panel restringido de tramitador. Cierra sesión y vuelve a entrar
   después de ejecutarlo.
5. Copia las credenciales desde **Settings → API**:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ secreta, nunca en el navegador)

## 2. Vercel (hosting) — OBLIGATORIO

1. Importa el repo en [vercel.com](https://vercel.com) (framework: Next.js, sin config extra).
2. En **Settings → Environment Variables** agrega (Production + Preview):

   | Variable | Valor | Obligatoria |
   |---|---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | del paso 1.5 | ✅ |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | del paso 1.5 | ✅ |
   | `SUPABASE_SERVICE_ROLE_KEY` | del paso 1.5 | ✅ |
   | `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com) → API keys | ✅ (chatbot y validador) |
   | `CRON_SECRET` | cadena aleatoria larga (ej. `openssl rand -hex 32`) | ✅ |
   | `INDEXNOW_KEY` | `tramitayopal2024` (o la que esté en producción) | Recomendada |
   | `WHATSAPP_ACCESS_TOKEN` | del paso 3 | Cuando esté Meta |
   | `WHATSAPP_PHONE_NUMBER_ID` | del paso 3 | Cuando esté Meta |
   | `CALLMEBOT_API_KEY` | opcional (aviso interno de comparendos) | Opcional |
   | `SENTRY_ORG` / `SENTRY_PROJECT` | opcional (monitoreo de errores) | Opcional |

3. Redeploy. El cron de `vercel.json` (reintento de notificaciones, diario 8 a.m. Bogotá)
   se registra solo; Vercel envía el header `Authorization: Bearer CRON_SECRET` automáticamente.
4. Dominio: **Settings → Domains** → `tramitayopal.com` y `www` → apuntar DNS según indique Vercel.
5. Al abrir el sitio en producción, revisa la consola del navegador: si la CSP
   (Content-Security-Policy en `next.config.js`) bloqueara algún recurso, ahí aparece.

## 3. WhatsApp Cloud API (notificaciones a clientes) — EL PASO LENTO, INICIAR YA

Las notificaciones ya están programadas; sin estas credenciales quedan **en cola**
(tabla `notificaciones`, estado `pendiente`) y se envían solas al configurarlas.

1. Crea/verifica el negocio en [business.facebook.com](https://business.facebook.com)
   (verificación del negocio: puede tardar días — este es el cuello de botella).
2. En [developers.facebook.com](https://developers.facebook.com) → **Create App** → tipo *Business* → agrega el producto **WhatsApp**.
3. Registra el **número de teléfono** emisor (uno distinto al WhatsApp personal del negocio).
4. Genera un **token permanente**: Business Settings → System users → crea un system user
   admin → Generate token con permisos `whatsapp_business_messaging` y `whatsapp_business_management`.
5. Copia a Vercel:
   - Token permanente → `WHATSAPP_ACCESS_TOKEN`
   - **Phone number ID** (no el número, el ID que aparece en la consola de WhatsApp) → `WHATSAPP_PHONE_NUMBER_ID`
6. **Limitación de la ventana de 24 h**: Meta solo permite texto libre dentro de las 24 h
   posteriores al último mensaje del cliente. Para avisos fuera de ventana se necesitan
   **plantillas pre-aprobadas** (Message Templates). Cuando la cuenta esté activa,
   registrar 4 plantillas (en_proceso, aprobado, entregado, cancelado) y adaptar
   `lib/whatsapp.ts` para usarlas — cambio pequeño, pedirlo en una sesión de Claude.

## 4. Crear tramitadores (cuando los haya)

1. Supabase → **Authentication → Add user** con el correo del tramitador.
   **No le pongas rol**: sin rol = tramitador (mínimo privilegio).
2. El tramitador entra por `/admin` con su correo: verá solo sus trámites asignados,
   sin valores ni pagos, y podrá avanzar estados (nunca cancelar).
3. Para asignarle un trámite: panel admin → expandir la tarjeta del trámite → selector **Tramitador**.

## 5. SEO / posicionamiento — GRATIS Y DE ALTO IMPACTO

1. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)):
   verifica `tramitayopal.com` (por DNS) → **Sitemaps** → envía `https://tramitayopal.com/sitemap.xml`.
2. **Google Business Profile** ([business.google.com](https://business.google.com)):
   crea el perfil "Tramita Yopal" con dirección, horario, fotos y categoría
   "Servicio de gestoría". Pide reseñas a los clientes ahí también — es lo que más
   mueve el mapa de Google en búsquedas locales.
3. **Bing Webmaster Tools**: importa desde Search Console (2 clics). IndexNow ya está integrado.
4. Ritmo de contenido: 1–2 guías nuevas al mes en `lib/guias.ts` apuntando a búsquedas
   reales ("traslado de cuenta a Yopal", "impuesto vehicular Casanare", "SOAT vencido qué hacer").

## 6. Sentry (monitoreo de errores) — OPCIONAL

Proyecto en [sentry.io](https://sentry.io) → copiar `SENTRY_ORG` y `SENTRY_PROJECT` a Vercel.
El código ya está instrumentado.

---

## Roadmap pendiente (para futuras sesiones)

En orden de impacto sugerido:

1. **Plantillas aprobadas de WhatsApp** (cuando Meta apruebe la cuenta) — ver paso 3.6.
2. **Vehículos + recordatorios de vencimiento** (SOAT/tecnomecánica): tabla `vehiculos` nueva,
   cron diario que encola recordatorios a 30/15/5 días. Sin diseñar aún en detalle.
3. **Documentos adjuntos** por trámite (bucket privado + URLs firmadas). Sin diseñar aún.
4. **Más guías SEO** (2–3 por mes).
5. **Paginación server-side del panel** cuando pasen de ~500 trámites.
6. Eliminar `CALLMEBOT_API_KEY` cuando las notificaciones Cloud API estén activas
   (migrar el aviso interno de comparendos al mismo canal).

## Agregar o editar trámites (catálogo único)

Todo el catálogo de trámites vive en **`lib/seo-data.ts` → `SEO_SERVICES`**
(hay un instructivo en el propio archivo). Al agregar una entrada ahí se
generan solas: las tarjetas de la home, los enlaces del footer, las páginas
`/tramites/[slug]/[ciudad]` con el sitemap, los requisitos que recita el
chatbot y las opciones del formulario del panel admin.

**Para actualizar requisitos** de un trámite: edita solo su arreglo
`requisitos` en ese archivo — se refleja en páginas de servicio, chatbot y
guías con el siguiente deploy. No hay más copias que mantener.

## Archivos clave para orientarse

- `supabase/schema.sql` — toda la base de datos (v9), único archivo SQL.
- `lib/reglas-negocio.ts` — reglas legales/financieras compartidas (base del
  avalúo, umbrales de descuento de comparendos, texto de multas) — cambiar
  aquí, no archivo por archivo.
- `lib/seo-data.ts` — ciudades, servicios y su contenido SEO. `lib/guias.ts` — guías.
- `lib/notificaciones.ts` + `lib/whatsapp.ts` — mensajes al cliente.
- `app/admin/` — panel (admin y tramitador). `lib/auth.ts` — roles.
- `README.md` — stack, variables de entorno y snippet SQL de admin.
