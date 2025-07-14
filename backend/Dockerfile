# ------------------------
# Stage 1: Builder
# ------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copy root config
COPY tsconfig.base.json .

# 2. Copy backend config + Prisma files BEFORE npm ci
COPY backend/package.json backend/
COPY backend/package-lock.json backend/
COPY backend/prisma backend/prisma
COPY backend/tsconfig.json backend/
COPY backend/tsconfig.build.json backend/

# 3. Install dependencies (this will run `prisma generate` via postinstall)
WORKDIR /app/backend
RUN npm ci

# 4. Copy source files AFTER deps
COPY backend .

# 5. Build
RUN npm run build

# ------------------------
# Stage 2: Production
# ------------------------
FROM node:20-alpine
WORKDIR /app

# 1. Copy app
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/package.json .
COPY --from=builder /app/backend/package-lock.json .
COPY --from=builder /app/backend/prisma ./prisma

# 2. Install prod deps
RUN npm ci --omit=dev

CMD ["node", "dist/src/main.js"]
