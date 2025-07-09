# ------------------------
# Stage 1: Builder
# ------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copy root config files
COPY package.json package-lock.json .
COPY tsconfig.base.json .
COPY tsconfig.json .

# 2. Copy backend config files
COPY apps/backend/package.json apps/backend/
COPY apps/backend/package-lock.json apps/backend/
COPY apps/backend/tsconfig.json apps/backend/
COPY apps/backend/tsconfig.build.json apps/backend/

# 3. Install dependencies
RUN npm ci
RUN cd apps/backend && npm ci

# 4. Copy source files
COPY apps/backend/src apps/backend/src

# 5. Optional sanity check
RUN ls -la /app/apps/backend/tsconfig.build.json && \
    cat /app/apps/backend/tsconfig.build.json

# 6. Build using production-only config
RUN cd apps/backend && \
    npx tsc -p tsconfig.build.json && \
    ls -la dist

# ------------------------
# Stage 2: Production
# ------------------------
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json .
COPY --from=builder /app/apps/backend/package-lock.json .

RUN npm ci --only=production

CMD ["node", "dist/main.js"]
