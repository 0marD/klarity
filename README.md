# Klarity — Corporate Website

> *"We don't sell code. We solve businesses."*

Website for the software development firm **Klarity**. Built with Next.js 16, strict TypeScript, Tailwind CSS v4, Supabase, and native support for Spanish and English.

Live: [klarity-mocha.vercel.app](https://klarity-mocha.vercel.app)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 — `strict: true` |
| Styles | Tailwind CSS v4 + CSS Variables |
| Internationalization | next-intl 4 — ES (default) + EN |
| Database | Supabase (PostgreSQL + Realtime + Storage) |
| Auth | Supabase Auth (Magic Link) |
| Email | Resend + React Email |
| Animations | Framer Motion 12 |
| Forms | React Hook Form + Zod |
| Unit tests | Vitest + Testing Library |
| E2E tests | Playwright |
| Deploy | Vercel |

---

## Requirements

- Node.js ≥ 20
- Yarn ≥ 1.22
- [Supabase](https://supabase.com) account (for full functionality)

---

## Setup

```bash
# 1. Clone the repository
git clone <repo-url> klarity
cd klarity

# 2. Install dependencies
yarn install

# 3. Configure environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials

# 4. Start development server
yarn dev
```

The app will be available at `http://localhost:3000`.

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
# Supabase (required for auth, quotes, and admin panel)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # Server only — never expose to the client

# Email — Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=hola@klarity.dev
RESEND_FROM_EMAIL_EN=hello@klarity.dev

# AI — OpenAI
OPENAI_API_KEY=

# CRM (optional)
HUBSPOT_ACCESS_TOKEN=

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=

# WhatsApp — format: 521XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=

# Security
NEXTAUTH_SECRET=                  # openssl rand -base64 32
```

> Without Supabase configured, the site runs with static data. The admin panel and quote form require Supabase.

---

## Commands

```bash
# Development
yarn dev                # Development server (Turbopack)

# Code quality
yarn lint               # ESLint
yarn lint:fix           # ESLint with auto-fix
yarn format             # Prettier
yarn type-check         # TypeScript without emitting files

# Tests
yarn test               # Vitest (unit)
yarn test:watch         # Vitest in watch mode
yarn test:coverage      # Test coverage

# E2E tests (requires a running server or starts one automatically)
yarn test:e2e           # Playwright headless
yarn test:e2e:ui        # Playwright with visual UI

# Build
yarn build              # Production build
yarn start              # Production server
yarn analyze            # Bundle analyzer
```

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # Localized routes (ES no prefix, EN with /en)
│   │   ├── page.tsx           # Home
│   │   ├── portafolio/        # List + detail [slug]
│   │   ├── servicios/
│   │   ├── cotizacion/        # Multi-step quote form
│   │   ├── nosotros/
│   │   ├── blog/
│   │   ├── contacto/
│   │   └── login/             # Magic Link
│   ├── admin/                 # Admin panel (requires auth)
│   │   ├── dashboard/
│   │   ├── cotizaciones/      # Drag & drop Kanban
│   │   ├── proyectos/
│   │   └── servicios/
│   ├── api/
│   │   └── quotes/route.ts    # POST with rate limiting
│   ├── offline/page.tsx       # PWA offline page
│   ├── sitemap.ts             # Dynamic sitemap
│   └── robots.ts
├── components/
│   ├── atoms/                 # Button, Input, Badge, Logo, ThemeToggle, LanguageSwitcher
│   ├── molecules/             # ProjectCard, ServiceCard, SectionHeader
│   ├── organisms/             # Navbar, Footer, HeroSection, CookieBanner, KanbanBoard
│   └── templates/             # PageLayout, AdminLayout
├── content/                   # Static data: projects, services, testimonials
├── hooks/                     # useTheme
├── lib/                       # supabase/, validations/, animations, utils
├── messages/
│   ├── es.json                # Spanish translations
│   └── en.json                # English translations
└── types/                     # TypeScript types: database, quote, project
```

---

## Internationalization

The site supports **Spanish** and **English** from the first deploy. Both locales use a URL prefix.

| Language | URL |
|---|---|
| Spanish | `klarity.dev/es/` `klarity.dev/es/portafolio` ... |
| English | `klarity.dev/en/` `klarity.dev/en/portafolio` ... |

- Automatic detection: `NEXT_LOCALE` cookie → `Accept-Language` header → fallback ES
- The language switcher persists the preference in `klarity_locale` and `NEXT_LOCALE` cookies (1 year)
- SEO metadata with `hreflang` alternates on every page

---

## Public Pages

| Route | Description |
|---|---|
| `/` | Hero, project carousel, featured services, process timeline, CTA |
| `/portafolio` | Grid with tag filters |
| `/portafolio/[slug]` | Case study with before/after metrics |
| `/servicios` | Service cards with price toggle |
| `/cotizacion` | 3-step wizard form + Zod validation |
| `/nosotros` | Philosophy, team and values |
| `/blog` | MDX articles |
| `/contacto` | Contact form + contact info |

---

## Admin Panel

Accessible at `/admin` — requires an active session (Magic Link to an authorized email).

| Section | Functionality |
|---|---|
| Dashboard | KPIs: monthly quotes, conversion rate |
| Quotes | Drag & drop Kanban by status |
| Projects | CRUD + image upload to Supabase Storage |
| Services | Admin data table |

**Roles:** `admin` → full access · `editor` → CRUD projects and quotes · `viewer` → read only

### Magic Link setup (production)

The magic link uses `window.location.origin` dynamically, so no code changes are needed. You only need to configure Supabase:

1. **Supabase Dashboard → Authentication → URL Configuration**
   - Set **Site URL** to your production URL (e.g. `https://klarity-mocha.vercel.app`)
   - Add `https://klarity-mocha.vercel.app/**` to **Redirect URLs**

---

## PWA

The site works as a Progressive Web App:

- **Manifest** at `/favicon/site.webmanifest`
- **Service Worker** (`/sw.js`) — cache-first for assets, network-first for pages
- **Offline page** at `/offline` with Klarity branding
- Installable on mobile and desktop

**Install prompt** (`PWAInstallPrompt`): bilingual modal that appears after 3.5s with three options:

| Option | Behavior |
|---|---|
| Install | Triggers the browser's native install prompt |
| Later | Hides the modal this session · shows a discrete icon in the bottom-left corner |
| Don't ask again | Persists in `localStorage` · shows discrete icon permanently |

The discrete icon (40px, 40% opacity) disappears once the installation is complete.

---

## Cookie Consent

Localized GDPR/LFPDPPP banner (ES/EN) with three levels:

- **Essential** — always active
- **Analytics** — GA4 (loaded dynamically only if accepted)
- **Marketing** — GTM remarketing

The preference is persisted in `localStorage` (`klarity_cookie_consent`).

---

## E2E Tests — Covered flows

| File | Scenario |
|---|---|
| `navigation.spec.ts` | All public pages render without error |
| `quote-form.spec.ts` | Full quote form flow in ES and EN |
| `language-switch.spec.ts` | ES ↔ EN switch, URL, cookie and content |
| `theme-toggle.spec.ts` | Light/dark mode, persistence in localStorage |
| `mobile-nav.spec.ts` | Hamburger menu at 375px |
| `portfolio.spec.ts` | Grid, filters, navigation to detail |
| `admin-auth.spec.ts` | Redirect to /login without session, Magic Link |

---

## UI Notes

| Component | Detail |
|---|---|
| `ServiceCard` | Uniform height per row: `flex-col h-full` + `flex-1` on description |
| `/contacto` page | `[3fr 2fr]` grid + `max-w-4xl` — compact form, proportional info column |
| `LanguageSwitcher` | Both locales use a prefix (`/es/`, `/en/`) — switcher writes `NEXT_LOCALE` and `klarity_locale` |
| `Footer` | Client Component (`useTranslations`) for compatibility with `'use client'` pages |

---

## Security

- CSRF tokens on public forms
- CSP headers in `next.config.ts`
- Rate limiting: 3 quotes/IP/hour · 20 chat messages/session/hour
- Zod validation on frontend **and** in API Route (always)
- `SUPABASE_SERVICE_ROLE_KEY` exclusively on the server
- Row Level Security (RLS) enabled on all tables

---

## Deploy

The project deploys automatically on **Vercel**:

```
main → production (klarity.dev)
PR   → preview deploy (unique URL per PR)
```

Pre-deploy checklist: see [CLAUDE.md — Section 20](./CLAUDE.md#20-checklist-antes-de-deploy).

---

## License

Proprietary software. All rights reserved.
See [LICENSE](./LICENSE) for full terms.

© 2026 Klarity — [klarity.dev](https://klarity.dev)
