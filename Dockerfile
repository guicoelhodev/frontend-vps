# Stage 1: builder
FROM node:22-slim AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API
ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source & build
COPY . .
RUN npm run build

# Stage 2: production runtime
FROM node:22-slim AS runner
WORKDIR /app

# Copy only standalone output and public assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Lock in production settings
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
