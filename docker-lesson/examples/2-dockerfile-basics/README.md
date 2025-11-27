# Example 2: Dockerfile Basics

This example shows how to create a Dockerfile for a Node.js application.

## What You'll Learn

- Writing a Dockerfile
- Building Docker images
- Optimizing Dockerfiles
- Using .dockerignore

## Project Structure

```
.
├── app.js
├── package.json
├── Dockerfile
├── .dockerignore
└── README.md
```

## Step-by-Step Guide

### Step 1: Create Application Files

**package.json:**
```json
{
  "name": "dockerfile-example",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**app.js:**
```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker container!',
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
```

### Step 2: Create Basic Dockerfile

**Dockerfile:**
```dockerfile
# Use official Node.js runtime as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Define command
CMD ["npm", "start"]
```

### Step 3: Create .dockerignore

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
```

### Step 4: Build the Image

```bash
docker build -t my-node-app .
```

### Step 5: Run the Container

```bash
docker run -p 3000:3000 my-node-app
```

### Step 6: Run with Environment Variables

```bash
docker run -p 3000:3000 -e NODE_ENV=production -e PORT=3000 my-node-app
```

## Improved Dockerfile (Best Practices)

**Dockerfile.improved:**
```dockerfile
# Use specific version and Alpine for smaller size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY --chown=appuser:appuser . .

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Define command
CMD ["npm", "start"]
```

## Building with Tags

```bash
# Build with tag
docker build -t my-node-app:1.0.0 .

# Build with multiple tags
docker build -t my-node-app:latest -t my-node-app:1.0.0 .

# Build from specific Dockerfile
docker build -f Dockerfile.improved -t my-node-app:improved .
```

## Inspecting Images

```bash
# List images
docker images

# Inspect image
docker inspect my-node-app

# View image history
docker history my-node-app

# Check image size
docker images my-node-app
```

## Key Dockerfile Instructions

- `FROM`: Base image
- `WORKDIR`: Set working directory
- `COPY`: Copy files from host
- `ADD`: Copy files (can also download)
- `RUN`: Execute commands during build
- `ENV`: Set environment variables
- `EXPOSE`: Document port
- `CMD`: Default command
- `ENTRYPOINT`: Entry point command
- `USER`: Set user
- `HEALTHCHECK`: Health check command

## Best Practices

1. **Use specific versions**: `node:18` not `node:latest`
2. **Use Alpine**: Smaller images (`node:18-alpine`)
3. **Layer caching**: Copy package.json before code
4. **Use .dockerignore**: Exclude unnecessary files
5. **Non-root user**: Security best practice
6. **Minimize layers**: Combine RUN commands
7. **Health checks**: Monitor container health

## Next Steps

- Try the improved Dockerfile
- Experiment with different base images
- Add more environment variables
- Implement health checks

