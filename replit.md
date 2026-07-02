# New Euro Consultants

Premium visa consultancy website for New Euro Consultants Travel & Tours (Islamabad). Tagline: "A Step Before Embassy." 18 years in business, serving UK, USA, Canada, Australia, Turkey, and Schengen visas.

## Run & Operate

- `PORT=24898 BASE_PATH=/ pnpm --filter @workspace/new-euro run dev` — run the frontend (port 24898)
- `PORT=5000 pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env: `SESSION_SECRET` — already configured in Replit Secrets

## Workflow

- **artifacts/new-euro: web** — managed artifact workflow (port 24898, preview at `/`)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, shadcn/ui, Framer Motion, GSAP, Lenis, react-three-fiber, Three.js
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- Build: esbuild (CJS bundle for API server)
- i18n: i18next + react-i18next (English + Urdu)

## Where things live

- `artifacts/new-euro/` — React+Vite frontend, all public-facing pages
- `artifacts/api-server/` — Express 5 API server
- `artifacts/mockup-sandbox/` — UI component prototyping sandbox
- `lib/db/src/schema/` — Drizzle ORM schema (source of truth for DB)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contract)
- `lib/api-client-react/` — Generated React Query hooks (from codegen)
- `lib/api-zod/` — Generated Zod schemas (from codegen)
- `attached_assets/` — Master prompt spec documents

## Architecture decisions

- OpenAPI spec is source of truth; frontend hooks and Zod schemas are generated from it — never hand-edit `lib/api-client-react/` or `lib/api-zod/`
- Frontend is a SPA (Vite + Wouter routing), not Next.js — the master prompt spec mentions Next.js but the project was built as React+Vite
- Design system: dark mode default, deep sapphire blue + embassy gold palette, defined in `artifacts/new-euro/src/index.css`
- PORT and BASE_PATH must be passed explicitly when running the frontend (vite.config.ts enforces this)

## Product

Full-stack visa consultancy site — public site + admin panel are both live and DB-backed:
- Home page with all major sections (hero, country cards, services, how-it-works, eligibility teaser, tours carousel, success stories, FAQs, office map, final CTA) — all data-driven sections fetch live from the API via generated React Query hooks
- 6 visa detail pages (`/visa/uk` etc.), `/services`, `/tours` — all fetch by slug/list from the DB (visa page: `useGetVisaBySlug`)
- Eligibility check multi-step wizard — submits to `POST /api/eligibility`, scored server-side
- Contact form and newsletter signup — submit to `POST /api/leads` and `POST /api/newsletter`
- Admin panel at `/admin/*` — full CRUD for hero slides, visas, services, tours, testimonials, FAQs, blog, embassy updates; a leads inbox and eligibility-submissions view with WhatsApp/call quick actions and status/notes editing; a dashboard with real KPIs + a Recharts leads-over-30-days chart; a site-settings form. All content-entity admin pages share one generic component (`components/admin/CrudPage.tsx`) driven by a per-entity field config — see `pages/admin/Visas.tsx` for the reference pattern.
- Admin/leads/eligibility emails via Resend (`artifacts/api-server/src/lib/email.ts`) — no-ops with a log line if `RESEND_API_KEY`/`EMAIL_TO_ADMIN` aren't set, so it never blocks local dev.

**Known remaining gaps vs. the master prompt spec:** no light/dark toggle (dark-mode only), no file/media upload (hero media + service/tour images are URL-paste only, no storage abstraction), no i18n content translation for admin-entered text (EN/UR toggle only translates static UI strings), no Dockerfile/railway.json at the repo root.

## User preferences

- Business: New Euro Consultants Travel & Tours, S. Mustafa, @worldofmustafa
- Phone/WhatsApp: +92 314 535 2222
- Address: Office No. 17-18, 1st Floor, Lord Trade Centre, F-11 Markaz, Islamabad
- Social: Instagram @neweuroconsultants & @worldofmustafa1, TikTok @worldofmustafa, Facebook worldofmustafa, YouTube @neweuroconsultants

## Gotchas

- Vite config throws if PORT or BASE_PATH env vars are missing — always pass them when running dev server
- API server throws if PORT is missing — always pass PORT when running
- `MapMap` is not a valid Lucide icon — fixed to `Map` in ServicesRow.tsx
- Run `pnpm --filter @workspace/api-spec run codegen` after any change to `lib/api-spec/openapi.yaml`
- All API routes are mounted in `artifacts/api-server/src/routes/index.ts`; admin mutation routes (POST/PATCH/DELETE) are protected with a `requireAuth` session middleware — see `artifacts/api-server/src/middlewares/`
- Session store is `connect-pg-simple`, but `createTableIfMissing` is disabled (its `table.sql` asset doesn't survive esbuild bundling) — the `session` table must be created ahead of time via `pnpm --filter @workspace/scripts run init-session-table` (already wired into `scripts/post-merge.sh`)
- Seed default content (admin user + visas/services/tours/testimonials/faqs/blog/embassy-updates/hero/settings) via `pnpm --filter @workspace/scripts run seed`; reads `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars, defaults to `admin@neweuroconsultants.com` / `ChangeMe!StrongPass2026`
- Vite dev server proxies `/api/*` to the API server; target defaults to `http://localhost:5000`, override with `API_PROXY_TARGET`
- Express 5's route-handler-array typings widen `req.params.id` to `string | string[]` when a route has more than one handler (e.g. `requireAuth` + async handler) — routes work around this with `req.params.id as string` before `parseInt`
- Frontend needs a local Postgres for `useListVisas`/etc. to return data — no `DATABASE_URL` is set by default in this environment; a docker-run Postgres works fine for local dev (`.env` at repo root, gitignored)
- `CrudPage`'s generic form marks every text/textarea/number field `required` by default (since most entity fields are required) — set `required: false` explicitly in a page's field config for genuinely optional schema fields (e.g. `fees`, `description`, `secondaryCta`), or the form silently blocks submission
- Email notifications need `RESEND_API_KEY` and `EMAIL_TO_ADMIN` env vars; without them `notifyAdmin()` just logs and returns, it never throws

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Master prompt spec: `attached_assets/Pasted--REPLIT-MASTER-PROMPT-NEW-EURO-CONSULTANTS-World-Class-_1782941061146.txt`
