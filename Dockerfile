# ----------------------------
# 1. Use official Node image as base
# ----------------------------
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the Next.js app
RUN npm run build


# ----------------------------
# 2. Use lightweight image for production
# ----------------------------
FROM node:22-alpine AS runner

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Set environment variable for Next.js
ENV PORT=3000

# Start Next.js app
CMD ["npm", "start"]
