# ============================================================
# New Euro Consultants — Multi-stage Railway Dockerfile
# Keeps pnpm workspace layout intact so scripts/tsx works.
# ============================================================

# ---------- Stage 1: Install dependencies ----------
FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat python3 make g++
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Workspace manifests (no source yet)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY tsconfig.base.json tsconfig.json ./
COPY lib/db/package.json            ./lib/db/
COPY lib/api-spec/package.json      ./lib/api-spec/
COPY lib/api-client-react/package.json ./lib/api-client-react/
COPY lib/api-zod/package.json       ./lib/api-zod/
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY artifacts/new-euro/package.json   ./artifacts/new-euro/
COPY scripts/package.json              ./scripts/

RUN pnpm install --frozen-lockfile

# ---------- Stage 2: Build ----------
FROM deps AS builder

WORKDIR /app

COPY . .

# Build shared libs (tsc project references)
RUN pnpm run typecheck:libs

# Build API server (produces artifacts/api-server/dist/index.mjs)
RUN pnpm --filter @workspace/api-server run build

# Build frontend (produces artifacts/new-euro/dist/)
RUN PORT=3000 BASE_PATH=/ pnpm --filter @workspace/new-euro run build

# ---------- Stage 3: Production runner ----------
FROM node:20-alpine AS runner

RUN apk add --no-cache wget
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000

# ── Keep full workspace layout so pnpm scripts & tsx work ──
COPY --from=builder /app/package.json            ./package.json
COPY --from=builder /app/pnpm-lock.yaml          ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml     ./pnpm-workspace.yaml
COPY --from=builder /app/tsconfig.base.json      ./tsconfig.base.json
COPY --from=builder /app/tsconfig.json           ./tsconfig.json
COPY --from=builder /app/.npmrc                  ./.npmrc

# Lib packages (compiled)
COPY --from=builder /app/lib/ ./lib/

# API server (source + compiled dist)
COPY --from=builder /app/artifacts/api-server/ ./artifacts/api-server/

# Scripts (source only — runs via tsx)
COPY --from=builder /app/scripts/ ./scripts/

# Frontend build → served as static by Express
COPY --from=builder /app/artifacts/new-euro/dist/ ./artifacts/new-euro/dist/

# Install production deps only
RUN pnpm install --prod --ignore-scripts 2>/dev/null || \
    pnpm install --ignore-scripts

# Non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 apiuser
USER apiuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=5 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "--experimental-specifier-resolution=node", \
     "scripts/migrate-and-start.mjs"]
