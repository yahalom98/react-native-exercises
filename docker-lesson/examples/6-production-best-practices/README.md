# Example 6: Production Best Practices

This example demonstrates production-ready Docker configurations for Node.js applications.

## What You'll Learn

- Production Dockerfile patterns
- Security best practices
- Health checks
- Logging strategies
- Resource limits
- Monitoring

## Production-Ready Dockerfile

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy production dependencies
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "dist/index.js"]
```

## Application with Health Check

**app.js:**
```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Readiness check
app.get('/ready', async (req, res) => {
  // Check database connection, external services, etc.
  const isReady = true; // Replace with actual checks
  
  if (isReady) {
    res.status(200).json({ ready: true });
  } else {
    res.status(503).json({ ready: false });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Production-ready Node.js app',
    environment: process.env.NODE_ENV,
    nodeVersion: process.version
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
```

## Production docker-compose.yml

**docker-compose.prod.yml:**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: my-app:latest
    container_name: my-app-prod
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    env_file:
      - .env.production
    volumes:
      - app_logs:/app/logs
    networks:
      - app-network
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Nginx reverse proxy
  nginx:
    image: nginx:alpine
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    networks:
      - app-network
    restart: unless-stopped

volumes:
  app_logs:

networks:
  app-network:
    driver: bridge
```

## Security Best Practices

### 1. Non-root User
```dockerfile
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs
```

### 2. Scan for Vulnerabilities
```bash
docker scan my-app:latest
```

### 3. Use Specific Versions
```dockerfile
FROM node:18.17.0-alpine
# Not: FROM node:latest
```

### 4. Minimal Base Image
```dockerfile
FROM node:18-alpine
# Alpine is much smaller and has fewer packages
```

### 5. Secrets Management
```yaml
# Use secrets, not environment variables
secrets:
  db_password:
    external: true
```

## Logging Configuration

### Structured Logging
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: '/app/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: '/app/logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

## Resource Limits

```yaml
deploy:
  resources:
    limits:
      cpus: '1.0'
      memory: 512M
    reservations:
      cpus: '0.5'
      memory: 256M
```

## Monitoring

### Prometheus Metrics
```javascript
const promClient = require('prom-client');

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  registers: [register]
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

## Production Checklist

- [ ] Use multi-stage builds
- [ ] Run as non-root user
- [ ] Use specific image versions
- [ ] Implement health checks
- [ ] Set resource limits
- [ ] Configure logging
- [ ] Use secrets management
- [ ] Enable monitoring
- [ ] Set up backups
- [ ] Configure auto-restart
- [ ] Use production base images
- [ ] Scan for vulnerabilities
- [ ] Implement graceful shutdown
- [ ] Set up reverse proxy
- [ ] Configure SSL/TLS

## Next Steps

- Set up monitoring (Prometheus, Grafana)
- Implement CI/CD pipeline
- Configure auto-scaling
- Set up log aggregation
- Implement backup strategy

