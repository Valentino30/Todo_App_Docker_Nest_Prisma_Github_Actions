# ------------------------
# Stage 1: Builder
# ------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copy root config
COPY tsconfig.base.json .

# 2. Copy backend config + Prisma files BEFORE npm ci
COPY apps/backend/package.json apps/backend/
COPY apps/backend/package-lock.json apps/backend/
COPY apps/backend/prisma apps/backend/prisma
COPY apps/backend/tsconfig.json apps/backend/
COPY apps/backend/tsconfig.build.json apps/backend/

# 3. Install dependencies (this will run `prisma generate` via postinstall)
WORKDIR /app/apps/backend
RUN npm ci

# 4. Copy source files AFTER deps
COPY apps/backend .

# 5. Build
RUN npm run build

# ------------------------
# Stage 2: Production
# ------------------------
FROM node:20-alpine
WORKDIR /app

# 1. Copy app
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json .
COPY --from=builder /app/apps/backend/package-lock.json .
COPY --from=builder /app/apps/backend/prisma ./prisma

# 2. Install prod deps
RUN npm ci --omit=dev

CMD ["node", "dist/src/main.js"]
