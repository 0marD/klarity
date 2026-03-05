# Klarity — Sitio Web Corporativo

> *"No vendemos código. Resolvemos negocios."*

Sitio web de la firma de desarrollo de software **Klarity**. Construido con Next.js 16, TypeScript estricto, Tailwind CSS v4, Supabase y soporte nativo para español e inglés.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript 5 — `strict: true` |
| Estilos | Tailwind CSS v4 + CSS Variables |
| Internacionalización | next-intl 4 — ES (default) + EN |
| Base de datos | Supabase (PostgreSQL + Realtime + Storage) |
| Auth | Supabase Auth (Magic Link) |
| Email | Resend + React Email |
| Animaciones | Framer Motion 12 |
| Formularios | React Hook Form + Zod |
| Tests unitarios | Vitest + Testing Library |
| Tests E2E | Playwright |
| Deploy | Vercel |

---

## Requisitos

- Node.js ≥ 20
- Yarn ≥ 1.22
- Cuenta en [Supabase](https://supabase.com) (para funcionalidad completa)

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <repo-url> klarity
cd klarity

# 2. Instalar dependencias
yarn install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales

# 4. Iniciar servidor de desarrollo
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`.

---

## Variables de Entorno

Copia `.env.local.example` a `.env.local` y completa los valores:

```bash
# Supabase (requerido para auth, cotizaciones y panel admin)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # Solo servidor — nunca exponer al cliente

# Email — Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=hola@klarity.dev
RESEND_FROM_EMAIL_EN=hello@klarity.dev

# IA — OpenAI
OPENAI_API_KEY=

# CRM (opcional)
HUBSPOT_ACCESS_TOKEN=

# Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=

# WhatsApp — formato: 521XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=

# Seguridad
NEXTAUTH_SECRET=                  # openssl rand -base64 32
```

> Sin Supabase configurado, el sitio funciona con datos estáticos. El panel admin y el formulario de cotización requieren Supabase.

---

## Comandos

```bash
# Desarrollo
yarn dev                # Servidor de desarrollo (Turbopack)

# Calidad de código
yarn lint               # ESLint
yarn lint:fix           # ESLint con auto-fix
yarn format             # Prettier
yarn type-check         # TypeScript sin emitir archivos

# Tests
yarn test               # Vitest (unitarios)
yarn test:watch         # Vitest en modo watch
yarn test:coverage      # Cobertura de tests

# Tests E2E (requiere servidor corriendo o lo inicia solo)
yarn test:e2e           # Playwright headless
yarn test:e2e:ui        # Playwright con interfaz visual

# Build
yarn build              # Build de producción
yarn start              # Servidor de producción
yarn analyze            # Bundle analyzer
```

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── [locale]/              # Rutas localizadas (ES sin prefijo, EN con /en)
│   │   ├── page.tsx           # Home
│   │   ├── portafolio/        # Lista + detalle [slug]
│   │   ├── servicios/
│   │   ├── cotizacion/        # Formulario multi-paso
│   │   ├── nosotros/
│   │   ├── blog/
│   │   ├── contacto/
│   │   └── login/             # Magic Link
│   ├── admin/                 # Panel de administración (requiere auth)
│   │   ├── dashboard/
│   │   ├── cotizaciones/      # Kanban drag & drop
│   │   ├── proyectos/
│   │   └── servicios/
│   ├── api/
│   │   └── quotes/route.ts    # POST con rate limiting
│   ├── offline/page.tsx       # Página PWA sin conexión
│   ├── sitemap.ts             # Sitemap dinámico
│   └── robots.ts
├── components/
│   ├── atoms/                 # Button, Input, Badge, Logo, ThemeToggle, LanguageSwitcher
│   ├── molecules/             # ProjectCard, ServiceCard, SectionHeader
│   ├── organisms/             # Navbar, Footer, HeroSection, CookieBanner, KanbanBoard
│   └── templates/             # PageLayout, AdminLayout
├── content/                   # Datos estáticos: proyectos, servicios, testimonios
├── hooks/                     # useTheme
├── lib/                       # supabase/, validations/, animations, utils
├── messages/
│   ├── es.json                # Traducciones en español
│   └── en.json                # Traducciones en inglés
└── types/                     # Tipos TypeScript: database, quote, project
```

---

## Internacionalización

El sitio soporta **español** e **inglés** desde el primer deploy. Ambos locales usan prefijo de ruta.

| Idioma | URL |
|---|---|
| Español | `klarity.dev/es/` `klarity.dev/es/portafolio` ... |
| Inglés | `klarity.dev/en/` `klarity.dev/en/portafolio` ... |

- Detección automática por cookie `NEXT_LOCALE` → `Accept-Language` header → fallback ES
- El switch de idioma persiste la preferencia en cookies `klarity_locale` y `NEXT_LOCALE` (1 año)
- Metadatos SEO con `hreflang` alternates en cada página

---

## Páginas Públicas

| Ruta | Descripción |
|---|---|
| `/` | Hero, carrusel de proyectos, servicios destacados, proceso, CTA |
| `/portafolio` | Grid con filtros por tag |
| `/portafolio/[slug]` | Caso de estudio con métricas antes/después |
| `/servicios` | Cards de servicios con toggle de precios |
| `/cotizacion` | Formulario wizard de 3 pasos + Zod |
| `/nosotros` | Filosofía, equipo y valores |
| `/blog` | Artículos MDX |
| `/contacto` | Formulario + datos de contacto |

---

## Panel de Administración

Accesible en `/admin` — requiere sesión activa (Magic Link a email autorizado).

| Sección | Funcionalidad |
|---|---|
| Dashboard | KPIs: cotizaciones del mes, tasa de conversión |
| Cotizaciones | Kanban drag & drop por estado |
| Proyectos | CRUD + upload de imágenes a Supabase Storage |
| Servicios | Tabla de administración |

**Roles:** `admin` → acceso total · `editor` → CRUD proyectos y cotizaciones · `viewer` → solo lectura

---

## PWA

El sitio funciona como Progressive Web App:

- **Manifest** en `/favicon/site.webmanifest`
- **Service Worker** (`/sw.js`) — cache-first para assets, network-first para páginas
- **Página offline** en `/offline` con branding Klarity
- Instalable en móvil y escritorio

**Prompt de instalación** (`PWAInstallPrompt`): modal bilingüe que aparece a los 3.5 s con tres opciones:

| Opción | Comportamiento |
|---|---|
| Instalar | Dispara el prompt nativo del navegador |
| Más tarde | Oculta el modal esta sesión · muestra ícono discreto en esquina inferior izquierda |
| No volver a preguntar | Persiste en `localStorage` · muestra ícono discreto permanente |

El ícono discreto (40 px, opacidad 40 %) desaparece al completar la instalación.

---

## Cookie Consent

Banner GDPR/LFPDPPP localizado (ES/EN) con tres niveles:

- **Esenciales** — siempre activas
- **Analítica** — GA4 (se carga dinámicamente solo si se acepta)
- **Marketing** — GTM remarketing

La preferencia se persiste en `localStorage` (`klarity_cookie_consent`).

---

## Tests E2E — Flujos cubiertos

| Archivo | Escenario |
|---|---|
| `navigation.spec.ts` | Todas las páginas públicas renderizan sin error |
| `quote-form.spec.ts` | Flujo completo del formulario de cotización en ES y EN |
| `language-switch.spec.ts` | Switch ES ↔ EN, URL, cookie y contenido |
| `theme-toggle.spec.ts` | Light/dark, persistencia en localStorage |
| `mobile-nav.spec.ts` | Menú hamburger en 375px |
| `portfolio.spec.ts` | Grid, filtros, navegación a detalle |
| `admin-auth.spec.ts` | Redirect a /login sin sesión, Magic Link |

---

## Notas de UI

| Componente | Detalle |
|---|---|
| `ServiceCard` | Altura uniforme en cada fila: `flex-col h-full` + `flex-1` en descripción |
| Página `/contacto` | Grid `[3fr 2fr]` + `max-w-4xl` — formulario más compacto, columna de info proporcional |
| `LanguageSwitcher` | Ambos locales usan prefijo (`/es/`, `/en/`) — switch escribe `NEXT_LOCALE` y `klarity_locale` |
| `Footer` | Client Component (`useTranslations`) para ser compatible con páginas `'use client'` |

---

## Seguridad

- CSRF tokens en formularios públicos
- CSP headers en `next.config.ts`
- Rate limiting: 3 cotizaciones/IP/hora · 20 mensajes chat/sesión/hora
- Validación Zod en frontend **y** en API Route (siempre)
- `SUPABASE_SERVICE_ROLE_KEY` exclusivamente en servidor
- Row Level Security (RLS) habilitado en todas las tablas

---

## Deploy

El proyecto despliega automáticamente en **Vercel**:

```
main → producción (klarity.dev)
PR    → preview deploy (URL única por PR)
```

Checklist antes de deploy: ver [CLAUDE.md — Sección 20](./CLAUDE.md#20-checklist-antes-de-deploy).

---

## Licencia

Software propietario. Todos los derechos reservados.
Ver [LICENSE](./LICENSE) para los términos completos.

© 2026 Klarity — [klarity.dev](https://klarity.dev)
