# Use Node.js 20 (LTS)
FROM node:20-alpine AS base

# 1. Install dependencies stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Rebuild the source code stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# Increase memory limit specifically for the build command
RUN NODE_OPTIONS='--max-old-space-size=1536' npm run build

# 3. Production runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy essential files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 7860
ENV PORT 7860
ENV HOSTNAME "0.0.0.0"

# CRITICAL: Limit memory usage to 1.5GB to leave room for the OS within the 2GB HF limit
# This prevents Error 137
CMD ["node", "--max-old-space-size=1536", "server.js"]