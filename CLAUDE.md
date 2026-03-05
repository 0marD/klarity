# CLAUDE.md — Klarity Website

> Este archivo define los lineamientos completos para el desarrollo del sitio web de **Klarity**.
> Todo agente de IA, desarrollador o colaborador debe leer y seguir este documento antes de escribir cualquier línea de código.

---

## 1. Identidad de Marca

### Filosofía
> *"No vendemos código. Resolvemos negocios."*

Klarity es una firma de desarrollo de software orientada a resultados de negocio. La comunicación debe transmitir **claridad, confianza y sofisticación** — nunca jerga técnica innecesaria.

### Paleta de Colores
```css
/* ─── Light Mode (PRIMARIO — variante oficial del sitio) ─── */
--color-background:   #F2F0EB;   /* Crema cálido */
--color-surface:      #FFFFFF;
--color-text-primary: #1A1A1A;   /* Negro casi puro */
--color-text-muted:   #4A4A4A;

/* ─── Dark Mode (variante alternativa, activable por el usuario) ─── */
--color-bg-dark:      #1B2A3E;   /* Azul marino profundo */
--color-surface-dark: #243447;
--color-text-dark:    #F2F0EB;

/* ─── Acento universal ─── */
--color-gold:         #D4B483;
--color-gold-hover:   #C4A06F;

/* ─── Semánticos ─── */
--color-success: #4CAF78;
--color-warning: #E8A838;
--color-error:   #D94F4F;
--color-info:    #4A90D9;
```

> **Decisión de diseño:** El modo claro (crema + negro) es el modo por defecto al cargar el sitio.
> El modo oscuro (marino + dorado) se activa mediante toggle y se persiste en `localStorage`.

### Tipografía
```css
/* Display / headings — personalidad de marca */
--font-display: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;

/* Body / UI — legibilidad */
--font-body: 'Inter', 'DM Sans', system-ui, sans-serif;

/* Escala tipográfica (rem) */
--text-xs:   0.75rem;    /* 12px */
--text-sm:   0.875rem;   /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg:   1.125rem;   /* 18px */
--text-xl:   1.25rem;    /* 20px */
--text-2xl:  1.5rem;     /* 24px */
--text-3xl:  1.875rem;   /* 30px */
--text-4xl:  2.25rem;    /* 36px */
--text-5xl:  3rem;       /* 48px */
--text-6xl:  3.75rem;    /* 60px */
```

### Logo
- **Símbolo:** Monograma `Kl` en serif elegante.
- **Light (por defecto):** símbolo negro `#1A1A1A` sobre fondo crema `#F2F0EB`.
- **Dark (toggle):** símbolo dorado `#D4B483` sobre fondo marino `#1B2A3E`.
- Nunca distorsionar. Área de respiro mínima = 1× altura del símbolo.

### Voz y Tono
- Directo, profesional, sin tecnicismos gratuitos.
- Hablar en términos de impacto de negocio: tiempo ahorrado, errores eliminados, procesos automatizados.
- Idiomas: **Español** y **Inglés** desde el inicio (ver sección i18n).

---

## 2. Stack Tecnológico

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR, SSG, RSC, i18n nativo |
| Lenguaje | **TypeScript** strict mode | Tipado fuerte en todo el proyecto |
| Estilos | **Tailwind CSS v4** + CSS Variables | Tokens de marca como variables CSS |
| Componentes | **shadcn/ui** + propios | Headless, accesibles |
| Animaciones | **Framer Motion** | Microinteracciones y carrusel |
| Backend / DB | **Supabase** | PostgreSQL + Realtime + Storage + Auth |
| ORM | **Drizzle ORM** | Type-safe, ligero |
| Auth | **Supabase Auth** | OAuth2 / JWT, roles vía tabla `profiles` |
| Email | **Resend** + **React Email** | Transaccional tipado |
| Blog | **MDX** + next-mdx-remote | Artículos con componentes React |
| i18n | **next-intl** | ES + EN desde el inicio |
| CRM | HubSpot API / Zoho CRM API | Gestión de leads automática |
| IA | OpenAI GPT-4o-mini + Vercel AI SDK | Chatbot + sugerencias de cotización |
| Analítica | Google Analytics 4 + GTM | Eventos personalizados |
| Monitoreo | **Sentry** + **LogRocket** | Errores y sesiones |
| Testing | Jest + Testing Library + Playwright | Unit + E2E |
| CI/CD | **Vercel** | Deploy automático, preview por PR |
| CDN | Vercel Edge Network | Assets estáticos |

---

## 3. Principios de Código

### Clean Code
- Nombres descriptivos en inglés (variables, funciones, archivos).
- Funciones con responsabilidad única — máx. 40 líneas.
- Cero `console.log` en producción.
- Early returns para reducir anidamiento.
- Comentar el "por qué", nunca el "qué".
- Sin código muerto ni imports sin usar.

### Atomic Design
```
src/
├── components/
│   ├── atoms/        # Button, Input, Badge, Icon, Logo, ThemeToggle, LanguageSwitcher
│   ├── molecules/    # ProjectCard, ServiceCard, PricingSlider, QuoteKanbanCard, NotificationBadge
│   ├── organisms/    # Navbar, Footer, ProjectCarousel, QuoteForm, KanbanBoard, Chatbot, CookieBanner
│   └── templates/    # PageLayout, AdminLayout, AuthLayout
├── features/         # portfolio/ | quotes/ | blog/ | ai/ | analytics/
├── hooks/            # useTheme, useLocale, useRealtime, useQuotes, useNotifications
├── lib/              # supabase/, resend, openai, hubspot, gtm, validations/
├── messages/         # es.json, en.json  ← traducciones
└── types/            # database.ts, quote.ts, project.ts
```

### Mobile-First
```css
/* Siempre desde móvil, escalar hacia arriba */
.component {
  padding: 1rem;                                    /* base: 320px+ */
  @media (min-width: 640px)  { padding: 1.25rem; } /* sm */
  @media (min-width: 768px)  { padding: 1.5rem; }  /* md */
  @media (min-width: 1024px) { padding: 2rem; }    /* lg */
  @media (min-width: 1280px) { padding: 2.5rem; }  /* xl */
}
```

### TypeScript
- `"strict": true` en `tsconfig.json`.
- Prohibido `any` — usar `unknown` si es necesario.
- Interfaces para objetos de dominio, types para uniones/aliases.
- **Zod** para validación en runtime (siempre en frontend Y en API Route).

---

## 4. Internacionalización (i18n) — ES + EN desde el inicio

> **Decisión de proyecto:** el sitio soporta español e inglés desde el primer deploy.

### Configuración
```
Librería:         next-intl
Idioma primario:  es (sin prefijo en URL — default)
Idioma secundario: en → /en/...

Detección automática:
  1. Cookie klarity_locale (si el usuario cambió manualmente)
  2. Accept-Language header del navegador
  3. Fallback: es

Estructura de archivos:
  messages/
    es.json    ← todas las cadenas en español
    en.json    ← todas las cadenas en inglés
```

### Reglas de traducción
```
✅ NUNCA hardcodear texto visible en componentes — siempre usar t('key')
✅ Organizar claves por página/componente: "home.hero.title", "nav.portfolio"
✅ Fechas y números con Intl.DateTimeFormat / Intl.NumberFormat (locale-aware)
✅ Precios en MXN con formato local: es → $15,000 MXN / en → MX$15,000
✅ El blog puede tener artículos solo en español inicialmente (marcados con lang: 'es')
✅ Metadata SEO: hreflang alternates en cada página
✅ Open Graph: locale dinámico (es_MX / en_US)
```

### Estructura de mensajes (ejemplo)
```json
// messages/es.json
{
  "nav": {
    "home": "Inicio",
    "portfolio": "Portafolio",
    "services": "Servicios",
    "quote": "Cotizar",
    "about": "Sobre mí",
    "blog": "Blog"
  },
  "home": {
    "hero": {
      "tagline": "No vendemos código. Resolvemos negocios.",
      "cta": "Solicitar cotización"
    }
  },
  "quote": {
    "form": {
      "name": "Nombre completo",
      "submit": "Enviar cotización"
    }
  }
}

// messages/en.json
{
  "nav": {
    "home": "Home",
    "portfolio": "Portfolio",
    "services": "Services",
    "quote": "Get a Quote",
    "about": "About",
    "blog": "Blog"
  },
  "home": {
    "hero": {
      "tagline": "We don't sell code. We solve businesses.",
      "cta": "Request a quote"
    }
  },
  "quote": {
    "form": {
      "name": "Full name",
      "submit": "Submit quote"
    }
  }
}
```

### Selector de idioma (componente `LanguageSwitcher`)
- Ubicado en la navbar, visible en desktop y en menú móvil.
- Muestra bandera + código de idioma (`ES` / `EN`).
- Al cambiar: guardar preferencia en cookie `klarity_locale` (1 año) y redirigir a la URL equivalente en el nuevo locale.

---

## 5. Base de Datos (Supabase)

### Tablas principales
```sql
-- Perfiles / roles
CREATE TABLE profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role       TEXT NOT NULL DEFAULT 'viewer'
             CHECK (role IN ('admin', 'editor', 'viewer')),
  full_name  TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Proyectos del portafolio
CREATE TABLE projects (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,
  -- Títulos y descripciones en ambos idiomas
  title_es     TEXT NOT NULL,
  title_en     TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  cover_url    TEXT,
  tags         TEXT[],
  metrics      JSONB,   -- { "before": "2 días", "after": "2 horas" }
  is_featured  BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  order_index  INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Servicios
CREATE TABLE services (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT UNIQUE NOT NULL,
  title_es       TEXT NOT NULL,
  title_en       TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  icon           TEXT,
  base_price     NUMERIC(10,2),
  is_active      BOOLEAN DEFAULT TRUE,
  order_index    INT DEFAULT 0
);

-- Cotizaciones
CREATE TABLE quotes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name     TEXT NOT NULL,
  client_email    TEXT NOT NULL,
  client_company  TEXT,
  client_phone    TEXT,
  project_type    TEXT NOT NULL,
  modules         TEXT[],
  deadline        TEXT,
  budget_range    TEXT,
  estimated_price NUMERIC(10,2),
  locale          TEXT DEFAULT 'es',  -- idioma del cliente al cotizar
  status          TEXT NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new','reviewing','proposal_sent','closed_won','closed_lost')),
  notes           TEXT,
  crm_lead_id     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- FAQs del chatbot (bilingüe)
CREATE TABLE faqs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_es TEXT NOT NULL,
  question_en TEXT NOT NULL,
  answer_es   TEXT NOT NULL,
  answer_en   TEXT NOT NULL,
  category    TEXT,
  is_active   BOOLEAN DEFAULT TRUE
);

-- Eventos de analítica propia
CREATE TABLE analytics_events (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  payload    JSONB,
  session_id TEXT,
  locale     TEXT,   -- qué idioma usaba el usuario
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Toggle de funcionalidades
CREATE TABLE site_config (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)
```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_published" ON projects
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "admin_manage_projects" ON projects
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "public_insert_quote" ON quotes
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "staff_read_quotes" ON quotes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin','editor'))
  );
```

### Realtime
```typescript
// Suscripción en panel admin — badge de notificaciones
const channel = supabase
  .channel('quotes-realtime')
  .on('postgres_changes', {
    event: 'INSERT', schema: 'public', table: 'quotes'
  }, (payload) => incrementNotificationBadge(payload.new))
  .subscribe()
```

### Performance DB
- Índices: `projects.slug`, `quotes.status`, `quotes.created_at`, `quotes.client_email`, `quotes.locale`.
- Queries paginadas (cursor-based) para listados.
- Point-in-time recovery habilitado (Supabase Pro+).
- Connection pooling con PgBouncer.

---

## 6. Variables de Entorno
```bash
# .env.local.example

# ── Supabase ──────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # Solo servidor — NUNCA exponer al cliente

# ── OpenAI / IA ───────────────────────────────────────────────────
OPENAI_API_KEY=

# ── Resend (email) ────────────────────────────────────────────────
RESEND_API_KEY=
RESEND_FROM_EMAIL=hola@klarity.dev
RESEND_FROM_EMAIL_EN=hello@klarity.dev

# ── CRM ───────────────────────────────────────────────────────────
HUBSPOT_ACCESS_TOKEN=
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=

# ── Analytics ─────────────────────────────────────────────────────
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=

# ── Monitoreo ─────────────────────────────────────────────────────
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
LOGROCKET_APP_ID=

# ── WhatsApp ──────────────────────────────────────────────────────
NEXT_PUBLIC_WHATSAPP_NUMBER=      # Formato: 521XXXXXXXXXX

# ── Seguridad ─────────────────────────────────────────────────────
NEXTAUTH_SECRET=                  # openssl rand -base64 32
CSRF_SECRET=
```

---

## 7. Estructura de Carpetas
```
klarity/
├── app/
│   ├── [locale]/                   # next-intl — rutas localizadas
│   │   ├── (public)/
│   │   │   ├── page.tsx            # Home
│   │   │   ├── portfolio/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── quote/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   └── blog/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/page.tsx
│   │   └── (admin)/
│   │       ├── layout.tsx          # AdminLayout + AuthGuard
│   │       ├── dashboard/page.tsx
│   │       ├── projects/
│   │       ├── quotes/page.tsx     # Kanban
│   │       ├── services/
│   │       ├── faqs/
│   │       └── settings/page.tsx
│   ├── api/
│   │   ├── quotes/route.ts
│   │   ├── ai/
│   │   │   ├── chat/route.ts
│   │   │   └── quote-suggest/route.ts
│   │   └── webhooks/
│   │       ├── hubspot/route.ts
│   │       └── resend/route.ts
│   ├── layout.tsx                  # Root layout
│   └── globals.css
│
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Logo.tsx
│   │   ├── ThemeToggle.tsx         # Light ↔ Dark
│   │   └── LanguageSwitcher.tsx    # ES ↔ EN
│   ├── molecules/
│   │   ├── ProjectCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── QuoteKanbanCard.tsx
│   │   ├── PricingCalculator.tsx
│   │   └── NotificationBadge.tsx
│   ├── organisms/
│   │   ├── Navbar.tsx              # Logo + nav + ThemeToggle + LanguageSwitcher
│   │   ├── Footer.tsx
│   │   ├── ProjectCarousel.tsx
│   │   ├── QuoteForm.tsx
│   │   ├── KanbanBoard.tsx
│   │   ├── Chatbot.tsx
│   │   └── CookieBanner.tsx
│   └── templates/
│       ├── PageLayout.tsx
│       └── AdminLayout.tsx
│
├── messages/
│   ├── es.json                     # Todas las cadenas en español
│   └── en.json                     # Todas las cadenas en inglés
│
├── content/
│   └── blog/                       # MDX — puede ser solo es inicialmente
│       ├── es/
│       └── en/
│
├── hooks/
│   ├── useTheme.ts
│   ├── useLocale.ts
│   ├── useRealtime.ts
│   ├── useQuotes.ts
│   └── useNotifications.ts
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── resend.ts
│   ├── openai.ts
│   ├── hubspot.ts
│   ├── gtm.ts
│   └── validations/
│
├── types/
│   ├── database.ts
│   ├── quote.ts
│   └── project.ts
│
├── public/
│   ├── fonts/
│   ├── images/
│   └── icons/
│
├── __tests__/
│   ├── unit/
│   └── e2e/
│
├── i18n.ts                         # Configuración next-intl
├── middleware.ts                   # Locale detection + auth guard
├── .env.local.example
├── CLAUDE.md
└── next.config.ts
```

---

## 8. Páginas y Funcionalidades

### Home (`/` / `/en`)
- Hero con "Klarity" en serif display + tagline localizada animada.
  - ES: *"No vendemos código. Resolvemos negocios."*
  - EN: *"We don't sell code. We solve businesses."*
- Carrusel de 5 proyectos aleatorios con efecto **float** (Framer Motion: `y: [0, -8, 0]`, duración 3s, `easeInOut`).
- 3 servicios destacados.
- CTA → `/quote` (o `/en/quote`).
- Botón flotante WhatsApp (sticky, esquina inferior derecha).

### Portafolio (`/portfolio`)
- Grid responsivo, filtros por tag.
- Títulos y descripciones en el idioma activo (campos `title_es`/`title_en`).
- Caso de estudio (`/portfolio/[slug]`): descripción localizada, métricas antes/después animadas, tecnologías, galería, CTA.

### Servicios (`/services`)
- Cards con icono, nombre localizado, descripción, precio base.
- Toggle show/hide precios.
- CTA → Calculadora de presupuesto.

### Calculadora de Presupuesto (componente en `/quote`)
```
Paso 1: Tipo de proyecto
Paso 2: Módulos adicionales
Paso 3: Plazo estimado
──────────────────────────
Resultado: Rango de precio estimado + "Formalizar cotización"
```
- Labels y opciones completamente localizadas.

### Cotización (`/quote`)
- Formulario multi-paso: Zod + React Hook Form.
- Guardar `locale` del cliente en la tabla `quotes`.
- Email de confirmación en el idioma del cliente (plantilla ES o EN).
- Rate limiting: máx. 3 envíos/IP/hora.

### Blog (`/blog`)
- MDX con frontmatter: `title`, `date`, `slug`, `excerpt`, `tags`, `readTime`, `lang`.
- Artículos pueden existir solo en ES inicialmente — mostrar aviso si no hay traducción disponible.
- Syntax highlighting con Shiki.

---

## 9. Panel de Administración (`/admin`)

> Solo roles `admin` y `editor`. Sin i18n — el panel opera siempre en español.

### Dashboard
- KPIs: proyectos activos, cotizaciones del mes, tasa de conversión.
- Gráfica por estado (Recharts). Últimas 5 cotizaciones con badge de idioma (ES/EN).

### Kanban de Cotizaciones
```
┌───────────┐  ┌──────────────┐  ┌─────────────────┐  ┌──────────┐
│   Nuevo   │  │  En revisión │  │ Propuesta enviada│  │  Cerrado │
└───────────┘  └──────────────┘  └─────────────────┘  └──────────┘
```
- Drag & drop con dnd-kit.
- Badge de idioma del cliente (ES / EN) en cada card.
- Exportar CSV (incluye columna `locale`).
- Propuesta generada por IA en el idioma del cliente.

### Proyectos
- CRUD con campos de texto en ES y EN side-by-side.
- Upload imágenes → Supabase Storage.
- Toggle publicado/borrador y destacado.

### Configuración
- Toggle de funcionalidades (chatbot, calculadora, blog, CRM, WhatsApp).
- Gestión de FAQs (campos en ES y EN).
- Plantillas de correo por idioma.

---

## 10. Integraciones

### Resend — Email localizado
```typescript
// Selección de plantilla según locale del cliente
async function sendQuoteConfirmation(quote: Quote) {
  const template = quote.locale === 'en'
    ? QuoteConfirmationEN
    : QuoteConfirmationES

  await resend.emails.send({
    from: quote.locale === 'en' ? process.env.RESEND_FROM_EMAIL_EN : process.env.RESEND_FROM_EMAIL,
    to: quote.client_email,
    subject: quote.locale === 'en'
      ? 'We received your quote request — Klarity'
      : 'Recibimos tu solicitud de cotización — Klarity',
    react: template({ quote }),
  })
}
```

### OpenAI — Chatbot FAQ
```typescript
// Responde en el idioma del usuario (detectado automáticamente)
// System prompt bilingüe: incluir FAQs en ES y EN
// Modelo: gpt-4o-mini
```

### OpenAI — Sugerencia de Cotización
```typescript
// Genera propuesta en el idioma del cliente (quote.locale)
// Solo visible para admin/editor en el panel
```

### HubSpot / Zoho CRM
```typescript
// Al recibir cotización:
// 1. Crear/actualizar Contact
// 2. Crear Deal con nombre del proyecto y valor estimado
// 3. Guardar crm_lead_id + locale en tabla quotes
```

### Google Analytics 4 + GTM
```typescript
const GTM_EVENTS = {
  QUOTE_SUBMITTED:    'quote_submitted',      // + prop: locale
  PROJECT_VIEWED:     'project_viewed',       // + prop: slug, locale
  WHATSAPP_CLICKED:   'whatsapp_clicked',
  BLOG_READ:          'blog_article_read',    // + prop: slug, lang
  CALCULATOR_USED:    'budget_calculator_used',
  SERVICE_VIEWED:     'service_viewed',
  LANGUAGE_SWITCHED:  'language_switched',    // + prop: from, to
}
```

---

## 11. Seguridad
```typescript
// CSRF: tokens en formularios públicos (cookie httpOnly + SameSite=Strict)
// XSS: NO dangerouslySetInnerHTML. CSP header en next.config.ts
// SQL Injection: siempre Supabase SDK / Drizzle ORM
// Rate Limiting:
//   Quote form: 3 req/IP/hora
//   Chat API:   20 mensajes/sesión/hora
//   Login:      5 intentos/IP/15min (Supabase)
// Validación dual Zod: frontend + API Route (siempre re-validar)
// SUPABASE_SERVICE_ROLE_KEY: únicamente en servidor, nunca en bundle cliente

const securityHeaders = [
  { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
]
```

### Roles y Permisos

| Acción | Visitante | Viewer | Editor | Admin |
|---|:-:|:-:|:-:|:-:|
| Ver sitio público | ✅ | ✅ | ✅ | ✅ |
| Enviar cotización | ✅ | ✅ | ✅ | ✅ |
| Ver panel admin | ❌ | ✅ | ✅ | ✅ |
| Ver cotizaciones | ❌ | ✅ | ✅ | ✅ |
| Mover Kanban | ❌ | ❌ | ✅ | ✅ |
| CRUD proyectos | ❌ | ❌ | ✅ | ✅ |
| CRUD servicios | ❌ | ❌ | ❌ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ❌ | ✅ |
| Configuración sitio | ❌ | ❌ | ❌ | ✅ |

---

## 12. Performance y Optimización
```typescript
// Imágenes: next/image, WebP/AVIF, lazy loading, priority solo en LCP
// Fuentes: next/font con display: 'swap', subset latin + latin-ext
// Code splitting: dynamic imports para Chatbot, Kanban, PricingCalculator, Carrusel
// Caching: revalidateTag al publicar proyectos desde admin
// Blog MDX: compilado en build (estático)
// PWA: next-pwa, cache de assets y páginas visitadas, /offline con marca Klarity
// Hreflang: alternates en <head> de cada página para SEO multilenguaje
```

---

## 13. Accesibilidad (WCAG 2.1 AA)
```
✅ Contraste mínimo 4.5:1 texto normal / 3:1 texto grande
   Crema (#F2F0EB) sobre marino (#1B2A3E): ~12:1 ✅
   Dorado (#D4B483) sobre marino (#1B2A3E): ~5.2:1 ✅
   Negro (#1A1A1A) sobre crema (#F2F0EB):  ~16:1 ✅
✅ Navegación por teclado — focus visible en todos los elementos interactivos
✅ ARIA en formularios, modales, carrusel, Kanban, LanguageSwitcher
✅ Alt text descriptivo en todas las imágenes
✅ Skip-to-content como primera opción de teclado
✅ lang attribute dinámico en <html> según locale activo
✅ Respetar prefers-reduced-motion
```
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 14. SEO Multilenguaje
```typescript
// app/[locale]/layout.tsx
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' })
  return {
    metadataBase: new URL('https://klarity.dev'),
    title: { default: t('title'), template: `%s | Klarity` },
    description: t('description'),
    openGraph: {
      type: 'website',
      locale: params.locale === 'en' ? 'en_US' : 'es_MX',
      siteName: 'Klarity',
    },
    alternates: {
      canonical: `https://klarity.dev/${params.locale}`,
      languages: {
        'es': 'https://klarity.dev',
        'en': 'https://klarity.dev/en',
      },
    },
  }
}

// + sitemap.xml dinámico con URLs en ES y EN
// + robots.txt
// + JSON-LD: Organization, WebSite, BreadcrumbList, BlogPosting
```

---

## 15. Cookie Consent (GDPR + LFPDPPP)
```typescript
// Banner localizado (ES / EN)
// Categorías:
//   Esenciales   → siempre activas
//   Analítica    → GA4 (opcional)
//   Marketing    → GTM remarketing (opcional)
// Preferencias: localStorage klarity_cookie_consent
// GA4/GTM solo cargan si analítica aceptada
// Links localizados a Política de Privacidad y Aviso de Cookies
```

---

## 16. Testing
```bash
pnpm test              # Jest + Testing Library
pnpm test:coverage     # Cobertura mínima: 70%
pnpm test:e2e          # Playwright
pnpm test:e2e:ui       # Playwright con UI interactiva
```

**Flujos E2E obligatorios:**
- Envío de formulario de cotización en ES y EN.
- Login admin + Kanban + mover cotización de columna.
- Toggle Dark Mode — verificar que el estado persiste.
- Cambio de idioma ES → EN → verificar URL, contenido y cookies.
- Navegación móvil (viewport 375px) en ambos idiomas.

---

## 17. CI/CD (Vercel + GitHub Actions)
```yaml
# .github/workflows/ci.yml
# Trigger: push main / pull_request

jobs:
  quality:
    - pnpm lint
    - pnpm type-check     # tsc --noEmit
    - pnpm test
    - pnpm build

  e2e:
    - pnpm test:e2e       # Solo en PRs a main

# Vercel: deploy automático en push a main
# Preview deploy por cada PR (URL única, locale detection activo)
# Variables de entorno en Vercel Dashboard (no en repo)
```

---

## 18. Monitoreo
```typescript
// Sentry: errores de producción → alerta si >10 errores nuevos/hora
// LogRocket: sesiones (solo con consent analítica)
//            NO grabar en /admin (datos sensibles)
//            Capturar locale activo como propiedad de sesión
```

---

## 19. Comandos de Desarrollo
```bash
pnpm install
pnpm dev

# Supabase local
supabase start
supabase db reset
supabase gen types typescript --local > types/database.ts

# Calidad de código
pnpm lint && pnpm lint:fix
pnpm format
pnpm type-check

# Build
pnpm build
pnpm analyze        # Bundle analyzer

# Testing
pnpm test
pnpm test:coverage
pnpm test:e2e
pnpm test:e2e:ui
```

---

## 20. Checklist antes de Deploy
```
□ pnpm lint — sin errores ni warnings
□ pnpm type-check — sin errores TypeScript
□ pnpm test — todos los tests pasan
□ Variables de entorno verificadas en Vercel
□ Traducciones completas en es.json y en.json (sin claves faltantes)
□ hreflang alternates presentes en páginas nuevas
□ Metadata SEO revisada en ES y EN
□ Imágenes en WebP, tamaños correctos
□ Lighthouse >90: Performance, Accessibility, SEO (en ambos locales)
□ Probar en móvil (375px) y tablet (768px)
□ Light Mode por defecto al cargar — verificar en sesión nueva
□ Dark Mode: contraste y consistencia en ambos idiomas
□ Formularios: validaciones en ES y EN
□ Emails transaccionales: probar plantilla ES y EN en sandbox Resend
□ Cambio de idioma: URL correcta, cookie guardada, contenido actualizado
```

---

## 21. Convenciones de Commits
```
feat:     Nueva funcionalidad
fix:      Corrección de bug
refactor: Refactorización sin cambio funcional
style:    Cambios de estilos/marca
docs:     Documentación
test:     Tests
chore:    Configuración, deps, CI/CD
perf:     Optimización de rendimiento
i18n:     Traducciones o configuración de idiomas

Ejemplos:
  feat(quotes): add AI proposal suggestion in admin panel
  i18n(en): add English translations for services page
  fix(carousel): correct float animation on mobile viewport
```

---

*Klarity — Documento técnico de referencia. Marzo 2026.*
*Modo por defecto: Light (crema). Stack: Next.js 14+. Idiomas: ES + EN.*