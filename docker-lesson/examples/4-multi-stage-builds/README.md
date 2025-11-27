# Example 4: Multi-stage Builds

This example demonstrates how to use multi-stage builds to create optimized Docker images.

## What You'll Learn

- Multi-stage Dockerfiles
- Reducing image size
- Separating build and runtime
- Production optimizations

## Why Multi-stage Builds?

- **Smaller images**: Only include runtime dependencies
- **Security**: Fewer tools in production image
- **Faster deployments**: Smaller images transfer faster
- **Clean separation**: Build tools separate from runtime

## Project Structure

```
.
├── src/
│   └── index.js
├── package.json
├── Dockerfile
└── README.md
```

## Step-by-Step Guide

### Step 1: Create Application

**package.json:**
```json
{
  "name": "multi-stage-example",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "build": "mkdir -p dist && cp src/index.js dist/index.js",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

**src/index.js:**
```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from optimized multi-stage build!',
    nodeVersion: process.version,
    environment: process.env.NODE_ENV
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
```

### Step 2: Single-stage Dockerfile (Before)

**Dockerfile.single:**
```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Image size**: ~900MB (includes dev dependencies)

### Step 3: Multi-stage Dockerfile (After)

**Dockerfile:**
```dockerfile
# Stage 1: Dependencies
FROM node:18 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Builder
FROM node:18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy only production dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Change ownership
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

**Image size**: ~150MB (only runtime dependencies)

### Step 4: Build and Compare

```bash
# Build single-stage
docker build -f Dockerfile.single -t app-single .

# Build multi-stage
docker build -t app-multi .

# Compare sizes
docker images | grep app
```

### Step 5: Advanced Multi-stage with TypeScript

**package.json (TypeScript version):**
```json
{
  "name": "multi-stage-ts",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/express": "^4.17.17",
    "@types/node": "^20.0.0"
  }
}
```

**Dockerfile.typescript:**
```dockerfile
# Stage 1: Dependencies
FROM node:18 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Builder (with TypeScript)
FROM node:18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy only what's needed
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force

USER nodejs

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

## Benefits Comparison

| Aspect | Single-stage | Multi-stage |
|--------|-------------|-------------|
| Image Size | ~900MB | ~150MB |
| Build Tools | Included | Excluded |
| Security | More surface | Less surface |
| Deploy Speed | Slower | Faster |
| Dev Dependencies | Included | Excluded |

## Best Practices

1. **Use Alpine**: Smaller base images
2. **Copy selectively**: Only copy what's needed
3. **Separate stages**: Clear separation of concerns
4. **Production only**: Install only production dependencies
5. **Non-root user**: Security best practice
6. **Layer caching**: Optimize layer order

## Next Steps

- Try with your own application
- Experiment with different base images
- Measure image size improvements
- Add health checks

