# Exercise 4: Multi-stage Builds

## Objectives

- Create multi-stage Dockerfiles
- Optimize image sizes
- Separate build and runtime environments
- Use Alpine images

## Tasks

### Task 1: Basic Multi-stage Build

Convert a single-stage Dockerfile to a multi-stage build.

**Original Dockerfile:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

**Solution:**

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Task 2: Optimize with Production Dependencies Only

Modify the multi-stage build to only include production dependencies in the final image.

**Solution:**

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Task 3: Add Non-root User

Add a non-root user to the production stage for security.

**Solution:**

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001

# Copy files with correct ownership
COPY --from=builder --chown=appuser:appuser /app/dist ./dist
COPY --chown=appuser:appuser package*.json ./
RUN npm ci --only=production && npm cache clean --force

USER appuser

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Task 4: TypeScript Multi-stage Build

Create a multi-stage Dockerfile for a TypeScript application.

**Solution:**

**Dockerfile:**
```dockerfile
# Dependencies stage
FROM node:18 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder stage
FROM node:18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy only production dependencies
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --chown=nodejs:nodejs package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

USER nodejs

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### Task 5: Compare Image Sizes

Build both single-stage and multi-stage versions and compare their sizes.

**Solution:**

**Dockerfile.single:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

**Dockerfile.multi:**
```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

Compare:
```bash
docker build -f Dockerfile.single -t app-single .
docker build -f Dockerfile.multi -t app-multi .
docker images | grep app
```

## Challenge Exercise

Create an optimized multi-stage Dockerfile for a Next.js application that:
1. Builds the Next.js app in build stage
2. Uses standalone output
3. Only includes runtime dependencies
4. Uses Alpine for minimal size
5. Runs as non-root user

**Solution:**

**Dockerfile:**
```dockerfile
# Dependencies stage
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js with standalone output
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

**next.config.js:**
```javascript
module.exports = {
  output: 'standalone',
}
```

