# Exercise 2: Dockerfile

## Objectives

- Create a Dockerfile for a Node.js application
- Build Docker images
- Optimize Dockerfiles
- Use .dockerignore

## Tasks

### Task 1: Basic Dockerfile

Create a Dockerfile for this Node.js application:

**app.js:**
```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker!',
    nodeVersion: process.version
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
```

**package.json:**
```json
{
  "name": "dockerfile-exercise",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**Solution:**

**Dockerfile:**
```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

Build and run:
```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

### Task 2: Create .dockerignore

Create a `.dockerignore` file to exclude unnecessary files from the Docker build context.

**Solution:**

**.dockerignore:**
```
node_modules
npm-debug.log
.git
.gitignore
.env
README.md
.DS_Store
coverage
.nyc_output
*.log
```

### Task 3: Optimize Dockerfile

Improve the Dockerfile with:
- Alpine base image
- Non-root user
- Production-only dependencies
- Health check

**Solution:**

**Dockerfile.optimized:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY --chown=appuser:appuser . .

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "app.js"]
```

### Task 4: Multi-tag Build

Build the image with multiple tags: `latest` and `v1.0.0`.

**Solution:**
```bash
docker build -t my-app:latest -t my-app:v1.0.0 .
```

### Task 5: Environment Variables

Modify the Dockerfile to accept environment variables and update the app to use them.

**Solution:**

Update `app.js`:
```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker!',
    nodeVersion: process.version,
    environment: env,
    port: port
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port} in ${env} mode`);
});
```

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

Run with custom environment:
```bash
docker run -p 3000:3000 -e NODE_ENV=development -e PORT=3000 my-app
```

## Challenge Exercise

Create a Dockerfile for a TypeScript Node.js application that:
1. Compiles TypeScript during build
2. Uses multi-stage build
3. Only includes compiled JavaScript in final image
4. Uses Alpine for smaller size

**Solution:**

**package.json:**
```json
{
  "name": "typescript-docker",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "start": "node dist/app.js"
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

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

**src/app.ts:**
```typescript
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from TypeScript Docker!',
    nodeVersion: process.version
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
```

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Copy compiled JavaScript from builder
COPY --from=builder --chown=appuser:appuser /app/dist ./dist

USER appuser

EXPOSE 3000

CMD ["node", "dist/app.js"]
```

Build and run:
```bash
docker build -t ts-app .
docker run -p 3000:3000 ts-app
```

