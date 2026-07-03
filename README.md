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
CALLMEBOT_API_KEY=               # Notificación WhatsApp interna (opcional)
SENTRY_ORG=                      # Sentry (opcional, solo build)
SENTRY_PROJECT=
```

## Base de datos (Supabase)

- `supabase/schema.sql` — schema completo para una base nueva.
- `supabase/migration_2026.sql` — migración: tipos[] multi-servicio y costos operativos.
- `supabase/migration_seguridad.sql` — migración: rate limiting durable (**pendiente de ejecutar**;
  mientras no se aplique, el rate limit funciona solo en memoria por instancia).

## Desarrollo local

```bash
npm install
npm run dev
```
