# ----------------------------
# 1. Build stage
# ----------------------------
FROM node:22-alpine AS builder

# Install dependencies needed for building native modules
RUN apk add --no-cache python3 g++ make

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build Next.js app
RUN npm run build

# ----------------------------
# 2. Production stage
# ----------------------------
FROM node:22-alpine AS runner

WORKDIR /app

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./  # ensure your config is JS, not TS

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
