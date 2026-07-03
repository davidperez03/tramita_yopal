# Tramita Yopal

Sitio web de gestión de trámites vehiculares en Yopal, Casanare.

**URL:** [tramitayopal.com](https://tramitayopal.com)

## Stack

- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **IA:** OpenAI GPT-4o mini (chatbot y validador)
- **Deploy:** Vercel

## Estructura

```
app/                    # Rutas Next.js
  api/                  # Endpoints (chat, validate, indexnow)
  tramites/[servicio]/[ciudad]/  # 114 páginas SEO dinámicas
  prescripcion-comparendos/
  politica-privacidad/
  terminos/
components/             # Componentes React
lib/                    # Lógica compartida
  constants.ts          # Datos del negocio, servicios, FAQs
  seo-data.ts           # Ciudades y servicios SEO
  animations.ts         # Constantes de animación
public/                 # Assets estáticos
```

## Variables de entorno

```bash
OPENAI_API_KEY=                  # API key de OpenAI (chatbot y validador)
INDEXNOW_KEY=tramitayopal2024    # Clave IndexNow para notificar buscadores
NEXT_PUBLIC_SUPABASE_URL=        # URL del proyecto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Clave anónima (lecturas públicas con RLS)
SUPABASE_SERVICE_ROLE_KEY=       # Clave service_role (solo servidor)
WHATSAPP_ACCESS_TOKEN=           # WhatsApp Cloud API (Meta) — notificaciones a clientes
WHATSAPP_PHONE_NUMBER_ID=        # ID del número emisor en WhatsApp Cloud API
CRON_SECRET=                     # Protege /api/cron/notificaciones (Vercel lo envía solo)
CALLMEBOT_API_KEY=               # Notificación WhatsApp interna (opcional)
SENTRY_ORG=                      # Sentry (opcional, solo build)
SENTRY_PROJECT=
```

Sin `WHATSAPP_*` las notificaciones quedan encoladas (estado `pendiente` en la
tabla `notificaciones`) y se envían cuando se configuren las credenciales.

## Base de datos (Supabase)

- `supabase/schema.sql` — schema completo (v7). La base se crea desde cero:
  pegar todo el archivo en Supabase > SQL Editor. Único archivo fuente, sin migraciones.

## Roles

Los roles viven en `app_metadata.role` de Supabase Auth. Un usuario **sin** role
es tramitador (mínimo privilegio): solo ve sus trámites asignados, sin información
financiera, y puede avanzar estados (nunca cancelar). Para volver admin a un usuario:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
where email = 'tu@correo.com';
```

⚠️ Ejecuta esto para tu propio usuario apenas lo crees, o entrarás al panel restringido.

## Desarrollo local

```bash
npm install
npm run dev
```
