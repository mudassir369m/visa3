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

- **New Euro Frontend** — `PORT=24898 BASE_PATH=/ pnpm --filter @workspace/new-euro run dev` (webview, port 24898)

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

Public-facing visa consultancy site with:
- Home page with all major sections (hero, country cards, services, how-it-works, eligibility teaser, tours carousel, success stories, FAQs, office map, final CTA)
- Eligibility check multi-step wizard
- Admin panel (login + dashboard stub; full CRUD is a follow-up task)

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
- API server routes only mount health check currently — all other API routes return 404 until backend is wired up (see Task #3)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Master prompt spec: `attached_assets/Pasted--REPLIT-MASTER-PROMPT-NEW-EURO-CONSULTANTS-World-Class-_1782941061146.txt`
