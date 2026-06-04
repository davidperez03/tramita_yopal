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
OPENAI_API_KEY=          # API key de OpenAI (chatbot y validador)
INDEXNOW_KEY=tramitayopal2024  # Clave IndexNow para notificar buscadores
```

## Desarrollo local

```bash
npm install
npm run dev
```
